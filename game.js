// Main game loop and initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let lastTime = 0;

let score = 0;
let gameRunning = true;
let paused = false;

const player = new Player();
const map = new GameMap();
const base = new Base();
const chrono = new Chrono();
const enemies = [];
let wave = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function spawnWave() {
    wave++;
    for (let i = 0; i < wave * 3; i++) {
        enemies.push(new Enemy());
    }
}

function update(dt) {
    player.update(dt);
    chrono.update(dt);
    base.update(dt);
    enemies.forEach(e => e.update(dt, player));
    // remove dead enemies
    for (let i = enemies.length -1; i >=0; i--) {
        if (enemies[i].dead) {
            enemies.splice(i,1);
            score++;
        }
    }
    if (enemies.length === 0) spawnWave();

    if (player.hp <= 0 && gameRunning) {
        gameOver();
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    map.draw(ctx);
    base.draw(ctx);
    enemies.forEach(e => e.draw(ctx));
    player.draw(ctx);
    drawHUD(player, wave, score);
}

function gameLoop(timestamp) {
    if (!gameRunning) return;
    if (!paused) {
        const dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        update(dt);
        draw();
    }
    requestAnimationFrame(gameLoop);
}

function getLeaderboard() {
    const raw = localStorage.getItem('chronovoid-leaderboard');
    return raw ? JSON.parse(raw) : [];
}

function saveScore(name, value) {
    const board = getLeaderboard();
    board.push({name, score: value});
    board.sort((a,b) => b.score - a.score);
    localStorage.setItem('chronovoid-leaderboard', JSON.stringify(board));
    return board;
}

function showLeaderboard(entries = getLeaderboard()) {
    const boardEl = document.getElementById('leaderboard');
    const listEl = document.getElementById('leaderboardList');
    listEl.innerHTML = '';
    entries.slice(0, 10).forEach(e => {
        const li = document.createElement('li');
        li.textContent = `${e.name}: ${e.score}`;
        listEl.appendChild(li);
    });
    boardEl.style.display = 'block';
    paused = true;
}

function hideLeaderboard() {
    const boardEl = document.getElementById('leaderboard');
    boardEl.style.display = 'none';
    if (gameRunning) {
        paused = false;
        lastTime = performance.now();
    }
}

function gameOver() {
    gameRunning = false;
    const name = prompt('Game Over! Enter your name:') || 'Anonymous';
    const lb = saveScore(name, score);
    showLeaderboard(lb);
}

function togglePause() {
    if (!gameRunning) return;
    paused = !paused;
    const overlay = document.getElementById('pauseOverlay');
    overlay.style.display = paused ? 'block' : 'none';
    if (!paused) {
        lastTime = performance.now();
    }
}

function restartGame() {
    window.location.reload();
}

window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'p') {
        togglePause();
    } else if (e.key.toLowerCase() === 'r') {
        restartGame();
    } else if (e.key.toLowerCase() === 'l') {
        const boardEl = document.getElementById('leaderboard');
        if (boardEl.style.display === 'block') {
            hideLeaderboard();
        } else {
            showLeaderboard();
        }
    }
});

document.getElementById('closeLeaderboard').addEventListener('click', hideLeaderboard);
document.getElementById('resetGame').addEventListener('click', restartGame);

loadSave();
spawnWave();
requestAnimationFrame(gameLoop);


