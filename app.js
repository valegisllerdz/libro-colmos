(function () {
  "use strict";
  const L = window.LIBRO;
  const HEX = { naranja: "#c9481f", azul: "#1f3a63", verde: "#2b7a69" };
  const TINTA = "#1d2433";
  const URL_LIBRO = "https://valegisllerdz.github.io/libro-colmos/";
  const IMPRESION = /[?&]imprimir\b/.test(location.search);

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Almacenamiento seguro (solo preferencias del lector) ----------
  const pref = {
    get(k) { try { return localStorage.getItem("colmos." + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem("colmos." + k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  // ---------- Accesorios de cada colmo (se dibujan en un cuadro de 120×120) ----------
  const ICONOS = {
    carrera:  '<path d="M20 96h80M30 84h30" opacity=".45"/><circle cx="70" cy="24" r="9"/><path d="M66 36l-14 18 14 10-6 22M52 54l-18 4M66 36l16 14 16-4M66 64l20 10 4 18"/>',
    persona:  '<rect x="30" y="30" width="60" height="60" rx="6"/><path d="M42 50h36M42 64h36M42 78h20"/><circle cx="96" cy="26" r="12"/><path d="M90 26l4 4 8-8"/>',
    grafica:  '<path d="M14 14v92h94"/><path d="M24 26l20 22 18-8 18 28 18 22"/><path d="M84 54c6-10 2-16-2-22 10 4 16 14 10 24-2 4-6 6-8-2z"/>',
    reloj:    '<circle cx="60" cy="64" r="40"/><path d="M60 40v24l16 10M48 14h24M60 14v10"/>',
    lista:    '<rect x="26" y="12" width="68" height="96" rx="8"/><path d="M40 34h40M40 52h40M40 70h40M40 88h24"/>',
    cartas:   '<rect x="18" y="26" width="46" height="66" rx="7" transform="rotate(-12 41 59)"/><rect x="56" y="22" width="46" height="66" rx="7" transform="rotate(10 79 55)"/><path d="M72 48c0-8 14-8 14 0 0 6-7 6-7 12M79 70v1"/>',
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

  // ---------- Colmito, la mascota del libro (un globo de diálogo con cara) ----------
  function cara(gesto, ojos, cuerpo) {
    const ey = 66;
    const ojo = (x, dx = 0, dy = 0, r = 4.5) =>
      `<circle cx="${x}" cy="${ey}" r="10" fill="#fff"/><circle cx="${x + dx}" cy="${ey + dy}" r="${r}" fill="${ojos}"/>`;
    const arco = (x) => `<path d="M${x - 9} ${ey + 3}q9-11 18 0" stroke="${ojos}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    switch (gesto) {
      case "risa":
        return arco(72) + arco(108) +
          `<path d="M74 86h32q-2 18-16 18t-16-18z" fill="${ojos}"/><path d="M80 98q10 6 20 0" fill="#e86a6a"/>`;
      case "sorpresa":
        return ojo(72, 0, 0, 6) + ojo(108, 0, 0, 6) + `<ellipse cx="90" cy="96" rx="7" ry="9" fill="${ojos}"/>` +
          `<path d="M60 44l8 4M120 44l-8 4" stroke="${ojos}" stroke-width="3.5" stroke-linecap="round"/>`;
      case "cansado":
        return ojo(72, 0, 4) + ojo(108, 0, 4) +
          `<path d="M61 67a11 11 0 0 1 22 0zM97 67a11 11 0 0 1 22 0z" fill="${cuerpo}"/>` +
          `<path d="M62 67h20M98 67h20" stroke="${ojos}" stroke-width="3.5" stroke-linecap="round"/>` +
          `<path d="M80 96q10-5 20 0" stroke="${ojos}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
          `<path d="M128 46q5 8 0 12q-5-4 0-12z" fill="#9fd3f0"/>`;
      case "guino":
        return ojo(72, 2, 0) + arco(108) +
          `<path d="M78 92q14 10 26-2" stroke="${ojos}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      case "pensativo":
        return ojo(72, 3, -4) + ojo(108, 3, -4) +
          `<path d="M80 96q5-4 10 0t10 0" stroke="${ojos}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
          `<text x="128" y="40" font-family="Georgia,serif" font-weight="700" font-size="26" fill="${ojos}">?</text>`;
      default: // feliz
        return ojo(72, 1, 1) + ojo(108, 1, 1) +
          `<path d="M76 90q14 14 28 0" stroke="${ojos}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    }
  }

  function colmito({ color, gesto = "feliz", icono = null, accesorio = color, ojos = TINTA, anim = true }) {
    const prop = icono ? `
      <g class="prop">
        <circle cx="192" cy="72" r="44" fill="#fff"/>
        <g transform="translate(156 36) scale(.6)" fill="none" stroke="${accesorio}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${ICONOS[icono] || ICONOS.libro}</g>
      </g>
      <path d="M138 86q10-2 14-10" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round"/>` : "";
    return `<svg class="colmito${anim ? " vivo" : ""}" viewBox="${icono ? "0 0 240 150" : "20 10 150 140"}" aria-hidden="true">
      <ellipse cx="90" cy="142" rx="46" ry="6" fill="#000" opacity=".08"/>
      <g class="cuerpo">
        <path d="M66 30h48a26 26 0 0 1 26 26v34a26 26 0 0 1-26 26H78l-24 18 6-20a26 26 0 0 1-20-24V56a26 26 0 0 1 26-26z" fill="${color}"/>
        <ellipse cx="62" cy="84" rx="7" ry="4" fill="#fff" opacity=".25"/><ellipse cx="118" cy="84" rx="7" ry="4" fill="#fff" opacity=".25"/>
        ${cara(gesto, ojos, color)}
        <path d="M42 86q-10-2-14-10" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round"/>
      </g>
      ${prop}
    </svg>`;
  }

  // ---------- Construcción de las 25 páginas ----------
  const paginas = [{ tipo: "portada" }, { tipo: "como-leer" }, { tipo: "indice" }];
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

  let modoJuego = !IMPRESION && pref.get("juego") === "1";

  // ---------- Plantillas ----------
  const render = {
    portada() {
      return `<section class="portada">
        <div class="inst">${esc(L.institucion)}</div>
        <div class="portada-mascota">${colmito({ color: "#f2b134", gesto: "risa", ojos: "#1f3a63" })}</div>
        <h1>${esc(L.titulo)}</h1>
        <div class="sub">${esc(L.subtitulo)}</div>
        <div class="cifras"><span><b>18</b> colmos</span><span><b>3</b> capítulos</span><span><b>25</b> páginas</span></div>
        <a class="empezar" href="#p2">Empezar a leer <span aria-hidden="true">→</span></a>
        <div class="pie">${esc(L.equipo)} · Docente: ${esc(L.docente)} · ${esc(L.fecha)}</div>
      </section>`;
    },

    "como-leer"() {
      return `<div class="etiqueta" style="color:var(--azul)">Antes de empezar</div>
        <h2>Cómo leer este libro</h2>
        <div class="presenta">
          ${colmito({ color: HEX.azul, gesto: "guino", anim: true })}
          <p>¡Hola! Soy <b>Colmito</b>. Te acompaño en cada página con un colmo de la materia.</p>
        </div>
        <ol class="pasos">
          <li><span class="n">1</span><p>Cada página tiene un colmo: arriba la <b>pregunta</b> y abajo el <b>remate</b>.</p></li>
          <li><span class="n">2</span><p>Pasa de hoja con las flechas, deslizando el dedo o con las teclas ← →.</p></li>
          <li><span class="n">3</span><p>Toca <b>Índice</b> en cualquier momento para saltar a otro capítulo.</p></li>
        </ol>
        ${IMPRESION ? "" : `
        <label class="interruptor">
          <input type="checkbox" id="chkJuego" ${modoJuego ? "checked" : ""}>
          <span class="pista" aria-hidden="true"></span>
          <span><b>Modo «Adivina el remate»</b><br><small>El remate aparece tapado: piensa tu respuesta y tócalo para descubrirlo.</small></span>
        </label>`}`;
    },

    indice() {
      return `<div class="etiqueta" style="color:var(--azul)">Contenido</div>
        <h2>Índice</h2>
        <nav class="indice">
          ${L.capitulos.map((c, i) => `
            <div class="cap">
              <a href="#p${c.pagina}" style="background:${HEX[c.color]}"><span>${i + 1} · ${esc(c.nombre)}</span><span>${c.pagina}</span></a>
              <ol>${c.colmos.map((m) => `<li><a href="#p${m.pagina}"><span>${esc(m.tema)}</span><span class="pg">${m.pagina}</span></a></li>`).join("")}</ol>
            </div>`).join("")}
          <div class="cap extra"><a href="#p${TOTAL}"><span>Cierre y créditos del equipo</span><span class="pg">${TOTAL}</span></a></div>
        </nav>`;
    },

    capitulo({ cap, ci }) {
      return `<section class="cap-portada" style="background:${HEX[cap.color]}">
        <div class="numcap">${ci + 1}</div>
        <div class="etiqueta" style="color:#fff;opacity:.85;margin:0">Capítulo ${ci + 1}</div>
        <h2>${esc(cap.nombre)}</h2>
        <p>${esc(cap.intro)}</p>
        <div class="lista">${cap.colmos.map((m) => esc(m.tema)).join(" · ")}</div>
        <div class="cap-mascota">${colmito({ color: "#f6efe2", gesto: "feliz", icono: cap.colmos[0].icono, accesorio: HEX[cap.color] })}</div>
      </section>`;
    },

    colmo({ cap, ci, colmo }) {
      const color = HEX[cap.color];
      const ilus = colmo.imagen
        ? `<img src="${esc(colmo.imagen)}" alt="Ilustración: ${esc(colmo.tema)}">`
        : colmito({ color, gesto: colmo.gesto, icono: colmo.icono });
      const remate = modoJuego
        ? `<button class="globo remate tapado" style="--c:${color}" aria-label="Descubrir el remate">
             <span class="tapa">¿Ya lo pensaste? <b>Toca para descubrir el remate</b></span>
             <span class="texto">${esc(colmo.remate)}</span>
           </button>`
        : `<div class="globo remate" style="background:${color}">${esc(colmo.remate)}</div>`;
      return `<div class="etiqueta" style="color:${color}">Capítulo ${ci + 1} · ${esc(cap.nombre)}</div>
        <figure class="ilustracion">
          ${ilus}
          <figcaption>Ilustración: ${esc(colmo.tema)}</figcaption>
        </figure>
        <div class="globo pregunta">${esc(colmo.pregunta)}</div>
        ${remate}
        <div class="acciones">
          ${IMPRESION ? "" : `<button class="compartir" data-pagina="${colmo.pagina}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.9l7.6-4.6M8.2 13.1l7.6 4.6"/></svg>
            Compartir este colmo</button>`}
          ${colmo.origen === "borrador" ? '<span class="borrador"><b>Borrador</b> · pendiente de validación (HU-01)</span>' : ""}
        </div>`;
    },

    cierre() {
      return `<div class="cierre">
        <div class="cierre-cabeza">
          ${colmito({ color: HEX.verde, gesto: "risa" })}
          <div><div class="etiqueta" style="color:var(--azul);margin:0 0 4px">Fin del libro</div><h2>¡Gracias por leer!</h2></div>
        </div>
        <p>Esperamos que estos 18 colmos te ayuden a repasar Scrum, PMBOK y las prácticas ágiles con una sonrisa.</p>
        <ul class="creditos">
          ${L.creditos.map((p) => `<li><div class="rol">${esc(p.rol)}</div><div class="nom">${esc(p.nombre)}</div><div class="mat">Matrícula: ${p.matricula ? esc(p.matricula) : "pendiente"}</div></li>`).join("")}
        </ul>
        <div class="datos">${esc(L.institucion)}<br>${esc(L.equipo)} · Docente: ${esc(L.docente)}</div>
        ${IMPRESION ? "" : '<a class="volver" href="#p1">Volver a la portada</a>'}
      </div>`;
    }
  };

  // ============================================================
  //  MODO IMPRESIÓN  (?imprimir) — genera el PDF de respaldo
  // ============================================================
  if (IMPRESION) {
    document.documentElement.classList.add("modo-impresion");
    const portadaRespaldo = `<section class="imp-pagina respaldo">
      <div class="hoja">
        <div class="etiqueta" style="color:var(--naranja-texto)">PDF de respaldo</div>
        <h2>${esc(L.titulo)}</h2>
        <p>La versión interactiva se lee en el celular. Escanea el código o abre el enlace:</p>
        <img class="qr" src="img/qr.svg" alt="Código QR del libro">
        <p class="url">${esc(URL_LIBRO.replace("https://", ""))}</p>
        <p class="nota">${esc(L.equipo)} · ${esc(L.institucion)}</p>
      </div>
    </section>`;
    document.body.innerHTML = portadaRespaldo + paginas.map((p, i) => `
      <section class="imp-pagina">
        <div class="hoja">${render[p.tipo](p)}</div>
        <footer>Página ${i + 1} de ${TOTAL}</footer>
      </section>`).join("");
    return;
  }

  // ============================================================
  //  LECTOR INTERACTIVO
  // ============================================================
  const hoja = document.getElementById("hoja");
  const num = document.getElementById("num");
  const barra = document.getElementById("barra");
  const ant = document.getElementById("ant");
  const sig = document.getElementById("sig");
  const aviso = document.getElementById("aviso");
  let actual = 0;

  function paginaDesdeHash() {
    const m = /^#p(\d+)$/.exec(location.hash);
    const n = m ? parseInt(m[1], 10) : 1;
    return Math.min(Math.max(n, 1), TOTAL);
  }

  function avisar(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => aviso.classList.remove("visible"), 2200);
  }

  function mostrar(n, forzar) {
    const p = paginas[n - 1];
    const dir = n >= actual ? "entra-der" : "entra-izq";
    document.documentElement.style.setProperty("--acento", p.cap ? HEX[p.cap.color] : "var(--naranja-texto)");
    hoja.innerHTML = render[p.tipo](p);
    hoja.scrollTop = 0;
    hoja.classList.remove("entra-der", "entra-izq");
    if (actual && !forzar) { void hoja.offsetWidth; hoja.classList.add(dir); }
    num.textContent = `Página ${n} de ${TOTAL}`;
    barra.style.width = `${(n / TOTAL) * 100}%`;
    ant.disabled = n === 1;
    sig.disabled = n === TOTAL;
    const titulo = p.colmo ? p.colmo.tema : p.cap ? p.cap.nombre : null;
    document.title = (titulo ? titulo + " · " : "") + L.titulo;
    if (actual && !forzar) hoja.focus({ preventScroll: true });
    actual = n;
  }

  const ir = (n) => {
    n = Math.min(Math.max(n, 1), TOTAL);
    if (n !== actual) location.hash = "#p" + n;
  };

  // Clics dentro de la hoja: descubrir remate, compartir, interruptor
  hoja.addEventListener("click", async (e) => {
    const tapado = e.target.closest(".tapado");
    if (tapado) {
      tapado.classList.remove("tapado");
      tapado.classList.add("revelado");
      tapado.removeAttribute("aria-label");
      tapado.disabled = true;
      return;
    }
    const btn = e.target.closest(".compartir");
    if (btn) {
      const p = paginas[parseInt(btn.dataset.pagina, 10) - 1];
      const url = URL_LIBRO + "#p" + p.colmo.pagina;
      const datos = { title: L.titulo, text: p.colmo.pregunta + " Descubre el remate en el Libro Digital de los Colmos:", url };
      try {
        if (navigator.share) { await navigator.share(datos); return; }
        await navigator.clipboard.writeText(datos.text + " " + url);
        avisar("Enlace copiado. ¡Pégalo donde quieras!");
      } catch (err) {
        if (err && err.name !== "AbortError") avisar(url);
      }
    }
  });
  hoja.addEventListener("change", (e) => {
    if (e.target.id === "chkJuego") {
      modoJuego = e.target.checked;
      pref.set("juego", modoJuego ? "1" : "0");
      avisar(modoJuego ? "Modo juego activado: los remates están tapados." : "Modo juego desactivado.");
    }
  });

  window.addEventListener("hashchange", () => mostrar(paginaDesdeHash()));
  ant.addEventListener("click", () => ir(actual - 1));
  sig.addEventListener("click", () => ir(actual + 1));
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.matches && e.target.matches("input")) return;
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
