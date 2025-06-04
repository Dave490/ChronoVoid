class Joystick {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.value = {x:0, y:0};
        this.init();
    }
    init() {
        this.base = document.createElement('div');
        this.base.style.position='absolute';
        this.base.style.bottom='40px';
        this.base.style.left='40px';
        this.base.style.width='80px';
        this.base.style.height='80px';
        this.base.style.background='rgba(255,255,255,0.1)';
        this.base.style.borderRadius='50%';
        this.base.style.touchAction='none';
        document.body.appendChild(this.base);

        this.knob = document.createElement('div');
        this.knob.style.position='absolute';
        this.knob.style.left='30px';
        this.knob.style.top='30px';
        this.knob.style.width='20px';
        this.knob.style.height='20px';
        this.knob.style.background='rgba(0,255,0,0.4)';
        this.knob.style.borderRadius='50%';
        this.base.appendChild(this.knob);

        this.base.addEventListener('pointerdown', e => this.start(e));
        window.addEventListener('pointermove', e => this.move(e));
        window.addEventListener('pointerup', e => this.end());
    }
    start(e) {
        this.active = true;
        this.origin = {x:e.clientX, y:e.clientY};
        this.move(e);
    }
    move(e) {
        if (!this.active) return;
        const dx = e.clientX - this.origin.x;
        const dy = e.clientY - this.origin.y;
        const dist = Math.min(Math.hypot(dx,dy),40);
        const angle = Math.atan2(dy,dx);
        this.knob.style.left = 30 + Math.cos(angle)*dist + 'px';
        this.knob.style.top = 30 + Math.sin(angle)*dist + 'px';
        this.value = {x: Math.cos(angle)*dist/40, y: Math.sin(angle)*dist/40};
    }
    end() {
        this.active=false;
        this.knob.style.left='30px';
        this.knob.style.top='30px';
        this.value={x:0,y:0};
    }
}

const joystick = new Joystick();
