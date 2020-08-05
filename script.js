//declare global variables
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    ///etc.
];
var timerEl = document.querySelector("#timer");
var secondsLeft = 10;
var scoreCard = document.querySelector("#endOfQuiz");
var questionBox = document.querySelector("#questionBox");
var daButton = document.querySelector("#startQuiz");
var quizHead = document.querySelector("#quiz-header");
var theWhopper = document.querySelector("#jumbotron");

//button event listener
daButton.addEventListener("click", function () {
    beginTimer(); //begins timer when clicked
    quizHead.classList.remove("d-none");
    questionBox.classList.remove("d-none");
    theWhopper.classList.add("d-none");
});

//make the timer 
function beginTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            dispScores();
        }

    }, 1000);
};

//display score board
function dispScores() {
    scoreCard.classList.remove("d-none");

};