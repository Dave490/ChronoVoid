function drawHUD(player, wave, score) {
    const hud = document.getElementById('hud');
    hud.textContent = `Health: ${Math.floor(player.hp)} | Energy: ${Math.floor(player.energy)} | Wave: ${wave} | Score: ${score}`;
}
