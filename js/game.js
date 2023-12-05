const kangaroo = document.querySelector('.kangaroo');
const cactus = document.querySelector('.cactus');
const miniCactus = document.querySelector('.miniCactus');
const mainContent = document.getElementById('gameBoard');

function jump(e) {
    if (kangaroo.classList.contains('jump')) return;
    
    if (e.key === "ArrowUp" || e.key === "w") {
        kangaroo.classList.add('jump');
    
        setTimeout(() => {
            kangaroo.classList.remove('jump');
        }, 500);
    }
}

function replay(e) {
    switch (e.key) {
        case "Enter":
            location.reload();
            document.removeEventListener('keydown', replay);
            break;
        case "Escape":
            location.replace('../index.html');
            break;
    }
}

function isGameOver() {
    const leftDistanceCactus = cactus.offsetLeft;
    const rightDistanceCactus = leftDistanceCactus+100;
    const bottomDistanceKangaroo = +window.getComputedStyle(kangaroo).bottom.replace('px', '');

    return (leftDistanceCactus <= 85 && leftDistanceCactus > 0 && bottomDistanceKangaroo < 125) || (rightDistanceCactus <= 85 && rightDistanceCactus > 0 && bottomDistanceKangaroo < 125);
}

function changeKangarooMood(bottomDistanceKangaroo) {
    kangaroo.src = '../images/kangaroo-cry.png';
    kangaroo.style.animation = 'none';
    kangaroo.style.bottom = `${bottomDistanceKangaroo}px`;
}

function addGameOverTitle() {
    const gameOverWrap = document.createElement('div');
    gameOverWrap.classList.add('gameOverWrap');

    const gameOverTitle = document.createElement('h2');
    gameOverTitle.innerHTML = "Game Over";

    const gameOverSubtitle = document.createElement('p');
    gameOverSubtitle.innerHTML = "Press Enter to restart";

    const gameOverReturnMenu = document.createElement('p');
    gameOverReturnMenu.innerHTML = "Press ESC to return Menu";

    const gameOverScore = document.createElement('p');
    const scoreElement = document.getElementById('score');
    const [, score] = scoreElement.innerHTML.split(":");
    gameOverScore.innerHTML = `Your score: ${score}`;

    gameOverWrap.appendChild(gameOverTitle);
    gameOverWrap.appendChild(gameOverSubtitle);
    gameOverWrap.appendChild(gameOverReturnMenu);
    gameOverWrap.appendChild(gameOverScore);

    mainContent.appendChild(gameOverWrap);
}

function handleGameOver() {
    const leftDistanceCactus = cactus.offsetLeft;
    const bottomDistanceKangaroo = +window.getComputedStyle(kangaroo).bottom.replace('px', '');

    cactus.style.animation = 'none';
    cactus.style.left = `${leftDistanceCactus}px`;

    changeKangarooMood(bottomDistanceKangaroo);
    addGameOverTitle();
}

function increaseScore() {
    const currentScoreElement = document.getElementById('score');
    const [, score] = currentScoreElement.innerHTML.split(":");

    const currentScore = parseInt(score);
    currentScoreElement.innerHTML = `SCORE: ${currentScore+1}`;
}

const checkGameOverLoop = setInterval(() => {
    if(isGameOver()) {
        document.addEventListener('keydown', replay);
        handleGameOver();
        clearInterval(checkGameOverLoop);
    }
}, 15);

const increaseScoreLoop = setInterval(() => {
    if(!isGameOver()) {
        increaseScore();
    } else {
        clearInterval(increaseScoreLoop);
    }
}, 50);

document.addEventListener('keydown', jump);
