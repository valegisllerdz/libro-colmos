(function () {
  "use strict";
  const L = window.LIBRO;
  const COLOR = { naranja: "var(--naranja-texto)", azul: "var(--azul)", verde: "var(--verde)" };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Dibujos provisionales (se sustituyen por las ilustraciones de Canva) ----------
  const ICONOS = {
    carrera:  '<circle cx="62" cy="22" r="9"/><path d="M58 34l-14 18 14 10-6 22M44 52l-18 4M58 34l16 14 16-4M58 62l20 10 4 18"/><path d="M8 96h40M14 86h22" opacity=".5"/>',
    persona:  '<circle cx="60" cy="34" r="16"/><path d="M28 104c0-20 14-34 32-34s32 14 32 34"/><path d="M50 34h2M68 34h2M52 44c5 4 11 4 16 0"/>',
    grafica:  '<path d="M14 14v92h94"/><path d="M24 26l20 22 18-8 18 28 18 22"/><path d="M84 54c6-10 2-16-2-22 10 4 16 14 10 24-2 4-6 6-8-2z"/>',
    reloj:    '<circle cx="60" cy="64" r="40"/><path d="M60 40v24l16 10M48 14h24M60 14v10"/>',
    lista:    '<rect x="26" y="12" width="68" height="96" rx="8"/><path d="M40 34h40M40 52h40M40 70h40M40 88h24"/>',
    cartas:   '<rect x="18" y="26" width="46" height="66" rx="7" transform="rotate(-12 41 59)"/><rect x="56" y="22" width="46" height="66" rx="7" transform="rotate(10 79 55)"/><path d="M74 46l6 12-6 12M88 58h-14" opacity=".8"/>',
    documento:'<path d="M30 10h44l18 18v82H30z"/><path d="M74 10v18h18M42 46h38M42 62h38M42 78h24"/><path d="M44 96c6-6 10 4 16-2s8 2 14-2"/>',
    gantt:    '<path d="M12 14v92h96"/><rect x="22" y="24" width="34" height="12" rx="3"/><rect x="44" y="44" width="40" height="12" rx="3"/><rect x="34" y="64" width="26" height="12" rx="3"/><rect x="62" y="84" width="36" height="12" rx="3"/>',
    ruta:     '<circle cx="18" cy="60" r="8"/><circle cx="50" cy="28" r="8"/><circle cx="50" cy="92" r="8"/><circle cx="84" cy="60" r="8"/><circle cx="106" cy="60" r="6"/><path d="M24 54l20-20M56 34l22 20M24 66l20 20M56 88l22-22M92 60h8"/>',
    alerta:   '<path d="M60 14l50 88H10z"/><path d="M60 46v28M60 86v2"/>',
    ciclo:    '<path d="M96 52a38 38 0 0 0-70-12M24 68a38 38 0 0 0 70 12"/><path d="M28 22v20h20M92 98V78H72"/>',
    kanban:   '<rect x="10" y="14" width="30" height="92" rx="6"/><rect x="45" y="14" width="30" height="92" rx="6"/><rect x="80" y="14" width="30" height="92" rx="6"/><rect x="50" y="26" width="20" height="14" rx="3"/><rect x="50" y="46" width="20" height="14" rx="3"/><rect x="50" y="66" width="20" height="14" rx="3"/><rect x="50" y="86" width="20" height="14" rx="3"/><rect x="15" y="26" width="20" height="14" rx="3"/>',
    check:    '<rect x="16" y="16" width="88" height="88" rx="14"/><path d="M38 62l16 16 30-36"/>',
    caja:     '<path d="M60 14l44 22v48L60 106 16 84V36z"/><path d="M16 36l44 22 44-22M60 58v48"/>',
    libro:    '<path d="M60 26c-14-10-34-12-48-8v80c14-4 34-2 48 8 14-10 34-12 48-8V18c-14-4-34-2-48 8z"/><path d="M60 26v80"/><rect x="72" y="44" width="22" height="22" rx="2"/><path d="M76 48h6v6h-6zM86 58h4v4"/>'
  };
  const icono = (nombre, color) =>
    `<svg viewBox="0 0 120 120" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre] || ICONOS.libro}</svg>`;

  // ---------- Construcción de las 25 páginas ----------
  const paginas = [];
  paginas.push({ tipo: "portada" });
  paginas.push({ tipo: "como-leer" });
  paginas.push({ tipo: "indice" });
  L.capitulos.forEach((cap, ci) => {
    cap.pagina = paginas.length + 1;
    paginas.push({ tipo: "capitulo", cap, ci });
    cap.colmos.forEach((colmo, k) => {
      colmo.pagina = paginas.length + 1;
      paginas.push({ tipo: "colmo", cap, ci, colmo, k });
    });
  });
  paginas.push({ tipo: "cierre" });
  const TOTAL = paginas.length;

  // ---------- Plantillas ----------
  const render = {
    portada() {
      const c = L.capitulos[0].colmos[0];
      return `<section class="portada">
        <div class="inst">${esc(L.institucion)}</div>
        <h1>${esc(L.titulo)}</h1>
        <div class="sub">${esc(L.subtitulo)}</div>
        <div class="globos" aria-hidden="true">
          <div class="g g1">${esc(c.pregunta)}</div>
          <div class="g g2">${esc(c.remate)}</div>
        </div>
        <a class="empezar" href="#p2">Empezar a leer</a>
        <div class="pie">${esc(L.equipo)}<br>Docente: ${esc(L.docente)}<br>${esc(L.fecha)}</div>
      </section>`;
    },

    "como-leer"() {
      return `<div class="etiqueta" style="color:var(--azul)">Antes de empezar</div>
        <h2>Cómo leer este libro</h2>
        <ol class="pasos">
          <li><span class="n">1</span><p>Cada página tiene un colmo: arriba la <b>pregunta</b> y abajo el <b>remate</b>.</p></li>
          <li><span class="n">2</span><p>Pasa de hoja con las flechas, deslizando el dedo o con las teclas ← →.</p></li>
          <li><span class="n">3</span><p>Toca <b>Índice</b> en cualquier momento para saltar a otro capítulo.</p></li>
        </ol>
        <div class="leyenda">
          ${L.capitulos.map((c, i) => `<div><i style="background:${COLOR[c.color]}"></i>Capítulo ${i + 1} · ${esc(c.nombre)}</div>`).join("")}
        </div>`;
    },

    indice() {
      return `<div class="etiqueta" style="color:var(--azul)">Contenido</div>
        <h2>Índice</h2>
        <nav class="indice">
          ${L.capitulos.map((c, i) => `
            <div class="cap">
              <a href="#p${c.pagina}" style="background:${COLOR[c.color]}"><span>${i + 1} · ${esc(c.nombre)}</span><span>${c.pagina}</span></a>
              <ol>${c.colmos.map((m) => `<li><a href="#p${m.pagina}"><span>${esc(m.tema)}</span><span class="pg">${m.pagina}</span></a></li>`).join("")}</ol>
            </div>`).join("")}
          <div class="cap extra"><a href="#p${TOTAL}"><span>Cierre y créditos del equipo</span><span class="pg">${TOTAL}</span></a></div>
        </nav>`;
    },

    capitulo({ cap, ci }) {
      return `<section class="cap-portada" style="background:${COLOR[cap.color]}">
        <div class="numcap">${ci + 1}</div>
        <div class="etiqueta" style="color:#fff;opacity:.85;margin:0">Capítulo ${ci + 1}</div>
        <h2>${esc(cap.nombre)}</h2>
        <p>${esc(cap.intro)}</p>
        <div class="lista">${cap.colmos.map((m) => esc(m.tema)).join(" · ")}</div>
        ${icono(cap.colmos[0].icono, "#ffffff")}
      </section>`;
    },

    colmo({ cap, ci, colmo }) {
      const color = COLOR[cap.color];
      const ilus = colmo.imagen
        ? `<img src="${esc(colmo.imagen)}" alt="Ilustración: ${esc(colmo.tema)}">`
        : icono(colmo.icono, color);
      return `<div class="etiqueta" style="color:${color}">Capítulo ${ci + 1} · ${esc(cap.nombre)}</div>
        <figure class="ilustracion" style="margin:0">
          ${ilus}
          <figcaption>Ilustración: ${esc(colmo.tema)}</figcaption>
        </figure>
        <div class="globo pregunta">${esc(colmo.pregunta)}</div>
        <div class="globo remate" style="background:${color}">${esc(colmo.remate)}</div>
        ${colmo.origen === "borrador" ? '<div class="borrador"><b>Borrador:</b> colmo pendiente de validación del equipo (HU-01).</div>' : ""}`;
    },

    cierre() {
      return `<div class="cierre">
        <div class="etiqueta" style="color:var(--azul)">Fin del libro</div>
        <h2>¡Gracias por leer!</h2>
        <p>Esperamos que estos 18 colmos te ayuden a repasar Scrum, PMBOK y las prácticas ágiles con una sonrisa.</p>
        <ul class="creditos">
          ${L.creditos.map((p) => `<li><div class="rol">${esc(p.rol)}</div><div class="nom">${esc(p.nombre)}</div><div class="mat">Matrícula: ${p.matricula ? esc(p.matricula) : "pendiente"}</div></li>`).join("")}
        </ul>
        <div class="datos">${esc(L.institucion)}<br>${esc(L.equipo)} · Docente: ${esc(L.docente)}</div>
        <a class="volver" href="#p1">Volver a la portada</a>
      </div>`;
    }
  };

  // ---------- Navegación ----------
  const hoja = document.getElementById("hoja");
  const num = document.getElementById("num");
  const barra = document.getElementById("barra");
  const ant = document.getElementById("ant");
  const sig = document.getElementById("sig");
  let actual = 0;

  function paginaDesdeHash() {
    const m = /^#p(\d+)$/.exec(location.hash);
    const n = m ? parseInt(m[1], 10) : 1;
    return Math.min(Math.max(n, 1), TOTAL);
  }

  function mostrar(n) {
    const p = paginas[n - 1];
    const dir = n >= actual ? "entra-der" : "entra-izq";
    const acento = p.cap ? COLOR[p.cap.color] : "var(--naranja-texto)";
    document.documentElement.style.setProperty("--acento", acento);
    hoja.innerHTML = render[p.tipo](p);
    hoja.scrollTop = 0;
    hoja.classList.remove("entra-der", "entra-izq");
    if (actual) { void hoja.offsetWidth; hoja.classList.add(dir); }
    num.textContent = `Página ${n} de ${TOTAL}`;
    barra.style.width = `${(n / TOTAL) * 100}%`;
    ant.disabled = n === 1;
    sig.disabled = n === TOTAL;
    const titulo = p.colmo ? p.colmo.tema : p.cap ? p.cap.nombre : null;
    document.title = (titulo ? titulo + " · " : "") + L.titulo;
    if (actual) hoja.focus({ preventScroll: true });
    actual = n;
  }

  const ir = (n) => {
    n = Math.min(Math.max(n, 1), TOTAL);
    if (n !== actual) location.hash = "#p" + n;
  };

  window.addEventListener("hashchange", () => mostrar(paginaDesdeHash()));
  ant.addEventListener("click", () => ir(actual - 1));
  sig.addEventListener("click", () => ir(actual + 1));
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); ir(actual + 1); }
    if (e.key === "ArrowLeft"  || e.key === "PageUp")   { e.preventDefault(); ir(actual - 1); }
    if (e.key === "Home") ir(1);
    if (e.key === "End")  ir(TOTAL);
  });

  // Deslizar con el dedo
  let x0 = null, y0 = null;
  const libro = document.getElementById("libro");
  libro.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  libro.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) ir(actual + (dx < 0 ? 1 : -1));
    x0 = y0 = null;
  }, { passive: true });

  mostrar(paginaDesdeHash());
})();
