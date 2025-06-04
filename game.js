// Main game loop and initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let lastTime = 0;

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
        if (enemies[i].dead) enemies.splice(i,1);
    }
    if (enemies.length === 0) spawnWave();
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    map.draw(ctx);
    base.draw(ctx);
    enemies.forEach(e => e.draw(ctx));
    player.draw(ctx);
    drawHUD(player, wave);
}

function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    update(dt);
    draw();
    requestAnimationFrame(gameLoop);
}

loadSave();
spawnWave();
requestAnimationFrame(gameLoop);

