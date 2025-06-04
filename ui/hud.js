function drawHUD(player, base, wave) {
    const hud = document.getElementById('hud');
    const hp = Math.floor(player.hp);
    hud.textContent = `Health: ${hp} | Energy: ${Math.floor(player.energy)} | Resources: ${base.resources} | Wave: ${wave}`;
}
