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

let startButton = document.querySelector("#start-button");
let againButton = document.querySelector("#again-button");

let qHeader = document.querySelector("#answer-header");
let qChoice = document.querySelector("#answer-section");

let isWin = false;

const secondsInit = 30
let secondsLeft = secondsInit;
let timerTextEl = document.querySelector(".timer-count");
timerTextEl.textContent = secondsLeft + " seconds left";

// QUESTIONS -----------------------------------------------------------------------------
let q1 = {
  title: "Which set of symbols are used to comment a single line in JavaScript?",
  ans: ["<!-- -->", "//", "/* */"],
  cAns: "//"
};
let q2 = {
  title: 'Let array = ["A","B,"C"]. What is array[1]?',
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
        let button = document.createElement("button"); //clickable

        let ansLine = allQs[qIndex].ans[j]; //individual answer lines
        button.textContent = ansLine; //giving button text content instead of list itself
        li.appendChild(button); // adding the button to the list item created

        qChoice.appendChild(li);//adding the list to qAnswerList
    }
}


function startQuiz() {
    isWin = false; //resetting win condition
    startEl.setAttribute("style", "display: none;"); // Hiding start;
    quizEl.setAttribute("style", "display: flex;"); // Showing quiz;

    startTimer();

    if (secondsLeft > 0) {

        // set selected question as the content to be displayed
        let qIndex = 0;
        renderQuestion(qIndex);
        

    } else {
        endQuiz();
    }
 
}

function endQuiz() {
    finalScore.textContent = timerTextEl.innerHTML[0]; // Score is just whatever the number of timerText is
    secondsLeft = secondsInit; // resetting seconds to initial number
    timerTextEl.textContent = secondsInit + " seconds left";
    quizEl.setAttribute("style", "display: none;"); // Hiding quiz;
    resultEl.setAttribute("style", "display: flex;"); // Hiding quiz;

    againButton.addEventListener("click", function () { //reset the quiz
        resultEl.setAttribute("style", "display: none;");
        quizEl.setAttribute("style", "display: none;");
        startEl.setAttribute("style", "display: flex");
        
    })
}

startButton.addEventListener("click", function () {
  startQuiz();
})