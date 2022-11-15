// When I click start button,
// Then a timer starts,
// Then a question is presented.
// When a question is answered,
// Then another question is presented.
// When a question is answered incorrectly,
// Then time is subtracted from the clock.
// When all questions are answered OR
// When the timer reaches 0
// Then the game is over
// When the game is done,
// Then score is displayed,
// Then initials are entered,
// And both are then saved.

let startEl = document.querySelector(".start");
let quizEl = document.querySelector(".quiz");
let resultEl = document.querySelector(".results")
let finalScore = document.querySelector(".final-score");
let scoreEl = document.querySelector(".scoreboard");
let scoreList = document.querySelector(".score-list");

let timerTextEl = document.querySelector(".timer-count");

let startButton = document.querySelector("#start-button");
let againButton = document.querySelector("#again-button");

let submitButton = document.querySelector("#submit-button");
let inputForm = document.querySelector("#name-form");
let inputFormName = document.querySelector("#name-input");

let qHeader = document.querySelector("#answer-header");
let qChoice = document.querySelector("#answer-section");

let nameAndScore = [];
let scoreReduce = 5; // brutal!

// initial variables
let isWin = false;
const secondsInit = 30
let secondsLeft = secondsInit;
let qIndex = 0;

function init() {
    isWin = false;
    qIndex = 0;
    secondsLeft = secondsInit;
    timerTextEl.textContent = secondsInit + " seconds left";
    renderScore()
}



// QUESTIONS -----------------------------------------------------------------------------
let q1 = {
  title: "Which set of symbols are used to comment a single line in JavaScript?",
  ans: ["<!-- -->", "//", "/* */"],
  cAns: "//"
};
let q2 = {
  title: 'Let array = ["A","B","C"]. What is array[1]?',
  ans: ['["A"]','["B"]','["C"]'],
  cAns: '["B"]'
};
let q3 = {
  title: "An object property has two parts. What are they called?",
  ans: ["key-value pairs", "method-function calls", "global-local scopes"],
  cAns: "key-value pairs"
};

let allQs = [q1,q2,q3]; //just monochoice questions here

// QUESTIONS -----------------------------------------------------------------------------

function startTimer() {
    let timerInterval = setInterval(function() {
        if (secondsLeft === 0) { // If finished,
        clearInterval(timerInterval);
        endQuiz();
        
        } else if (secondsLeft === 2) {
        secondsLeft--; // a little hacky, but if 2, makes it 1, then singularizes the verb
        timerTextEl.textContent = secondsLeft + " second left";

        } else if (isWin === true) { // if already won
            clearInterval(timerInterval);
            timerTextEl.textContent = "0";
        
        } else { // If not finished,
        secondsLeft--;
        timerTextEl.textContent = secondsLeft + " seconds left";
        }
    }, 1000);
}



// Loads a question from the question array along with page formatting.
function renderQuestion(qIndex) {
    qHeader.textContent = allQs[qIndex].title; //text content is the title of the qIndex obj
    qChoice.innerHTML = '';

    // this is making the list of questions. it looks complicated but its not supposed to do much.
    for (var j = 0; j < allQs[qIndex].ans.length; j++) {
        let li = document.createElement("li"); //make list element for each item the in allQs[i].ans array
        let button = document.createElement("button"); //makes clickable answer

        let ansLine = allQs[qIndex].ans[j]; //individual answer lines
        button.textContent = ansLine; //giving button text content instead of list itself
        button.setAttribute("index", j);
        li.appendChild(button); // adding the button to the list item created

        qChoice.appendChild(li);//adding the list to qAnswerList
    }
}


function startQuiz() {
    init(); // needed so it starts the clock display correctly
    startEl.setAttribute("style", "display: none;"); // Hiding start;
    quizEl.setAttribute("style", "display: flex;"); // Showing quiz;

    startTimer();

    if (secondsLeft > 0) {
        // set selected question as the content to be displayed
        renderQuestion(qIndex);

        
        

    } else {
        endQuiz();
    }
 
}

function endQuiz() {
    scoreText = secondsLeft;
    finalScore.textContent = scoreText; // Score is just whatever the number of timerText is
    quizEl.setAttribute("style", "display: none;"); // Hiding quiz;
    resultEl.setAttribute("style", "display: flex;"); // Showing results;

    //event listener ok within this scope bc this button shouldnt appear any time else besides endquiz().
    againButton.addEventListener("click", function () { //reset the quiz
        resultEl.setAttribute("style", "display: none;");
        quizEl.setAttribute("style", "display: none;");
        startEl.setAttribute("style", "display: flex");
        init();
    })
}

function renderScore() {
}

function storeScore() {
    localStorage.setItem("name-score",
    [JSON.stringify(nameText),
    JSON.stringify(finalScore.textContent)]);
}

startButton.addEventListener("click", function () {
    startQuiz();
})

qChoice.addEventListener("click", function(event) {
    var element = event.target;

    switch (element.innerHTML) {
        case q1.cAns:
            console.log('Awesome!');
            break;
        case q2.cAns:
            console.log('Nice!');
            break;
        case q3.cAns:
            console.log('Great!');
            break;
        default:
            console.log('Wrong.');
            secondsLeft = secondsLeft - scoreReduce;
            break;
    }

    if (element.matches("button") === true) {
        if (qIndex < allQs.length-1) { // if questions not exhausted,
            qIndex++ // next question
            renderQuestion(qIndex); // RENDER the next question
        }
        else { // if qIndex has reached allQs.length-1,
            if (secondsLeft > 0) { // If you completed before timing out,
                isWin = true; // Stops the clock, basically.
            }
            endQuiz();
        }
    }
});

inputForm.addEventListener("submit", function(event) { // initials submission
    event.preventDefault();
    let nameText = inputFormName.value.trim();
    console.log("username is: " + nameText,
    "final score is: " + finalScore.textContent);

    console.log("submit button works");

});

init();