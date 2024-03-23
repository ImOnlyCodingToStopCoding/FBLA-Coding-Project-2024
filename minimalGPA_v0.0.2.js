var semesterCounter = 0;
var courseCounters = { 0: 1 };
var semesterLimit = 10;
var courseLimit = 20;

window.addEventListener("load", function () {
    //when the screen initializes add a semester automatically
    addSemesterField(1);
});
//--------------------------------------------------------------------------------------------------------------------
document //establish x button functionality for help page
    .getElementById("closeInfoModal")
    .addEventListener("click", function () {
        document.querySelector(".infoModal").style.display = "none";
        const infoQuestions = document.querySelectorAll(".infoQuestion");
        infoQuestions.forEach(function (infoQuestion) {
            infoQuestion.classList.remove("open"); //automatically close all opened questions.
            infoQuestion.addEventListener("click", function () {
                //re-add the event listener
                infoQuestion.classList.toggle("open");
            });
        });
        lockScrolling("unlock");
    });
//--------------------------------------------------------------------------------------------------------------------
document //establish x button functionality for contact page
    .getElementById("closeContactModal")
    .addEventListener("click", function () {
        document.querySelector(".contactModal").style.display = "none";
        lockScrolling("unlock");
    });
//--------------------------------------------------------------------------------------------------------------------
window.onclick = (event) => {
    var infoModal = document.querySelector(".infoModal");
    var resultsModal = document.querySelector(".resultsModal");
    var contactModal = document.querySelector(".contactModal");

    if (
        event.target.matches(".infoModal") &&
        getComputedStyle(infoModal).display === "flex" &&
        !event.target.matches(".helpText")
    ) {
        document.querySelector(".infoModal").style.display = "none";
        const infoQuestions = document.querySelectorAll(".infoQuestion");
        infoQuestions.forEach(function (infoQuestion) {
            infoQuestion.classList.remove("open"); //automatically close all opened questions.
            infoQuestion.addEventListener("click", function () {
                //re-add the event listener
                infoQuestion.classList.toggle("open");
            });
        });
        lockScrolling("unlock");
    }
    //-----------------------------------------------
    if (
        event.target.matches(".resultsModal") &&
        getComputedStyle(resultsModal).display === "flex" &&
        !event.target.matches(".calculateButton")
    ) {
        document.querySelector(".resultsModal").style.display = "none";
        var deleteOldModalContent = document.getElementById(
            "resultsModalContentid"
        ); //delete old modal content
        deleteOldModalContent.remove();
        lockScrolling("unlock");
    }
    //-----------------------------------------------
    if (
        event.target.matches(".contactModal") &&
        getComputedStyle(contactModal).display === "flex" &&
        !event.target.matches(".contactText")
    ) {
        document.querySelector(".contactModal").style.display = "none";
        lockScrolling("unlock");
    }
};
//--------------------------------------------------------------------------------------------------------------------
document //redirect user from contact screen to help screen
    .getElementById("openHelpMenuFromContact")
    .addEventListener("click", function () {
        const infoQuestions = document.querySelectorAll(".infoQuestion");
        infoQuestions.forEach(function (infoQuestion) {
            infoQuestion.addEventListener("click", function () {
                infoQuestion.classList.toggle("open");
            });
        });

        document.querySelector(".contactModal").style.display = "none";
        document.querySelector(".infoModal").style.display = "flex";
    });
//--------------------------------------------------------------------------------------------------------------------
function removeCourseField(semesterIndex, courseIndex) {
    if (courseCounters[semesterIndex] > 1) {
        var deleteCourseElement = document.getElementById(
            "course-container_s" + semesterIndex + "_c" + courseIndex
        );
        deleteCourseElement.remove();
        courseCounters[semesterIndex]--;
        changeCourseCredentials(semesterIndex, courseIndex); //change the courses names n stuff
    }
}
//--------------------------------------------------------------------------------------------------------------------
function removeSemesterField(semesterIndex) {
    if (semesterCounter > 1) {
        var deleteSemesterElement = document.getElementById(
            "semesterContainer_s" + semesterIndex
        );
        deleteSemesterElement.remove();
        semesterCounter--;
        changeSemesterCredentials(semesterIndex);
        delete courseCounters[semesterCounter + 1];

        // Check if the buttons already exist before appending
        if (!document.getElementById("addSemesterButton")) {
            var bottomButtons = document.createElement("div");
            bottomButtons.classList.add("bottomButtons");
            bottomButtons.innerHTML = `
                <button
                    id="addSemesterButton"
                    class="newSemester"
                    type="button"
                    onclick="addSemesterField()">
                    +Semester
                </button>

                <button
                    id="calculateGPAButton"
                    class="calculateButton"
                    type="button"
                    onclick="calculateGPA(event)">
                    Calculate
                </button>
            `;

            document.getElementById("courseForm").appendChild(bottomButtons);
        }
    }
}
//--------------------------------------------------------------------------------------------------------------------
function changeCourseCredentials(semesterIndex, courseIndex) {
    for (var j = courseIndex; j <= courseCounters[semesterIndex] + 1; j++) {
        console.log("thingie ran");
        var deleteCourseButton = document.getElementById(
            "deleteButton_s" + semesterIndex + "_c" + (j + 1)
        ); //grab courseIndex + 1
        deleteCourseButton.setAttribute(
            "onclick",
            "removeCourseField(" + semesterIndex + "," + j + ")"
        ); //set it to courseIndex
        deleteCourseButton.setAttribute(
            "id",
            "deleteButton_s" + semesterIndex + "_c" + j
        );
        //--------------------------------------------------
        var courseNameInput = document.getElementById(
            "course-name_s" + semesterIndex + "_c" + (j + 1)
        );
        courseNameInput.setAttribute(
            "oninput",
            "courseInputChanged(" + semesterIndex + "," + j + ")"
        );
        courseNameInput.setAttribute(
            "id",
            "course-name_s" + semesterIndex + "_c" + j
        );
        //--------------------------------------------------
        var courseGradeSelect = document.getElementById(
            "course-grade_s" + semesterIndex + "_c" + (j + 1)
        );
        courseGradeSelect.setAttribute(
            "id",
            "course-grade_s" + semesterIndex + "_c" + j
        );
        //--------------------------------------------------
        var courseTypeSelect = document.getElementById(
            "class-type_s" + semesterIndex + "_c" + (j + 1)
        );
        courseTypeSelect.setAttribute(
            "id",
            "class-type_s" + semesterIndex + "_c" + j
        );
        //--------------------------------------------------
        var courseContainer = document.getElementById(
            "course-container_s" + semesterIndex + "_c" + (j + 1)
        );
        courseContainer.setAttribute(
            "id",
            "course-container_s" + semesterIndex + "_c" + j
        );
        //--------------------------------------------------
        var courseNumber = document.getElementById(
            "course-number_s" + semesterIndex + "_c" + (j + 1)
        );
        courseNumber.setAttribute(
            "id",
            "course-number_s" + semesterIndex + "_c" + j
        );
        courseNumber.textContent = j;
    }
}
//--------------------------------------------------------------------------------------------------------------------
function changeSemesterCredentials(semesterIndex) {
    //Rename and reassign all values after a deletion.
    for (var i = semesterIndex; i <= semesterCounter + 1; i++) {
        courseCounters[i] = courseCounters[i + 1];
        var newCourseButton = document.getElementById(
            "newCourseButton_s" + (i + 1)
        );
        if (newCourseButton) {
            newCourseButton.setAttribute(
                "onclick",
                "addCourseField(" + i + ")"
            );
            newCourseButton.setAttribute("id", "newCourseButton_s" + i);
        }
        //--------------------------------------------------
        var additionalFields = document.getElementById(
            "additionalFields_s" + (i + 1)
        );
        if (additionalFields) {
            additionalFields.setAttribute("id", "additionalFields_s" + i);
        }
        //--------------------------------------------------
        var deleteSemesterButton = document.getElementById(
            "deleteSemesterButton_s" + (i + 1)
        );
        if (deleteSemesterButton) {
            deleteSemesterButton.setAttribute(
                "onclick",
                "removeSemesterField(" + i + ")"
            );
            deleteSemesterButton.setAttribute(
                "id",
                "deleteSemesterButton_s" + i
            );
        }
        //--------------------------------------------------
        var semesterLabel = document.getElementById("semName" + (i + 1));
        if (semesterLabel) {
            semesterLabel.setAttribute("id", "semName" + i);
            if (semesterLabel != "Semester" + (i + 1)) {
                //dont replace semester name if it does not equal "Semester" + a numberj
                semesterLabel.setAttribute("value", "Semester " + i);
            }
        }
        //--------------------------------------------------

        var semesterContainer = document.getElementById(
            "semesterContainer_s" + (i + 1)
        );
        if (semesterContainer) {
            semesterContainer.setAttribute("id", "semesterContainer_s" + i);
        }
        //--------------------------------------------------

        for (var j = 1; j <= courseCounters[i]; j++) {
            //--------------------------------------------------
            var deleteCourseButton = document.getElementById(
                "deleteButton_s" + (i + 1) + "_c" + j
            );
            deleteCourseButton.setAttribute(
                "onclick",
                "removeCourseField(" + i + "," + j + ")"
            );
            deleteCourseButton.setAttribute(
                "id",
                "deleteButton_s" + i + "_c" + j
            );
            //--------------------------------------------------
            var courseNameInput = document.getElementById(
                "course-name_s" + (i + 1) + "_c" + j
            );

            courseNameInput.setAttribute(
                "oninput",
                "courseInputChanged(" + i + "," + j + ")"
            );
            courseNameInput.setAttribute("id", "course-name_s" + i + "_c" + j);

            //--------------------------------------------------
            var courseGradeSelect = document.getElementById(
                "course-grade_s" + (i + 1) + "_c" + j
            );

            courseGradeSelect.setAttribute(
                "id",
                "course-grade_s" + i + "_c" + j
            );
            //--------------------------------------------------
            var courseTypeSelect = document.getElementById(
                "class-type_s" + (i + 1) + "_c" + j
            );

            courseTypeSelect.setAttribute("id", "class-type_s" + i + "_c" + j);
            //--------------------------------------------------
            var courseContainer = document.getElementById(
                "course-container_s" + (i + 1) + "_c" + j
            );

            courseContainer.setAttribute(
                "id",
                "course-container_s" + i + "_c" + j
            );
            //--------------------------------------------------
        }
    }
}
//--------------------------------------------------------------------------------------------------------------------
function checkInputs() {
    //ensure no empty fields and highlight issues.
    var statusBool = true;
    var courseNames = document.querySelectorAll(".courseInput");

    for (var i = 0; i < courseNames.length; i++) {
        courseNames[i].classList.remove("highlightedCourse");

        if (courseNames[i].value === "") {
            courseNames[i].classList.add("highlightedCourse");
            statusBool = false;
        }
    }
    if (statusBool == true) {
        return { status: "valid request" };
    } else {
        return { status: "invalid request" };
    }
}
//--------------------------------------------------------------------------------------------------------------------
function addCourseField(semesterIndex) {
    if (courseCounters[semesterIndex] < courseLimit) {
        if (!courseCounters[semesterIndex]) {
            courseCounters[semesterIndex] = 1;
        } else {
            courseCounters[semesterIndex]++;
        }

        var courseContainer = document.createElement("div");
        courseContainer.classList.add(
            `course-container_s${semesterIndex}_c${courseCounters[semesterIndex]}`
        );
        courseContainer.innerHTML = `
                            <div id="course-container_s${semesterIndex}_c${courseCounters[semesterIndex]}" class="courseContainer">
                            
                                <div id="course-number_s${semesterIndex}_c${courseCounters[semesterIndex]}"
                                class = "courseNumberMarker noselect">${courseCounters[semesterIndex]} </div>
                            
                                <input type="text" id="course-name_s${semesterIndex}_c${courseCounters[semesterIndex]}" class="courseInput" placeholder="Course Name" oninput= "courseInputChanged(${semesterIndex}, ${courseCounters[semesterIndex]})">
                                <div class="classGrade noselect">
                                    <select id="course-grade_s${semesterIndex}_c${courseCounters[semesterIndex]}">
                                        <option value=4.0>A+</option>
                                        <option value=4.0>A</option>
                                        <option value=3.7>A-</option>
                                        <option value=3.3>B+</option>
                                        <option value=3.0>B</option>
                                        <option value=2.7>B-</option>
                                        <option value=2.3>C+</option>
                                        <option value=2.0>C</option>
                                        <option value=1.7>C-</option>
                                        <option value=1.3>D+</option>
                                        <option value=1.0>D</option>
                                        <option value=0.7>D-</option>
                                        <option value=0.0>F</option>
                                    </select>
                                </div>
                                <div class="classType noselect">
                                    <select id="class-type_s${semesterIndex}_c${courseCounters[semesterIndex]}">
                                        <option value="Normal">Normal</option>
                                        <option value="Honors">Honors</option>
                                        <option value="AP">AP</option>
                                        <option value="IB">IB</option>
                                        <option value="Dual Enrollment">Dual Enrollment</option>
                                    </select>
                                </div>

                                <button
                                id="deleteButton_s${semesterIndex}_c${courseCounters[semesterIndex]}"
                                class="deleteCourse noselect"
                                type="button"
                                onclick= "removeCourseField(${semesterIndex},${courseCounters[semesterIndex]})" >
                                &#10006
                                </button>

                            </div>
                        `;

        document
            .getElementById(`additionalFields_s${semesterIndex}`)
            .appendChild(courseContainer);
    }
}
//--------------------------------------------------------------------------------------------------------------------
function addSemesterField() {
    if (semesterCounter < semesterLimit) {
        semesterCounter++;

        if (!courseCounters[semesterCounter]) {
            courseCounters[semesterCounter] = 0;
        }

        if (semesterCounter > 1) {
            //remove the new semester button when a new semester is added to avoid duplicates
            var addSemesterButtonElement =
                document.getElementById("addSemesterButton");
            addSemesterButtonElement.remove();

            var calculateGPAButtonElement =
                document.getElementById("calculateGPAButton");
            calculateGPAButtonElement.remove();
        }
        var semesterContainer = document.createElement("div");
        var semesterId = `semesterContainer_s${semesterCounter}`;
        semesterContainer.id = semesterId;
        semesterContainer.classList.add("semesterContainer");
        semesterContainer.innerHTML = `

                            <div class="semesterLabelElements">

                            <input class="semesterLabel" type="text" id="semName${semesterCounter}" value="Semester ${semesterCounter}">


                             <button
                                id="deleteSemesterButton_s${semesterCounter}"
                                class="deleteSemester noselect"
                                type="button"
                                onclick= "removeSemesterField(${semesterCounter})" >
                               &#10006
                                </button>
                        </div>
                        <br>
                  
                            <br>
                          
                          
                            <div id="additionalFields_s${semesterCounter}">
                                <!--  Courses for this semester will be added here  -->
                            </div>
<br>
                            <div class="addElements">
                                <button
                                id="newCourseButton_s${semesterCounter}"
                                class="newCourse noselect"
                                type="button"
                                onclick="addCourseField(${semesterCounter})">
                                +Course
                                </button>
                            </div>
                            <br>
                            <div id="separateButtonsLine">
                                <hr>
                            </div>
                            <br>
                            <div class="bottomButtons">
                                 <button
                                id="addSemesterButton"
                                class="newSemester noselect"
                                type="button"
                                onclick="addSemesterField()">
                                +Semester
                            </button>
                            <button
                            id="calculateGPAButton"
                            class="calculateButton noselect"
                            type="button"
                            onclick="calculateGPA(event)">
                            Calculate
                        </button>
                        </div>
                        `;
        document.getElementById("courseForm").appendChild(semesterContainer);
        addCourseField(semesterCounter);
        addCourseField(semesterCounter);
        addCourseField(semesterCounter);
        addCourseField(semesterCounter);
    }
}
//--------------------------------------------------------------------------------------------------------------------
function changeImage(onHover) {
    //make help icon slightly darker when hovered over.
    var infoButtonPicture = document.getElementById("infoButtonPicture");
    if (onHover) {
        infoButtonPicture.src = "helpButtonImageHover.png";
    } else {
        infoButtonPicture.src = "helpButtonImage.png";
    }
}
//--------------------------------------------------------------------------------------------------------------------
function calculateGPA(event) {
    event.preventDefault();
    var result = checkInputs();
    if (result.status !== "invalid request") {
        lockScrolling("lock");
        document.querySelector(".resultsModal").style.display = "flex";

        var courseNamesArray = [];
        var courseGradesArray = [];
        var courseLetterGradesArray = [];
        var courseTypesArray = [];

        var semesterLabelInputs = document.querySelectorAll(".semesterLabel"); //node list
        var semesterNamesArray = [];

        semesterLabelInputs.forEach(function (semesterLabelInput, index) {
            semesterNamesArray.push(semesterLabelInput.value); // add sem name to array

            var semesterContainer = document.getElementById(
                `additionalFields_s${index + 1}`
            );
            //-----------------------------------------------------------------------------------------------------------------
            var courseNameInputs =
                semesterContainer.querySelectorAll(".courseInput"); //add all course names to the array

            courseNameInputs.forEach(function (courseNameInput) {
                courseNamesArray.push(courseNameInput.value);
            });
            //------------------------------------------------------------------------------------------------------------------
            var courseGradeInputs =
                semesterContainer.querySelectorAll(".classGrade select");

            courseGradeInputs.forEach(function (courseGradeInput) {
                var selectedText =
                    courseGradeInput.options[courseGradeInput.selectedIndex]
                        .text;

                courseLetterGradesArray.push(selectedText);

                var selectedOption =
                    courseGradeInput.options[courseGradeInput.selectedIndex];
                var selectedValue = selectedOption.value;
                courseGradesArray.push(selectedValue);
            });
            //------------------------------------------------------------------------------------------------------------------
            var courseTypeInputs =
                semesterContainer.querySelectorAll(".classType select");

            courseTypeInputs.forEach(function (courseTypeInput) {
                var selectedOption =
                    courseTypeInput.options[courseTypeInput.selectedIndex];
                var selectedValue = selectedOption.value;
                courseTypesArray.push(selectedValue);
            });
            //-------------------------------------------------------------------------------------------------------------------
        });

        var weightedArray = []; //0-5
        var unweightedArray = []; //0-4

        var totalWeighted = 0;
        var totalUnweighted = 0;

        var weightedGPA = 0;
        var unweightedGPA = 0;

        for (var i = 0; i < courseGradesArray.length; i++) {
            switch (courseTypesArray[i]) {
                case "Normal":
                    weightedArray.push(+courseGradesArray[i]);
                    unweightedArray.push(+courseGradesArray[i]);
                    break;

                case "Honors":
                    if (+courseGradesArray[i] > 0) {
                        //prevent F's from being inflated
                        weightedArray.push(+courseGradesArray[i] + 0.5);
                        unweightedArray.push(+courseGradesArray[i]);
                        break;
                    } else {
                        weightedArray.push(+courseGradesArray[i]);
                        unweightedArray.push(+courseGradesArray[i]);
                        break;
                    }
                    break;
                case "AP":
                case "IB":
                case "Dual Enrollment":
                    if (+courseGradesArray[i] > 0) {
                        weightedArray.push(+courseGradesArray[i] + 1.0);
                        unweightedArray.push(+courseGradesArray[i]);
                        break;
                    } else {
                        weightedArray.push(+courseGradesArray[i]);
                        unweightedArray.push(+courseGradesArray[i]);
                        break;
                    }
            }
        }

        for (var j = 0; j < weightedArray.length; j++) {
            //add up gpas
            totalWeighted += weightedArray[j];
            totalUnweighted += unweightedArray[j];
        }

        weightedGPA = totalWeighted / weightedArray.length; //average the total
        unweightedGPA = totalUnweighted / unweightedArray.length;

        weightedGPA = +weightedGPA.toFixed(2); //round to the hundredth
        unweightedGPA = +unweightedGPA.toFixed(2);

        var currentCourseNum = 0;
        var semesterUnweightedArray = [];
        var semesterWeightedArray = [];

        var totalSemesterWeightedArray = [];
        var totalSemesterUnweightedArray = [];

        for (var k = 1; k < semesterNamesArray.length + 1; k++) {
            //grab semester gpas
            var totalSemesterWeighted = 0;
            var totalSemesterUnweighted = 0;
            var semesterCoursesNumber = courseCounters[k];

            for (
                var g = currentCourseNum;
                g < semesterCoursesNumber + currentCourseNum;
                g++
            ) {
                totalSemesterUnweighted += unweightedArray[g];
                totalSemesterWeighted += weightedArray[g];
            }

            totalSemesterWeightedArray.push(totalSemesterWeighted);
            totalSemesterUnweightedArray.push(totalSemesterUnweighted);

            currentCourseNum += semesterCoursesNumber;
            semesterUnweightedArray.push(
                +(totalSemesterUnweighted / semesterCoursesNumber)
            );
            semesterWeightedArray.push(
                +(totalSemesterWeighted / semesterCoursesNumber)
            );
        }

        var resultsModalContent = document.createElement("div");
        var resultsModalId = `resultsModalContentid`;
        resultsModalContent.id = resultsModalId;
        resultsModalContent.classList.add(`resultsModalContent`);

        resultsModalContent.innerHTML = `
                <div id="closeResultModal" class="closeModal noselect">+</div>
                <br>
                <h1> W:${weightedGPA} // UW:${unweightedGPA} </h1>
              
              <div>
                <canvas id= "cumulativeGPAChart" alt"Cumulative GPA Chart"></canvas>
                </div>
            
                <h2>Semester GPA's</h2>
                </div>
                  `;
        document
            .getElementById("resultsModal")
            .appendChild(resultsModalContent);

        var semesterTableHTML =
            "<table> <th>Semester</th> <th>W GPA</th> <th>UW GPA</th>";

        for (var p = 0; p < semesterNamesArray.length; p++) {
            semesterTableHTML += `<tr> <td>${
                semesterNamesArray[p]
            }</td> <td>${semesterWeightedArray[p].toFixed(
                2
            )}</td>  <td>${semesterUnweightedArray[p].toFixed(2)}</td></tr>`;
        }

        semesterTableHTML += "</table>";
        resultsModalContent.innerHTML += semesterTableHTML;
        document
            .querySelector(".resultsModal")
            .appendChild(resultsModalContent);
        //----------------------------------------------------------------------------------
        var courseTableHTML =
            "<h2>Course Report</h2><table><th>Course Name</th><th>Type</th><th>Grade</th><th>W Credits</th><th>UW Credits</th>";
        for (var w = 0; w < courseNamesArray.length; w++) {
            courseTableHTML += `<tr> <td>${courseNamesArray[w]}</td> <td>${courseTypesArray[w]}</td> <td>${courseLetterGradesArray[w]}</td> <td>${weightedArray[w]}</td> <td>${unweightedArray[w]}</td></tr>`;
        }
        courseTableHTML += "</table>";
        resultsModalContent.innerHTML += courseTableHTML;
        document
            .querySelector(".resultsModal")
            .appendChild(resultsModalContent);

        var totalCumulativeWeighted = 0;
        var totalCumulativeUnweighted = 0;

        var totalPreviousCourses = 0;

        var cumulativeUnweightedArray = [];
        var cumulativeWeightedArray = [];

        for (var z = 0; z < semesterNamesArray.length; z++) {
            totalPreviousCourses += courseCounters[z + 1];

            totalCumulativeWeighted += totalSemesterWeightedArray[z];
            totalCumulativeUnweighted += totalSemesterUnweightedArray[z];

            cumulativeWeightedArray.push(
                (totalCumulativeWeighted / totalPreviousCourses).toFixed(2)
            );

            cumulativeUnweightedArray.push(
                (totalCumulativeUnweighted / totalPreviousCourses).toFixed(2)
            );
        }

        const ctx = document.getElementById("cumulativeGPAChart");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: semesterNamesArray,

                datasets: [
                    {
                        label: "Cumulative Unweighted GPA",
                        data: cumulativeUnweightedArray,

                        borderWidth: 1
                    },
                    {
                        label: "Cumulative Weighted GPA",
                        data: cumulativeWeightedArray,

                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    //-----------------------------------------------------------------------------------------------------------------
    document
        .getElementById("closeResultModal")
        .addEventListener("click", function () {
            document.querySelector(".resultsModal").style.display = "none";
            var deleteOldModalContent = document.getElementById(
                "resultsModalContentid"
            ); //delete old modal content
            deleteOldModalContent.remove();
            lockScrolling("unlock");
        });
}
//--------------------------------------------------------------------------------------------------------------------
function courseInputChanged(semesterIndex, courseIndex) {
    // semesterIndex, courseIndex
    var currentCourseInput = document.getElementById(
        "course-name_s" + semesterIndex + "_c" + courseIndex
    );
    if (
        currentCourseInput.value != "" &&
        currentCourseInput.classList.contains("highlightedCourse")
    ) {
        currentCourseInput.classList.remove("highlightedCourse");
    }
}
//--------------------------------------------------------------------------------------------------------------------
function lockScrolling(lockStatus) {
    if (lockStatus == "lock") {
        window.scrollTo(15, 0); //move user up
        document.querySelector("body").style.overflow = "hidden"; //stop scrolling
        document.querySelector("body").style.height = "100%";
        document.querySelector("body").style.width = "100%";
    } else if (lockStatus == "unlock") {
        document.querySelector("body").style.overflowY = "auto"; //allow scrolling
        document.querySelector("body").style.overflowX = "hidden"; //allow scrolling
        document.querySelector("body").style.height = "auto";
        document.querySelector("body").style.width = "100%";
    }
}
//--------------------------------------------------------------------------------------------------------------------
function infoButtonClick() {
    const infoQuestions = document.querySelectorAll(".infoQuestion");
    infoQuestions.forEach(function (infoQuestion) {
        infoQuestion.addEventListener("click", function () {
            infoQuestion.classList.toggle("open");
        });
    });
    document.querySelector(".infoModal").style.display = "flex";
    lockScrolling("lock");
}
//--------------------------------------------------------------------------------------------------------------------
function contactButtonClick() {
    const contactModal = document.querySelector(".contactModal");
    contactModal.style.display = "flex";
    lockScrolling("lock");
}
