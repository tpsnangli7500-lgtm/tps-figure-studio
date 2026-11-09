/**
 * TPS Figure Studio - Full Rebuild
 * Vanilla JS Figure Builder
 */

const ICONS = {
    cell: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#f0f9ff" stroke="#0ea5e9" stroke-width="2"/><circle cx="50" cy="50" r="20" fill="#e0f2fe" stroke="#0ea5e9" stroke-dasharray="4 2"/><path d="M70 30 Q75 40 70 50" fill="none" stroke="#0ea5e9" stroke-width="1"/><circle cx="45" cy="45" r="5" fill="#0ea5e9"/></svg>',
    nucleus: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#fdf2f8" stroke="#db2777" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="#db2777"/><path d="M40 20 A35 35 0 0 1 80 50" fill="none" stroke="#db2777" stroke-width="1" stroke-dasharray="2 2"/></svg>',
    mitochondria: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="45" ry="25" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><path d="M15 50 Q25 35 35 50 Q45 65 55 50 Q65 35 75 50 Q85 65 90 50" fill="none" stroke="#10b981" stroke-width="2"/></svg>',
    dna: '<svg viewBox="0 0 100 100"><path d="M30 10 Q70 10 70 30 Q30 30 30 50 Q70 50 70 70 Q30 70 30 90" fill="none" stroke="#6366f1" stroke-width="4"/><path d="M70 10 Q30 10 30 30 Q70 30 70 50 Q30 50 30 70 Q70 70 70 90" fill="none" stroke="#818cf8" stroke-width="4" stroke-dasharray="4 2"/></svg>',
    protein: '<svg viewBox="0 0 100 100"><path d="M20 50 C20 20 40 20 50 50 C60 80 80 80 80 50" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/><circle cx="20" cy="50" r="6" fill="#f59e0b"/><circle cx="50" cy="50" r="6" fill="#f59e0b"/><circle cx="80" cy="50" r="6" fill="#f59e0b"/></svg>',
    enzyme: '<svg viewBox="0 0 100 100"><path d="M20 50 A30 30 0 1 1 80 50 L60 50 A10 10 0 1 0 40 50 Z" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/></svg>',
    antibody: '<svg viewBox="0 0 100 100"><path d="M50 90 L50 50 M50 50 L20 20 M50 50 L80 20" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/><path d="M25 25 L15 15 M75 25 L85 15" fill="none" stroke="#fca5a5" stroke-width="4"/></svg>',
    virus: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><path d="M50 20 L50 5 M80 50 L95 50 M50 80 L50 95 M20 50 L5 50 M71 29 L82 18 M71 71 L82 82 M29 71 L18 82 M29 29 L18 18" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/></svg>',
    bacteria: '<svg viewBox="0 0 100 100"><rect x="20" y="35" width="60" height="30" rx="15" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/><path d="M80 50 L95 40 M80 50 L95 50 M80 50 L95 60" fill="none" stroke="#16a34a" stroke-width="2"/><circle cx="35" cy="50" r="3" fill="#16a34a"/><circle cx="50" cy="45" r="3" fill="#16a34a"/><circle cx="65" cy="50" r="3" fill="#16a34a"/></svg>',
    heart: '<svg viewBox="0 0 100 100"><path d="M50 80 C20 60 10 40 10 25 A15 15 0 0 1 40 25 A15 15 0 0 1 70 25 C70 40 60 60 50 80" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/></svg>',
    brain: '<svg viewBox="0 0 100 100"><path d="M30 50 C10 50 10 20 30 20 C40 20 40 10 60 10 C80 10 90 30 80 50 C90 50 90 80 70 80 C60 80 60 90 40 90 C20 90 20 70 30 50" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/><path d="M50 20 Q50 80 50 80" fill="none" stroke="#db2777" stroke-width="1" stroke-dasharray="2 2"/></svg>',
    liver: '<svg viewBox="0 0 100 100"><path d="M10 50 C10 20 60 10 90 40 C90 70 50 90 10 50" fill="#fff7ed" stroke="#9a3412" stroke-width="2"/></svg>',
    lung: '<svg viewBox="0 0 100 100"><path d="M45 20 C20 20 10 50 20 80 C30 90 45 80 45 60" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><path d="M55 20 C80 20 90 50 80 80 C70 90 55 80 55 60" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><path d="M45 20 L55 20 L50 10 Z" fill="#dc2626"/></svg>',
    kidney: '<svg viewBox="0 0 100 100"><path d="M40 20 C10 30 10 70 40 80 C50 80 50 20 40 20" fill="#fff7ed" stroke="#7c2d12" stroke-width="2"/><path d="M60 20 C90 30 90 70 60 80 C50 80 50 20 60 20" fill="#fff7ed" stroke="#7c2d12" stroke-width="2"/></svg>',
    neuron: '<svg viewBox="0 0 100 100"><path d="M30 50 L10 30 M30 50 L10 50 M30 50 L10 70 M30 50 L60 50 M60 50 L90 30 M60 50 L90 70" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="50" r="10" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/></svg>',
    blood: '<svg viewBox="0 0 100 100"><path d="M50 10 C50 10 20 50 20 70 A30 30 0 0 0 80 70 C80 50 50 10 50 10" fill="#fee2e2" stroke="#b91c1c" stroke-width="2"/></svg>',
    bone: '<svg viewBox="0 0 100 100"><path d="M30 30 A10 10 0 1 1 30 50 L70 50 A10 10 0 1 1 70 30" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/><path d="M30 70 A10 10 0 1 0 30 50 L70 50 A10 10 0 1 0 70 70" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/></svg>',
    flask: '<svg viewBox="0 0 100 100"><path d="M40 10 L60 10 M50 10 L50 40 L20 90 L80 90 L50 40" fill="none" stroke="#475569" stroke-width="3" stroke-linejoin="round"/><path d="M28 75 L72 75 L80 90 L20 90 Z" fill="#bae6fd" opacity="0.5"/></svg>',
    beaker: '<svg viewBox="0 0 100 100"><path d="M30 10 L30 90 L70 90 L70 10 M25 10 L35 10" fill="none" stroke="#475569" stroke-width="3"/><path d="M30 60 L70 60 L70 90 L30 90 Z" fill="#bbf7d0" opacity="0.5"/></svg>',
    testtube: '<svg viewBox="0 0 100 100"><path d="M40 10 L40 80 A10 10 0 0 0 60 80 L60 10 M35 10 L65 10" fill="none" stroke="#475569" stroke-width="3"/><path d="M40 50 L60 50 L60 80 A10 10 0 0 1 40 80 Z" fill="#ddd6fe" opacity="0.5"/></svg>',
    pipette: '<svg viewBox="0 0 100 100"><path d="M50 90 L50 40 M45 40 L55 40 L60 10 L40 10 Z" fill="none" stroke="#475569" stroke-width="3"/><circle cx="50" cy="85" r="3" fill="#3b82f6"/></svg>',
    microscope: '<svg viewBox="0 0 100 100"><path d="M30 90 L70 90 M50 90 L50 70 M50 70 L80 70 M50 70 Q30 70 30 40 L30 20 L50 20" fill="none" stroke="#1e293b" stroke-width="3"/><rect x="40" y="30" width="20" height="40" rx="2" fill="#94a3b8"/></svg>',
    petri: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="45" ry="40" fill="none" stroke="#94a3b8" stroke-width="2"/><ellipse cx="50" cy="50" rx="40" ry="35" fill="#f0fdf4" stroke="#86efac" stroke-width="1"/><circle cx="40" cy="45" r="5" fill="#22c55e" opacity="0.3"/><circle cx="60" cy="55" r="8" fill="#22c55e" opacity="0.3"/></svg>',
    syringe: '<svg viewBox="0 0 100 100"><rect x="40" y="20" width="20" height="50" stroke="#475569" fill="none" stroke-width="2"/><path d="M50 70 L50 95 M40 20 L60 20 M50 20 L50 5" stroke="#475569" stroke-width="2"/></svg>',
    molecule: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="15" fill="#3b82f6"/><circle cx="20" cy="20" r="10" fill="#60a5fa"/><circle cx="80" cy="20" r="10" fill="#60a5fa"/><circle cx="50" cy="85" r="10" fill="#60a5fa"/><line x1="50" y1="50" x2="20" y2="20" stroke="#1e3a8a" stroke-width="2"/><line x1="50" y1="50" x2="80" y2="20" stroke="#1e3a8a" stroke-width="2"/><line x1="50" y1="50" x2="50" y2="85" stroke="#1e3a8a" stroke-width="2"/></svg>',
    atom: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="8" fill="#ef4444"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#94a3b8" stroke-width="1"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#94a3b8" stroke-width="1" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#94a3b8" stroke-width="1" transform="rotate(120 50 50)"/></svg>'
};

class FigureStudio {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.canvasEl = document.getElementById('canvas');
        this.selectionLayer = document.getElementById('selection-layer');
        this.items = [];
        this.history = [];
        this.historyIndex = -1;
        this.selectedId = null;
        this.zoom = 1;
        this.dragState = null;
        this.idCounter = 0;

        this.init();
    }

    init() {
        this.setupLibrary();
        this.setupToolbar();
        this.setupEventListeners();
        this.saveState();
    }

    setupLibrary() {
        const lib = document.getElementById('icon-library');
        Object.entries(ICONS).forEach(([name, svg]) => {
            const div = document.createElement('div');
            div.className = 'icon';
            div.innerHTML = `${svg}<div class="icon-label">${name}</div>`;
            div.onclick = () => this.addItem('icon', { name });
            lib.appendChild(div);
        });
    }

    setupToolbar() {
        document.querySelectorAll('.toolbar button').forEach(btn => {
            btn.onclick = () => this.handleAction(btn.dataset.action);
        });

        document.getElementById('load-json').onchange = (e) => this.loadJSON(e);

        document.querySelectorAll('[data-template]').forEach(btn => {
            btn.onclick = () => this.loadTemplate(btn.dataset.template);
        });
    }

    setupEventListeners() {
        this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    handleAction(action) {
        switch(action) {
            case 'add-text': this.addItem('text', { text: 'Double click to edit' }); break;
            case 'add-rect': this.addItem('shape', { shape: 'rect' }); break;
            case 'add-ellipse': this.addItem('shape', { shape: 'ellipse' }); break;
            case 'add-line': this.addItem('shape', { shape: 'line' }); break;
            case 'add-arrow': this.addItem('shape', { shape: 'arrow' }); break;
            case 'duplicate': this.duplicateSelected(); break;
            case 'delete': this.deleteSelected(); break;
            case 'undo': this.undo(); break;
            case 'redo': this.redo(); break;
            case 'zoom-in': this.setZoom(this.zoom * 1.2); break;
            case 'zoom-out': this.setZoom(this.zoom / 1.2); break;
            case 'save-json': this.saveJSON(); break;
            case 'export-png': this.exportPNG(); break;
        }
    }

    addItem(type, props = {}) {
        const item = {
            id: ++this.idCounter,
            type,
            x: 100,
            y: 100,
            w: 100,
            h: 100,
            rotation: 0,
            ...props
        };

        if (type === 'icon') {
            item.w = 60;
            item.h = 60;
        } else if (type === 'text') {
            item.w = 150;
            item.h = 30;
            item.fontSize = 16;
            item.color = '#000000';
        } else if (type === 'shape') {
            item.color = '#3b82f6';
            item.strokeWidth = 2;
        }

        this.items.push(item);
        this.selectItem(item.id);
        this.render();
        this.saveState();
    }

    selectItem(id) {
        this.selectedId = id;
        this.renderSelection();
    }

    render() {
        this.canvasEl.innerHTML = '';
        this.items.forEach(item => {
            const el = document.createElement('div');
            el.className = `canvas-item ${item.id === this.selectedId ? 'selected' : ''}`;
            el.dataset.id = item.id;
            el.style.left = `${item.x}px`;
            el.style.top = `${item.y}px`;
            el.style.width = `${item.w}px`;
            el.style.height = `${item.h}px`;
            el.style.transform = `rotate(${item.rotation}deg)`;

            if (item.type === 'icon') {
                el.innerHTML = ICONS[item.name];
            } else if (item.type === 'text') {
                el.className += ' text-item';
                el.innerText = item.text;
                el.style.fontSize = `${item.fontSize}px`;
                el.style.color = item.color;
                el.ondblclick = (e) => this.editText(item, el);
            } else if (item.type === 'shape') {
                el.innerHTML = this.getShapeSVG(item);
            }

            this.canvasEl.appendChild(el);
        });
        this.renderSelection();
    }

    getShapeSVG(item) {
        if (item.shape === 'rect') return `<svg><rect x="5" y="5" width="90%" height="90%" fill="none" stroke="${item.color}" stroke-width="${item.strokeWidth}"/></svg>`;
        if (item.shape === 'ellipse') return `<svg><ellipse cx="50%" cy="50%" rx="45%" ry="45%" fill="none" stroke="${item.color}" stroke-width="${item.strokeWidth}"/></svg>`;
        if (item.shape === 'line') return `<svg><line x1="0" y1="0" x2="100%" y2="100%" stroke="${item.color}" stroke-width="${item.strokeWidth}"/></svg>`;
        if (item.shape === 'arrow') return `<svg><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${item.color}" /></marker></defs><line x1="0" y1="100%" x2="90%" y2="10%" stroke="${item.color}" stroke-width="${item.strokeWidth}" marker-end="url(#arrow)" /></svg>`;
        return '';
    }

    renderSelection() {
        this.selectionLayer.innerHTML = '';
        const item = this.items.find(i => i.id === this.selectedId);
        if (!item) return;

        const box = document.createElement('div');
        box.className = 'selection-box';
        box.style.left = `${item.x * this.zoom}px`;
        box.style.top = `${item.y * this.zoom}px`;
        box.style.width = `${item.w * this.zoom}px`;
        box.style.height = `${item.h * this.zoom}px`;
        box.style.transform = `rotate(${item.rotation}deg)`;

        const handles = ['nw', 'ne', 'sw', 'se', 'rotate'];
        handles.forEach(h => {
            const handle = document.createElement('div');
            handle.className = `selection-handle ${h}`;
            handle.dataset.handle = h;
            box.appendChild(handle);
        });

        this.selectionLayer.appendChild(box);
    }

    onMouseDown(e) {
        const handle = e.target.closest('.selection-handle');
        const canvasItem = e.target.closest('.canvas-item');

        if (handle) {
            const item = this.items.find(i => i.id === this.selectedId);
            this.dragState = {
                type: 'resize',
                handle: handle.dataset.handle,
                item,
                startX: e.clientX,
                startY: e.clientY,
                origX: item.x,
                origY: item.y,
                origW: item.w,
                origH: item.h,
                origRot: item.rotation
            };
        } else if (canvasItem) {
            const id = parseInt(canvasItem.dataset.id);
            this.selectItem(id);
            const item = this.items.find(i => i.id === id);
            this.dragState = {
                type: 'move',
                item,
                startX: e.clientX,
                startY: e.clientY,
                origX: item.x,
                origY: item.y
            };
        } else {
            this.selectedId = null;
            this.renderSelection();
        }
    }

    onMouseMove(e) {
        if (!this.dragState) return;

        const dx = (e.clientX - this.dragState.startX) / this.zoom;
        const dy = (e.clientY - this.dragState.startY) / this.zoom;
        const { item, type, handle } = this.dragState;

        if (type === 'move') {
            item.x = this.dragState.origX + dx;
            item.y = this.dragState.origY + dy;
        } else if (type === 'resize') {
            if (handle === 'rotate') {
                const rect = this.container.getBoundingClientRect();
                const centerX = rect.left + (item.x + item.w / 2) * this.zoom;
                const centerY = rect.top + (item.y + item.h / 2) * this.zoom;
                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
                item.rotation = angle * (180 / Math.PI) + 90;
            } else {
                if (handle.includes('e')) item.w = Math.max(10, this.dragState.origW + dx);
                if (handle.includes('s')) item.h = Math.max(10, this.dragState.origH + dy);
                if (handle.includes('w')) {
                    const newW = Math.max(10, this.dragState.origW - dx);
                    item.x = this.dragState.origX + (this.dragState.origW - newW);
                    item.w = newW;
                }
                if (handle.includes('n')) {
                    const newH = Math.max(10, this.dragState.origH - dy);
                    item.y = this.dragState.origY + (this.dragState.origH - newH);
                    item.h = newH;
                }
            }
        }

        this.render();
    }

    onMouseUp() {
        if (this.dragState) {
            this.saveState();
            this.dragState = null;
        }
    }

    onKeyDown(e) {
        if (e.target.tagName === 'INPUT' || e.target.contentEditable === 'true') return;

        if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); this.deleteSelected(); }
        if (e.ctrlKey && e.key === 'z') this.undo();
        if (e.ctrlKey && e.key === 'y') this.redo();
        if (e.ctrlKey && e.key === 'd') { e.preventDefault(); this.duplicateSelected(); }
    }

    editText(item, el) {
        el.contentEditable = 'true';
        el.className += ' editing';
        el.focus();
        const onBlur = () => {
            item.text = el.innerText;
            el.contentEditable = 'false';
            el.classList.remove('editing');
            el.removeEventListener('blur', onBlur);
            this.saveState();
        };
        el.addEventListener('blur', onBlur);
    }

    duplicateSelected() {
        const item = this.items.find(i => i.id === this.selectedId);
        if (item) {
            const { id, ...rest } = item;
            this.addItem(item.type, { ...rest, x: item.x + 20, y: item.y + 20 });
        }
    }

    deleteSelected() {
        this.items = this.items.filter(i => i.id !== this.selectedId);
        this.selectedId = null;
        this.render();
        this.saveState();
    }

    setZoom(val) {
        this.zoom = Math.max(0.1, Math.min(5, val));
        this.canvasEl.style.transform = `scale(${this.zoom})`;
        this.renderSelection();
    }

    saveState() {
        const state = JSON.stringify(this.items);
        if (this.history[this.historyIndex] === state) return;

        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        this.historyIndex++;
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.items = JSON.parse(this.history[this.historyIndex]);
            this.render();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.items = JSON.parse(this.history[this.historyIndex]);
            this.render();
        }
    }

    saveJSON() {
        const blob = new Blob([JSON.stringify(this.items, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `figure-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
    }

    loadJSON(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                this.items = JSON.parse(event.target.result);
                this.idCounter = Math.max(0, ...this.items.map(i => i.id)) || 0;
                this.selectedId = null;
                this.render();
                this.saveState();
            } catch (err) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }

    async exportPNG() {
        const scale = 2;
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        for (const item of this.items) {
            ctx.save();
            ctx.translate(item.x + item.w / 2, item.y + item.h / 2);
            ctx.rotate(item.rotation * Math.PI / 180);
            ctx.translate(-item.w / 2, -item.h / 2);

            if (item.type === 'icon') {
                const svgString = ICONS[item.name];
                const img = await this.svgToImage(svgString, item.w, item.h);
                ctx.drawImage(img, 0, 0, item.w, item.h);
            } else if (item.type === 'text') {
                ctx.fillStyle = item.color;
                ctx.font = `${item.fontSize}px sans-serif`;
                ctx.textBaseline = 'top';
                ctx.fillText(item.text, 0, 0);
            } else if (item.type === 'shape') {
                ctx.strokeStyle = item.color;
                ctx.lineWidth = item.strokeWidth;
                if (item.shape === 'rect') {
                    ctx.strokeRect(5, 5, item.w - 10, item.h - 10);
                } else if (item.shape === 'ellipse') {
                    ctx.beginPath();
                    ctx.ellipse(item.w / 2, item.h / 2, item.w / 2 - 5, item.h / 2 - 5, 0, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (item.shape === 'line') {
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(item.w, item.h);
                    ctx.stroke();
                } else if (item.shape === 'arrow') {
                    this.drawArrow(ctx, 0, item.h, item.w * 0.9, item.h * 0.1, item.color, item.strokeWidth);
                }
            }
            ctx.restore();
        }

        const data = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = data;
        a.download = 'figure-export.png';
        a.click();
    }

    drawArrow(ctx, fromx, fromy, tox, toy, color, width) {
        const headlen = 10;
        const angle = Math.atan2(toy - fromy, tox - fromx);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    svgToImage(svgString, w, h) {
        return new Promise((resolve) => {
            const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svg);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.src = url;
        });
    }

    loadTemplate(name) {
        this.items = [];
        if (name === 'pathway') {
            this.items = [
                { id: 1, type: 'icon', name: 'cell', x: 50, y: 50, w: 400, h: 400, rotation: 0 },
                { id: 2, type: 'icon', name: 'nucleus', x: 150, y: 150, w: 200, h: 200, rotation: 0 },
                { id: 3, type: 'icon', name: 'virus', x: 20, y: 20, w: 40, h: 40, rotation: 0 },
                { id: 4, type: 'shape', shape: 'arrow', x: 60, y: 40, w: 100, h: 100, rotation: 0, color: '#ef4444', strokeWidth: 3 },
                { id: 5, type: 'text', text: 'Viral Entry', x: 70, y: 20, w: 100, h: 20, rotation: 0, fontSize: 14, color: '#000' },
                { id: 6, type: 'icon', name: 'dna', x: 180, y: 180, w: 140, h: 140, rotation: 45 }
            ];
        } else if (name === 'workflow') {
            this.items = [
                { id: 1, type: 'icon', name: 'flask', x: 50, y: 100, w: 60, h: 60, rotation: 0 },
                { id: 2, type: 'icon', name: 'pipette', x: 150, y: 100, w: 60, h: 60, rotation: 0 },
                { id: 3, type: 'icon', name: 'beaker', x: 250, y: 100, w: 60, h: 60, rotation: 0 },
                { id: 4, type: 'shape', shape: 'arrow', x: 110, y: 130, w: 40, h: 10, rotation: 0, color: '#333', strokeWidth: 2 },
                { id: 5, type: 'shape', shape: 'arrow', x: 210, y: 130, w: 40, h: 10, rotation: 0, color: '#333', strokeWidth: 2 },
                { id: 6, type: 'text', text: 'Sample Prep Workflow', x: 50, y: 50, w: 300, h: 30, rotation: 0, fontSize: 18, color: '#111' }
            ];
        } else if (name === 'study') {
            this.items = [
                { id: 1, type: 'shape', shape: 'rect', x: 50, y: 50, w: 100, h: 50, rotation: 0, color: '#3b82f6', strokeWidth: 2 },
                { id: 2, type: 'shape', shape: 'rect', x: 200, y: 20, w: 100, h: 50, rotation: 0, color: '#10b981', strokeWidth: 2 },
                { id: 3, type: 'shape', shape: 'rect', x: 200, y: 80, w: 100, h: 50, rotation: 0, color: '#f59e0b', strokeWidth: 2 },
                { id: 4, type: 'shape', shape: 'arrow', x: 150, y: 45, w: 50, h: 30, rotation: 0, color: '#333', strokeWidth: 1 },
                { id: 5, type: 'shape', shape: 'arrow', x: 150, y: 75, w: 50, h: 30, rotation: 0, color: '#333', strokeWidth: 1 },
                { id: 6, type: 'text', text: 'Randomized Trial Design', x: 50, y: 150, w: 250, h: 30, rotation: 0, fontSize: 16, color: '#000' }
            ];
        }
        this.idCounter = 6;
        this.selectedId = null;
        this.render();
        this.saveState();
    }
}

const studio = new FigureStudio();
window.app = studio; // For debugging and console access
