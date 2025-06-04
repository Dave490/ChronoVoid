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
        ctx.fillStyle='#f00';
        ctx.fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
    }
}
