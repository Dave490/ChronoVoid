function saveGame() {
    const data = {
        resources: base.resources,
        turrets: base.turrets,
        zone: map.zone
    };
    localStorage.setItem('chronovoid-save', JSON.stringify(data));
}

function loadSave() {
    const raw = localStorage.getItem('chronovoid-save');
    if (!raw) return;
    try {
        const data = JSON.parse(raw);
        base.resources = data.resources || 0;
        base.turrets = data.turrets || [];
        map.zone = data.zone || 0;
    } catch(e) {
        console.error('Failed to load save', e);
    }
}
