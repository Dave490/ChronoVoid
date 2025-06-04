class Bullet {
    constructor(x, y, target) {
        this.x = x;
        this.y = y;
        const dx = target.x - x;
        const dy = target.y - y;
        const dist = Math.hypot(dx, dy) || 1;
        this.vx = dx / dist;
        this.vy = dy / dist;
        this.speed = 300;
        this.size = 4;
        this.damage = 20;
        this.dead = false;
    }
    update(dt, enemies) {
        this.x += this.vx * this.speed * dt;
        this.y += this.vy * this.speed * dt;
        for (let e of enemies) {
            const dx = e.x - this.x;
            const dy = e.y - this.y;
            if (Math.hypot(dx, dy) < e.size / 2 + this.size / 2) {
                e.hp -= this.damage;
                this.dead = true;
                break;
            }
        }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.dead = true;
        }
    }
    draw(ctx) {
        ctx.fillStyle = '#ff0';
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}
