class Base {
    constructor() {
        this.turrets = [];
        // start the player with some resources for building
        this.resources = 20;
        new Button('Build Turret', 40, 40, () => this.buildTurret());
    }
    buildTurret() {
        if (this.resources >= 10) {
            this.resources -= 10;
            this.turrets.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                cooldown: 0
            });
            saveGame();
        }
    }
    update(dt) {
        this.turrets.forEach(t => {
            if (t.cooldown > 0) t.cooldown -= dt;
            if (enemies.length === 0) return;
            const e = enemies[0];
            const dx = e.x - t.x;
            const dy = e.y - t.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 200 && t.cooldown <= 0) {
                bullets.push(new Bullet(t.x, t.y, e));
                t.cooldown = 0.5;
            }
        });
    }
    draw(ctx) {
        ctx.fillStyle='#888';
        this.turrets.forEach(t => {
            ctx.fillRect(t.x-5,t.y-5,10,10);
        });
    }
}
