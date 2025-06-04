class Button {
    constructor(label, x, y, action) {
        this.el = document.createElement('button');
        this.el.textContent = label;
        this.el.style.position='absolute';
        this.el.style.right = x + 'px';
        this.el.style.bottom = y + 'px';
        this.el.style.padding='10px';
        this.el.style.background='rgba(255,255,255,0.2)';
        this.el.style.color='#0f0';
        this.el.style.border='1px solid #0f0';
        this.el.style.touchAction='none';
        this.el.addEventListener('click', action);
        document.body.appendChild(this.el);
    }
}
