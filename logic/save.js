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
        if (typeof data.resources === 'number') base.resources = data.resources;
        if (Array.isArray(data.turrets)) base.turrets = data.turrets;
        if (typeof data.zone === 'number') map.zone = data.zone;
    } catch(e) {
        console.error('Failed to load save', e);
    }
}
