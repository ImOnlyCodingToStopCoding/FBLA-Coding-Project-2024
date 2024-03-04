<!DOCTYPE html>
<html lang="en-US">
    <head>
        <title>minimalGPA.com</title>
               <link rel="icon" href="FunApplets.Logo.png"
   type="image/x-icon">
        <meta name="description" content="GPA calculator for highschoolers" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
            rel="stylesheet"
            media="screen and (min-width: 555px) and (max-width: 680px)"
            href="minimalGPAComputer(Minimized)_v0.0.2.css" />
         <link
            rel="stylesheet"
            media="screen and (min-width: 681px)"
            href="minimalGPAComputer_v0.0.2.css" />
        <link
            rel="stylesheet"
            media="screen and (max-width: 554px)"
            href="minimalGPAMobile_v0.0.2.css" />
    </head>

    <body>
        <header class="header">
            <div class="branding">
                <div class="logo">
                    <a href="index.html">
                        <img
                            src="FunApplets.Logo.png"
                            width="70"
                            height="70"
                            alt="Fun Applets Logo Image & link to home"
                            id="logoImage" />
                    </a>
                </div>
                <div class="logoText">minimal gpa</div>
            </div>

            <div class="topLeftContent">
                <div onclick="contactButtonClick()" class="contactUsText">
                    Contact Us
                </div>
                <div onclick="infoButtonClick()" class="helpText">Help</div>
            </div>
        </header>

        <hr />
        <br />

        <div class="resultsModal" id="resultsModal"></div>

        <div class="infoModal" id="infoModal">
            <div class="infoModalContent">
                <div id="closeInfoModal" class="closeModal">+</div>

                <h1>Help</h1>
                <hr />

                <ul>
                    <li>
                        <div class="infoQuestion">
                            <span>What is GPA?</span>
                            <span>+</span>
                        </div>
                        <div class="infoAnswer">
                            <span>
                                GPA stands for Grade Point Average, representing
                                your overall academic performance on a scale.
                            </span>
                        </div>
                    </li>

                    <li>
                        <div class="infoQuestion">
                            <span>How do we calculate GPA?</span>
                            <span>+</span>
                        </div>
                        <div class="infoAnswer">
                            <span>
                                We convert letter grades to numbers (A=4.0,
                                B=3.0, etc.) and average them to get your GPA.
                                If you input AP or Honors classes we add the
                                respective extra weight (A=5.0 or A=4.5).
                            </span>
                        </div>
                    </li>

                    <li>
                        <div class="infoQuestion">
                            <span>Instructions</span>
                            <span>+</span>
                        </div>
                        <div class="infoAnswer">
                            <span>
                                Input your class name e.g. "Biology 101", class
                                grade e.g. "A-", and class type e.g. "Honors".
                                Use the red delete buttons to remove courses or
                                semesters or add new courses or semesters with
                                the add buttons.
                            </span>
                        </div>
                    </li>

                    <li>
                        <div class="infoQuestion">
                            <span>Other FAQ</span>
                            <span>+</span>
                        </div>
                        <div class="infoAnswer">
                            <span>
                                <ol>
                                    <li>
                                        What is the difference between weighted
                                        GPA (W) and unweighted GPA (UW)?
                                        <br />

                                        Unweighted GPA is the average of your
                                        classes without considering class types.
                                        Weighted GPA gives higher credit to
                                        class types like AP or Honors, making
                                        your weighted GPA higher.
                                    </li>

                                    <br />

                                    <li>
                                        What is cumulative GPA?
                                        <br />

                                        Cumulative GPA is the average of all the
                                        classes up to a point in time. For
                                        example semester one's cumulative GPA is
                                        just semester one, but semester two's
                                        gpa is semester one and semester two.
                                    </li>

                                    <br />

                                    <li>
                                        How can I raise my GPA?
                                        <br />

                                        Take harder classes that are weighted
                                        higher and get better grades in the
                                        classes you take!
                                    </li>

                                    <br />

                                    <li>
                                        What are AP, Honors, IB, and Dual
                                        Enrollment classes?
                                        <br />

                                        Many high schools offer students the
                                        opportunity to take more difficult
                                        classes in return for a higher weighted
                                        credit. AB, IB, and Dual Enrollment are
                                        college level classes, while honors are
                                        more difficult highschool classes. *
                                        This may vary between school.
                                    </li>

                                    <br />

                                    <li>
                                        Why can't I delete all of the courses in
                                        the semester, or the only semester
                                        remaining?
                                        <br />

                                        We cannot support the deletion of the
                                        last semester and or course in each
                                        semester due to how we process addition
                                        and deletion requests. We apologize if
                                        this causes difficulty.
                                    </li>
                                </ol>
                            </span>
                        </div>
                    </li>

                    <li>
                        <div class="infoQuestion">
                            <span>Version History</span>
                            <span>+</span>
                        </div>
                        <div class="infoAnswer">
                            <span>
                                Version History:
                                <br />
                                <br />
                                v0.0.1 (1/26/24)
                                <br />
                                -fixed css styling bug for select menus
                                <br />
                                -fixed out of order semester course deletion bug
                                <br />
                                -added version history in help menu
                                <br />
                                <br />
                                v0.0.0 (1/24/24)
                                <br />
                                -orginal release
                            </span>
                        </div>
                    </li>

                    <li>
                        <div class="infoQuestion">
                            <span>Contact Us</span>
                            <span>+</span>
                        </div>
                        <div class="infoAnswer">
                            <span>
                                Reach out to:
                                <br />

                                <a href="https://twitter.com/IanL_dev">
                                    @IanL_dev
                                </a>
                                <br />
                                simplylochapps@gmail.com
                            </span>
                        </div>
                    </li>
                </ul>
                <span id="currentVersionNumber"> Version 0.0.1 </span>
            </div>
        </div>
        
        
        <div class="infoModal" id="infoModal">
            <div class="contactModalContent">
                <div id="closeContactModal" class="closeModal">+</div>

                <h1>Contact Us</h1>
                <hr />

               
                
            </div>
        </div>
        
        

        <form id="courseForm"></form>

        <script src="minimalGPA_v0.0.2.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </body>
</html>


