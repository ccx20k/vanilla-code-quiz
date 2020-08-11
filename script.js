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
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    }
    ///etc.
];
var timerEl = document.querySelector("#timer");
var secondsLeft = 10;
var scoreCard = document.querySelector("#endOfQuiz");
var questionBox = document.querySelector("#questionBox");
var daButton = document.querySelector("#startQuiz");
var quizHead = document.querySelector("#quiz-header");
var theWhopper = document.querySelector("#jumbotron");
var questIndex = 0;
var wrongAns = document.querySelector("#wrong");
var rightAns = document.querySelector("#correct");
var timerInterval;
var score = 0;
var submitCreds = document.querySelector('#submitCreds')
var scoreStore = [];


//button event listener
daButton.addEventListener("click", function () {
    beginTimer(); //begins timer when clicked
    renderQuestions();
    quizHead.classList.remove("d-none");//shows the quiz header 
    questionBox.classList.remove("d-none");//shows the question box
    theWhopper.classList.add("d-none");//takes away the jumbotron
});

//start the timer with functionality
function beginTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            dispScores();//shows the score card
        }
    }, 1000);
};

//render questions
function renderQuestions() {
    //target the qNumber, questionTitle and answers list in 3 vars
    var qNumer = document.querySelector('#qNumber');
    var questTitle = document.querySelector('#questionTitle');
    var answers = document.querySelector('#answers');
    //get the current question based on the index's
    var currentQuest = questions[questIndex];
    answers.innerHTML = "";
    //populate html 
    //qNumber 
    qNumer.textContent = questIndex + 1;
    questTitle.textContent = currentQuest.title;
    //questionTitle
    //answers
    //make a loop that makes a li button for every choice in the object 
    for (var i = 0; i < currentQuest.choices.length; i++) {
        var button = document.createElement('button')
        button.setAttribute('type', "button")
        button.setAttribute('class', "btn btn-primary btn-lg")
        button.textContent = currentQuest.choices[i];
        button.addEventListener('click', function (event) {
            if (event.target.textContent === currentQuest.answer) {
                rightAns.classList.remove('d-none');
                setTimeout(() => {
                    rightAns.classList.add('d-none');
                }, 1000);
            } else {
                secondsLeft -= 10;
                wrongAns.classList.remove('d-none');
                setTimeout(() => {
                    wrongAns.classList.add('d-none');
                }, 1000);
            }
            if (questIndex === questions.length - 1) {
                clearInterval(timerInterval);
                dispScores();
            } else {
                questIndex++;
                renderQuestions();
            }
            if (event.target.textContent === currentQuest.answer) {
                score += 100;
            }
        })
        answers.appendChild(button);
    }

}

//display score board
function dispScores() {
    scoreCard.classList.remove("d-none");
    questionBox.classList.add("d-none");
    console.log(score);
};

//submit button functionality
submitCreds.addEventListener("click", function (event) {
    event.preventDefault();
    //if the player does not enter their initials return early
    var playerInits = document.querySelector('#playerInitials');
    var playerText = playerInits.value.trim();
        if (playerText.value === "") {
            return;
        }
    console.log("score :::", score);
    //store the current score and the user initials 
    var table = document.querySelector('#scoreTable');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    console.log("playerText ::: ", playerText);
    var highscoreObject = {
        score: score,
        initials: playerText
    }
    scoreStore.push(highscoreObject);
    localStorage.setItem('initialStore', JSON.stringify(scoreStore));    
        
    //add new th list items to the score card
    for (var i = 0; i < scoreStore.length; i++) {
        var scoreIndex = scoreStore[i];
    
        // var newRow = document.querySelector('tbody');
        // var newData = tbody.createElement('th');
        // var renderNewData = appendChild(newData);        
        // renderNewData.children[0].textContent = scoreIndex;
        
        var tr = table.insertRow(i);
        var tdInitials = tr.insertCell(0);
        tdInitials.textContent = scoreIndex.initials;
        var tdScore = tr.insertCell(1);
        tdScore.textContent = scoreIndex.score;


      } 
      
      playerInitials.value = "";

        // renderScores();

    

});



