class Chrono {
    constructor() {
        new Button('Time Freeze', 40, 100, () => this.timeFreeze());
        this.cooldown = 0;
    }
    update(dt) {
        if (this.cooldown > 0) this.cooldown -= dt;
    }
    timeFreeze() {
        if (this.cooldown <= 0) {
            enemies.forEach(e => e.speed *= 0.2);
            setTimeout(() => enemies.forEach(e => e.speed *= 5), 2000);
            this.cooldown = 5;
        }
    }
}
