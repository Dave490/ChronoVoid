function drawHUD(player, wave, base) {
    const hud = document.getElementById('hud');
    hud.textContent = `Health: ${player.hp} | Energy: ${Math.floor(player.energy)} | Resources: ${base.resources} | Wave: ${wave}`;
}
