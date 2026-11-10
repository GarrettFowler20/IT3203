




const quizQuestions = 
[
    "What is the primary function of a web server?",
    "What is cloud computing?",
    "What is an IP address used for?",
    "What does HTTP stand for?",
    "Which of these are types of threats against web servers? (Select all that apply)",
    "Which of these are ways to secure a web server? (Select all that apply)",
    "Fill in the blank: The process of converting data into a coded format to prevent unauthorized access is called ________.",
    "Fill in the blank: ________ is when a server temporarily stores web content, so it can be delivered faster to users.",
    "True or False: Static web servers generate personalized web pages on the fly based on user requests.",
    "True or False: Port 80 is the standard HTTP web traffic port."
]

const quizAnswers =
[
    ["To create programs for websites", "To store and deliver web pages", "To protect computers from viruses", "To increase the processing speed of a computer"], // Multi choice one answer
    ["A type of technology that protects against malaware", "A method of storing files on a personal computer", "To host files, storage, and other software with the use of remote data centers", "Servers that are all connected together with physical cables"], // Multi choice one answer
    ["To Identify a specific device on a network", "To display webpages", "To organize outgoing files from a web server", "To encrypt website information"], // Multi choice one answer
    ["Host Transfer Protocol", "Hypertext Technology Protocol", "Hypertext Transfer Protocol", "Hyperlink Transfer Protocol"], // Multi choice one answer
    ["User Authentication", "Malware", "DDoS Attack", "Fire Wall"], // Multi choice multi answer
    ["Firewall", "Malware", "Authentication", "Unauthorized Access"], // Multi choice multi answer
    ["Encryption"], // Fill in blank
    ["Caching"], // Fill in blank
    ["True", "False"], // True or False
    ["True", "False"] // True or False
]

const correctAnswers = 
[
    "To store and deliver web pages",
    "To host files, storage, and other software with the use of remote data centers",
    "To Identify a specific device on a network",
    "Hypertext Transfer Protocol",
    ["Malware", "DDoS Attack"],
    ["Firewall", "Authentication"],
    "Encryption",
    "Caching",
    "False",
    "True"
];

const questionTypes = [
    "multiple",
    "multiple",
    "multiple",
    "multiple",
    "checkbox",
    "checkbox",
    "text",
    "text",
    "multiple",
    "multiple"
];



function displayQuiz() {

    for (let i = 0; i < quizQuestions.length; i++) {


        // Uses the quiz div to create the questions with the arrays of the questions and answers above.
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        questionDiv.id = "question" + i;

        let questionNumber = document.createElement("h2");
        questionNumber.textContent = "Question " + (i + 1);

        questionDiv.appendChild(questionNumber);

        let questionTitle = document.createElement("h3");
        questionTitle.textContent = quizQuestions[i];

        questionDiv.appendChild(questionTitle);


        // For the fill in blank questions
        if (questionTypes[i] === "text") {

            let input = document.createElement("input");

            input.type = "text";
            input.name = "question" + i;

            questionDiv.appendChild(input);
        }

        // Multiple choice and checkboxes
        else {

            for (let j = 0; j < quizAnswers[i].length; j++) {

                let label = document.createElement("label");
                let input = document.createElement("input");

                if (questionTypes[i] === "checkbox") 
                {
                    input.type = "checkbox";
                }
                else 
                {
                    input.type = "radio";
                }

                input.name = "question" + i;
                input.value = quizAnswers[i][j];

                label.appendChild(input);

                label.appendChild(
                    document.createTextNode(quizAnswers[i][j])
                );

                questionDiv.appendChild(label);
            }
        }

        quizContainer.appendChild(questionDiv);
    }
}

//displayQuiz();
document.getElementById("startQuiz").addEventListener("click", startQuiz);

function startQuiz() 
{
    displayQuiz();
    document.getElementById("startQuiz").style.display = "none";
    document.getElementById("submitQuiz").style.display = "block";

    document.getElementById("quizInformation").style.display = "none";

    // Start the timer
    startTimer();
}


let timer;
let timeLeft = 600; // 10 minutes in seconds

function startTimer()
{
    const timerDisplay = document.getElementById("timer");
    timerDisplay.style.display = "block";

    // quiz timer
    timer = setInterval(function() 
    {

        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


        // Ends the quiz when the time reaches 0
        if (timeLeft <= 0) 
        {
            submitQuiz();
        }

    }, 1000);


}

function stopTimer() 
{

    // stop the timer, it resets when the quiz is reset
    clearInterval(timer);
    console.log(timeLeft);

    // hide timer when it ends
    document.getElementById("timer").style.display = "none";
}

const userAnswers = [];



function submitQuiz() 
{
    userAnswers.length = 0;

    for (let i = 0; i < 10; i++) 
    {

        let answers = document.querySelectorAll('input[name="question' + i + '"]');

        answers.forEach(function(input) 
        {
            // Adds the answers to the userAnsers array, to then be checked

            if (input.type === "text") 
            {
                userAnswers.push([i, input.value]);
            }
            else if (input.checked) 
            {
                userAnswers.push([i, input.value]);
            }

        });

    }




    // Checks answers and displays reseat button
    checkAnswers(); 
    document.getElementById("submitQuiz").style.display = "none";
    document.getElementById("resetQuiz").style.display = "block";

     for (let i = 0; i < quizQuestions.length; i++) 
    {
       
        let questionAnswerCheck = document.createElement("h1");
        questionAnswerCheck.textContent = userAnswersChecked[i];


        // makes it so its at the top of the question
        document.getElementById("question" + i).insertBefore(questionAnswerCheck, document.getElementById("question" + i).firstChild);


        // displays of the answer was incorrect
        if (userAnswersChecked[i] === "Incorrect") 
        {
            let correctAnswerDisplay = document.createElement("p");
            correctAnswerDisplay.textContent = "Correct Answer: " + (Array.isArray(correctAnswers[i]) ? correctAnswers[i].join(", ") : correctAnswers[i]);
            correctAnswerDisplay.style.fontWeight = "bold";
            document.getElementById("question" + i).appendChild(correctAnswerDisplay);
        }

        //  displays of the answer was correct and changes the color of the text to green or red, if right ot wrong
        if (userAnswersChecked[i] === "Correct") 
        {
            document.getElementById("question" + i).firstChild.style.color = "green";
        }
        else 
        {
            document.getElementById("question" + i).firstChild.style.color = "red";
        }
    }

    stopTimer();

    let timeSpentDisplay = document.createElement("h2");

    let timeSpent = 600 - timeLeft;

    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;


    // Div element to hold the results; score and time spent
    let quizResults = document.createElement("div");
    quizResults.id = "quizResults";

    let quizResultsTitle = document.createElement("h1");
    quizResultsTitle.textContent = "Quiz Results"

    // Adds it to the top of the quiz's main container's first child, probaly could of dont this better
    document.getElementById("quizContainer").insertBefore(quizResults, document.getElementById("quizContainer").firstChild);

    document.getElementById("quizResults").appendChild(quizResultsTitle);

    document.getElementById("quizResults").appendChild(document.createElement("hr"));




    // Displays the final score at the top
    let scoreDisplay = document.createElement("h2");
    scoreDisplay.textContent = "Final Score: " + (score/correctAnswers.length) * 100 + "%" + " -- " + getGradeLetter((score/correctAnswers.length) * 100);
    //document.getElementById("quizContainer").insertBefore(scoreDisplay, document.getElementById("quizContainer").firstChild);
    document.getElementById("quizResults").appendChild(scoreDisplay);

    console.log(getGradeLetter((score/correctAnswers.length)));

    timeSpentDisplay.textContent = `Time Spent: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    //document.getElementById("quizContainer").insertBefore(timeSpentDisplay, document.getElementById("quizContainer").firstChild);
    document.getElementById("quizResults").appendChild(timeSpentDisplay);


    // Reset the timer
    timeLeft = 600;
    document.getElementById("timer").textContent = "Time Remaining: 10:00";


    // Go back to the top of page after submitting the quiz
    window.scrollTo(0, 0);
}

// When the submit button is pressed
document.getElementById("quizForm").addEventListener("submit", function(event) 
{
    event.preventDefault();
    submitQuiz();
});


// Adds the letter grade next to the score percentage

function getGradeLetter(gradePercentage)
{
    if(gradePercentage >= 90)
    {
        return "A";
    } else if(gradePercentage >= 80)
    {
        return "B";
    } else if(gradePercentage >= 70)
    {
        return "C";
    } else if(gradePercentage >= 60)
    {
        return "D";
    } else {
        return "F";
    }
}

const userAnswersChecked = [];

// To keep track of the score
let score = 0;
function checkAnswers()
{
    
    for (let i = 0; i < correctAnswers.length; i++) 
    {

        let answers = [];

        for (let j = 0; j < userAnswers.length; j++) 
        { // Cleans up the userAnswers to just have the answers

            if (userAnswers[j][0] === i)
            {
                answers.push(userAnswers[j][1]);
            }

        }

        // Multi choice answer check
        if (Array.isArray(correctAnswers[i])) 
        {

            if (answers.length === correctAnswers[i].length &&
                correctAnswers[i].every(answer => answers.includes(answer))) 
            {

                console.log("Question " + (i + 1) + ": Correct");
                score++;
                userAnswersChecked.push("Correct");
            }
            else 
            {
                console.log("Question " + (i + 1) + ": Incorrect");
                userAnswersChecked.push("Incorrect");
            }

        } 

        // Single choice answer check, includes the text and t/f
        else 
    {
            // For the text input fill in the blank questions, cleans up the text so it could be either capitalized or not
            if(questionTypes[i] == "text")
            {
                if(answers.length === 1)
                {
                    let cleanedUpTextAnswer = answers[0];
                    cleanedUpTextAnswer = cleanedUpTextAnswer.charAt(0).toUpperCase() + cleanedUpTextAnswer.slice(1);
                    if (cleanedUpTextAnswer === correctAnswers[i]) 
                    {
                        console.log("Question " + (i + 1) + ": Correct");
                        score++;
                        userAnswersChecked.push("Correct");
                    }
                    else 
                    {
                        console.log("Question " + (i + 1) + ": Incorrect");
                        userAnswersChecked.push("Incorrect");
                    }
                }
            } else // Normal check for the rest of the multiple choice
            {
                if (answers.length === 1 && answers[0] === correctAnswers[i]) 
                {

                    console.log("Question " + (i + 1) + ": Correct");
                    score++;
                    userAnswersChecked.push("Correct");
                }
                else 
                {
                    console.log("Question " + (i + 1) + ": Incorrect");
                    userAnswersChecked.push("Incorrect");
                }
            }
        }
    }

    console.log(score);


};

// for the reset button
document.getElementById("resetQuiz").addEventListener("click", resetQuiz);

function resetQuiz() 
{
    // resets all of the quiz divs
    document.getElementById("quizContainer").innerHTML = "";
    // clears the arrays
    userAnswers.length = 0;
    userAnswersChecked.length = 0;
    // reset the score
    score = 0;

    // takes away the reset button and displays the start button, also re adds the quiz info
    document.getElementById("resetQuiz").style.display = "none";
    document.getElementById("startQuiz").style.display = "block";

    document.getElementById("quizInformation").style.display = "block";

}

























