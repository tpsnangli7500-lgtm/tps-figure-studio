/**
 * TPS Figure Studio v2 - BioRender-level figure builder
 * Vanilla JS, no dependencies. Backward compatible with v1 item format:
 * {id, type:'icon'|'text'|'shape', x, y, w, h, rotation, name?, text?,
 *  fontSize?, color?, shape?, strokeWidth?} - all new fields optional.
 */

// Generated phospholipid bilayer strip (heads + tails), any viewBox size.
function membraneStripSVG(vw, vh) {
    const headsTop = [], headsBot = [], tails = [];
    const n = Math.max(3, Math.floor(vw / 16));
    const step = vw / n;
    const headY1 = vh * 0.30, headY2 = vh * 0.70, r = Math.min(step, vh) * 0.30;
    for (let i = 0; i < n; i++) {
        const cx = step * (i + 0.5);
        headsTop.push(`<circle cx="${cx.toFixed(1)}" cy="${headY1}" r="${r.toFixed(1)}" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>`);
        headsBot.push(`<circle cx="${cx.toFixed(1)}" cy="${headY2}" r="${r.toFixed(1)}" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>`);
        tails.push(`<path d="M${(cx - r * 0.4).toFixed(1)} ${headY1 + r} q2 ${vh * 0.12} 0 ${vh * 0.20} M${(cx + r * 0.4).toFixed(1)} ${headY1 + r} q-2 ${vh * 0.12} 0 ${vh * 0.20}" fill="none" stroke="#b45309" stroke-width="1.5"/>`);
        tails.push(`<path d="M${(cx - r * 0.4).toFixed(1)} ${headY2 - r} q2 ${-vh * 0.12} 0 ${-vh * 0.20} M${(cx + r * 0.4).toFixed(1)} ${headY2 - r} q-2 ${-vh * 0.12} 0 ${-vh * 0.20}" fill="none" stroke="#b45309" stroke-width="1.5"/>`);
    }
    return `<svg viewBox="0 0 ${vw} ${vh}">${tails.join('')}${headsTop.join('')}${headsBot.join('')}</svg>`;
}

const ICONS = {
    // ---- Cells & Organelles ----
    cell: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#f0f9ff" stroke="#0ea5e9" stroke-width="2"/><circle cx="50" cy="50" r="20" fill="#e0f2fe" stroke="#0ea5e9" stroke-dasharray="4 2"/><path d="M70 30 Q75 40 70 50" fill="none" stroke="#0ea5e9" stroke-width="1"/><circle cx="45" cy="45" r="5" fill="#0ea5e9"/></svg>',
    nucleus: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#fdf2f8" stroke="#db2777" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="#db2777"/><path d="M40 20 A35 35 0 0 1 80 50" fill="none" stroke="#db2777" stroke-width="1" stroke-dasharray="2 2"/></svg>',
    mitochondria: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="45" ry="25" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><path d="M15 50 Q25 35 35 50 Q45 65 55 50 Q65 35 75 50 Q85 65 90 50" fill="none" stroke="#10b981" stroke-width="2"/></svg>',
    golgi: '<svg viewBox="0 0 100 100"><path d="M20 30 Q50 15 80 30 M18 45 Q50 30 82 45 M20 60 Q50 45 80 60 M25 75 Q50 62 75 75" fill="none" stroke="#d97706" stroke-width="5" stroke-linecap="round"/><circle cx="28" cy="86" r="5" fill="#fbbf24"/><circle cx="72" cy="86" r="4" fill="#fbbf24"/><circle cx="85" cy="52" r="4" fill="#fde68a" stroke="#d97706"/></svg>',
    ribosome: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="38" rx="26" ry="16" fill="#c4b5fd" stroke="#7c3aed" stroke-width="2"/><path d="M26 62 Q50 48 74 62 L70 76 Q50 86 30 76 Z" fill="#a78bfa" stroke="#7c3aed" stroke-width="2"/><path d="M15 30 L85 30" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3 3"/></svg>',
    lysosome: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><circle cx="40" cy="42" r="5" fill="#f59e0b"/><circle cx="60" cy="38" r="4" fill="#d97706"/><circle cx="52" cy="58" r="6" fill="#fbbf24"/><circle cx="38" cy="62" r="3" fill="#d97706"/><circle cx="64" cy="60" r="3" fill="#f59e0b"/><path d="M50 14 L50 8 M86 50 L92 50 M50 86 L50 92 M14 50 L8 50" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/></svg>',
    vacuole: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#f0f9ff" stroke="#38bdf8" stroke-width="2"/><circle cx="44" cy="46" r="26" fill="#bae6fd" opacity="0.7"/><circle cx="66" cy="66" r="9" fill="#e0f2fe" stroke="#38bdf8"/><path d="M28 30 Q36 22 46 24" fill="none" stroke="#7dd3fc" stroke-width="3" stroke-linecap="round"/></svg>',
    chloroplast: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="44" ry="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><ellipse cx="50" cy="50" rx="36" ry="20" fill="none" stroke="#22c55e" stroke-width="1.5"/><path d="M28 42 h18 M28 52 h22 M28 62 h16 M56 40 h16 M54 58 h18" stroke="#15803d" stroke-width="4" stroke-linecap="round"/><circle cx="74" cy="62" r="4" fill="#facc15"/></svg>',
    endoplasmic: '<svg viewBox="0 0 100 100"><path d="M15 25 Q35 15 50 25 T85 25 M15 42 Q35 32 50 42 T85 42 M15 59 Q35 49 50 59 T85 59 M15 76 Q35 66 50 76 T85 76" fill="none" stroke="#0ea5e9" stroke-width="3"/><circle cx="30" cy="20" r="3" fill="#0369a1"/><circle cx="62" cy="37" r="3" fill="#0369a1"/><circle cx="42" cy="54" r="3" fill="#0369a1"/><circle cx="70" cy="71" r="3" fill="#0369a1"/><circle cx="24" cy="70" r="3" fill="#0369a1"/></svg>',
    cytoskeleton: '<svg viewBox="0 0 100 100"><path d="M10 85 Q40 40 90 20 M10 20 Q50 55 88 80 M30 92 Q45 45 60 8 M5 55 Q50 45 95 52" fill="none" stroke="#e879f9" stroke-width="2.5"/><circle cx="45" cy="48" r="5" fill="#a21caf"/><circle cx="66" cy="38" r="4" fill="#a21caf"/><circle cx="30" cy="60" r="4" fill="#a21caf"/></svg>',
    vesicle: '<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="28" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/><circle cx="50" cy="52" r="8" fill="#eab308"/><path d="M50 24 L50 14 M72 32 L79 25 M78 52 L88 52 M72 72 L79 79 M50 80 L50 90 M28 72 L21 79 M22 52 L12 52 M28 32 L21 25" stroke="#ca8a04" stroke-width="2.5" stroke-linecap="round"/></svg>',
    peroxisome: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#f0fdfa" stroke="#0d9488" stroke-width="3"/><path d="M35 35 L65 65 M65 35 L35 65 M50 30 L50 70 M30 50 L70 50" stroke="#14b8a6" stroke-width="2"/><rect x="44" y="44" width="12" height="12" fill="#0d9488" transform="rotate(45 50 50)"/></svg>',
    membrane: membraneStripSVG(100, 100),
    plasmid: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="34" fill="none" stroke="#0891b2" stroke-width="5"/><path d="M50 16 v10 M84 50 h-10 M50 84 v-10 M16 50 h10" stroke="#164e63" stroke-width="4"/><path d="M38 38 L28 28 M62 38 L72 28" stroke="#0891b2" stroke-width="3"/></svg>',
    // ---- Organs & Body ----
    heart: '<svg viewBox="0 0 100 100"><path d="M50 80 C20 60 10 40 10 25 A15 15 0 0 1 40 25 A15 15 0 0 1 70 25 C70 40 60 60 50 80" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/></svg>',
    brain: '<svg viewBox="0 0 100 100"><path d="M30 50 C10 50 10 20 30 20 C40 20 40 10 60 10 C80 10 90 30 80 50 C90 50 90 80 70 80 C60 80 60 90 40 90 C20 90 20 70 30 50" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/><path d="M50 20 Q50 80 50 80" fill="none" stroke="#db2777" stroke-width="1" stroke-dasharray="2 2"/></svg>',
    liver: '<svg viewBox="0 0 100 100"><path d="M10 50 C10 20 60 10 90 40 C90 70 50 90 10 50" fill="#fff7ed" stroke="#9a3412" stroke-width="2"/></svg>',
    lung: '<svg viewBox="0 0 100 100"><path d="M45 20 C20 20 10 50 20 80 C30 90 45 80 45 60" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><path d="M55 20 C80 20 90 50 80 80 C70 90 55 80 55 60" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><path d="M45 20 L55 20 L50 10 Z" fill="#dc2626"/></svg>',
    kidney: '<svg viewBox="0 0 100 100"><path d="M40 20 C10 30 10 70 40 80 C50 80 50 20 40 20" fill="#fff7ed" stroke="#7c2d12" stroke-width="2"/><path d="M60 20 C90 30 90 70 60 80 C50 80 50 20 60 20" fill="#fff7ed" stroke="#7c2d12" stroke-width="2"/></svg>',
    stomach: '<svg viewBox="0 0 100 100"><path d="M38 12 v18 C20 38 22 66 44 76 C64 84 84 72 82 54 C81 44 72 40 66 46 C72 30 62 22 52 24 L52 12 Z" fill="#ffe4e6" stroke="#e11d48" stroke-width="2.5"/><path d="M34 58 Q50 68 66 58" fill="none" stroke="#fb7185" stroke-width="2"/></svg>',
    intestine: '<svg viewBox="0 0 100 100"><path d="M25 20 h50 v14 H38 v12 h37 v14 H25 v14 h50" fill="none" stroke="#f472b6" stroke-width="9" stroke-linecap="round"/><path d="M25 20 h50 v14 H38 v12 h37 v14 H25 v14 h50" fill="none" stroke="#fbcfe8" stroke-width="3" stroke-dasharray="4 6"/></svg>',
    eye: '<svg viewBox="0 0 100 100"><path d="M6 50 Q50 14 94 50 Q50 86 6 50 Z" fill="#ffffff" stroke="#334155" stroke-width="2.5"/><circle cx="50" cy="50" r="17" fill="#38bdf8" stroke="#0369a1" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="#0f172a"/><circle cx="55" cy="44" r="3" fill="#ffffff"/></svg>',
    ear: '<svg viewBox="0 0 100 100"><path d="M62 10 C34 10 24 32 26 48 C27 62 38 66 42 76 C45 86 56 90 64 84" fill="none" stroke="#d97706" stroke-width="5" stroke-linecap="round"/><path d="M58 28 C44 30 38 42 42 52 C44 58 50 60 54 56" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/></svg>',
    tooth: '<svg viewBox="0 0 100 100"><path d="M28 14 h44 C84 14 88 26 84 38 C80 50 76 84 68 84 C60 84 62 62 50 62 C38 62 40 84 32 84 C24 84 20 50 16 38 C12 26 16 14 28 14 Z" fill="#ffffff" stroke="#64748b" stroke-width="2.5"/><path d="M30 30 Q50 40 70 30" fill="none" stroke="#cbd5e1" stroke-width="2"/></svg>',
    muscle: '<svg viewBox="0 0 100 100"><path d="M15 22 Q35 14 50 22 T85 22 M15 50 Q35 42 50 50 T85 50 M15 78 Q35 70 50 78 T85 78" fill="none" stroke="#dc2626" stroke-width="7" stroke-linecap="round"/><path d="M28 12 v76 M50 10 v80 M72 12 v76" stroke="#fca5a5" stroke-width="2"/></svg>',
    skin: '<svg viewBox="0 0 100 100"><path d="M8 38 Q24 30 40 38 T72 38 T95 36" fill="none" stroke="#b45309" stroke-width="4"/><path d="M8 56 Q24 48 40 56 T72 56 T95 54" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M8 76 Q24 68 40 76 T72 76 T95 74" fill="none" stroke="#fcd34d" stroke-width="3"/><path d="M30 32 L26 12 M55 30 L56 10 M78 31 L84 13" stroke="#92400e" stroke-width="3" stroke-linecap="round"/></svg>',
    spleen: '<svg viewBox="0 0 100 100"><path d="M22 24 C50 8 82 20 84 46 C86 74 56 90 32 80 C14 72 8 38 22 24 Z" fill="#ede9fe" stroke="#6d28d9" stroke-width="2.5"/><path d="M80 40 q-10 10 0 22" fill="none" stroke="#6d28d9" stroke-width="2.5"/><circle cx="40" cy="44" r="4" fill="#8b5cf6"/><circle cx="56" cy="60" r="4" fill="#8b5cf6"/><circle cx="38" cy="64" r="3" fill="#a78bfa"/></svg>',
    pancreas: '<svg viewBox="0 0 100 100"><path d="M12 56 C10 40 26 32 40 38 L78 26 C90 23 94 34 88 42 L60 62 C44 74 16 72 12 56 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/><path d="M24 52 Q48 44 78 34" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="4 3"/><circle cx="38" cy="50" r="3" fill="#f59e0b"/><circle cx="58" cy="44" r="3" fill="#f59e0b"/></svg>',
    bladder: '<svg viewBox="0 0 100 100"><path d="M50 22 C68 22 78 38 78 54 C78 74 66 86 50 86 C34 86 22 74 22 54 C22 38 32 22 50 22 Z" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/><path d="M40 24 L28 8 M60 24 L72 8 M50 86 v8" stroke="#a16207" stroke-width="3" fill="none"/></svg>',
    spine: '<svg viewBox="0 0 100 100"><g fill="#e2e8f0" stroke="#64748b" stroke-width="2"><rect x="34" y="8" width="32" height="12" rx="4"/><rect x="32" y="26" width="36" height="13" rx="4"/><rect x="30" y="45" width="40" height="14" rx="4"/><rect x="32" y="65" width="36" height="13" rx="4"/><rect x="35" y="83" width="30" height="11" rx="4"/></g></svg>',
    artery: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#fecaca" stroke="#b91c1c" stroke-width="3"/><circle cx="50" cy="50" r="30" fill="#fca5a5"/><circle cx="50" cy="50" r="20" fill="#fff7ed"/><circle cx="44" cy="46" r="4" fill="#dc2626"/><circle cx="58" cy="55" r="3" fill="#dc2626"/><circle cx="50" cy="60" r="2.5" fill="#ef4444"/></svg>',
    blood: '<svg viewBox="0 0 100 100"><path d="M50 10 C50 10 20 50 20 70 A30 30 0 0 0 80 70 C80 50 50 10 50 10" fill="#fee2e2" stroke="#b91c1c" stroke-width="2"/></svg>',
    bone: '<svg viewBox="0 0 100 100"><path d="M30 30 A10 10 0 1 1 30 50 L70 50 A10 10 0 1 1 70 30" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/><path d="M30 70 A10 10 0 1 0 30 50 L70 50 A10 10 0 1 0 70 70" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/></svg>',
    // ---- Molecules & Proteins ----
    dna: '<svg viewBox="0 0 100 100"><path d="M30 10 Q70 10 70 30 Q30 30 30 50 Q70 50 70 70 Q30 70 30 90" fill="none" stroke="#6366f1" stroke-width="4"/><path d="M70 10 Q30 10 30 30 Q70 30 70 50 Q30 50 30 70 Q70 70 70 90" fill="none" stroke="#818cf8" stroke-width="4" stroke-dasharray="4 2"/></svg>',
    rna: '<svg viewBox="0 0 100 100"><path d="M25 88 Q20 50 40 34 Q62 17 78 30" fill="none" stroke="#0891b2" stroke-width="4"/><path d="M30 66 L46 60 M34 50 L51 46 M44 36 L58 42 M58 26 L68 38" stroke="#22d3ee" stroke-width="3"/><circle cx="78" cy="30" r="5" fill="#0891b2"/><path d="M25 88 l-6 6 M25 88 l8 4" stroke="#0891b2" stroke-width="3"/></svg>',
    protein: '<svg viewBox="0 0 100 100"><path d="M20 50 C20 20 40 20 50 50 C60 80 80 80 80 50" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/><circle cx="20" cy="50" r="6" fill="#f59e0b"/><circle cx="50" cy="50" r="6" fill="#f59e0b"/><circle cx="80" cy="50" r="6" fill="#f59e0b"/></svg>',
    enzyme: '<svg viewBox="0 0 100 100"><path d="M20 50 A30 30 0 1 1 80 50 L60 50 A10 10 0 1 0 40 50 Z" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/></svg>',
    antibody: '<svg viewBox="0 0 100 100"><path d="M50 90 L50 50 M50 50 L20 20 M50 50 L80 20" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/><path d="M25 25 L15 15 M75 25 L85 15" fill="none" stroke="#fca5a5" stroke-width="4"/></svg>',
    molecule: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="15" fill="#3b82f6"/><circle cx="20" cy="20" r="10" fill="#60a5fa"/><circle cx="80" cy="20" r="10" fill="#60a5fa"/><circle cx="50" cy="85" r="10" fill="#60a5fa"/><line x1="50" y1="50" x2="20" y2="20" stroke="#1e3a8a" stroke-width="2"/><line x1="50" y1="50" x2="80" y2="20" stroke="#1e3a8a" stroke-width="2"/><line x1="50" y1="50" x2="50" y2="85" stroke="#1e3a8a" stroke-width="2"/></svg>',
    atom: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="8" fill="#ef4444"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#94a3b8" stroke-width="1"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#94a3b8" stroke-width="1" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#94a3b8" stroke-width="1" transform="rotate(120 50 50)"/></svg>',
    aminoacid: '<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="13" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/><path d="M50 39 V18 M42 62 L24 78 M58 62 L76 78" stroke="#b45309" stroke-width="3"/><circle cx="50" cy="12" r="6" fill="#38bdf8"/><circle cx="20" cy="84" r="6" fill="#f87171"/><circle cx="80" cy="84" r="6" fill="#34d399"/></svg>',
    lipid: '<svg viewBox="0 0 100 100"><circle cx="50" cy="26" r="15" fill="#fbbf24" stroke="#b45309" stroke-width="2.5"/><path d="M42 40 q-4 22 2 44 M58 40 q4 22 -2 44" fill="none" stroke="#b45309" stroke-width="3"/></svg>',
    benzene: '<svg viewBox="0 0 100 100"><path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" fill="#f0fdf4" stroke="#15803d" stroke-width="3"/><circle cx="50" cy="50" r="17" fill="none" stroke="#15803d" stroke-width="2.5"/></svg>',
    glucose: '<svg viewBox="0 0 100 100"><path d="M50 12 L84 31 L84 69 L50 88 L16 69 L16 31 Z" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/><path d="M50 12 V30 M84 31 L68 42 M84 69 L66 64 M50 88 V70 M16 69 L34 64 M16 31 L32 42" stroke="#7c3aed" stroke-width="2.5"/><circle cx="50" cy="50" r="7" fill="#c4b5fd"/></svg>',
    atp: '<svg viewBox="0 0 100 100"><circle cx="22" cy="50" r="12" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/><circle cx="50" cy="50" r="12" fill="#fdba74" stroke="#c2410c" stroke-width="2"/><circle cx="78" cy="50" r="12" fill="#fde68a" stroke="#a16207" stroke-width="2"/><path d="M34 50 h4 M62 50 h4" stroke="#334155" stroke-width="3"/><path d="M14 22 L30 36 M86 22 L72 36" stroke="#94a3b8" stroke-width="2"/></svg>',
    receptor: '<svg viewBox="0 0 100 100"><path d="M32 8 v26 q0 10 9 10 t9 -10 V8 M50 8 v26 q0 10 9 10 t9 -10 V8" fill="none" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/><path d="M10 66 h80 M10 84 h80" stroke="#fbbf24" stroke-width="4"/><circle cx="22" cy="75" r="4" fill="#f59e0b"/><circle cx="42" cy="75" r="4" fill="#f59e0b"/><circle cx="62" cy="75" r="4" fill="#f59e0b"/><circle cx="80" cy="75" r="4" fill="#f59e0b"/><path d="M41 44 v22 M59 44 v22" stroke="#7c3aed" stroke-width="4"/></svg>',
    channel: '<svg viewBox="0 0 100 100"><rect x="22" y="14" width="16" height="72" rx="6" fill="#a5b4fc" stroke="#4338ca" stroke-width="2"/><rect x="62" y="14" width="16" height="72" rx="6" fill="#a5b4fc" stroke="#4338ca" stroke-width="2"/><circle cx="50" cy="34" r="6" fill="#facc15" stroke="#a16207"/><circle cx="50" cy="56" r="6" fill="#facc15" stroke="#a16207"/><path d="M8 14 h84 M8 86 h84" stroke="#fbbf24" stroke-width="3"/></svg>',
    hormone: '<svg viewBox="0 0 100 100"><path d="M50 10 L88 38 L72 86 L28 86 L12 38 Z" fill="#fdf2f8" stroke="#be185d" stroke-width="3"/><circle cx="50" cy="52" r="11" fill="#f9a8d4" stroke="#be185d" stroke-width="2"/><path d="M50 10 v14 M88 38 L68 46 M28 86 L40 62 M72 86 L60 62 M12 38 L32 46" stroke="#be185d" stroke-width="1.5"/></svg>',
    neurotransmitter: '<svg viewBox="0 0 100 100"><path d="M14 14 h72 v22 q-36 12 -72 0 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/><path d="M14 86 h72 V64 q-36 -12 -72 0 Z" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/><circle cx="34" cy="50" r="5" fill="#f59e0b"/><circle cx="52" cy="44" r="5" fill="#f59e0b"/><circle cx="64" cy="54" r="5" fill="#f59e0b"/><circle cx="44" cy="58" r="4" fill="#fbbf24"/></svg>',
    // ---- Microbes ----
    virus: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><path d="M50 20 L50 5 M80 50 L95 50 M50 80 L50 95 M20 50 L5 50 M71 29 L82 18 M71 71 L82 82 M29 71 L18 82 M29 29 L18 18" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/></svg>',
    bacteria: '<svg viewBox="0 0 100 100"><rect x="20" y="35" width="60" height="30" rx="15" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/><path d="M80 50 L95 40 M80 50 L95 50 M80 50 L95 60" fill="none" stroke="#16a34a" stroke-width="2"/><circle cx="35" cy="50" r="3" fill="#16a34a"/><circle cx="50" cy="45" r="3" fill="#16a34a"/><circle cx="65" cy="50" r="3" fill="#16a34a"/></svg>',
    bacteriophage: '<svg viewBox="0 0 100 100"><path d="M50 6 L74 20 L74 42 L26 42 L26 20 Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.5"/><path d="M44 42 h12 l3 22 h-18 Z" fill="#bae6fd" stroke="#0369a1" stroke-width="2"/><path d="M41 64 L26 88 M59 64 L74 88 M50 64 v24 M38 64 L34 84 M62 64 L66 84" stroke="#0369a1" stroke-width="2.5" fill="none"/></svg>',
    fungus: '<svg viewBox="0 0 100 100"><path d="M8 46 C8 22 30 10 50 10 C70 10 92 22 92 46 C70 38 30 38 8 46 Z" fill="#fca5a5" stroke="#b91c1c" stroke-width="2.5"/><path d="M40 44 L36 84 C36 90 64 90 64 84 L60 44 Z" fill="#fff7ed" stroke="#b91c1c" stroke-width="2"/><circle cx="36" cy="26" r="5" fill="#ffffff"/><circle cx="62" cy="20" r="4" fill="#ffffff"/><circle cx="56" cy="32" r="3" fill="#ffffff"/></svg>',
    yeast: '<svg viewBox="0 0 100 100"><ellipse cx="46" cy="56" rx="30" ry="34" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/><circle cx="70" cy="28" r="14" fill="#fde68a" stroke="#d97706" stroke-width="2.5"/><circle cx="40" cy="50" r="8" fill="none" stroke="#f59e0b" stroke-width="2"/><circle cx="56" cy="66" r="5" fill="#fbbf24"/></svg>',
    protozoa: '<svg viewBox="0 0 100 100"><path d="M30 22 C48 8 62 20 70 16 C86 8 92 28 82 38 C96 48 88 66 74 66 C80 82 60 92 48 82 C32 94 14 82 20 66 C4 58 10 40 22 38 C14 28 20 26 30 22 Z" fill="#ecfdf5" stroke="#059669" stroke-width="2.5"/><circle cx="50" cy="50" r="10" fill="#a7f3d0" stroke="#059669" stroke-width="2"/><circle cx="34" cy="34" r="4" fill="#6ee7b7"/></svg>',
    spirochete: '<svg viewBox="0 0 100 100"><path d="M8 50 q8 -22 16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/><path d="M8 50 q8 -22 16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#c4b5fd" stroke-width="2"/></svg>',
    cocci: '<svg viewBox="0 0 100 100"><g fill="#fce7f3" stroke="#be185d" stroke-width="2"><circle cx="32" cy="32" r="14"/><circle cx="58" cy="26" r="12"/><circle cx="72" cy="48" r="13"/><circle cx="52" cy="58" r="14"/><circle cx="28" cy="58" r="11"/><circle cx="40" cy="78" r="10"/><circle cx="66" cy="76" r="10"/></g></svg>',
    bacilli: '<svg viewBox="0 0 100 100"><g stroke="#0f766e" stroke-width="2.5"><rect x="14" y="18" width="52" height="16" rx="8" fill="#ccfbf1"/><rect x="30" y="44" width="56" height="16" rx="8" fill="#99f6e4"/><rect x="12" y="70" width="50" height="16" rx="8" fill="#5eead4"/></g><circle cx="30" cy="26" r="3" fill="#0f766e"/><circle cx="52" cy="52" r="3" fill="#0f766e"/><circle cx="28" cy="78" r="3" fill="#0f766e"/></svg>',
    algae: '<svg viewBox="0 0 100 100"><path d="M50 50 m-6 0 a6 6 0 1 1 12 0 a10 10 0 1 1 -20 0 a16 16 0 1 1 32 0 a22 22 0 1 1 -44 0 a28 28 0 1 1 56 0" fill="none" stroke="#16a34a" stroke-width="4"/><circle cx="50" cy="50" r="3" fill="#166534"/></svg>',
    // ---- Lab Equipment ----
    flask: '<svg viewBox="0 0 100 100"><path d="M40 10 L60 10 M50 10 L50 40 L20 90 L80 90 L50 40" fill="none" stroke="#475569" stroke-width="3" stroke-linejoin="round"/><path d="M28 75 L72 75 L80 90 L20 90 Z" fill="#bae6fd" opacity="0.5"/></svg>',
    beaker: '<svg viewBox="0 0 100 100"><path d="M30 10 L30 90 L70 90 L70 10 M25 10 L35 10" fill="none" stroke="#475569" stroke-width="3"/><path d="M30 60 L70 60 L70 90 L30 90 Z" fill="#bbf7d0" opacity="0.5"/></svg>',
    testtube: '<svg viewBox="0 0 100 100"><path d="M40 10 L40 80 A10 10 0 0 0 60 80 L60 10 M35 10 L65 10" fill="none" stroke="#475569" stroke-width="3"/><path d="M40 50 L60 50 L60 80 A10 10 0 0 1 40 80 Z" fill="#ddd6fe" opacity="0.5"/></svg>',
    pipette: '<svg viewBox="0 0 100 100"><path d="M50 90 L50 40 M45 40 L55 40 L60 10 L40 10 Z" fill="none" stroke="#475569" stroke-width="3"/><circle cx="50" cy="85" r="3" fill="#3b82f6"/></svg>',
    microscope: '<svg viewBox="0 0 100 100"><path d="M30 90 L70 90 M50 90 L50 70 M50 70 L80 70 M50 70 Q30 70 30 40 L30 20 L50 20" fill="none" stroke="#1e293b" stroke-width="3"/><rect x="40" y="30" width="20" height="40" rx="2" fill="#94a3b8"/></svg>',
    petri: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="45" ry="40" fill="none" stroke="#94a3b8" stroke-width="2"/><ellipse cx="50" cy="50" rx="40" ry="35" fill="#f0fdf4" stroke="#86efac" stroke-width="1"/><circle cx="40" cy="45" r="5" fill="#22c55e" opacity="0.3"/><circle cx="60" cy="55" r="8" fill="#22c55e" opacity="0.3"/></svg>',
    syringe: '<svg viewBox="0 0 100 100"><rect x="40" y="20" width="20" height="50" stroke="#475569" fill="none" stroke-width="2"/><path d="M50 70 L50 95 M40 20 L60 20 M50 20 L50 5" stroke="#475569" stroke-width="2"/></svg>',
    centrifuge: '<svg viewBox="0 0 100 100"><rect x="14" y="22" width="72" height="62" rx="8" fill="#e2e8f0" stroke="#475569" stroke-width="2.5"/><circle cx="50" cy="48" r="17" fill="#ffffff" stroke="#64748b" stroke-width="2"/><circle cx="50" cy="48" r="4" fill="#475569"/><path d="M50 48 L40 36 M50 48 L62 42 M50 48 L44 60" stroke="#64748b" stroke-width="2.5"/><rect x="26" y="72" width="48" height="6" rx="3" fill="#94a3b8"/><path d="M30 22 v-8 h40 v8" fill="none" stroke="#475569" stroke-width="2.5"/></svg>',
    balance: '<svg viewBox="0 0 100 100"><path d="M50 14 v56 M28 78 h44" stroke="#334155" stroke-width="4"/><path d="M18 26 h64" stroke="#334155" stroke-width="3"/><path d="M18 26 l-8 18 h16 Z M82 26 l-8 18 h16 Z" fill="#fbbf24" stroke="#b45309" stroke-width="2"/><path d="M50 26 l-4 10 h8 Z" fill="#64748b"/><rect x="40" y="70" width="20" height="10" fill="#94a3b8"/></svg>',
    thermometer: '<svg viewBox="0 0 100 100"><path d="M44 8 a6 6 0 0 1 12 0 v48 a14 14 0 1 1 -12 0 Z" fill="#f0f9ff" stroke="#0369a1" stroke-width="2.5"/><circle cx="50" cy="72" r="8" fill="#dc2626"/><path d="M50 72 V30" stroke="#dc2626" stroke-width="4"/><path d="M56 22 h8 M56 34 h8 M56 46 h8" stroke="#0369a1" stroke-width="2"/></svg>',
    bunsen: '<svg viewBox="0 0 100 100"><path d="M50 8 C58 20 62 26 62 36 a12 12 0 1 1 -24 0 C38 26 42 20 50 8 Z" fill="#fb923c" stroke="#ea580c" stroke-width="2"/><path d="M50 24 c4 5 5 8 5 12 a5 5 0 1 1 -10 0 c0 -4 1 -7 5 -12 Z" fill="#fde68a"/><rect x="44" y="50" width="12" height="26" fill="#64748b"/><rect x="28" y="76" width="44" height="7" fill="#475569"/><path d="M56 66 h18 v7" fill="none" stroke="#475569" stroke-width="3"/></svg>',
    funnel: '<svg viewBox="0 0 100 100"><path d="M14 14 h72 L58 48 v34 l-16 8 V48 Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.5"/><path d="M22 30 h56" stroke="#7dd3fc" stroke-width="3"/></svg>',
    magnet: '<svg viewBox="0 0 100 100"><path d="M28 14 v30 a22 22 0 0 0 44 0 V14" fill="none" stroke="#dc2626" stroke-width="16"/><path d="M28 14 v30 a22 22 0 0 0 44 0 V14" fill="none" stroke="#f8fafc" stroke-width="16" stroke-dasharray="0 56 44 200" transform="translate(0 0)"/><rect x="19" y="6" width="18" height="14" fill="#e2e8f0" stroke="#64748b"/><rect x="63" y="6" width="18" height="14" fill="#e2e8f0" stroke="#64748b"/></svg>',
    stopwatch: '<svg viewBox="0 0 100 100"><circle cx="50" cy="56" r="36" fill="#ffffff" stroke="#334155" stroke-width="3"/><path d="M50 56 L50 36 M50 56 L64 64" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/><path d="M42 6 h16 M50 6 v10 M78 22 l6 -6" stroke="#334155" stroke-width="4"/><circle cx="50" cy="56" r="3.5" fill="#334155"/></svg>',
    plate96: '<svg viewBox="0 0 100 100"><rect x="8" y="18" width="84" height="64" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="2.5"/><g fill="#bae6fd" stroke="#0284c7"><circle cx="24" cy="34" r="6"/><circle cx="42" cy="34" r="6"/><circle cx="60" cy="34" r="6"/><circle cx="78" cy="34" r="6"/><circle cx="24" cy="52" r="6"/><circle cx="42" cy="52" r="6" fill="#fda4af"/><circle cx="60" cy="52" r="6"/><circle cx="78" cy="52" r="6" fill="#fda4af"/><circle cx="24" cy="70" r="6"/><circle cx="42" cy="70" r="6"/><circle cx="60" cy="70" r="6" fill="#fde68a"/><circle cx="78" cy="70" r="6"/></g></svg>',
    eppendorf: '<svg viewBox="0 0 100 100"><path d="M34 26 h32 l-6 44 L50 88 L40 70 Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.5"/><path d="M30 26 a20 8 0 0 1 40 0 Z" fill="#7dd3fc" stroke="#0369a1" stroke-width="2"/><path d="M38 48 h24 l-2 14 H40 Z" fill="#38bdf8" opacity="0.6"/></svg>',
    goggles: '<svg viewBox="0 0 100 100"><path d="M8 44 Q50 30 92 44 L88 62 C86 74 70 76 60 66 L56 58 h-12 L40 66 C30 76 14 74 12 62 Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.5"/><path d="M8 44 L2 38 M92 44 L98 38" stroke="#0369a1" stroke-width="3"/><path d="M24 50 l14 12 M58 48 l12 10" stroke="#7dd3fc" stroke-width="2.5"/></svg>',
    gloves: '<svg viewBox="0 0 100 100"><path d="M34 88 V40 a6 6 0 0 1 12 0 V26 a6 6 0 0 1 12 0 v-8 a6 6 0 0 1 12 0 v20 l8 -12 a6 6 0 0 1 10 6 L80 66 a26 18 0 0 1 -8 22 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/><path d="M34 88 h38" stroke="#2563eb" stroke-width="3"/></svg>',
    // ---- Animals & Models ----
    mouse: '<svg viewBox="0 0 100 100"><ellipse cx="46" cy="58" rx="32" ry="22" fill="#e2e8f0" stroke="#64748b" stroke-width="2.5"/><circle cx="24" cy="40" r="10" fill="#e2e8f0" stroke="#64748b" stroke-width="2.5"/><circle cx="24" cy="40" r="5" fill="#fda4af"/><path d="M74 62 q22 4 16 18 q-4 9 -16 6" fill="none" stroke="#f472b6" stroke-width="3"/><circle cx="20" cy="54" r="2.5" fill="#0f172a"/><path d="M12 62 l-8 2 M13 56 l-8 -3" stroke="#94a3b8" stroke-width="1.5"/></svg>',
    rat: '<svg viewBox="0 0 100 100"><ellipse cx="48" cy="60" rx="34" ry="20" fill="#cbd5e1" stroke="#475569" stroke-width="2.5"/><circle cx="22" cy="38" r="12" fill="#cbd5e1" stroke="#475569" stroke-width="2.5"/><circle cx="22" cy="38" r="6" fill="#fda4af"/><path d="M14 52 L4 62 M78 64 q20 2 18 14 q-2 10 -18 8" fill="none" stroke="#fb7185" stroke-width="4"/><circle cx="16" cy="52" r="2.5" fill="#0f172a"/><path d="M8 58 l-7 4 M9 52 l-7 -2 M10 47 l-6 -5" stroke="#64748b" stroke-width="1.5"/></svg>',
    fish: '<svg viewBox="0 0 100 100"><path d="M8 50 Q38 22 66 34 L90 18 Q84 50 90 82 L66 66 Q38 78 8 50 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2.5"/><path d="M40 36 q6 14 0 28 M58 38 q5 12 0 24" fill="none" stroke="#0284c7" stroke-width="2"/><circle cx="26" cy="46" r="4" fill="#0f172a"/><path d="M50 30 l8 -10 M50 70 l8 10" stroke="#0284c7" stroke-width="2.5"/></svg>',
    fly: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="58" rx="14" ry="24" fill="#78716c" stroke="#44403c" stroke-width="2"/><circle cx="50" cy="28" r="11" fill="#57534e"/><circle cx="44" cy="26" r="5" fill="#dc2626"/><circle cx="56" cy="26" r="5" fill="#dc2626"/><ellipse cx="26" cy="44" rx="16" ry="8" fill="#e0f2fe" stroke="#7dd3fc" transform="rotate(-30 26 44)"/><ellipse cx="74" cy="44" rx="16" ry="8" fill="#e0f2fe" stroke="#7dd3fc" transform="rotate(30 74 44)"/><path d="M40 66 l-12 12 M60 66 l12 12 M42 50 l-14 2 M58 50 l14 2" stroke="#44403c" stroke-width="2"/></svg>',
    leaf: '<svg viewBox="0 0 100 100"><path d="M86 14 C50 16 20 38 14 86 C62 84 84 52 86 14 Z" fill="#bbf7d0" stroke="#15803d" stroke-width="2.5"/><path d="M20 80 Q46 48 80 20" fill="none" stroke="#15803d" stroke-width="2.5"/><path d="M38 62 h14 M48 48 h14 M58 34 h12" stroke="#22c55e" stroke-width="2"/></svg>',
    seedling: '<svg viewBox="0 0 100 100"><path d="M50 88 V52" stroke="#15803d" stroke-width="4"/><path d="M50 52 C34 52 24 40 24 26 C40 26 50 36 50 52 Z" fill="#4ade80" stroke="#15803d" stroke-width="2"/><path d="M50 44 C50 30 60 20 76 20 C76 36 66 44 50 44 Z" fill="#86efac" stroke="#15803d" stroke-width="2"/><path d="M16 90 h68" stroke="#92400e" stroke-width="5" stroke-linecap="round"/></svg>',
    flower: '<svg viewBox="0 0 100 100"><g fill="#fbcfe8" stroke="#db2777" stroke-width="2"><circle cx="50" cy="24" r="13"/><circle cx="74" cy="42" r="13"/><circle cx="66" cy="68" r="13"/><circle cx="34" cy="68" r="13"/><circle cx="26" cy="42" r="13"/></g><circle cx="50" cy="46" r="11" fill="#facc15" stroke="#a16207" stroke-width="2"/></svg>',
    worm: '<svg viewBox="0 0 100 100"><path d="M10 62 Q26 34 44 52 T78 44" fill="none" stroke="#fda4af" stroke-width="11" stroke-linecap="round"/><path d="M22 52 l4 8 M36 46 l3 9 M52 50 l2 9 M66 44 l1 9" stroke="#be185d" stroke-width="2"/></svg>',
    frog: '<svg viewBox="0 0 100 100"><path d="M16 78 C16 50 32 38 50 38 C68 38 84 50 84 78 C70 88 30 88 16 78 Z" fill="#bbf7d0" stroke="#15803d" stroke-width="2.5"/><circle cx="32" cy="34" r="11" fill="#bbf7d0" stroke="#15803d" stroke-width="2.5"/><circle cx="68" cy="34" r="11" fill="#bbf7d0" stroke="#15803d" stroke-width="2.5"/><circle cx="32" cy="32" r="5" fill="#0f172a"/><circle cx="68" cy="32" r="5" fill="#0f172a"/><path d="M38 66 q12 8 24 0" fill="none" stroke="#15803d" stroke-width="2.5"/></svg>',
    egg: '<svg viewBox="0 0 100 100"><path d="M50 8 C66 8 78 32 78 56 a28 30 0 1 1 -56 0 C22 32 34 8 50 8 Z" fill="#fff7ed" stroke="#b45309" stroke-width="2.5"/><circle cx="50" cy="58" r="13" fill="#fbbf24" stroke="#d97706" stroke-width="2"/></svg>',
    snail: '<svg viewBox="0 0 100 100"><path d="M14 82 h64 q10 0 8 -8 l-4 -10" fill="none" stroke="#d97706" stroke-width="6" stroke-linecap="round"/><circle cx="36" cy="48" r="28" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/><path d="M36 48 m-4 0 a4 4 0 1 1 8 0 a9 9 0 1 1 -18 0 a15 15 0 1 1 30 0" fill="none" stroke="#b45309" stroke-width="2.5"/><path d="M82 62 l6 -14 M88 64 l12 -10" stroke="#d97706" stroke-width="3"/><circle cx="90" cy="46" r="3" fill="#92400e"/><circle cx="100" cy="52" r="3" fill="#92400e"/></svg>',
    // ---- Neurology ----
    neuron: '<svg viewBox="0 0 100 100"><path d="M30 50 L10 30 M30 50 L10 50 M30 50 L10 70 M30 50 L60 50 M60 50 L90 30 M60 50 L90 70" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="50" r="10" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/></svg>',
    synapse: '<svg viewBox="0 0 100 100"><path d="M20 8 h60 v26 q-30 10 -60 0 Z" fill="#c4b5fd" stroke="#6d28d9" stroke-width="2.5"/><path d="M20 92 h60 V66 q-30 -10 -60 0 Z" fill="#fda4af" stroke="#be123c" stroke-width="2.5"/><circle cx="36" cy="48" r="4.5" fill="#f59e0b"/><circle cx="52" cy="54" r="4.5" fill="#f59e0b"/><circle cx="66" cy="47" r="4.5" fill="#f59e0b"/><circle cx="34" cy="22" r="5" fill="#ede9fe" stroke="#6d28d9"/><circle cx="58" cy="20" r="5" fill="#ede9fe" stroke="#6d28d9"/></svg>',
    axon: '<svg viewBox="0 0 100 100"><path d="M6 50 h88" stroke="#f59e0b" stroke-width="3"/><g fill="#fde68a" stroke="#d97706" stroke-width="2"><rect x="14" y="36" width="18" height="28" rx="7"/><rect x="41" y="36" width="18" height="28" rx="7"/><rect x="68" y="36" width="18" height="28" rx="7"/></g><circle cx="6" cy="50" r="5" fill="#d97706"/></svg>',
    dendrite: '<svg viewBox="0 0 100 100"><path d="M50 92 V56 M50 56 L28 34 M50 56 L72 34 M28 34 L16 16 M28 34 L38 18 M72 34 L84 16 M72 34 L62 18 M50 70 L34 58 M50 70 L66 58" fill="none" stroke="#0ea5e9" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="88" r="6" fill="#0284c7"/></svg>',
    eeg: '<svg viewBox="0 0 100 100"><path d="M6 20 h88 M6 50 h88 M6 80 h88 M20 8 v84 M50 8 v84 M80 8 v84" stroke="#e2e8f0" stroke-width="1.5"/><path d="M6 50 q7 -18 14 0 t14 0 t14 0 t14 -22 t14 22 t14 0" fill="none" stroke="#dc2626" stroke-width="3"/></svg>',
    spinalcord: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#fef3c7" stroke="#b45309" stroke-width="3"/><path d="M38 32 q10 14 4 24 q-3 6 2 12 M62 32 q-10 14 -4 24 q3 6 -2 12" fill="none" stroke="#d97706" stroke-width="5"/><circle cx="50" cy="50" r="4" fill="#92400e"/></svg>',
    astrocyte: '<svg viewBox="0 0 100 100"><path d="M50 50 L50 12 M50 50 L82 26 M50 50 L88 56 M50 50 L72 84 M50 50 L30 86 M50 50 L12 58 M50 50 L20 24" stroke="#f472b6" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="50" r="12" fill="#fce7f3" stroke="#db2777" stroke-width="2.5"/><circle cx="50" cy="50" r="5" fill="#db2777"/></svg>',
    microglia: '<svg viewBox="0 0 100 100"><path d="M48 48 L24 22 M26 24 l-8 -4 M26 24 l-2 -10 M48 48 L76 20 M74 22 l8 -6 M74 22 l0 -10 M48 48 L84 52 M48 48 L70 78 M68 76 l8 8 M68 76 l12 2 M48 48 L26 76 M28 74 l-10 6 M28 74 l-4 10 M48 48 L14 44" fill="none" stroke="#0d9488" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="48" cy="48" rx="11" ry="8" fill="#ccfbf1" stroke="#0f766e" stroke-width="2"/></svg>',
    spike: '<svg viewBox="0 0 100 100"><path d="M14 8 v84 M8 78 h86" stroke="#334155" stroke-width="2.5"/><path d="M14 66 h22 q4 0 6 -6 l6 -38 q2 -8 5 2 l5 30 q2 12 8 12 h28" fill="none" stroke="#dc2626" stroke-width="3"/><path d="M14 40 h80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/></svg>',
    cerebellum: '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="52" rx="40" ry="32" fill="#fce7f3" stroke="#be185d" stroke-width="2.5"/><path d="M16 40 q34 -12 68 0 M14 54 q36 -12 72 0 M18 68 q32 -10 64 0 M26 80 q24 -8 48 0" fill="none" stroke="#db2777" stroke-width="2"/><path d="M50 20 v64" stroke="#be185d" stroke-width="2"/></svg>',
    // ---- Symbols & Shapes ----
    star: '<svg viewBox="0 0 100 100"><path d="M50 6 L62 38 L96 38 L68 58 L78 92 L50 70 L22 92 L32 58 L4 38 L38 38 Z" fill="#fde047" stroke="#a16207" stroke-width="2.5"/></svg>',
    plus: '<svg viewBox="0 0 100 100"><path d="M38 12 h24 v26 h26 v24 H62 v26 H38 V62 H12 V38 h26 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2"/></svg>',
    check: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><path d="M30 52 L44 66 L72 36" fill="none" stroke="#15803d" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    crossmark: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><path d="M34 34 L66 66 M66 34 L34 66" stroke="#b91c1c" stroke-width="8" stroke-linecap="round"/></svg>',
    warning: '<svg viewBox="0 0 100 100"><path d="M50 10 L94 86 H6 Z" fill="#fef08a" stroke="#a16207" stroke-width="3" stroke-linejoin="round"/><path d="M50 36 v24" stroke="#854d0e" stroke-width="7" stroke-linecap="round"/><circle cx="50" cy="72" r="4.5" fill="#854d0e"/></svg>',
    target: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#dc2626" stroke-width="4"/><circle cx="50" cy="50" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><circle cx="50" cy="50" r="13" fill="#dc2626"/></svg>',
    sun: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="19" fill="#fde047" stroke="#ca8a04" stroke-width="2.5"/><path d="M50 8 v12 M50 80 v12 M8 50 h12 M80 50 h12 M20 20 l8 8 M72 72 l8 8 M80 20 l-8 8 M28 72 l-8 8" stroke="#ca8a04" stroke-width="4" stroke-linecap="round"/></svg>',
    moon: '<svg viewBox="0 0 100 100"><path d="M66 8 A42 42 0 1 0 92 62 A34 34 0 0 1 66 8 Z" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/></svg>',
    lightning: '<svg viewBox="0 0 100 100"><path d="M56 4 L18 56 h22 L34 96 L76 40 H50 Z" fill="#facc15" stroke="#a16207" stroke-width="2.5" stroke-linejoin="round"/></svg>',
    flame: '<svg viewBox="0 0 100 100"><path d="M50 4 C58 18 76 30 76 56 a26 26 0 1 1 -52 0 C24 34 40 24 44 10 C47 20 50 22 54 24 C52 16 50 10 50 4 Z" fill="#fb923c" stroke="#c2410c" stroke-width="2.5"/><path d="M50 52 c6 6 9 10 9 16 a9 9 0 1 1 -18 0 c0 -6 3 -10 9 -16 Z" fill="#fde68a"/></svg>',
    snowflake: '<svg viewBox="0 0 100 100"><path d="M50 6 v88 M12 28 L88 72 M88 28 L12 72 M50 6 l-8 10 M50 6 l8 10 M50 94 l-8 -10 M50 94 l8 -10 M12 28 l14 1 M12 28 l1 14 M88 72 l-14 -1 M88 72 l-1 -14 M88 28 l-14 1 M88 28 l-1 14 M12 72 l14 -1 M12 72 l1 -14" fill="none" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/></svg>',
    shield: '<svg viewBox="0 0 100 100"><path d="M50 6 L86 18 V48 C86 72 70 86 50 94 C30 86 14 72 14 48 V18 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/><path d="M34 50 L46 62 L68 38" fill="none" stroke="#1d4ed8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const ICON_CATEGORIES = {
    'Cells & Organelles': ['cell','nucleus','mitochondria','golgi','ribosome','lysosome','vacuole','chloroplast','endoplasmic','cytoskeleton','vesicle','peroxisome','membrane','plasmid'],
    'Organs & Body': ['heart','brain','liver','lung','kidney','stomach','intestine','eye','ear','tooth','muscle','skin','spleen','pancreas','bladder','spine','artery','blood','bone'],
    'Molecules & Proteins': ['dna','rna','protein','enzyme','antibody','molecule','atom','aminoacid','lipid','benzene','glucose','atp','receptor','channel','hormone','neurotransmitter'],
    'Microbes': ['virus','bacteria','bacteriophage','fungus','yeast','protozoa','spirochete','cocci','bacilli','algae'],
    'Lab Equipment': ['flask','beaker','testtube','pipette','microscope','petri','syringe','centrifuge','balance','thermometer','bunsen','funnel','magnet','stopwatch','plate96','eppendorf','goggles','gloves'],
    'Animals & Models': ['mouse','rat','fish','fly','leaf','seedling','flower','worm','frog','egg','snail'],
    'Neurology': ['neuron','synapse','axon','dendrite','eeg','spinalcord','astrocyte','microglia','spike','cerebellum'],
    'Symbols & Shapes': ['star','plus','check','crossmark','warning','target','sun','moon','lightning','flame','snowflake','shield']
};

const PAGE_PRESETS = {
    free:   { w: 1000, h: 700 },
    a4l:    { w: 1123, h: 794 },
    a4p:    { w: 794,  h: 1123 },
    square: { w: 900,  h: 900 },
    slide:  { w: 1280, h: 720 },
    single: { w: 510,  h: 400 },
    double: { w: 1050, h: 500 }
};

class FigureStudio {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.pageEl = document.getElementById('page');
        this.canvasEl = document.getElementById('canvas');
        this.selectionLayer = document.getElementById('selection-layer');
        this.connectorLayer = document.getElementById('connector-layer');
        this.items = [];
        this.history = [];
        this.historyIndex = -1;
        this.selectedIds = new Set();
        this.selectedId = null;
        this.zoom = 1;
        this.dragState = null;
        this.idCounter = 0;
        this.clipboard = [];
        this.page = { w: PAGE_PRESETS.free.w, h: PAGE_PRESETS.free.h, bg: '#ffffff' };
        this.connectMode = false;
        this.connectFrom = null;
        this.init();
    }

    init() {
        this.setupLibrary();
        this.setupToolbar();
        this.setupCanvasBar();
        this.setupInspector();
        this.setupLayersPanel();
        this.setupEventListeners();
        this.applyPage();
        this.restoreAutosave();
        this.refreshProjectList();
        this.saveState();
        this.render();
    }

    // ---------- Library ----------
    setupLibrary() {
        const sel = document.getElementById('icon-category');
        Object.keys(ICON_CATEGORIES).forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat; opt.textContent = cat;
            sel.appendChild(opt);
        });
        sel.onchange = () => this.renderLibrary();
        document.getElementById('icon-search').addEventListener('input', () => this.renderLibrary());
        this.renderLibrary();

        document.querySelectorAll('#shape-library button').forEach(btn => {
            btn.onclick = () => {
                if (btn.dataset.shape === 'membrane') this.addItem('icon', { name: 'membrane' });
                else this.addItem('shape', { shape: btn.dataset.shape });
            };
        });
        document.getElementById('upload-image').onchange = (e) => this.uploadImage(e);
    }

    renderLibrary() {
        const lib = document.getElementById('icon-library');
        const q = (document.getElementById('icon-search').value || '').toLowerCase();
        const cat = document.getElementById('icon-category').value;
        lib.innerHTML = '';
        const names = cat === 'all' ? Object.keys(ICONS) : (ICON_CATEGORIES[cat] || []);
        names.filter(n => ICONS[n] && n.includes(q)).forEach(name => {
            const div = document.createElement('div');
            div.className = 'icon';
            div.draggable = true;
            div.title = name;
            div.innerHTML = `${ICONS[name]}<div class="icon-label">${name}</div>`;
            div.onclick = () => this.addItem('icon', { name });
            div.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({ kind: 'icon', name }));
                e.dataTransfer.effectAllowed = 'copy';
            });
            lib.appendChild(div);
        });
    }

    // ---------- Toolbar / canvas bar ----------
    setupToolbar() {
        document.querySelectorAll('.toolbar button').forEach(btn => {
            btn.onclick = () => this.handleAction(btn.dataset.action);
        });
        document.getElementById('load-json').onchange = (e) => this.loadJSON(e);
        document.querySelectorAll('[data-template]').forEach(btn => {
            btn.onclick = () => this.loadTemplate(btn.dataset.template);
        });
        document.getElementById('shortcuts-close').onclick = () => {
            document.getElementById('shortcuts-modal').hidden = true;
        };
    }

    setupCanvasBar() {
        document.getElementById('page-preset').onchange = (e) => {
            const p = PAGE_PRESETS[e.target.value];
            if (p) { this.page.w = p.w; this.page.h = p.h; this.applyPage(); this.saveState(); }
        };
        document.getElementById('page-bg').onchange = (e) => {
            this.page.bg = e.target.value; this.applyPage(); this.saveState();
        };
        document.getElementById('grid-toggle').onchange = (e) => {
            this.pageEl.classList.toggle('show-grid', e.target.checked);
        };
        document.getElementById('zoom-in-btn').onclick = () => this.setZoom(this.zoom * 1.2);
        document.getElementById('zoom-out-btn').onclick = () => this.setZoom(this.zoom / 1.2);
        document.getElementById('zoom-fit-btn').onclick = () => this.zoomToFit();
        document.getElementById('connector-mode-btn').onclick = (e) => {
            this.connectMode = !this.connectMode;
            this.connectFrom = null;
            e.target.classList.toggle('active', this.connectMode);
        };
        document.querySelectorAll('.align-btn').forEach(btn => {
            btn.onclick = () => this.alignSelection(btn.dataset.align);
        });
        document.getElementById('project-save-btn').onclick = () => this.saveProject();
        document.getElementById('project-open-btn').onclick = () => this.openProject();
        document.getElementById('project-delete-btn').onclick = () => this.deleteProject();
        this.pageEl.classList.add('show-grid');
    }

    applyPage() {
        this.pageEl.style.width = this.page.w + 'px';
        this.pageEl.style.height = this.page.h + 'px';
        this.pageEl.style.background = this.page.bg;
        this.connectorLayer.setAttribute('width', this.page.w);
        this.connectorLayer.setAttribute('height', this.page.h);
        this.connectorLayer.setAttribute('viewBox', `0 0 ${this.page.w} ${this.page.h}`);
        this.renderConnectors();
    }

    setZoom(val) {
        this.zoom = Math.max(0.1, Math.min(5, val));
        this.pageEl.style.transform = `scale(${this.zoom})`;
        document.getElementById('zoom-label').textContent = Math.round(this.zoom * 100) + '%';
    }

    zoomToFit() {
        const availW = this.container.clientWidth - 70;
        const availH = this.container.clientHeight - 70;
        this.setZoom(Math.min(availW / this.page.w, availH / this.page.h, 2));
    }

    handleAction(action) {
        switch (action) {
            case 'add-text': this.addItem('text', { text: 'Double click to edit' }); break;
            case 'duplicate': this.duplicateSelected(); break;
            case 'delete': this.deleteSelected(); break;
            case 'undo': this.undo(); break;
            case 'redo': this.redo(); break;
            case 'save-json': this.saveJSON(); break;
            case 'export-png': this.exportPNG(); break;
            case 'export-svg': this.exportSVG(); break;
            case 'shortcuts': document.getElementById('shortcuts-modal').hidden = false; break;
        }
    }

    // ---------- Inspector ----------
    setupInspector() {
        document.getElementById('tab-inspector').onclick = () => this.showRightTab('inspector');
        document.getElementById('tab-layers').onclick = () => this.showRightTab('layers');
        const bind = (id, fn) => document.getElementById(id).addEventListener('input', fn);
        bind('insp-fill', (e) => this.updateSelected({ fill: e.target.value }));
        bind('insp-stroke', (e) => this.updateSelected({ color: e.target.value }));
        bind('insp-tint', (e) => this.updateSelected({ bgTint: e.target.value }));
        bind('insp-strokew', (e) => this.updateSelected({ strokeWidth: parseFloat(e.target.value) || 0 }));
        bind('insp-opacity', (e) => {
            document.getElementById('insp-opacity-val').textContent = e.target.value + '%';
            this.updateSelected({ opacity: parseInt(e.target.value, 10) / 100 });
        });
        bind('insp-x', (e) => this.updateSelected({ x: parseFloat(e.target.value) || 0 }));
        bind('insp-y', (e) => this.updateSelected({ y: parseFloat(e.target.value) || 0 }));
        bind('insp-w', (e) => this.updateSelected({ w: Math.max(5, parseFloat(e.target.value) || 5) }));
        bind('insp-h', (e) => this.updateSelected({ h: Math.max(5, parseFloat(e.target.value) || 5) }));
        bind('insp-rot', (e) => this.updateSelected({ rotation: parseFloat(e.target.value) || 0 }));
        bind('insp-fontsize', (e) => this.updateSelected({ fontSize: parseFloat(e.target.value) || 16 }));
        bind('insp-fontfamily', (e) => this.updateSelected({ fontFamily: e.target.value }));
        document.getElementById('insp-fliph').onclick = () => { const it = this.primary(); if (it) this.updateSelected({ flipH: !it.flipH }); };
        document.getElementById('insp-flipv').onclick = () => { const it = this.primary(); if (it) this.updateSelected({ flipV: !it.flipV }); };
        document.getElementById('insp-lock').onclick = () => { const it = this.primary(); if (it) this.updateSelected({ locked: !it.locked }); };
        document.getElementById('insp-bold').onclick = () => { const it = this.primary(); if (it) this.updateSelected({ bold: !it.bold }); };
        document.getElementById('insp-italic').onclick = () => { const it = this.primary(); if (it) this.updateSelected({ italic: !it.italic }); };
    }

    showRightTab(which) {
        document.getElementById('tab-inspector').classList.toggle('active', which === 'inspector');
        document.getElementById('tab-layers').classList.toggle('active', which === 'layers');
        document.getElementById('inspector-pane').hidden = which !== 'inspector';
        document.getElementById('layers-pane').hidden = which !== 'layers';
    }

    primary() { return this.items.find(i => i.id === this.selectedId) || null; }

    updateSelected(props) {
        const it = this.primary();
        if (!it) return;
        Object.assign(it, props);
        this.render();
    }

    commitInspector() { this.saveState(); }

    refreshInspector() {
        const body = document.getElementById('inspector-body');
        const empty = document.getElementById('inspector-empty');
        const it = this.primary();
        if (!it) {
            body.hidden = true; empty.hidden = false;
            empty.textContent = this.selectedIds.size > 1
                ? `${this.selectedIds.size} items selected. Use Align or Delete/Duplicate for the group.`
                : 'Select an item to edit its properties.';
            return;
        }
        body.hidden = false; empty.hidden = true;
        document.getElementById('insp-title').textContent =
            it.type === 'icon' ? `Icon: ${it.name}` :
            it.type === 'text' ? 'Text' :
            it.type === 'image' ? 'Image' :
            it.type === 'connector' ? `Connector (${it.style})` : `Shape: ${it.shape}`;
        const set = (id, v) => { document.getElementById(id).value = v; };
        set('insp-fill', it.fill || '#ffffff');
        set('insp-stroke', it.color || '#3b82f6');
        set('insp-tint', it.bgTint || '#ffffff');
        set('insp-strokew', it.strokeWidth != null ? it.strokeWidth : 2);
        set('insp-opacity', Math.round((it.opacity != null ? it.opacity : 1) * 100));
        document.getElementById('insp-opacity-val').textContent = Math.round((it.opacity != null ? it.opacity : 1) * 100) + '%';
        set('insp-x', Math.round(it.x || 0)); set('insp-y', Math.round(it.y || 0));
        set('insp-w', Math.round(it.w || 0)); set('insp-h', Math.round(it.h || 0));
        set('insp-rot', Math.round(it.rotation || 0));
        document.getElementById('insp-lock').textContent = it.locked ? 'Unlock' : 'Lock';
        document.getElementById('insp-lock').classList.toggle('active', !!it.locked);
        const tp = document.getElementById('insp-text-props');
        tp.hidden = it.type !== 'text';
        if (it.type === 'text') {
            set('insp-fontsize', it.fontSize || 16);
            set('insp-fontfamily', it.fontFamily || 'Arial');
            document.getElementById('insp-bold').classList.toggle('active', !!it.bold);
            document.getElementById('insp-italic').classList.toggle('active', !!it.italic);
        }
    }

    // ---------- Layers panel ----------
    setupLayersPanel() { /* rows are rebuilt by renderLayers() on every render */ }

    itemLabel(it) {
        if (it.type === 'icon') return it.name;
        if (it.type === 'text') return 'Text: ' + (it.text || '').slice(0, 18);
        if (it.type === 'image') return 'Image';
        if (it.type === 'connector') return `Connector ${it.style}`;
        return 'Shape: ' + it.shape;
    }

    renderLayers() {
        const list = document.getElementById('layers-list');
        if (!list) return;
        list.innerHTML = '';
        [...this.items].reverse().forEach(it => {
            const row = document.createElement('div');
            row.className = 'layer-row' + (this.selectedIds.has(it.id) ? ' selected' : '') + (it.hidden ? ' is-hidden' : '');
            row.innerHTML = `<span class="layer-name">${this.itemLabel(it)}</span>
                <button data-lact="up" title="Bring forward">▲</button>
                <button data-lact="down" title="Send backward">▼</button>
                <button data-lact="eye" title="Show/hide">${it.hidden ? '🙈' : '👁'}</button>
                <button data-lact="lock" title="Lock/unlock">${it.locked ? '🔒' : '🔓'}</button>
                <button data-lact="del" title="Delete">✕</button>`;
            row.onclick = (e) => {
                const act = e.target.dataset && e.target.dataset.lact;
                if (act === 'up') { this.moveLayer(it.id, 1); return; }
                if (act === 'down') { this.moveLayer(it.id, -1); return; }
                if (act === 'eye') { it.hidden = !it.hidden; this.render(); this.saveState(); return; }
                if (act === 'lock') { it.locked = !it.locked; this.render(); this.saveState(); return; }
                if (act === 'del') { this.items = this.items.filter(i => i.id !== it.id); this.deselect(it.id); this.render(); this.saveState(); return; }
                this.setSelection([it.id], false);
            };
            list.appendChild(row);
        });
    }

    moveLayer(id, dir) {
        const idx = this.items.findIndex(i => i.id === id);
        const j = idx + dir;
        if (idx < 0 || j < 0 || j >= this.items.length) return;
        [this.items[idx], this.items[j]] = [this.items[j], this.items[idx]];
        this.render();
        this.saveState();
    }

    // ---------- Items ----------
    addItem(type, props = {}, atPos = null) {
        const item = {
            id: ++this.idCounter, type,
            x: atPos ? atPos.x : 100, y: atPos ? atPos.y : 100,
            w: 100, h: 100, rotation: 0, opacity: 1, flipH: false, flipV: false,
            locked: false, hidden: false, ...props
        };
        if (type === 'icon') { item.w = 60; item.h = 60; }
        else if (type === 'text') {
            item.w = 150; item.h = 30;
            if (item.fontSize == null) item.fontSize = 16;
            if (!item.color) item.color = '#000000';
            if (!item.fontFamily) item.fontFamily = 'Arial';
        } else if (type === 'shape') {
            if (!item.color) item.color = '#3b82f6';
            if (item.strokeWidth == null) item.strokeWidth = 2;
            if (item.shape === 'line' || item.shape === 'arrow') { item.w = 120; item.h = 60; }
            if (item.shape === 'membrane') { item.w = 260; item.h = 80; }
            if (item.shape === 'cylinder') { item.w = 90; item.h = 110; }
        } else if (type === 'image') { item.w = 160; item.h = 120; }
        this.items.push(item);
        this.setSelection([item.id], false);
        this.render();
        this.saveState();
        return item;
    }

    uploadImage(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            this.addItem('image', { src: ev.target.result });
            e.target.value = '';
        };
        reader.readAsDataURL(file);
    }

    setSelection(ids, additive) {
        if (additive) ids.forEach(id => this.selectedIds.add(id));
        else this.selectedIds = new Set(ids);
        this.selectedId = ids.length ? ids[ids.length - 1] : null;
        this.renderSelection();
        this.refreshInspector();
        this.renderLayers();
    }

    deselect(id) {
        this.selectedIds.delete(id);
        if (this.selectedId === id) this.selectedId = this.selectedIds.size ? [...this.selectedIds].pop() : null;
    }

    selectItem(id) { this.setSelection([id], false); }

    itemCenter(it) { return { x: it.x + it.w / 2, y: it.y + it.h / 2 }; }

    render() {
        this.canvasEl.innerHTML = '';
        this.items.forEach(item => {
            if (item.type === 'connector' || item.hidden) return;
            const el = document.createElement('div');
            el.className = 'canvas-item' + (item.locked ? ' locked' : '');
            el.dataset.id = item.id;
            el.style.left = `${item.x}px`;
            el.style.top = `${item.y}px`;
            el.style.width = `${item.w}px`;
            el.style.height = `${item.h}px`;
            el.style.opacity = item.opacity != null ? item.opacity : 1;
            el.style.transform = `rotate(${item.rotation || 0}deg) scale(${item.flipH ? -1 : 1}, ${item.flipV ? -1 : 1})`;
            if (item.type === 'icon') {
                el.innerHTML = (item.bgTint ? `<div class="item-bg" style="background:${item.bgTint}"></div>` : '') + (ICONS[item.name] || '');
            } else if (item.type === 'image') {
                el.innerHTML = `<img src="${item.src || ''}" alt="">`;
            } else if (item.type === 'text') {
                el.className += ' text-item';
                el.innerText = item.text;
                el.style.fontSize = `${item.fontSize || 16}px`;
                el.style.color = item.color || '#000';
                el.style.fontFamily = item.fontFamily || 'Arial';
                el.style.fontWeight = item.bold ? '700' : '400';
                el.style.fontStyle = item.italic ? 'italic' : 'normal';
                el.ondblclick = (e) => { e.stopPropagation(); this.editText(item, el); };
            } else if (item.type === 'shape') {
                el.innerHTML = this.getShapeSVG(item);
            }
            this.canvasEl.appendChild(el);
        });
        this.renderConnectors();
        this.renderSelection();
        this.refreshInspector();
        this.renderLayers();
    }

    getShapeSVG(item) {
        const c = item.color || '#3b82f6', sw = item.strokeWidth != null ? item.strokeWidth : 2;
        const f = item.fill || 'none';
        switch (item.shape) {
            case 'rect': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="4" y="4" width="92" height="92" fill="${f}" stroke="${c}" stroke-width="${sw}"/></svg>`;
            case 'roundrect': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="4" y="4" width="92" height="92" rx="16" fill="${f}" stroke="${c}" stroke-width="${sw}"/></svg>`;
            case 'ellipse': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><ellipse cx="50" cy="50" rx="46" ry="46" fill="${f}" stroke="${c}" stroke-width="${sw}"/></svg>`;
            case 'triangle': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 5 L95 92 L5 92 Z" fill="${f}" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
            case 'hexagon': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 4 L92 27 L92 73 L50 96 L8 73 L8 27 Z" fill="${f}" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
            case 'star': return `<svg viewBox="0 0 100 100"><path d="M50 4 L62 37 L97 37 L68 57 L79 93 L50 71 L21 93 L32 57 L3 37 L38 37 Z" fill="${f === 'none' ? c : f}" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
            case 'plus': return `<svg viewBox="0 0 100 100"><path d="M38 6 h24 v32 h32 v24 H62 v32 H38 V62 H6 V38 h32 Z" fill="${f === 'none' ? c : f}" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
            case 'cylinder': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M6 18 v64 a44 14 0 0 0 88 0 V18" fill="${f}" stroke="${c}" stroke-width="${sw}"/><ellipse cx="50" cy="18" rx="44" ry="14" fill="${f}" stroke="${c}" stroke-width="${sw}"/></svg>`;
            case 'membrane': return membraneStripSVG(Math.max(60, item.w), Math.max(30, item.h));
            case 'line': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="2" y1="2" x2="98" y2="98" stroke="${c}" stroke-width="${sw}"/></svg>`;
            case 'arrow': return `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><marker id="ah-${item.id}" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${c}"/></marker></defs><line x1="2" y1="98" x2="88" y2="12" stroke="${c}" stroke-width="${sw}" marker-end="url(#ah-${item.id})"/></svg>`;
            default: return '';
        }
    }

    renderConnectors() {
        if (!this.connectorLayer) return;
        const NS = 'http://www.w3.org/2000/svg';
        this.connectorLayer.innerHTML = '';
        const defs = document.createElementNS(NS, 'defs');
        defs.innerHTML = `<marker id="conn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#334155"/></marker>`;
        this.connectorLayer.appendChild(defs);
        this.items.filter(i => i.type === 'connector').forEach(conn => {
            const a = this.items.find(i => i.id === conn.from);
            const b = this.items.find(i => i.id === conn.to);
            if (!a || !b) return;
            const p1 = this.itemCenter(a), p2 = this.itemCenter(b);
            const line = document.createElementNS(NS, 'line');
            line.setAttribute('x1', p1.x); line.setAttribute('y1', p1.y);
            line.setAttribute('x2', p2.x); line.setAttribute('y2', p2.y);
            line.setAttribute('stroke', conn.color || '#334155');
            line.setAttribute('stroke-width', conn.strokeWidth != null ? conn.strokeWidth : 2);
            if (conn.style === 'dashed') { line.setAttribute('stroke-dasharray', '7 5'); line.setAttribute('marker-end', 'url(#conn-arrow)'); }
            else if (conn.style === 'arrow') line.setAttribute('marker-end', 'url(#conn-arrow)');
            this.connectorLayer.appendChild(line);
            if (conn.style === 'inhibit') {
                const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
                const t = document.createElementNS(NS, 'line');
                const L = 11;
                t.setAttribute('x1', p2.x - L * Math.cos(ang)); t.setAttribute('y1', p2.y - L * Math.sin(ang));
                t.setAttribute('x2', p2.x + L * Math.cos(ang)); t.setAttribute('y2', p2.y + L * Math.sin(ang));
                t.setAttribute('stroke', conn.color || '#334155');
                t.setAttribute('stroke-width', (conn.strokeWidth != null ? conn.strokeWidth : 2) + 1);
                this.connectorLayer.appendChild(t);
            }
        });
    }

    renderSelection() {
        this.selectionLayer.innerHTML = '';
        const sel = this.items.filter(i => this.selectedIds.has(i.id) && i.type !== 'connector' && !i.hidden);
        sel.forEach(item => {
            const box = document.createElement('div');
            box.className = 'selection-box' + (sel.length > 1 ? ' multi' : '');
            box.style.left = `${item.x}px`;
            box.style.top = `${item.y}px`;
            box.style.width = `${item.w}px`;
            box.style.height = `${item.h}px`;
            box.style.transform = `rotate(${item.rotation || 0}deg)`;
            if (sel.length === 1) {
                ['nw', 'ne', 'sw', 'se', 'rotate'].forEach(h => {
                    const handle = document.createElement('div');
                    handle.className = `selection-handle ${h}`;
                    handle.dataset.handle = h;
                    box.appendChild(handle);
                });
            }
            this.selectionLayer.appendChild(box);
        });
    }

    // ---------- Mouse / drag & drop ----------
    setupEventListeners() {
        this.pageEl.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        this.pageEl.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
        this.pageEl.addEventListener('drop', (e) => {
            e.preventDefault();
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (data.kind === 'icon') {
                    const r = this.pageEl.getBoundingClientRect();
                    const x = (e.clientX - r.left) / this.zoom - 30;
                    const y = (e.clientY - r.top) / this.zoom - 30;
                    this.addItem('icon', { name: data.name }, { x: Math.max(0, x), y: Math.max(0, y) });
                }
            } catch (err) { /* not a library drag */ }
        });
        document.getElementById('insp-fill').addEventListener('change', () => this.commitInspector());
        ['insp-stroke','insp-tint','insp-x','insp-y','insp-w','insp-h','insp-rot','insp-strokew','insp-fontsize'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => this.commitInspector());
        });
    }

    pagePos(e) {
        const r = this.pageEl.getBoundingClientRect();
        return { x: (e.clientX - r.left) / this.zoom, y: (e.clientY - r.top) / this.zoom };
    }

    onMouseDown(e) {
        if (e.target.closest('.selection-handle')) {
            const item = this.primary();
            if (!item) return;
            this.dragState = {
                type: 'resize', handle: e.target.closest('.selection-handle').dataset.handle, item,
                startX: e.clientX, startY: e.clientY,
                origX: item.x, origY: item.y, origW: item.w, origH: item.h, origRot: item.rotation || 0
            };
            return;
        }
        const canvasItem = e.target.closest('.canvas-item');
        if (canvasItem) {
            const id = parseInt(canvasItem.dataset.id, 10);
            const item = this.items.find(i => i.id === id);
            if (!item) return;
            if (this.connectMode) { this.handleConnectClick(item); return; }
            if (e.shiftKey) {
                if (this.selectedIds.has(id)) this.deselect(id); else this.selectedIds.add(id);
                this.selectedId = id;
                this.renderSelection(); this.refreshInspector(); this.renderLayers();
                return;
            }
            if (!this.selectedIds.has(id)) this.setSelection([id], false);
            if (item.locked) return;
            const orig = {};
            this.items.filter(i => this.selectedIds.has(i.id) && i.type !== 'connector').forEach(i => {
                orig[i.id] = { x: i.x, y: i.y };
            });
            this.dragState = { type: 'move', startX: e.clientX, startY: e.clientY, orig };
            return;
        }
        // Empty page: start marquee (or clear selection on simple click)
        const p = this.pagePos(e);
        this.dragState = { type: 'marquee', startX: p.x, startY: p.y, moved: false, el: null };
        if (!e.shiftKey) this.setSelection([], false);
    }

    handleConnectClick(item) {
        if (!this.connectFrom) {
            this.connectFrom = item.id;
            this.setSelection([item.id], false);
            return;
        }
        if (this.connectFrom !== item.id) {
            const style = document.getElementById('connector-style').value;
            const conn = {
                id: ++this.idCounter, type: 'connector',
                from: this.connectFrom, to: item.id, style,
                x: 0, y: 0, w: 0, h: 0, rotation: 0, color: '#334155', strokeWidth: 2
            };
            this.items.push(conn);
            this.setSelection([conn.id], false);
            this.saveState();
        }
        this.connectFrom = null;
        this.render();
    }

    onMouseMove(e) {
        if (!this.dragState) return;
        const ds = this.dragState;
        if (ds.type === 'move') {
            let dx = (e.clientX - ds.startX) / this.zoom;
            let dy = (e.clientY - ds.startY) / this.zoom;
            Object.entries(ds.orig).forEach(([id, o]) => {
                const it = this.items.find(i => i.id === parseInt(id, 10));
                if (!it) return;
                it.x = o.x + dx; it.y = o.y + dy;
                if (document.getElementById('snap-toggle').checked) {
                    it.x = Math.round(it.x / 10) * 10; it.y = Math.round(it.y / 10) * 10;
                }
            });
            this.render();
        } else if (ds.type === 'resize') {
            const item = ds.item;
            const dx = (e.clientX - ds.startX) / this.zoom;
            const dy = (e.clientY - ds.startY) / this.zoom;
            if (ds.handle === 'rotate') {
                const rect = this.pageEl.getBoundingClientRect();
                const centerX = rect.left + (item.x + item.w / 2) * this.zoom;
                const centerY = rect.top + (item.y + item.h / 2) * this.zoom;
                item.rotation = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
            } else {
                if (ds.handle.includes('e')) item.w = Math.max(10, ds.origW + dx);
                if (ds.handle.includes('s')) item.h = Math.max(10, ds.origH + dy);
                if (ds.handle.includes('w')) {
                    const newW = Math.max(10, ds.origW - dx);
                    item.x = ds.origX + (ds.origW - newW); item.w = newW;
                }
                if (ds.handle.includes('n')) {
                    const newH = Math.max(10, ds.origH - dy);
                    item.y = ds.origY + (ds.origH - newH); item.h = newH;
                }
            }
            this.render();
        } else if (ds.type === 'marquee') {
            const p = this.pagePos(e);
            const x = Math.min(ds.startX, p.x), y = Math.min(ds.startY, p.y);
            const w = Math.abs(p.x - ds.startX), h = Math.abs(p.y - ds.startY);
            if (w + h > 4) ds.moved = true;
            if (!ds.el) {
                ds.el = document.createElement('div');
                ds.el.className = 'marquee';
                this.selectionLayer.appendChild(ds.el);
            }
            ds.el.style.left = x + 'px'; ds.el.style.top = y + 'px';
            ds.el.style.width = w + 'px'; ds.el.style.height = h + 'px';
            ds.rect = { x, y, w, h };
        }
    }

    onMouseUp() {
        if (!this.dragState) return;
        const ds = this.dragState;
        this.dragState = null;
        if (ds.type === 'marquee') {
            if (ds.el) ds.el.remove();
            if (ds.moved && ds.rect) {
                const r = ds.rect;
                const hits = this.items.filter(i => i.type !== 'connector' && !i.hidden &&
                    i.x < r.x + r.w && i.x + i.w > r.x && i.y < r.y + r.h && i.y + i.h > r.y)
                    .map(i => i.id);
                this.setSelection(hits, false);
            }
            return;
        }
        this.saveState();
        this.autosave();
    }

    // ---------- Keyboard / clipboard ----------
    onKeyDown(e) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.contentEditable === 'true') return;
        if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); this.deleteSelected(); }
        else if (e.ctrlKey && e.key.toLowerCase() === 'z') { e.preventDefault(); this.undo(); }
        else if (e.ctrlKey && e.key.toLowerCase() === 'y') { e.preventDefault(); this.redo(); }
        else if (e.ctrlKey && e.key.toLowerCase() === 'd') { e.preventDefault(); this.duplicateSelected(); }
        else if (e.ctrlKey && e.key.toLowerCase() === 'c') { e.preventDefault(); this.copySelected(); }
        else if (e.ctrlKey && e.key.toLowerCase() === 'v') { e.preventDefault(); this.pasteClipboard(); }
    }

    copySelected() {
        const sel = this.items.filter(i => this.selectedIds.has(i.id));
        this.clipboard = JSON.parse(JSON.stringify(sel));
    }

    pasteClipboard() {
        if (!this.clipboard.length) return;
        const newIds = [];
        const idMap = {};
        this.clipboard.forEach(old => {
            const { id, ...rest } = old;
            const ni = { ...rest, id: ++this.idCounter, x: (old.x || 0) + 20, y: (old.y || 0) + 20 };
            idMap[id] = ni.id;
            this.items.push(ni);
            newIds.push(ni.id);
        });
        this.items.forEach(i => {
            if (newIds.includes(i.id) && i.type === 'connector') {
                if (idMap[i.from]) i.from = idMap[i.from];
                if (idMap[i.to]) i.to = idMap[i.to];
            }
        });
        this.setSelection(newIds, false);
        this.render();
        this.saveState();
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
            this.render();
            this.saveState();
        };
        el.addEventListener('blur', onBlur);
    }

    duplicateSelected() {
        const sel = this.items.filter(i => this.selectedIds.has(i.id));
        if (!sel.length) return;
        const newIds = [];
        const idMap = {};
        sel.forEach(old => {
            const { id, ...rest } = old;
            const ni = { ...JSON.parse(JSON.stringify(rest)), id: ++this.idCounter, x: (old.x || 0) + 20, y: (old.y || 0) + 20 };
            idMap[id] = ni.id;
            this.items.push(ni);
            newIds.push(ni.id);
        });
        this.items.forEach(i => {
            if (newIds.includes(i.id) && i.type === 'connector') {
                if (idMap[i.from]) i.from = idMap[i.from];
                if (idMap[i.to]) i.to = idMap[i.to];
            }
        });
        this.setSelection(newIds, false);
        this.render();
        this.saveState();
    }

    deleteSelected() {
        if (!this.selectedIds.size) return;
        const doomed = new Set(this.selectedIds);
        this.items = this.items.filter(i => !doomed.has(i.id) &&
            !(i.type === 'connector' && (doomed.has(i.from) || doomed.has(i.to))));
        this.selectedIds.clear();
        this.selectedId = null;
        this.render();
        this.saveState();
    }

    alignSelection(mode) {
        const sel = this.items.filter(i => this.selectedIds.has(i.id) && i.type !== 'connector');
        if (sel.length < 2) return;
        const minX = Math.min(...sel.map(i => i.x)), maxX = Math.max(...sel.map(i => i.x + i.w));
        const minY = Math.min(...sel.map(i => i.y)), maxY = Math.max(...sel.map(i => i.y + i.h));
        sel.forEach(i => {
            if (mode === 'left') i.x = minX;
            else if (mode === 'right') i.x = maxX - i.w;
            else if (mode === 'centerx') i.x = (minX + maxX) / 2 - i.w / 2;
            else if (mode === 'top') i.y = minY;
            else if (mode === 'bottom') i.y = maxY - i.h;
            else if (mode === 'centery') i.y = (minY + maxY) / 2 - i.h / 2;
        });
        this.render();
        this.saveState();
    }

    // ---------- History / storage ----------
    snapshot() { return JSON.stringify({ items: this.items, page: this.page }); }

    saveState() {
        const state = this.snapshot();
        if (this.history[this.historyIndex] === state) { this.autosave(); return; }
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        this.historyIndex++;
        if (this.history.length > 50) { this.history.shift(); this.historyIndex--; }
        this.autosave();
    }

    applySnapshot(state) {
        const data = JSON.parse(state);
        if (Array.isArray(data)) { this.items = data; }
        else { this.items = data.items || []; if (data.page) this.page = data.page; }
        this.idCounter = this.items.reduce((m, i) => Math.max(m, i.id || 0), 0);
        this.selectedIds.clear(); this.selectedId = null;
        this.applyPage();
        this.render();
    }

    undo() { if (this.historyIndex > 0) { this.historyIndex--; this.applySnapshot(this.history[this.historyIndex]); this.autosave(); } }
    redo() { if (this.historyIndex < this.history.length - 1) { this.historyIndex++; this.applySnapshot(this.history[this.historyIndex]); this.autosave(); } }

    autosave() {
        try {
            localStorage.setItem('tpsfs-autosave-v2', JSON.stringify({
                items: this.items, page: this.page, idCounter: this.idCounter
            }));
        } catch (err) { /* storage full/unavailable - file save still works */ }
    }

    restoreAutosave() {
        try {
            const raw = localStorage.getItem('tpsfs-autosave-v2');
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data && Array.isArray(data.items) && data.items.length) {
                this.items = data.items;
                if (data.page) this.page = data.page;
                this.idCounter = data.idCounter || this.items.reduce((m, i) => Math.max(m, i.id || 0), 0);
                document.getElementById('page-bg').value = this.page.bg || '#ffffff';
                this.applyPage();
            }
        } catch (err) { /* ignore corrupt autosave */ }
    }

    loadProjects() {
        try { return JSON.parse(localStorage.getItem('tpsfs-projects-v2') || '{}'); }
        catch (err) { return {}; }
    }

    storeProjects(p) {
        try { localStorage.setItem('tpsfs-projects-v2', JSON.stringify(p)); } catch (err) { /* ignore */ }
    }

    refreshProjectList() {
        const sel = document.getElementById('project-select');
        const cur = sel.value;
        sel.innerHTML = '<option value="">(autosave)</option>';
        Object.keys(this.loadProjects()).forEach(name => {
            const opt = document.createElement('option');
            opt.value = name; opt.textContent = name;
            sel.appendChild(opt);
        });
        sel.value = cur;
    }

    saveProject() {
        const name = prompt('Project name:');
        if (!name) return;
        const projects = this.loadProjects();
        projects[name] = { items: this.items, page: this.page, idCounter: this.idCounter, savedAt: Date.now() };
        this.storeProjects(projects);
        this.refreshProjectList();
        document.getElementById('project-select').value = name;
    }

    openProject() {
        const name = document.getElementById('project-select').value;
        if (!name) return;
        const proj = this.loadProjects()[name];
        if (!proj) return;
        this.items = proj.items || [];
        if (proj.page) this.page = proj.page;
        this.idCounter = proj.idCounter || this.items.reduce((m, i) => Math.max(m, i.id || 0), 0);
        this.selectedIds.clear(); this.selectedId = null;
        this.applyPage();
        this.render();
        this.saveState();
    }

    deleteProject() {
        const name = document.getElementById('project-select').value;
        if (!name) return;
        const projects = this.loadProjects();
        delete projects[name];
        this.storeProjects(projects);
        this.refreshProjectList();
    }

    // ---------- File save / load (v1 compatible) ----------
    saveJSON() {
        const blob = new Blob([JSON.stringify(this.items, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `figure-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    loadJSON(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                this.items = Array.isArray(parsed) ? parsed : (parsed.items || []);
                this.idCounter = Math.max(0, ...this.items.map(i => i.id || 0));
                this.selectedIds.clear();
                this.selectedId = null;
                this.render();
                this.saveState();
            } catch (err) {
                alert('Invalid JSON file');
            }
            e.target.value = '';
        };
        reader.readAsText(file);
    }

    // ---------- Templates ----------
    loadTemplate(name) {
        const T = {
            pathway: () => [
                { type: 'icon', name: 'cell', x: 300, y: 130, w: 380, h: 380, rotation: 0 },
                { type: 'icon', name: 'nucleus', x: 400, y: 240, w: 180, h: 180, rotation: 0 },
                { type: 'icon', name: 'receptor', x: 330, y: 105, w: 70, h: 70, rotation: 0 },
                { type: 'icon', name: 'molecule', x: 180, y: 60, w: 64, h: 64, rotation: 0 },
                { type: 'icon', name: 'protein', x: 430, y: 300, w: 80, h: 80, rotation: 0 },
                { type: 'icon', name: 'dna', x: 445, y: 255, w: 90, h: 90, rotation: 20 },
                { type: 'text', text: 'Cell Signalling Pathway', x: 330, y: 30, w: 320, h: 30, rotation: 0, fontSize: 20, color: '#111827' },
                { type: 'text', text: 'Ligand', x: 175, y: 130, w: 80, h: 22, rotation: 0, fontSize: 14, color: '#374151' }
            ],
            workflow: () => [
                { type: 'icon', name: 'flask', x: 60, y: 120, w: 64, h: 64, rotation: 0 },
                { type: 'icon', name: 'pipette', x: 200, y: 120, w: 64, h: 64, rotation: 0 },
                { type: 'icon', name: 'centrifuge', x: 340, y: 120, w: 64, h: 64, rotation: 0 },
                { type: 'icon', name: 'microscope', x: 480, y: 120, w: 64, h: 64, rotation: 0 },
                { type: 'icon', name: 'petri', x: 620, y: 120, w: 64, h: 64, rotation: 0 },
                { type: 'text', text: 'Experimental Workflow', x: 240, y: 40, w: 300, h: 30, rotation: 0, fontSize: 20, color: '#111827' },
                { type: 'text', text: 'Prep', x: 66, y: 195, w: 60, h: 20, rotation: 0, fontSize: 13, color: '#374151' },
                { type: 'text', text: 'Analyse', x: 620, y: 195, w: 70, h: 20, rotation: 0, fontSize: 13, color: '#374151' }
            ],
            study: () => [
                { type: 'shape', shape: 'roundrect', x: 60, y: 130, w: 150, h: 64, rotation: 0, color: '#3b82f6', strokeWidth: 2, fill: '#dbeafe' },
                { type: 'shape', shape: 'roundrect', x: 330, y: 60, w: 150, h: 64, rotation: 0, color: '#10b981', strokeWidth: 2, fill: '#d1fae5' },
                { type: 'shape', shape: 'roundrect', x: 330, y: 210, w: 150, h: 64, rotation: 0, color: '#f59e0b', strokeWidth: 2, fill: '#fef3c7' },
                { type: 'shape', shape: 'roundrect', x: 590, y: 130, w: 150, h: 64, rotation: 0, color: '#8b5cf6', strokeWidth: 2, fill: '#ede9fe' },
                { type: 'text', text: 'Enrolment', x: 85, y: 152, w: 100, h: 22, rotation: 0, fontSize: 14, color: '#1e3a8a' },
                { type: 'text', text: 'Treatment A', x: 355, y: 82, w: 100, h: 22, rotation: 0, fontSize: 14, color: '#065f46' },
                { type: 'text', text: 'Treatment B', x: 355, y: 232, w: 100, h: 22, rotation: 0, fontSize: 14, color: '#92400e' },
                { type: 'text', text: 'Outcome', x: 625, y: 152, w: 80, h: 22, rotation: 0, fontSize: 14, color: '#5b21b6' },
                { type: 'text', text: 'Randomized Study Design', x: 230, y: 320, w: 320, h: 28, rotation: 0, fontSize: 18, color: '#111827' }
            ],
            graphical: () => [
                { type: 'shape', shape: 'rect', x: 40, y: 40, w: 920, h: 560, rotation: 0, color: '#0d2149', strokeWidth: 2 },
                { type: 'text', text: 'Graphical Abstract', x: 330, y: 58, w: 340, h: 32, rotation: 0, fontSize: 24, color: '#0d2149' },
                { type: 'icon', name: 'mouse', x: 90, y: 150, w: 110, h: 110, rotation: 0 },
                { type: 'icon', name: 'flask', x: 90, y: 330, w: 90, h: 90, rotation: 0 },
                { type: 'icon', name: 'brain', x: 430, y: 180, w: 130, h: 130, rotation: 0 },
                { type: 'icon', name: 'molecule', x: 450, y: 360, w: 90, h: 90, rotation: 0 },
                { type: 'shape', shape: 'arrow', x: 250, y: 210, w: 130, h: 50, rotation: 42, color: '#2e5fe3', strokeWidth: 3 },
                { type: 'shape', shape: 'arrow', x: 620, y: 230, w: 130, h: 50, rotation: 42, color: '#15803d', strokeWidth: 3 },
                { type: 'icon', name: 'check', x: 800, y: 190, w: 100, h: 100, rotation: 0 },
                { type: 'text', text: 'Key finding: treatment improves outcome', x: 640, y: 330, w: 290, h: 52, rotation: 0, fontSize: 17, color: '#14532d' }
            ],
            prisma: () => [
                { type: 'shape', shape: 'roundrect', x: 330, y: 30, w: 300, h: 58, rotation: 0, color: '#334155', strokeWidth: 2, fill: '#f1f5f9' },
                { type: 'text', text: 'Records identified (n = )', x: 355, y: 48, w: 250, h: 22, rotation: 0, fontSize: 14, color: '#111827' },
                { type: 'shape', shape: 'roundrect', x: 330, y: 140, w: 300, h: 58, rotation: 0, color: '#334155', strokeWidth: 2, fill: '#f1f5f9' },
                { type: 'text', text: 'Records screened (n = )', x: 360, y: 158, w: 240, h: 22, rotation: 0, fontSize: 14, color: '#111827' },
                { type: 'shape', shape: 'roundrect', x: 680, y: 140, w: 240, h: 58, rotation: 0, color: '#b91c1c', strokeWidth: 2, fill: '#fee2e2' },
                { type: 'text', text: 'Excluded (n = )', x: 725, y: 158, w: 150, h: 22, rotation: 0, fontSize: 14, color: '#7f1d1d' },
                { type: 'shape', shape: 'roundrect', x: 330, y: 250, w: 300, h: 58, rotation: 0, color: '#334155', strokeWidth: 2, fill: '#f1f5f9' },
                { type: 'text', text: 'Full-text assessed (n = )', x: 360, y: 268, w: 240, h: 22, rotation: 0, fontSize: 14, color: '#111827' },
                { type: 'shape', shape: 'roundrect', x: 330, y: 360, w: 300, h: 58, rotation: 0, color: '#15803d', strokeWidth: 2, fill: '#dcfce7' },
                { type: 'text', text: 'Studies included (n = )', x: 360, y: 378, w: 240, h: 22, rotation: 0, fontSize: 14, color: '#14532d' }
            ],
            membrane: () => [
                { type: 'icon', name: 'membrane', x: 170, y: 240, w: 620, h: 110, rotation: 0 },
                { type: 'icon', name: 'channel', x: 300, y: 225, w: 90, h: 140, rotation: 0 },
                { type: 'icon', name: 'receptor', x: 560, y: 210, w: 90, h: 110, rotation: 0 },
                { type: 'icon', name: 'molecule', x: 315, y: 110, w: 56, h: 56, rotation: 0 },
                { type: 'icon', name: 'molecule', x: 580, y: 400, w: 56, h: 56, rotation: 0 },
                { type: 'text', text: 'Outside cell', x: 60, y: 130, w: 130, h: 24, rotation: 0, fontSize: 16, color: '#1e3a8a' },
                { type: 'text', text: 'Cytoplasm', x: 60, y: 420, w: 120, h: 24, rotation: 0, fontSize: 16, color: '#7f1d1d' },
                { type: 'text', text: 'Membrane Transport', x: 360, y: 40, w: 260, h: 28, rotation: 0, fontSize: 20, color: '#111827' }
            ],
            timeline: () => [
                { type: 'shape', shape: 'line', x: 60, y: 240, w: 860, h: 6, rotation: 0, color: '#334155', strokeWidth: 3 },
                { type: 'shape', shape: 'ellipse', x: 95, y: 218, w: 44, h: 44, rotation: 0, color: '#2563eb', strokeWidth: 3, fill: '#bfdbfe' },
                { type: 'shape', shape: 'ellipse', x: 315, y: 218, w: 44, h: 44, rotation: 0, color: '#059669', strokeWidth: 3, fill: '#a7f3d0' },
                { type: 'shape', shape: 'ellipse', x: 535, y: 218, w: 44, h: 44, rotation: 0, color: '#d97706', strokeWidth: 3, fill: '#fde68a' },
                { type: 'shape', shape: 'ellipse', x: 755, y: 218, w: 44, h: 44, rotation: 0, color: '#dc2626', strokeWidth: 3, fill: '#fecaca' },
                { type: 'text', text: 'Day 0\nAcclimatisation', x: 55, y: 140, w: 130, h: 44, rotation: 0, fontSize: 14, color: '#1e3a8a' },
                { type: 'text', text: 'Day 7\nTreatment starts', x: 272, y: 300, w: 140, h: 44, rotation: 0, fontSize: 14, color: '#065f46' },
                { type: 'text', text: 'Day 21\nBehaviour tests', x: 492, y: 140, w: 140, h: 44, rotation: 0, fontSize: 14, color: '#92400e' },
                { type: 'text', text: 'Day 22\nSacrifice & assays', x: 700, y: 300, w: 150, h: 44, rotation: 0, fontSize: 14, color: '#7f1d1d' },
                { type: 'text', text: 'Experimental Timeline', x: 350, y: 40, w: 300, h: 30, rotation: 0, fontSize: 21, color: '#111827' }
            ]
        };
        const build = T[name];
        if (!build) return;
        const raw = build();
        this.items = raw.map((it, idx) => ({ opacity: 1, flipH: false, flipV: false, locked: false, hidden: false, ...it, id: idx + 1 }));
        this.idCounter = this.items.length;
        // Pathway connectors (added after ids are known): molecule->receptor, protein->nucleus
        if (name === 'pathway') {
            this.items.push({ id: ++this.idCounter, type: 'connector', from: 4, to: 3, style: 'arrow', x: 0, y: 0, w: 0, h: 0, rotation: 0, color: '#334155', strokeWidth: 2 });
            this.items.push({ id: ++this.idCounter, type: 'connector', from: 5, to: 2, style: 'dashed', x: 0, y: 0, w: 0, h: 0, rotation: 0, color: '#334155', strokeWidth: 2 });
        }
        if (name === 'workflow') {
            const seq = [1, 2, 3, 4, 5];
            for (let k = 0; k < seq.length - 1; k++) {
                this.items.push({ id: ++this.idCounter, type: 'connector', from: seq[k], to: seq[k + 1], style: 'arrow', x: 0, y: 0, w: 0, h: 0, rotation: 0, color: '#334155', strokeWidth: 2 });
            }
        }
        if (name === 'prisma') {
            [[1, 3], [3, 7], [7, 9], [3, 5]].forEach(([a, b]) => {
                this.items.push({ id: ++this.idCounter, type: 'connector', from: a, to: b, style: 'arrow', x: 0, y: 0, w: 0, h: 0, rotation: 0, color: '#334155', strokeWidth: 2 });
            });
        }
        if (name === 'membrane') {
            this.items.push({ id: ++this.idCounter, type: 'connector', from: 4, to: 2, style: 'arrow', x: 0, y: 0, w: 0, h: 0, rotation: 0, color: '#334155', strokeWidth: 2 });
            this.items.push({ id: ++this.idCounter, type: 'connector', from: 3, to: 5, style: 'arrow', x: 0, y: 0, w: 0, h: 0, rotation: 0, color: '#334155', strokeWidth: 2 });
        }
        this.selectedIds.clear();
        this.selectedId = null;
        this.render();
        this.saveState();
    }

    // ---------- Export ----------
    wrapLines(ctx, text, maxWidth) {
        const out = [];
        String(text).split('\n').forEach(para => {
            const words = para.split(/\s+/).filter(Boolean);
            if (!words.length) { out.push(''); return; }
            let cur = words[0];
            for (let i = 1; i < words.length; i++) {
                const test = cur + ' ' + words[i];
                if (ctx.measureText(test).width <= maxWidth) cur = test;
                else { out.push(cur); cur = words[i]; }
            }
            out.push(cur);
        });
        return out;
    }

    async exportPNG() {
        const scale = parseFloat(document.getElementById('export-scale').value) || 2;
        const transparent = document.getElementById('export-transparent').checked;
        const width = this.page.w, height = this.page.h;
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        if (!transparent) {
            ctx.fillStyle = this.page.bg || '#ffffff';
            ctx.fillRect(0, 0, width, height);
        }
        // Connectors under items
        this.items.filter(i => i.type === 'connector').forEach(conn => this.drawConnectorCanvas(ctx, conn));
        for (const item of this.items) {
            if (item.type === 'connector' || item.hidden) continue;
            ctx.save();
            ctx.globalAlpha = item.opacity != null ? item.opacity : 1;
            ctx.translate(item.x + item.w / 2, item.y + item.h / 2);
            ctx.rotate((item.rotation || 0) * Math.PI / 180);
            ctx.scale(item.flipH ? -1 : 1, item.flipV ? -1 : 1);
            ctx.translate(-item.w / 2, -item.h / 2);
            if (item.type === 'icon') {
                if (item.bgTint) { ctx.fillStyle = item.bgTint; ctx.fillRect(0, 0, item.w, item.h); }
                const img = await this.svgToImage(ICONS[item.name] || '', item.w, item.h);
                if (img) ctx.drawImage(img, 0, 0, item.w, item.h);
            } else if (item.type === 'image') {
                const img = await this.loadImage(item.src);
                if (img) ctx.drawImage(img, 0, 0, item.w, item.h);
            } else if (item.type === 'text') {
                ctx.fillStyle = item.color || '#000';
                const fs = item.fontSize || 16;
                ctx.font = `${item.italic ? 'italic ' : ''}${item.bold ? '700 ' : ''}${fs}px ${item.fontFamily || 'Arial'}`;
                ctx.textBaseline = 'top';
                this.wrapLines(ctx, item.text || '', item.w - 6).forEach((ln, i) => {
                    ctx.fillText(ln, 3, i * fs * 1.25);
                });
            } else if (item.type === 'shape') {
                this.drawShapeCanvas(ctx, item);
            }
            ctx.restore();
        }
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'figure-export.png';
        a.click();
    }

    drawConnectorCanvas(ctx, conn) {
        const a = this.items.find(i => i.id === conn.from);
        const b = this.items.find(i => i.id === conn.to);
        if (!a || !b) return;
        const p1 = this.itemCenter(a), p2 = this.itemCenter(b);
        ctx.save();
        ctx.strokeStyle = conn.color || '#334155';
        ctx.lineWidth = conn.strokeWidth != null ? conn.strokeWidth : 2;
        if (conn.style === 'dashed') ctx.setLineDash([7, 5]);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.setLineDash([]);
        if (conn.style === 'arrow' || conn.style === 'dashed') {
            const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const hl = 12;
            ctx.fillStyle = conn.color || '#334155';
            ctx.beginPath();
            ctx.moveTo(p2.x, p2.y);
            ctx.lineTo(p2.x - hl * Math.cos(ang - Math.PI / 7), p2.y - hl * Math.sin(ang - Math.PI / 7));
            ctx.lineTo(p2.x - hl * Math.cos(ang + Math.PI / 7), p2.y - hl * Math.sin(ang + Math.PI / 7));
            ctx.closePath();
            ctx.fill();
        } else if (conn.style === 'inhibit') {
            const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
            ctx.lineWidth = (conn.strokeWidth != null ? conn.strokeWidth : 2) + 1;
            ctx.beginPath();
            ctx.moveTo(p2.x - 11 * Math.cos(ang), p2.y - 11 * Math.sin(ang));
            ctx.lineTo(p2.x + 11 * Math.cos(ang), p2.y + 11 * Math.sin(ang));
            ctx.stroke();
        }
        ctx.restore();
    }

    drawShapeCanvas(ctx, item) {
        const c = item.color || '#3b82f6';
        const sw = item.strokeWidth != null ? item.strokeWidth : 2;
        const w = item.w, h = item.h;
        ctx.strokeStyle = c;
        ctx.lineWidth = sw;
        if (item.fill) ctx.fillStyle = item.fill;
        const poly = (pts) => {
            ctx.beginPath();
            pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
            ctx.closePath();
            if (item.fill) ctx.fill();
            ctx.stroke();
        };
        switch (item.shape) {
            case 'rect':
                if (item.fill) ctx.fillRect(4, 4, w - 8, h - 8);
                ctx.strokeRect(4, 4, w - 8, h - 8); break;
            case 'roundrect': {
                const r = Math.min(16, w / 4, h / 4);
                ctx.beginPath();
                ctx.moveTo(4 + r, 4);
                ctx.arcTo(w - 4, 4, w - 4, h - 4, r);
                ctx.arcTo(w - 4, h - 4, 4, h - 4, r);
                ctx.arcTo(4, h - 4, 4, 4, r);
                ctx.arcTo(4, 4, w - 4, 4, r);
                ctx.closePath();
                if (item.fill) ctx.fill();
                ctx.stroke(); break;
            }
            case 'ellipse':
                ctx.beginPath();
                ctx.ellipse(w / 2, h / 2, w / 2 - 4, h / 2 - 4, 0, 0, Math.PI * 2);
                if (item.fill) ctx.fill();
                ctx.stroke(); break;
            case 'triangle': poly([[w / 2, 4], [w - 4, h - 4], [4, h - 4]]); break;
            case 'hexagon': poly([[w / 2, 3], [w - 6, h * 0.27], [w - 6, h * 0.73], [w / 2, h - 3], [6, h * 0.73], [6, h * 0.27]]); break;
            case 'star': {
                const pts = [];
                for (let i = 0; i < 10; i++) {
                    const r = i % 2 === 0 ? 0.48 : 0.21;
                    const a = -Math.PI / 2 + i * Math.PI / 5;
                    pts.push([w / 2 + r * w * Math.cos(a), h / 2 + r * h * Math.sin(a)]);
                }
                ctx.fillStyle = item.fill || c;
                ctx.beginPath();
                pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
                ctx.closePath(); ctx.fill(); ctx.stroke(); break;
            }
            case 'plus': {
                const tx = w * 0.38, ty = h * 0.38;
                poly([[tx, 4], [w - tx, 4], [w - tx, ty], [w - 4, ty], [w - 4, h - ty], [w - tx, h - ty], [w - tx, h - 4], [tx, h - 4], [tx, h - ty], [4, h - ty], [4, ty], [tx, ty]]);
                if (!item.fill) { ctx.fillStyle = c; ctx.fill(); }
                break;
            }
            case 'cylinder': {
                ctx.beginPath();
                ctx.moveTo(5, 14);
                ctx.lineTo(5, h - 14);
                ctx.ellipse(w / 2, h - 14, w / 2 - 5, 13, 0, Math.PI, 0, true);
                ctx.lineTo(w - 5, 14);
                if (item.fill) ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse(w / 2, 14, w / 2 - 5, 13, 0, 0, Math.PI * 2);
                if (item.fill) ctx.fill();
                ctx.stroke(); break;
            }
            case 'membrane': {
                const n = Math.max(3, Math.floor(w / 16));
                const step = w / n, r = Math.min(step, h) * 0.30;
                const y1 = h * 0.30, y2 = h * 0.70;
                ctx.strokeStyle = '#b45309';
                ctx.fillStyle = '#fbbf24';
                ctx.lineWidth = 1.5;
                for (let i = 0; i < n; i++) {
                    const cx = step * (i + 0.5);
                    ctx.beginPath(); ctx.moveTo(cx - r * 0.4, y1 + r); ctx.lineTo(cx - r * 0.4, y1 + h * 0.2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(cx + r * 0.4, y1 + r); ctx.lineTo(cx + r * 0.4, y1 + h * 0.2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(cx - r * 0.4, y2 - r); ctx.lineTo(cx - r * 0.4, y2 - h * 0.2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(cx + r * 0.4, y2 - r); ctx.lineTo(cx + r * 0.4, y2 - h * 0.2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(cx, y1, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                    ctx.beginPath(); ctx.arc(cx, y2, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                }
                break;
            }
            case 'line':
                ctx.beginPath(); ctx.moveTo(2, 2); ctx.lineTo(w - 2, h - 2); ctx.stroke(); break;
            case 'arrow':
                this.drawArrow(ctx, 0, item.h, item.w * 0.92, item.h * 0.08, item.color, item.strokeWidth); break;
        }
    }

    drawArrow(ctx, fromx, fromy, tox, toy, color, width) {
        const headlen = 12;
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
            if (!svgString) { resolve(null); return; }
            const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svg);
            const img = new Image();
            img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
            img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
            img.src = url;
        });
    }

    loadImage(src) {
        return new Promise((resolve) => {
            if (!src) { resolve(null); return; }
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
        });
    }

    escXml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    svgInner(svgString) {
        return String(svgString || '').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    }

    exportSVG() {
        const transparent = document.getElementById('export-transparent').checked;
        const W = this.page.w, H = this.page.h;
        const parts = [];
        parts.push(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
        parts.push('<defs><marker id="conn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#334155"/></marker></defs>');
        if (!transparent) parts.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${this.page.bg || '#ffffff'}"/>`);
        // Connectors first (under items)
        this.items.filter(i => i.type === 'connector').forEach(conn => {
            const a = this.items.find(i => i.id === conn.from);
            const b = this.items.find(i => i.id === conn.to);
            if (!a || !b) return;
            const p1 = this.itemCenter(a), p2 = this.itemCenter(b);
            const col = conn.color || '#334155', sw = conn.strokeWidth != null ? conn.strokeWidth : 2;
            const dash = conn.style === 'dashed' ? ' stroke-dasharray="7 5"' : '';
            const marker = (conn.style === 'arrow' || conn.style === 'dashed') ? ' marker-end="url(#conn-arrow)"' : '';
            parts.push(`<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${col}" stroke-width="${sw}"${dash}${marker}/>`);
            if (conn.style === 'inhibit') {
                const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2, L = 11;
                parts.push(`<line x1="${p2.x - L * Math.cos(ang)}" y1="${p2.y - L * Math.sin(ang)}" x2="${p2.x + L * Math.cos(ang)}" y2="${p2.y + L * Math.sin(ang)}" stroke="${col}" stroke-width="${sw + 1}"/>`);
            }
        });
        this.items.forEach(item => {
            if (item.type === 'connector' || item.hidden) return;
            const cx = item.x + item.w / 2, cy = item.y + item.h / 2;
            const op = item.opacity != null ? ` opacity="${item.opacity}"` : '';
            parts.push(`<g transform="translate(${cx} ${cy}) rotate(${item.rotation || 0}) scale(${item.flipH ? -1 : 1} ${item.flipV ? -1 : 1}) translate(${-item.w / 2} ${-item.h / 2})"${op}>`);
            if (item.type === 'icon') {
                if (item.bgTint) parts.push(`<rect x="0" y="0" width="${item.w}" height="${item.h}" fill="${item.bgTint}"/>`);
                parts.push(`<svg x="0" y="0" width="${item.w}" height="${item.h}" viewBox="0 0 100 100">${this.svgInner(ICONS[item.name])}</svg>`);
            } else if (item.type === 'image') {
                parts.push(`<image href="${item.src || ''}" xlink:href="${item.src || ''}" x="0" y="0" width="${item.w}" height="${item.h}"/>`);
            } else if (item.type === 'text') {
                const fs = item.fontSize || 16;
                const lines = String(item.text || '').split('\n');
                const tspans = lines.map((ln, i) => `<tspan x="3" dy="${i === 0 ? fs : fs * 1.25}">${this.escXml(ln)}</tspan>`).join('');
                parts.push(`<text font-size="${fs}" fill="${item.color || '#000'}" font-family="${this.escXml(item.fontFamily || 'Arial')}" font-weight="${item.bold ? '700' : '400'}" font-style="${item.italic ? 'italic' : 'normal'}">${tspans}</text>`);
            } else if (item.type === 'shape') {
                const vb = item.shape === 'membrane' ? `0 0 ${Math.max(60, item.w)} ${Math.max(30, item.h)}` : '0 0 100 100';
                parts.push(`<svg x="0" y="0" width="${item.w}" height="${item.h}" viewBox="${vb}" preserveAspectRatio="none">${this.svgInner(this.getShapeSVG(item))}</svg>`);
            }
            parts.push('</g>');
        });
        parts.push('</svg>');
        const blob = new Blob([parts.join('\n')], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'figure-export.svg';
        a.click();
        URL.revokeObjectURL(url);
    }
}

const studio = new FigureStudio();
window.app = studio; // For debugging and console access
