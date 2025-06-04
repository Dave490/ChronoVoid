class GameMap {
    constructor() {
        this.zone = 0; // 0-3 representing eras
    }
    draw(ctx) {
        const colors = [
            ['#3a3a3a', '#111'],
            ['#324', '#112'],
            ['#633', '#211'],
            ['#431', '#211']
        ];
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, colors[this.zone][0]);
        grad.addColorStop(1, colors[this.zone][1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
