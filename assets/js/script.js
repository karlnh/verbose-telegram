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
let scoreSpan = document.querySelector(".final-score");
let scoreListEl = document.querySelector("#score-list");

let timerTextEl = document.querySelector(".timer-count");

let startButton = document.querySelector("#start-button");
let againButton = document.querySelector("#again-button");
let submitButton = document.querySelector("#submit-button");
let resetButton = document.querySelector("#reset-button");

let inputForm = document.querySelector("#name-form");
let nameInputEl = document.querySelector("#name-input");

let qHeader = document.querySelector("#question-header");
let qChoice = document.querySelector("#answer-options");


// if (JSON.parse(localStorage.getItem("id-score")) === null) {
//     let scoreJSON = [];
// } else if (scoreJSON[0] === null) { // if no local storage, make an empty array
//     let scoreJSON = [];
// } else {
//     let scoreJSON = JSON.parse(localStorage.getItem("id-score"));
// }

// Getting local storage or initializing score for setting local storage
let scoreJSON = JSON.parse(localStorage.getItem("id-score"));
if (scoreJSON === null) {
    scoreJSON = [];
}

let q1 = {
  title: "Which set of symbols are used to comment a single line in JavaScript?",
  ans: ["// comment", "<!-- comment -->", "/* comment */"],
  cAns: "// comment" // "correct answer"
};
let q2 = {
  title: 'Let array = ["A","B","C"]. What is array[1]?',
  ans: ['["A"]','["B"]','["C"]'],
  cAns: '["B"]'
};
let q3 = {
  title: "An object property has two parts. What are they called?",
  ans: ["method-function calls", "global-local scopes", "key-value pairs"],
  cAns: "key-value pairs"
};
let q4 = {
    title: "What word do you start with when trying to declare a new function?",
    ans: ["def","function","var","init"],
    cAns: "function"
};
let q5 = {
    title: "What would `10 === 5+5` result in if typed into the console?",
    ans: ["true and false", "true and true","true", "false"],
    cAns: "true"
};
let q6 = {
    title: "Which of these would display an alert popup on the user's screen?",
    ans: ['windows.pop()','window.alert()','user.window(alert)','window.prompt()'],
    cAns: 'window.alert()'
};
let q7 = {
    title: "Which of these is a string?",
    ans: ['"text"',"[text]","<text>","{text}"],
    cAns: '"text"'
};
let q8 = {
    title: "What would math.floor(5.7) result in?",
    ans: ["5.5","6","5","7"],
    cAns: "5"
};
let allQs = [q1,q2,q3,q4,q5,q6,q7,q8]; // to be used in rendering questions

// Timer and score
const secondsInit = 8 * allQs.length; // length of quiz depends on question amount. 8 seconds / question
let secondsLeft = secondsInit;
let scoreReduce = Math.floor(secondsInit / 5); // reduce score by this amount per wrong answer

function init() {
    isWin = false;
    qIndex = 0; // resetting questions to beginning
    secondsLeft = secondsInit;
    timerTextEl.textContent = secondsInit + " seconds left";
    renderScore();
}
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
// Loads a question from the question array along with page formatting.
function renderQuestion(qIndex) {
    qHeader.textContent = allQs[qIndex].title; //text content is the title of the qIndex obj
    qChoice.innerHTML = '';
    // this is making the list of questions. it looks complicated but its not supposed to do much.
    for (var j = 0; j < allQs[qIndex].ans.length; j++) {
        let li = document.createElement("li"); //make list element for each item the in allQs[i].ans array
        li.setAttribute("style", "margin-bottom: 2%;")
        let button = document.createElement("button"); //makes clickable answer
        let ansLine = allQs[qIndex].ans[j]; //individual answer lines
        button.textContent = ansLine; //giving button text content instead of list itself
        li.appendChild(button); // adding the button to the list item created
        qChoice.appendChild(li);//adding the list to qAnswerList
    }
}
function endQuiz() {
    scoreText = secondsLeft;
    scoreSpan.textContent = scoreText; // Score is just whatever the number of timerText is
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
// For rendering aside scoreboard.
function renderScore() {
    scoreListEl.textContent = ""; // clearing default formatting
    for (let i = 0; i < scoreJSON.length; i++) {
        var li = document.createElement("li");
        li.textContent = scoreJSON[i].name + " --- " + scoreJSON[i].score;
        scoreListEl.prepend(li);
        }
    }
// Start game
startButton.addEventListener("click", function () {
    startQuiz();
})
// Correct answer checker and switch for next question
qChoice.addEventListener("click", function(event) {
    var element = event.target;
    switch (element.innerHTML) {
        case q1.cAns:
            console.log("good!");
            break;
        case q2.cAns:
            console.log("good!");
            break;
        case q3.cAns:
            console.log("good!");
            break;
        case q4.cAns:
            console.log("good!");
            break;
        case q5.cAns:
            console.log("good!");
            break;
        case q6.cAns:
            console.log("good!");
            break;
        case q7.cAns:
            console.log("good!");
            break;
        case q8.cAns:
            console.log("good!");
            break;        
        default:
            console.log('wrong. time -' + scoreReduce);
            if (secondsLeft - scoreReduce > 0) { // don't let secondsLeft go negative with scoreReduce
                secondsLeft = secondsLeft - scoreReduce;
            } else {
                secondsLeft = 0; // if secondsLeft - score Reduce <= 0
                break; // stop the whole thing!
            }
            
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
// Initials submission
inputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (nameInputEl.value === "") {
        nameInputEl.value = "default";
    }
    const newScore = { // obj for new score that will be overridden each time a new score is entered
        name: nameInputEl.value.trim(),
        score: scoreSpan.textContent
    }
    scoreJSON.push(newScore);
    localStorage.setItem("id-score", JSON.stringify(scoreJSON)); // score only stringified after combining old scores and new score
    renderScore();
});
// Scoreboard reset
resetButton.addEventListener("click", function() {
    localStorage.clear();
    scoreJSON = []; // any temporary variable storage is cleared too 
    scoreListEl.innerHTML = "";
    console.log("Local storage cleared");
});
init();