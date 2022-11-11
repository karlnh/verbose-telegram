// When I click start button,
// Then a timer starts,
// Then a question is presented.

let timerText = document.querySelector(".timer-count");
let startButton = document.querySelector("#start-button");
let finalScore = document.querySelector(".final-score");

let startCard = document.querySelector(".start")
let quizCard = document.querySelector(".quiz")
let resultCard = document.querySelector(".results")

let secondsInit = 3;
timerText.textContent = secondsInit + " seconds left";

let isWin = false;

// Timer
function setTimer() {
    let secondsLeft = secondsInit;
    let timerInterval = setInterval(function() {
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();

        } else if (secondsLeft === 2) {
            secondsLeft--; // a little hacky, but if 2, makes it 1, then singularizes the verb
            timerText.textContent = secondsLeft + " second left";

        } else if (isWin === true && secondsLeft > 0) {
            console.log("You won!")
            clearInterval(timerInterval);
            timerText.textContent = secondsLeft + " seconds left";
            endQuiz();

        } else {
            secondsLeft--;
            timerText.textContent = secondsLeft + " seconds left";
        } 
    }, 1000);
}

function selectQuestions() {
    // How are we going to store the questions and then access them randomly?
    // Do we want to be able to set a quiz length, i.e. number of questions selected?
}

function startQuiz() {
    setTimer();
    startCard.setAttribute("style", "display: none;"); // Hiding start;
    quizCard.setAttribute("style", "display: flex;"); // Showing quiz;
}

function endQuiz() {
    finalScore.textContent = timerText.innerHTML[0]; // Score is just whatever the number of timerText is
    timerText.textContent = secondsInit + " seconds left";
    quizCard.setAttribute("style", "display: none;"); // Hiding quiz;
    resultCard.setAttribute("style", "display: flex;"); // Hiding quiz;
}

startButton.addEventListener("click", function () {
    startQuiz();
})

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
