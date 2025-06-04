class Missile {
    constructor(x, y, target) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.speed = 300;
        this.size = 4;
        this.dead = false;
    }
    update(dt) {
        if (this.target.dead) {
            this.dead = true;
            return;
        }
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.target.size/2) {
            this.target.hp -= 20;
            this.dead = true;
            return;
        }
        if (dist > 0) {
            this.x += (dx/dist) * this.speed * dt;
            this.y += (dy/dist) * this.speed * dt;
        }
    }
    draw(ctx) {
        ctx.fillStyle = '#ff0';
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    }
}
