/**
 * Andrei.Dev — Comprehensive Portfolio Logic
 * Modules:
 * 1. Loom Video Walkthrough Mock Player
 * 2. Interactive Project Sandbox Simulator
 * 3. Client ROI & Break-Even Calculator
 * 4. Project Budget Estimator & WhatsApp Contact Flow
 */

// -------------------------------------------------------------
// 1. Loom Video Walkthrough Engine
// -------------------------------------------------------------
const LOOM_CHAPTERS = [
  {
    start: 0,
    badge: "CAPITOLUL 1: DIAGNOSTICUL",
    heading: "De ce pierd 80% din site-urile din România clienți în primele 5 secunde?",
    text: "Timp de încărcare de peste 3 secunde, layout confuz pe telefon și lipsa unui flux rapid de contact fac ca 4 din 5 vizitatori să părăsească pagina fără a genera un lead."
  },
  {
    start: 25,
    badge: "CAPITOLUL 2: ARHITECTURĂ TEHNICĂ",
    heading: "Arhitectură Ultra-Rapidă (<0.8s) & 99/100 pe Google PageSpeed",
    text: "Fără framework-uri greoaie sau plugin-uri inutile. Cod Vanilla & Next.js curat, asset-uri optimizate WebP/SVG și găzduire edge pe Cloudflare pentru timpi de răspuns sub 100ms."
  },
  {
    start: 55,
    badge: "CAPITOLUL 3: AUTOMATIZĂRI CONVERSIE",
    heading: "Automatizări WhatsApp Instant, Plăți Escrow & Contracte PDF",
    text: "Integrare directă cu notificări pe WhatsApp pentru preluarea clientului în primele 5 minute, semnare digitală pe ecran și autorizare securizată pe card prin Stripe."
  },
  {
    start: 75,
    badge: "CAPITOLUL 4: REZULTATE REALE",
    heading: "Studiu de Caz: Dublarea vânzărilor și amortizare în sub 2 săptămâni",
    text: "Transformarea site-ului dintr-o simplă broșură într-un motor automat de generare lead-uri, cu un ROI anual mediu de peste +500% pentru clienții din portofoliu."
  }
];

let loomCurrentTime = 0;
let loomDuration = 90;
let loomIsPlaying = false;
let loomPlaybackRate = 1.0;
let loomIsMuted = false;
let loomTimer = null;

function setupLoomPlayer() {
  const playPauseBtn = document.getElementById('loomPlayPauseBtn');
  const bigPlayBtn = document.getElementById('loomBigPlayBtn');
  const scrubber = document.getElementById('loomScrubber');
  const progressFill = document.getElementById('loomProgressFill');
  const timeDisplay = document.getElementById('loomTimeDisplay');
  const playIcon = document.getElementById('loomPlayIcon');
  const speedBtn = document.getElementById('loomSpeedBtn');
  const muteBtn = document.getElementById('loomMuteBtn');
  const audioWave = document.getElementById('loomAudioWave');
  const chapterChips = document.querySelectorAll('.chapter-chip');

  if (!playPauseBtn || !bigPlayBtn || !scrubber) return;

  function updateLoomUI() {
    scrubber.value = loomCurrentTime;
    const pct = (loomCurrentTime / loomDuration) * 100;
    progressFill.style.width = `${pct}%`;

    const mins = Math.floor(loomCurrentTime / 60);
    const secs = Math.floor(loomCurrentTime % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${mins}:${secs} / 1:30`;

    // Identify current chapter
    let currentCh = LOOM_CHAPTERS[0];
    for (let i = LOOM_CHAPTERS.length - 1; i >= 0; i--) {
      if (loomCurrentTime >= LOOM_CHAPTERS[i].start) {
        currentCh = LOOM_CHAPTERS[i];
        break;
      }
    }

    const badgeEl = document.getElementById('loomChapterBadge');
    const headingEl = document.getElementById('loomChapterHeading');
    const textEl = document.getElementById('loomChapterText');

    if (badgeEl && badgeEl.textContent !== currentCh.badge) {
      badgeEl.textContent = currentCh.badge;
      headingEl.textContent = currentCh.heading;
      textEl.textContent = currentCh.text;
    }

    chapterChips.forEach(chip => {
      const chipTime = parseInt(chip.dataset.time, 10);
      chip.classList.toggle('active', chipTime === currentCh.start);
    });
  }

  function togglePlay() {
    loomIsPlaying = !loomIsPlaying;
    if (loomIsPlaying) {
      playIcon.textContent = '⏸';
      bigPlayBtn.style.opacity = '0';
      bigPlayBtn.style.pointerEvents = 'none';
      audioWave.classList.add('playing');

      if (loomCurrentTime >= loomDuration) {
        loomCurrentTime = 0;
      }

      loomTimer = setInterval(() => {
        loomCurrentTime += 0.25 * loomPlaybackRate;
        if (loomCurrentTime >= loomDuration) {
          loomCurrentTime = loomDuration;
          togglePlay();
        }
        updateLoomUI();
      }, 250);
    } else {
      playIcon.textContent = '▶';
      bigPlayBtn.style.opacity = '1';
      bigPlayBtn.style.pointerEvents = 'auto';
      audioWave.classList.remove('playing');
      clearInterval(loomTimer);
    }
  }

  playPauseBtn.addEventListener('click', togglePlay);
  bigPlayBtn.addEventListener('click', togglePlay);

  scrubber.addEventListener('input', (e) => {
    loomCurrentTime = parseFloat(e.target.value);
    updateLoomUI();
  });

  chapterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const time = parseInt(chip.dataset.time, 10);
      loomCurrentTime = time;
      updateLoomUI();
      if (!loomIsPlaying) togglePlay();
      showToast(`🎬 Sari la: ${chip.textContent}`);
    });
  });

  speedBtn.addEventListener('click', () => {
    if (loomPlaybackRate === 1.0) loomPlaybackRate = 1.5;
    else if (loomPlaybackRate === 1.5) loomPlaybackRate = 2.0;
    else loomPlaybackRate = 1.0;
    speedBtn.textContent = `${loomPlaybackRate.toFixed(1)}x`;
    showToast(`⚡ Viteză video setată la ${loomPlaybackRate}x`);
  });

  muteBtn.addEventListener('click', () => {
    loomIsMuted = !loomIsMuted;
    muteBtn.textContent = loomIsMuted ? '🔇' : '🔊';
    showToast(loomIsMuted ? '🔇 Sunet dezactivat' : '🔊 Sunet activat');
  });

  updateLoomUI();
}

// -------------------------------------------------------------
// 2. Interactive Project Sandbox Engine
// -------------------------------------------------------------
const SANDBOX_PROJECTS = [
  {
    id: "blabla-alex",
    title: "ianenene (Alex Edition)",
    category: "webapps",
    categoryLabel: "Web Apps & Mobilitate",
    desc: "Platformă națională de carpooling intercity și navetă zilnică cu șoferi verificați, plăți escrow și traseu GPS pe hartă Leaflet.",
    previewPill: "🔑 Flux Cod PIN Escrow & Rute DN1",
    previewSnippet: "Căutare rute București ➔ Brașov (45 RON), Otopeni ➔ Constanța și generare automată de PIN deblocare plată în 4 cifre.",
    filePath: "file:///C:/Users/Andrei/Desktop/Project%20optimisation/agent%20de%20intrebari%20avansat/projects/blabla-alex-rideshare/index.html",
    simHtml: `
      <div style="background: rgba(18,25,44,0.7); border: 1px solid rgba(56,189,248,0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <h4 style="color: #38bdf8; font-size: 1.1rem; margin-bottom: 10px;">🚗 Simulator Cursă & Generare PIN Escrow</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
          <div>
            <label style="font-size: 0.78rem; color: #94a3b8; display: block;">Traseu Selectat</label>
            <select id="simRideRoute" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
              <option value="45|București - Brașov (Alexandru B., Tesla Model 3)">București ➔ Brașov (45 RON)</option>
              <option value="50|Otopeni - Brașov (Ciprian V., Volvo EX30)">Otopeni ➔ Brașov (50 RON)</option>
              <option value="60|Otopeni - Constanța (Marius D., Mercedes C-Class)">Otopeni ➔ Constanța (60 RON)</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.78rem; color: #94a3b8; display: block;">Locuri Rezervate</label>
            <select id="simRideSeats" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
              <option value="1">1 loc</option>
              <option value="2">2 locuri</option>
            </select>
          </div>
        </div>
        <button class="btn btn-primary btn-block" id="simBookRideBtn" style="background: linear-gradient(135deg, #10b981, #06b6d4);">
          🔒 Simulează Autorizare Card & Generează PIN
        </button>
        <div id="simRideResult" style="display: none; margin-top: 14px; background: rgba(16,185,129,0.1); border: 1px solid #10b981; border-radius: 8px; padding: 12px; text-align: center;">
          <span style="font-size: 0.75rem; color: #10b981; font-weight: 700; text-transform: uppercase;">PIN Secret Deblocare Cursă:</span>
          <div style="font-size: 1.8rem; font-weight: 800; letter-spacing: 4px; color: #fff; margin: 4px 0;" id="simDisplayPin">----</div>
          <span style="font-size: 0.78rem; color: #cbd5e1;">Banii sunt eliberați șoferului DOAR când comunici acest PIN la sosire!</span>
        </div>
      </div>
    `,
    initSim: () => {
      const btn = document.getElementById('simBookRideBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          const pin = Math.floor(1000 + Math.random() * 9000);
          const res = document.getElementById('simRideResult');
          const disp = document.getElementById('simDisplayPin');
          if (disp) disp.textContent = pin;
          if (res) res.style.display = 'block';
          showToast(`🎉 Cursă rezervată cu succes în Sandbox! PIN: ${pin}`);
        });
      }
    }
  },
  {
    id: "rentoutilaj",
    title: "RentoUtilaj Marketplace",
    category: "b2b",
    categoryLabel: "E-Commerce & B2B",
    desc: "Marketplace B2B de utilaje de construcții cu generator PDF de contracte de închiriere A4, semnătură pe touchscreen și blocare garanție pe card.",
    previewPill: "📝 Contract PDF & Semnătură Digitală",
    previewSnippet: "Simulator de generare deviz, calculare garanție reținută în escrow și descărcare contract legal conform Codului Civil Român.",
    filePath: "file:///C:/Users/Andrei/Desktop/Project%20optimisation/agent%20de%20intrebari%20avansat/projects/marketplace-utilaje-mvp/index.html",
    simHtml: `
      <div style="background: rgba(18,25,44,0.7); border: 1px solid rgba(245,158,11,0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <h4 style="color: #fbbf24; font-size: 1.1rem; margin-bottom: 10px;">🏗️ Simulator Contract & Hold Garanție</h4>
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 10px; margin-bottom: 12px;">
          <div>
            <label style="font-size: 0.78rem; color: #94a3b8; display: block;">Utilaj Selectat</label>
            <select id="simMachineSelect" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
              <option value="1200|3000">Excavator Senile JCB 220X (1.200 RON/zi, Garanție: 3.000 RON)</option>
              <option value="950|2500">Buldoexcavator CAT 432 (950 RON/zi, Garanție: 2.500 RON)</option>
              <option value="600|1500">Miniîncărcător Bobcat S550 (600 RON/zi, Garanție: 1.500 RON)</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.78rem; color: #94a3b8; display: block;">Zile Închiriere</label>
            <input type="number" id="simRentDays" value="5" min="1" max="30" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; margin-bottom: 12px; font-size: 0.85rem;" id="simRentSummary">
          Total Chirie: <strong>6.000 RON</strong> • Garanție Hold Stripe: <strong>3.000 RON</strong>
        </div>
        <button class="btn btn-primary btn-block" id="simGenContractBtn" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
          📄 Generează Deviz & Confirmă Pre-Autorizarea
        </button>
      </div>
    `,
    initSim: () => {
      const sel = document.getElementById('simMachineSelect');
      const days = document.getElementById('simRentDays');
      const summ = document.getElementById('simRentSummary');
      const btn = document.getElementById('simGenContractBtn');

      const recalc = () => {
        if (!sel || !days || !summ) return;
        const [rate, deposit] = sel.value.split('|').map(Number);
        const count = parseInt(days.value || '1', 10);
        const total = rate * count;
        summ.innerHTML = `Total Chirie: <strong>${total.toLocaleString('ro-RO')} RON</strong> (${count} zile) • Garanție Blocată Card: <strong>${deposit.toLocaleString('ro-RO')} RON</strong>`;
      };

      if (sel) sel.addEventListener('change', recalc);
      if (days) days.addEventListener('input', recalc);
      if (btn) {
        btn.addEventListener('click', () => {
          showToast('📄 Contract PDF RentoUtilaj generat cu clauză de garanție conform OG 49/2019!');
        });
      }
    }
  },
  {
    id: "auramamaia",
    title: "Aura Mamaia Nord",
    category: "webapps",
    categoryLabel: "Web Apps & Mobilitate",
    desc: "Site de lux pentru apartament de vacanță la 50m de plajă, tur virtual 360° interactiv cu 4 încăperi, cod Yale Smart Lock și sincronizare iCal.",
    previewPill: "🌐 Tur Virtual 360° & Yale Lock",
    previewSnippet: "Navighează între Living, Dormitor și Terasă cu vedere la mare și generează codul PIN unic de acces pe tastatură digitală.",
    filePath: "file:///C:/Users/Andrei/Desktop/Project%20optimisation/agent%20de%20intrebari%20avansat/projects/alex-mamaia-nord/index.html",
    simHtml: `
      <div style="background: rgba(18,25,44,0.7); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <h4 style="color: #c4b5fd; font-size: 1.1rem; margin-bottom: 10px;">🏖️ Simulator Tur 360° & Smart Keypad</h4>
        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
          <button class="btn btn-outline" style="flex: 1; font-size: 0.8rem; padding: 6px;" onclick="document.getElementById('simTourRoom').innerText='Living Panoramă & Dining'; showToast('Vizualizare Living setată!');">🛋️ Living</button>
          <button class="btn btn-outline" style="flex: 1; font-size: 0.8rem; padding: 6px;" onclick="document.getElementById('simTourRoom').innerText='Dormitor Master King Size'; showToast('Vizualizare Dormitor setată!');">🛏️ Dormitor</button>
          <button class="btn btn-outline" style="flex: 1; font-size: 0.8rem; padding: 6px;" onclick="document.getElementById('simTourRoom').innerText='Terasă cu Vedere Panoramică Mare'; showToast('Vizualizare Terasă setată!');">🌊 Terasă</button>
        </div>
        <div style="background: #09090b; border-radius: 8px; padding: 24px; text-align: center; border: 1px dashed #334155; margin-bottom: 12px;">
          <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 700; text-transform: uppercase;">Încăpere Activă Tur Virtual:</span>
          <div style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-top: 4px;" id="simTourRoom">Living Panoramă & Dining</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(16,185,129,0.1); border: 1px solid #10b981; border-radius: 8px; padding: 10px 14px;">
          <span style="font-size: 0.85rem; color: #10b981; font-weight: 600;">Yale Smart Lock Tastatură:</span>
          <strong style="font-size: 1.1rem; color: #fff; font-family: monospace;">*4829#</strong>
        </div>
      </div>
    `,
    initSim: () => {}
  },
  {
    id: "layerbylayer",
    title: "LayerByLayer (3D Studio)",
    category: "interactive",
    categoryLabel: "Instrumente 3D & Satelit",
    desc: "Platformă WebGL cu Three.js pentru calcularea automată a volumului net al modelelor STL în cm³, greutate filament și cost per piesă.",
    previewPill: "🧊 Calculator Volum STL & Infill",
    previewSnippet: "Algoritm matematic de tetraedre semnate pentru determinarea precisă a masei piesei și costului de printare.",
    filePath: "file:///C:/Users/Andrei/Desktop/Project%20optimisation/agent%20de%20intrebari%20avansat/projects/3d-print-shop/index.html",
    simHtml: `
      <div style="background: rgba(18,25,44,0.7); border: 1px solid rgba(14,165,233,0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <h4 style="color: #38bdf8; font-size: 1.1rem; margin-bottom: 10px;">📐 Calculator Slicer 3D & Infill</h4>
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.78rem; color: #94a3b8; display: block; margin-bottom: 4px;">Model 3D Demo</label>
          <select id="simStlModel" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
            <option value="15.4|Benchy Nave">3DBenchy Clasic (Volum: 15.4 cm³)</option>
            <option value="42.8|Carcasă Electronică">Carcasă Senzor IoT (Volum: 42.8 cm³)</option>
            <option value="88.2|Vază Geometrică">Vază Spirală Organică (Volum: 88.2 cm³)</option>
          </select>
        </div>
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 4px;">
            <span>Densitate Infill (Umplutură):</span>
            <strong id="simInfillVal">20%</strong>
          </div>
          <input type="range" id="simInfillRange" min="10" max="100" step="5" value="20" style="width: 100%;">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; font-size: 0.82rem;">
          <div>Greutate Estimat: <strong id="simWeightVal" style="color: #38bdf8;">19.2 grame</strong></div>
          <div>Preț Calculat: <strong id="simPriceVal" style="color: #10b981;">34 RON</strong></div>
        </div>
      </div>
    `,
    initSim: () => {
      const model = document.getElementById('simStlModel');
      const infill = document.getElementById('simInfillRange');
      const infillVal = document.getElementById('simInfillVal');
      const weightVal = document.getElementById('simWeightVal');
      const priceVal = document.getElementById('simPriceVal');

      const recalc = () => {
        if (!model || !infill) return;
        const vol = parseFloat(model.value.split('|')[0]);
        const inf = parseInt(infill.value, 10);
        infillVal.textContent = `${inf}%`;

        // PLA density ~ 1.24 g/cm3 with infill scaling
        const effectiveVol = vol * (0.3 + (inf / 100) * 0.7);
        const grams = Math.round(effectiveVol * 1.24 * 10) / 10;
        const price = Math.round(15 + grams * 1.05);

        weightVal.textContent = `${grams} grame`;
        priceVal.textContent = `${price} RON`;
      };

      if (model) model.addEventListener('change', recalc);
      if (infill) infill.addEventListener('input', recalc);
      recalc();
    }
  },
  {
    id: "browlash",
    title: "BrowLash™ Cosmetics",
    category: "b2b",
    categoryLabel: "E-Commerce & B2B",
    desc: "Landing page de e-commerce cu rată mare de conversie, slider interactiv Before/After 28 zile și selector live pentru 25+ lockere Sameday Easybox.",
    previewPill: "✨ Slider 28 Zile & Sameday Easybox",
    previewSnippet: "Quiz de diagnosticare a sănătății foliculilor și aplicare instantanee a pachetului promoțional direct în coș.",
    filePath: "file:///C:/Users/Andrei/Desktop/Project%20optimisation/agent%20de%20intrebari%20avansat/projects/eyebrow-serum/index.html",
    simHtml: `
      <div style="background: rgba(18,25,44,0.7); border: 1px solid rgba(236,72,153,0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <h4 style="color: #f472b6; font-size: 1.1rem; margin-bottom: 10px;">🌸 Quiz Diagnostic & Easybox Selector</h4>
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.78rem; color: #94a3b8; display: block; margin-bottom: 4px;">Obiectivul Tău pentru Sprâncene</label>
          <select id="simQuizGoal" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
            <option value="Duo Densitate Totală (2x Ser) — Recomandat">Goluri mari și subțiere vizibilă</option>
            <option value="Tratament Intensiv 90 Zile (3x Ser + Ulei)">Fire fragile după pensat excesiv</option>
            <option value="Flacon Starter (1x Ser)">Întreținere și luciu natural</option>
          </select>
        </div>
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.78rem; color: #94a3b8; display: block; margin-bottom: 4px;">Punct Livrare Sameday Easybox (București & Ilfov)</label>
          <select id="simEasyboxLocker" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
            <option>Easybox Mall Promenada (Calea Floreasca 246)</option>
            <option>Easybox OMV Băneasa (Șos. București-Ploiești 2)</option>
            <option>Easybox Metrou Pipera (B-dul Dimitrie Pompeiu)</option>
            <option>Easybox Iulius Mall Cluj (Str. Alexandru Vaida Voevod)</option>
          </select>
        </div>
        <button class="btn btn-primary btn-block" style="background: linear-gradient(135deg, #ec4899, #be185d);" onclick="showToast('🎁 Pachet adăugat în coș cu livrare la Easybox (10 RON / Gratuit peste 150 RON)!')">
          🛍️ Aplică Recomandarea Diagnostică
        </button>
      </div>
    `,
    initSim: () => {}
  },
  {
    id: "mangeac",
    title: "Mangeac Gazon",
    category: "interactive",
    categoryLabel: "Instrumente 3D & Satelit",
    desc: "Platformă de peisagistică cu instrument satelitar Leaflet de calcul geodezic al suprafețelor în mp și abonamente sezoniere recurente.",
    previewPill: "🛰️ Măsurare Curte Satelit & Abonament",
    previewSnippet: "Calculează instant mp curții pentru Pipera, Corbeanca sau Otopeni și sincronizează pachetul optim de tuns.",
    filePath: "file:///C:/Users/Andrei/Desktop/Project%20optimisation/agent%20de%20intrebari%20avansat/projects/mangeac-site/index.html",
    simHtml: `
      <div style="background: rgba(18,25,44,0.7); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <h4 style="color: #10b981; font-size: 1.1rem; margin-bottom: 10px;">🌱 Calculator Suprafață & Abonament Sezonier</h4>
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.78rem; color: #94a3b8; display: block; margin-bottom: 4px;">Zonă Rezidențială Predefinită</label>
          <select id="simYardZone" style="width: 100%; background: #09090b; border: 1px solid #334155; color: #fff; padding: 8px; border-radius: 6px; font-size: 0.88rem;">
            <option value="180|280|Pipera">Pipera Rezidențial — Curte medie (180 mp)</option>
            <option value="320|420|Otopeni">Otopeni Nord — Curte mare (320 mp)</option>
            <option value="550|680|Corbeanca">Corbeanca Paradisul Verde — Domeniu (550 mp)</option>
          </select>
        </div>
        <div style="background: rgba(16,185,129,0.08); border: 1px solid #10b981; border-radius: 8px; padding: 12px; margin-bottom: 12px; text-align: center;">
          <div style="font-size: 0.82rem; color: #94a3b8;">Suprafață Gazon Măsurată:</div>
          <div style="font-size: 1.5rem; font-weight: 800; color: #fff;" id="simYardArea">180 mp</div>
          <div style="font-size: 0.85rem; color: #10b981; font-weight: 700; margin-top: 4px;" id="simYardPlan">Abonament Pro Master: 280 RON / lună (4 vizite)</div>
        </div>
        <button class="btn btn-primary btn-block" style="background: linear-gradient(135deg, #10b981, #059669);" onclick="showToast('🌿 Pachet sincronizat! 4 vizite lunare cu tundere, fertilizare și trimmer!')">
          📅 Programează Prima Evaluare Gratuită
        </button>
      </div>
    `,
    initSim: () => {
      const zone = document.getElementById('simYardZone');
      const area = document.getElementById('simYardArea');
      const plan = document.getElementById('simYardPlan');

      const recalc = () => {
        if (!zone || !area || !plan) return;
        const [sqm, cost] = zone.value.split('|');
        area.textContent = `${sqm} mp`;
        plan.textContent = `Abonament Pro Master: ${cost} RON / lună (4 vizite incluse)`;
      };

      if (zone) zone.addEventListener('change', recalc);
    }
  }
];

let activeSandboxCategory = 'all';

function setupSandbox() {
  const grid = document.getElementById('sandboxGrid');
  const tabs = document.querySelectorAll('.sandbox-tab-btn');
  const modal = document.getElementById('sandboxModal');
  const modalContent = document.getElementById('sandboxModalContent');
  const closeBtn = document.getElementById('closeSandboxModalBtn');

  if (!grid) return;

  function renderGrid() {
    const filtered = SANDBOX_PROJECTS.filter(p => {
      if (activeSandboxCategory === 'all') return true;
      return p.category === activeSandboxCategory;
    });

    grid.innerHTML = filtered.map(p => `
      <div class="sandbox-card" data-project-id="${p.id}">
        <div class="sandbox-card-header">
          <span class="sandbox-badge">${p.categoryLabel}</span>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        </div>
        <div class="sandbox-card-preview">
          <span class="preview-pill">${p.previewPill}</span>
          <div>${p.previewSnippet}</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary" style="flex: 1; font-size: 0.85rem; padding: 10px;" onclick="openProjectSandbox('${p.id}')">
            🧪 Deschide Simulator
          </button>
          <a href="${p.filePath}" target="_blank" class="btn btn-outline" style="font-size: 0.85rem; padding: 10px;" title="Deschide pagina completă">
            ↗️
          </a>
        </div>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeSandboxCategory = tab.dataset.category;
      renderGrid();
    });
  });

  window.openProjectSandbox = function(projectId) {
    const proj = SANDBOX_PROJECTS.find(p => p.id === projectId);
    if (!proj || !modalContent || !modal) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="sandbox-badge">${proj.categoryLabel}</span>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; margin: 4px 0 6px;">${proj.title}</h2>
        <p style="color: #94a3b8; font-size: 0.95rem;">${proj.desc}</p>
      </div>

      ${proj.simHtml}

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 18px; margin-top: 20px;">
        <span style="font-size: 0.82rem; color: #a1a1aa;">Tehnologie testată local fără dependențe externe.</span>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary" onclick="document.getElementById('sandboxModal').classList.remove('open')">Închide</button>
          <a href="${proj.filePath}" target="_blank" class="btn btn-primary">
            🚀 Vezi Aplicația Completă
          </a>
        </div>
      </div>
    `;

    modal.classList.add('open');
    if (proj.initSim) proj.initSim();
    showToast(`🧪 Sandbox deschis pentru ${proj.title}`);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal) modal.classList.remove('open');
  });

  renderGrid();
}

// -------------------------------------------------------------
// 3. Client ROI & Break-Even Calculator Engine
// -------------------------------------------------------------
function setupRoiCalculator() {
  const visitorsRange = document.getElementById('roiVisitorsRange');
  const conversionRange = document.getElementById('roiConversionRange');
  const orderValRange = document.getElementById('roiOrderValRange');

  const visitorsDisplay = document.getElementById('roiVisitorsDisplay');
  const conversionDisplay = document.getElementById('roiConversionDisplay');
  const orderValDisplay = document.getElementById('roiOrderValDisplay');

  const currentRevenue = document.getElementById('roiCurrentRevenue');
  const currentOrders = document.getElementById('roiCurrentOrders');
  const optimizedRevenue = document.getElementById('roiOptimizedRevenue');
  const optimizedOrders = document.getElementById('roiOptimizedOrders');

  const netGain = document.getElementById('roiNetGain');
  const paybackWeeks = document.getElementById('roiPaybackWeeks');
  const annualPercent = document.getElementById('roiAnnualPercent');

  const applyBtn = document.getElementById('applyRoiToContactBtn');

  if (!visitorsRange || !conversionRange || !orderValRange) return;

  function updateRoiCalculations() {
    const visitors = parseInt(visitorsRange.value, 10);
    const convRate = parseFloat(conversionRange.value);
    const aov = parseInt(orderValRange.value, 10);

    visitorsDisplay.textContent = `${visitors.toLocaleString('ro-RO')} vizitatori`;
    conversionDisplay.textContent = `${convRate.toFixed(1)} %`;
    orderValDisplay.textContent = `${aov.toLocaleString('ro-RO')} RON`;

    // 1. Current State Calculations
    const curOrdersMonthly = Math.round(visitors * (convRate / 100));
    const curRevMonthly = curOrdersMonthly * aov;

    currentRevenue.textContent = `${curRevMonthly.toLocaleString('ro-RO')} RON`;
    currentOrders.textContent = `~${curOrdersMonthly.toLocaleString('ro-RO')} comenzi / lună`;

    // 2. Optimized Andrei.Dev State (Conservative +1.8% conversion lift via sub-second speed & UX)
    const optRate = convRate + 1.8;
    const optOrdersMonthly = Math.round(visitors * (optRate / 100));
    const optRevMonthly = optOrdersMonthly * aov;
    const diffOrders = optOrdersMonthly - curOrdersMonthly;

    optimizedRevenue.textContent = `${optRevMonthly.toLocaleString('ro-RO')} RON`;
    optimizedOrders.textContent = `~${optOrdersMonthly.toLocaleString('ro-RO')} comenzi / lună (+${diffOrders} clienți noi)`;

    // 3. Net Benefit & ROI
    const netGainMonthly = Math.max(0, optRevMonthly - curRevMonthly);
    netGain.textContent = `+${netGainMonthly.toLocaleString('ro-RO')} RON / lună`;

    // Estimate site cost standard package ~ 3.500 RON
    const siteCost = 3500;
    const weeklyNetGain = netGainMonthly / 4.33;
    const weeksToPayback = weeklyNetGain > 0 ? (siteCost / weeklyNetGain).toFixed(1) : 0;
    paybackWeeks.textContent = `~ ${weeksToPayback} săptămâni`;

    const annualNetGain = netGainMonthly * 12;
    const roiCalc = Math.round(((annualNetGain - siteCost) / siteCost) * 100);
    annualPercent.textContent = `+ ${Math.max(100, roiCalc).toLocaleString('ro-RO')} %`;
  }

  [visitorsRange, conversionRange, orderValRange].forEach(input => {
    input.addEventListener('input', updateRoiCalculations);
  });

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const visitors = visitorsRange.value;
      const conv = conversionRange.value;
      const aov = orderValRange.value;
      const gain = netGain.textContent;
      const weeks = paybackWeeks.textContent;

      const messageBox = document.getElementById('devCustMessage');
      if (messageBox) {
        messageBox.value = `Salut Andrei! Am calculat pe site scenariul meu de creștere:\n` +
          `- Trafic lunar: ${parseInt(visitors, 10).toLocaleString('ro-RO')} vizitatori\n` +
          `- Conversie actuală: ${conv}%\n` +
          `- Valoare medie comandă: ${aov} RON\n` +
          `- Venit suplimentar estimat: ${gain}\n` +
          `- Amortizare estimată: ${weeks}\n\n` +
          `Doresc să programăm o discuție de consultanță pentru a implementa această arhitectură.`;
      }

      showToast('🚀 Scenariul ROI a fost transferat în formularul de contact!');
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById('devCustName')?.focus();
        }, 500);
      }
    });
  }

  updateRoiCalculations();
}

// -------------------------------------------------------------
// 4. Budget Estimator & Contact Flow
// -------------------------------------------------------------
function setupEstimatorAndContact() {
  const projType = document.getElementById('projType');
  const projDesign = document.getElementById('projDesign');
  const optSEO = document.getElementById('optSEO');
  const optWhatsApp = document.getElementById('optWhatsApp');
  const optSpeed = document.getElementById('optSpeed');

  const timeDaysVal = document.getElementById('timeDaysVal');
  const priceTotalVal = document.getElementById('priceTotalVal');
  const contactForm = document.getElementById('portfolioContactForm');

  if (!projType || !projDesign) return;

  function calculateEstimate() {
    const basePrice = parseInt(projType.value, 10);
    const selectedOption = projType.options[projType.selectedIndex];
    const baseDays = parseInt(selectedOption.dataset.days, 10);

    const designPrice = parseInt(projDesign.value, 10);
    const extraDays = designPrice > 0 ? 3 : 0;

    let extrasPrice = 0;
    if (optSEO && optSEO.checked) extrasPrice += 350;
    if (optWhatsApp && optWhatsApp.checked) extrasPrice += 250;
    if (optSpeed && optSpeed.checked) extrasPrice += 300;

    const grandTotal = basePrice + designPrice + extrasPrice;
    const grandDays = baseDays + extraDays;

    if (timeDaysVal) timeDaysVal.textContent = `${grandDays} Zile Lucrătoare`;
    if (priceTotalVal) priceTotalVal.textContent = `${grandTotal.toLocaleString('ro-RO')} RON`;
  }

  [projType, projDesign, optSEO, optWhatsApp, optSpeed].forEach(el => {
    if (el) el.addEventListener('change', calculateEstimate);
  });

  calculateEstimate();

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('devCustName').value.trim();
      const phone = document.getElementById('devCustPhone').value.trim();
      const email = document.getElementById('devCustEmail').value.trim();
      const message = document.getElementById('devCustMessage').value.trim();
      const projTypeName = projType.options[projType.selectedIndex].text.split('(')[0].trim();
      const totalEst = priceTotalVal ? priceTotalVal.textContent : 'La cerere';
      const daysEst = timeDaysVal ? timeDaysVal.textContent : 'Conform plan';

      const text = `🚀 SOLICITARE PROIECT WEB (Andrei.Dev):\n` +
        `👤 Nume: ${name}\n` +
        `📱 Contact: ${phone} / ${email}\n` +
        `📌 Tip Proiect: ${projTypeName}\n` +
        `💰 Estimare Buget: ${totalEst} (~${daysEst})\n` +
        `📝 Detalii & Obiective: ${message || 'Doresc o discuție introductivă'}`;

      showToast(`Mulțumesc, ${name}! Solicitarea ta este gata.`);
      window.open(`https://wa.me/40700000000?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
}

// -------------------------------------------------------------
// Toast Notification Helper
// -------------------------------------------------------------
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 1.1rem;">⚡</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// -------------------------------------------------------------
// DOM Ready Orchestrator
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupLoomPlayer();
  setupSandbox();
  setupRoiCalculator();
  setupEstimatorAndContact();
});
