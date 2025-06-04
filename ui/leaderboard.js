// Game over and leaderboard handling
function loadLeaderboard() {
    const raw = localStorage.getItem('chronovoid-leaderboard');
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error('Failed to parse leaderboard', e);
        return [];
    }
}

function saveLeaderboard(data) {
    localStorage.setItem('chronovoid-leaderboard', JSON.stringify(data));
}

function displayLeaderboard() {
    const board = loadLeaderboard().sort((a, b) => b.score - a.score);
    const list = document.getElementById('leaderboard');
    list.innerHTML = '';
    board.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name} - ${entry.score}`;
        list.appendChild(li);
    });
}

function showGameOver(score) {
    document.getElementById('finalScore').textContent = score;
    displayLeaderboard();
    document.getElementById('gameOverScreen').style.display = 'block';
}

function saveCurrentScore() {
    const nameInput = document.getElementById('playerName');
    const name = nameInput.value.trim() || 'Anonymous';
    const score = parseInt(document.getElementById('finalScore').textContent, 10);
    const board = loadLeaderboard();
    board.push({ name, score });
    saveLeaderboard(board);
    displayLeaderboard();
    nameInput.value = '';
}

document.getElementById('saveScore').addEventListener('click', saveCurrentScore);
document.getElementById('restartGame').addEventListener('click', () => location.reload());
