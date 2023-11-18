const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
let shuffledColors = [];
let selectedColors = [];
let score = 0;
let gameStarted = false;

const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const message = document.getElementById('message');

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create the game board
function createGameBoard() {
    gameContainer.innerHTML = '';
    shuffledColors.forEach((color, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.backgroundColor = color;
        square.addEventListener('click', () => selectColor(color, index));
        gameContainer.appendChild(square);
    });
}

// Function to handle color selection
function selectColor(color, index) {
    if (!gameStarted) return;
    if (selectedColors.length === 0) {
        selectedColors.push({ color, index });
    } else if (selectedColors.length === 1) {
        if (selectedColors[0].color === color && selectedColors[0].index !== index) {
            score++;
            selectedColors = [];
            createGameBoard();
            checkGameOver();
        } else {
            selectedColors = [];
            createGameBoard();
        }
    }
}

// Function to check if the game is over
function checkGameOver() {
    if (score === shuffledColors.length / 2) {
        gameStarted = false;
        message.textContent = 'You won! Play again?';
        startButton.style.display = 'block';
    }
}

// Event listener for the start button
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    message.textContent = 'Match the colors!';
    score = 0;
    gameStarted = true;

    // Duplicate and shuffle the colors
    shuffledColors = [...colors, ...colors];
    shuffleArray(shuffledColors);

    createGameBoard();
});

// Initial game setup
startButton.style.display = 'block';
