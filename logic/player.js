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
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x-10, this.y-10, 20, 20);
    }
}

const keys = {};
window.addEventListener('keydown', e => keys[e.key]=true);
window.addEventListener('keyup', e => keys[e.key]=false);
