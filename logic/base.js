class Base {
    constructor() {
        this.turrets = [];
        // Players start with some resources so they can build initial defenses
        // right away. Each turret costs 10 resources, so beginning with 20
        // allows two turrets to be placed on the first load.
        this.resources = 20;
        new Button('Build Turret', 40, 40, () => this.buildTurret());
    }
    buildTurret() {
        if (this.resources >= 10) {
            this.resources -= 10;
            this.turrets.push({x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight});
            saveGame();
        }
    }
    update(dt) {
        this.turrets.forEach(t => {
            // simple shooting at nearest enemy
            if (enemies.length > 0) {
                const e = enemies[0];
                const dx = e.x - t.x;
                const dy = e.y - t.y;
                const dist = Math.hypot(dx,dy);
                if (dist < 200) {
                    e.hp -= 20*dt;
                }
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
