class GameMap {
    constructor() {
        this.zone = 0; // 0-3 representing eras
    }
    draw(ctx) {
        const colors = ['#222','#113','#331','#311'];
        ctx.fillStyle = colors[this.zone];
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
