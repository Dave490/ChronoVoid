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

function saveScore(name, value) {
    const raw = localStorage.getItem('chronovoid-leaderboard');
    const board = raw ? JSON.parse(raw) : [];
    board.push({name, score: value});
    board.sort((a,b) => b.score - a.score);
    localStorage.setItem('chronovoid-leaderboard', JSON.stringify(board));
    return board;
}

function showLeaderboard(entries) {
    const boardEl = document.getElementById('leaderboard');
    boardEl.innerHTML = '<h2>Leaderboard</h2>';
    const list = document.createElement('ol');
    entries.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `${e.name}: ${e.score}`;
        list.appendChild(li);
    });
    boardEl.appendChild(list);
    boardEl.style.display = 'block';
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
    }
});

loadSave();
spawnWave();
requestAnimationFrame(gameLoop);

