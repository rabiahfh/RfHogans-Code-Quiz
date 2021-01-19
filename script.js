// starting variables
var runningQuestionIndex = 0;
var start = document.getElementById("start-game");
var scoreCount = 0;
var secondsLeft;
var penalty = 10;
var timer = document.getElementById("timer");
var questionsDiv = document.getElementById("questionsDiv");
var runningQuestionIndex = 0;
var ulCreate = document.createElement("ul");
var totalSeconds = 300;
var elapsedSeconds = 0;

// game questions

var questions = [
    {
        question: "Commonly used data types DO NOT include?",
        correctAnswer: "alerts",
        choices: ["strings", "booleans", "alerts", "numbers"]
    },

    {
        question: "What does the symbol <> surround in HTML",
        correctAnswer: "a tag",
        choices: ["a tag", "a class", "an id", "a name"]

    },

    {
        question: "How do you reference a class in HTML through javascript",
        correctAnswer: ".class",
        choices: ["#class", ".class", "$class", "class"]

    },
];


start.addEventListener("click", function () {
    var start = document.getElementById("start-game");
    if (start.style.display === "none") {
        start.style.display = "block";
    } else {
        start.style.display = "none";

    }
    var heading = document.querySelector(".code-heading");
    if (heading.style.display === "none") {
        heading.style.display = "block";
    } else {
        heading.style.display = "none";

    }
    var instructions = document.querySelector(".instructions");
    if (instructions.style.display === "none") {
        instructions.style.display = "block";
    } else {
        instructions.style.display = "none";

    }
var startQuestions=document.getElementById("questionsDiv")
startQuestions.classList.remove("hide")
});
// function to render question and choices to page: 

function render(runningQuestionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[runningQuestionIndex].question;
        var userChoices = questions[runningQuestionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("button");
        listItem.textContent = newItem;
        listItem.classList.add("choices");
        questionsDiv.appendChild(ulCreate);
        var breakItem = document.createElement("br");
        questionsDiv.appendChild(breakItem);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });
}

// Event to compare choices with answer
function compare(event) {
    var element = event.target;
    if (element.matches("button")) {
        var createDiv = document.createElement("div");

        createDiv.setAttribute("id", "createDiv");
        // Correct condition
        if (element.textContent == questions[runningQuestionIndex].correctAnswer) {
            scoreCount++;
            createDiv.innerHTML = "Correct!";
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.innerHTML = "Wrong!";
        }
    }
    // Question Index determines number question user is on
    runningQuestionIndex++;

    if (runningQuestionIndex >= questions.length) {
        var endQuestions=document.getElementById("highscore-section")
        endQuestions.classList.remove("hide")
        questionsDiv.classList.add("hide")
        createDiv.textContent = "End of quiz!" + " " + "You got  " + scoreCount + "/" + questions.length + " Correct!";
    } else {
        render(runningQuestionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
var interval;
var renderTimer = function () {
    // put time on page
    document.querySelector("#timer").textContent = totalSeconds - elapsedSeconds;
};
var nextSecond = function () {
    // subtract time
    totalSeconds--;
    renderTimer();
    // stop the timer when time runs out
    if (totalSeconds <= 0) {
        clearInterval(interval);
    }
};
var subTenSeconds = function () {
    // sub.time
    totalSeconds -= 10;
    renderTimer();
    // stop the timer when time runs out
    if (totalSeconds <= 0) {
        clearInterval(interval);
    }
};
var start = function (event) {
    console.log(event.target);
    // reset time

    // clear any intervals that may already be there
    // fixes time jumping on my button (only want the intervals that I need for my timer)
    if (interval) {
        clearInterval(interval);
    }

    renderTimer();
    // start my timers
    interval = setInterval(nextSecond, 1000);
};
// add something to listen for clicks
document.querySelector("button").addEventListener("click", start);
render(runningQuestionIndex);
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";

    questionsDiv.appendChild(createH1);
}
// Paragraph
var createP = document.createElement("p");
createP.setAttribute("id", "createP");

questionsDiv.appendChild(createP);

// Calculates time remaining and replaces it with score
var timeRemaining = secondsLeft;

if (secondsLeft >= 0) {

    var createP2 = document.createElement("p");
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsDiv.appendChild(createP2);
}

// Event listener to capture initials and local storage for initials and score
document.getElementById("submit-button").addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

        console.log("No value entered!");
} 
else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        };
        // console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        // Travels to final page

        window.location.replace("./to-high-scores.html");

    }
    
});
