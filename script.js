const player = document.getElementById('player');
const board = document.getElementById('game-board');
const scoreTag = document.getElementById('score');
const music = document.getElementById('gameMusic');

let playerY = window.innerHeight / 2;
let velocity = 0;
let gravity = 0.4;
let score = 0;
let isPlaying = false;

function jump() {
    if (!isPlaying) {
        isPlaying = true;
        music.play(); // Starts the Modi song on first tap
    }
    velocity = -8; // Makes the character fly up
}

function createObstacles() {
    const gap = 250; // Space to fly through
    const randomPos = Math.random() * (window.innerHeight - gap - 100) + 50;

    const topPipe = document.createElement('div');
    topPipe.classList.add('obstacle', 'top');
    topPipe.style.height = randomPos + "px";
    topPipe.style.top = "0px";
    topPipe.style.right = "-100px";

    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('obstacle', 'bottom');
    bottomPipe.style.height = (window.innerHeight - randomPos - gap) + "px";
    bottomPipe.style.bottom = "0px";
    bottomPipe.style.right = "-100px";

    board.appendChild(topPipe);
    board.appendChild(bottomPipe);

    // Move obstacles
    let moveLeft = -100;
    let timer = setInterval(() => {
        moveLeft += 5;
        topPipe.style.right = moveLeft + "px";
        bottomPipe.style.right = moveLeft + "px";

        // Collision Detection
        let pRect = player.getBoundingClientRect();
        let tRect = topPipe.getBoundingClientRect();
        let bRect = bottomPipe.getBoundingClientRect();

        if (
            (pRect.right > tRect.left && pRect.left < tRect.right && pRect.top < tRect.bottom) ||
            (pRect.right > bRect.left && pRect.left < bRect.right && pRect.bottom > bRect.top)
        ) {
            alert("Game Over! Score: " + score);
            location.reload();
        }

        if (moveLeft > window.innerWidth + 100) {
            score++;
            scoreTag.innerHTML = score;
            clearInterval(timer);
            topPipe.remove();
            bottomPipe.remove();
        }
    }, 20);
}

// Gravity Loop
setInterval(() => {
    if (isPlaying) {
        velocity += gravity;
        playerY += velocity;
        player.style.top = playerY + "px";

        if (playerY > window.innerHeight || playerY < 0) {
            location.reload();
        }
    }
}, 20);

// Generate enemies every 2 seconds
setInterval(() => {
    if (isPlaying) createObstacles();
}, 2000);
