class Player {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.speed = 150; // pixels per second
        this.hp = 100;
        this.energy = 100;
    }
    update(dt) {
        // keyboard fallback
        const keyVec = {x:0,y:0};
        if (keys['ArrowUp']) keyVec.y -=1;
        if (keys['ArrowDown']) keyVec.y +=1;
        if (keys['ArrowLeft']) keyVec.x -=1;
        if (keys['ArrowRight']) keyVec.x +=1;
        const inputX = joystick.value.x + keyVec.x;
        const inputY = joystick.value.y + keyVec.y;
        this.x += inputX * this.speed * dt;
        this.y += inputY * this.speed * dt;
    }
    draw(ctx) {
        const grad = ctx.createRadialGradient(this.x, this.y, 5, this.x, this.y, 15);
        grad.addColorStop(0, '#0f0');
        grad.addColorStop(1, '#030');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}

const keys = {};
window.addEventListener('keydown', e => keys[e.key]=true);
window.addEventListener('keyup', e => keys[e.key]=false);
