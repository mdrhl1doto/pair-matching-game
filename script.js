document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const playAgainBtn = document.createElement('button'); // Create the "Play Again" button
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.classList.add('play-again-btn'); // Add a class for styling
    playAgainBtn.style.display = 'none'; // Hide it initially
    playAgainBtn.addEventListener('click', resetGame);
    document.body.appendChild(playAgainBtn); // Add button to the DOM

    const cardsArray = [
        { name: 'apple', img: 'images/apple.png' },
        { name: 'banana', img: 'images/banana.png' },
        { name: 'cherry', img: 'images/cherry.png' },
        { name: 'grape', img: 'images/grape.png' },
        { name: 'lemon', img: 'images/lemon.png' },
        { name: 'orange', img: 'images/orange.png' },
        { name: 'strawberry', img: 'images/strawberry.png' },
        { name: 'watermelon', img: 'images/watermelon.png' }
    ];

    let gameArray = [...cardsArray, ...cardsArray];
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        board.innerHTML = ''; // Clear the board
        gameArray.sort(() => 0.5 - Math.random()); // Shuffle cards
        gameArray.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.setAttribute('data-id', index);
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <div class="front"></div>
                <div class="back">
                    <img src="${card.img}" alt="${card.name}">
                </div>`;
            cardElement.addEventListener('click', flipCard);
            board.appendChild(cardElement);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
            cardsChosen.push(gameArray[cardId].name);
            cardsChosenId.push(cardId);
            this.classList.add('flipped');
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [firstCardId, secondCardId] = [cardsChosenId[0], cardsChosenId[1]];
        const [firstCard, secondCard] = [cards[firstCardId], cards[secondCardId]];

        if (cardsChosen[0] === cardsChosen[1]) {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }

        cardsChosen = [];
        cardsChosenId = [];

        // Check if all pairs are matched
        if (cardsWon.length === cardsArray.length) {
            playAgainBtn.style.display = 'block'; // Show the "Play Again" button
            alert('Congratulations! You found all pairs!');
        }
    }

    function resetGame() {
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        playAgainBtn.style.display = 'none'; // Hide the button
        createBoard(); // Recreate the board
    }

    createBoard();
});
