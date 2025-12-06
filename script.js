// Select elements
const player = document.getElementById("player");
const scoreText = document.getElementById("score");

let playerX = window.innerWidth / 2;
let score = 0;

// Move player with arrow keys
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") playerX -= 40;
    if (e.key === "ArrowRight") playerX += 40;

    // Prevent moving off screen
    if (playerX < 0) playerX = 0;
    if (playerX > window.innerWidth - 40) playerX = window.innerWidth - 40;

    player.style.left = playerX + "px";
});

// Spawn enemy block
function spawnEnemy() {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left = Math.random() * (window.innerWidth - 40) + "px";
    document.body.appendChild(enemy);

    let enemyY = 0;
    let falling = setInterval(() => {
        enemyY += 5;
        enemy.style.top = enemyY + "px";

        const playerRect = player.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        // Collision detection
        if (
            enemyRect.left < playerRect.right &&
            enemyRect.right > playerRect.left &&
            enemyRect.top < playerRect.bottom &&
            enemyRect.bottom > playerRect.top
        ) {
            alert("Game Over! Final Score: " + score);
            location.reload();
        }

        // Remove enemy if it goes off screen
        if (enemyY > window.innerHeight) {
            enemy.remove();
            clearInterval(falling);
            score++;
            scoreText.textContent = "Score: " + score;
        }
    }, 10);
}

// Spawn enemies every 800ms
setInterval(spawnEnemy, 800);
