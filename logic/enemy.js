class Enemy {
    constructor() {
        this.x = Math.random()*window.innerWidth;
        this.y = Math.random()*window.innerHeight;
        this.speed = 80;
        this.size = 15;
        this.hp = 20;
        this.dead = false;
    }
    update(dt, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx,dy);
        if (dist > 0) {
            this.x += (dx/dist) * this.speed * dt;
            this.y += (dy/dist) * this.speed * dt;
        }
        if (dist < this.size + 10) {
            player.hp -= 10 * dt;
            if (player.hp < 0) player.hp = 0;
        }
        if (this.hp <=0) this.dead = true;
    }
    draw(ctx) {
        const grad = ctx.createRadialGradient(
            this.x,
            this.y,
            5,
            this.x,
            this.y,
            this.size
        );
        grad.addColorStop(0, '#f66');
        grad.addColorStop(1, '#300');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
