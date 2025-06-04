function drawHUD(player, wave) {
    const hud = document.getElementById('hud');
    hud.textContent = `Health: ${player.hp} | Energy: ${Math.floor(player.energy)} | Wave: ${wave}`;
}
