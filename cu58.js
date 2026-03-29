let randomNumber, maxGuesses;
const ranges = { 10: 3, 100: 7, 1000: 10 };
const rangeButtons = document.querySelectorAll("input[name='range']");
const startButton = document.getElementById("start-btn");
const checkButton = document.getElementById("check-btn");
const guessInput = document.getElementById("guess-input");
const guessesLeftSpan = document.getElementById("guesses-left");
const guessHistory = document.getElementById("guess-history");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const playAgainButton = document.getElementById("play-again");
let guessesLeft;

// Enable start button when range is selected
rangeButtons.forEach(button => {
    button.addEventListener("change", function() {
        startButton.disabled = false;
    });
});

// Start game
startButton.addEventListener("click", function() {
    let selectedRange = document.querySelector("input[name='range']:checked").value;
    randomNumber = Math.floor(Math.random() * selectedRange) + 1;
    guessesLeft = ranges[selectedRange];
    
    document.getElementById("range-text").innerText = `1 - ${selectedRange}`;
    guessesLeftSpan.innerText = guessesLeft;
    guessHistory.innerHTML = "";
    
    document.querySelector(".game-setup").style.display = "none";
    document.querySelector(".game-play").style.display = "block";
    
    guessInput.disabled = false;
    checkButton.disabled = false;
});

// Check guess
checkButton.addEventListener("click", function() {
    let userGuess = parseInt(guessInput.value);
    let selectedRange = document.querySelector("input[name='range']:checked").value;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > selectedRange) {
        alert("Invalid guess. Enter a number within the range.");
        return;
    }

    guessesLeft--;
    guessesLeftSpan.innerText = guessesLeft;

    let guessListItem = document.createElement("li");
    guessListItem.innerText = `You guessed: ${userGuess}`;
    guessHistory.appendChild(guessListItem);

    if (userGuess === randomNumber) {
        showModal("Congratulations! You guessed correctly.");
    } else if (guessesLeft === 0) {
        showModal("No more guesses left.");
    } else {
        let hint = userGuess > randomNumber ? "Too high. Try again!" : "Too low. Try again!";
        alert(hint);
    }
});

// Show modal
function showModal(message) {
    modal.style.display = "block";
    modalMessage.innerText = message;
    checkButton.disabled = true;
    guessInput.disabled = true;
}

// Restart game
playAgainButton.addEventListener("click", function() {
    location.reload();
});