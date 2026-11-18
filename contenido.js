// ============================================================
//  CONTENIDO DEL LIBRO — edita aquí los textos, sin tocar app.js
//  Estructura fija: 25 páginas
//    1 Portada · 2 Cómo leer · 3 Índice
//    4 Cap. 1 (portada) + 5–10 colmos
//   11 Cap. 2 (portada) + 12–17 colmos
//   18 Cap. 3 (portada) + 19–24 colmos
//   25 Cierre y créditos
//
//  "origen": "presentacion" = ya aparece en las láminas 7 y 9.
//            "borrador"     = propuesta nueva, falta validación del equipo (HU-01).
//  "gesto":  expresión de la mascota Colmito: feliz, risa, sorpresa, cansado, guino, pensativo.
//  "imagen": ruta opcional a la ilustración de Canva (p. ej. "img/sprint.png").
//            Si se deja vacía se usa el dibujo provisional ("icono").
// ============================================================

window.LIBRO = {
  titulo: "Libro Digital de los Colmos",
  subtitulo: "Administración de proyectos para reírse un rato",
  institucion: "UANL · FIME · Administración de Proyectos de Software",
  equipo: "Equipo 5 · Grupo 005",
  docente: "Leticia Amalia Neira Tovar",
  fecha: "Noviembre 2026",

  capitulos: [
    {
      id: "scrum",
      nombre: "Scrum",
      color: "naranja",
      intro: "Sprints, dailies y backlogs: el marco ágil favorito del salón, visto desde su lado más absurdo.",
      colmos: [
        { tema: "Sprint", icono: "carrera", gesto: "sorpresa", origen: "presentacion", imagen: "",
          pregunta: "¿Cuál es el colmo de un Sprint?",
          remate: "Llamarse «carrera corta» y durar dos semanas." },
        { tema: "Scrum Master", icono: "persona", gesto: "cansado", origen: "presentacion", imagen: "",
          pregunta: "¿Cuál es el colmo de un Scrum Master?",
          remate: "Que no lo dejen quitar sus propios impedimentos." },
        { tema: "Burndown Chart", icono: "grafica", gesto: "sorpresa", origen: "presentacion", imagen: "",
          pregunta: "¿Cuál es el colmo de un Burndown Chart?",
          remate: "Que se queme todo el Sprint y nadie llame a los bomberos." },
        { tema: "Daily Scrum", icono: "reloj", gesto: "pensativo", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de un Daily Scrum?",
          remate: "Que todos lleguen tarde a una junta de quince minutos." },
        { tema: "Product Backlog", icono: "lista", gesto: "cansado", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de un Product Backlog?",
          remate: "Tener tantas historias que nadie quiera leerlas." },
        { tema: "Planning Poker", icono: "cartas", gesto: "guino", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo del Planning Poker?",
          remate: "Que todo el equipo apueste 13 y nadie quiera enseñar sus cartas." }
      ]
    },
    {
      id: "pmbok",
      nombre: "PMBOK",
      color: "azul",
      intro: "Actas, cronogramas y rutas críticas: la guía clásica de la dirección de proyectos también tiene sus colmos.",
      colmos: [
        { tema: "Acta de Constitución", icono: "documento", gesto: "pensativo", origen: "presentacion", imagen: "",
          pregunta: "¿Cuál es el colmo de un Acta de Constitución?",
          remate: "Que la firmen cuando el proyecto ya terminó." },
        { tema: "Diagrama de Gantt", icono: "gantt", gesto: "sorpresa", origen: "presentacion", imagen: "",
          pregunta: "¿Cuál es el colmo de un diagrama de Gantt?",
          remate: "Actualizarlo tanto que ya no se parezca al original." },
        { tema: "Ruta crítica", icono: "ruta", gesto: "cansado", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de la ruta crítica?",
          remate: "Que todos la critiquen y no tenga holgura para defenderse." },
        { tema: "Holgura", icono: "reloj", gesto: "feliz", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de una holgura?",
          remate: "Relajarse tanto que se le acabe el tiempo." },
        { tema: "Gestión de riesgos", icono: "alerta", gesto: "sorpresa", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de la gestión de riesgos?",
          remate: "Que el riesgo más grande sea no haber hecho el plan de riesgos." },
        { tema: "Interesados", icono: "persona", gesto: "guino", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de un interesado del proyecto?",
          remate: "Estar tan interesado que nadie lo invite a las juntas." }
      ]
    },
    {
      id: "agiles",
      nombre: "Prácticas ágiles",
      color: "verde",
      intro: "Retrospectivas, tableros y entregas pequeñas: hábitos ágiles que, a veces, se ponen de cabeza.",
      colmos: [
        { tema: "Retrospectiva", icono: "ciclo", gesto: "risa", origen: "presentacion", imagen: "",
          pregunta: "¿Cuál es el colmo de una Retrospectiva?",
          remate: "Que el único acuerdo sea hacer otra retrospectiva." },
        { tema: "Tablero Kanban", icono: "kanban", gesto: "cansado", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de un tablero Kanban?",
          remate: "Tener tantas tarjetas «en progreso» que ninguna llegue a «terminado»." },
        { tema: "Definition of Done", icono: "check", gesto: "pensativo", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de la Definition of Done?",
          remate: "Que nunca la terminen de definir." },
        { tema: "Historia de usuario", icono: "documento", gesto: "sorpresa", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de una historia de usuario?",
          remate: "Que el usuario no aparezca en su propia historia." },
        { tema: "MVP", icono: "caja", gesto: "guino", origen: "borrador", imagen: "",
          pregunta: "¿Cuál es el colmo de un Producto Mínimo Viable?",
          remate: "Ser tan mínimo que nadie note que es viable." },
        { tema: "Libro de colmos", icono: "libro", gesto: "risa", origen: "presentacion", imagen: "",
          pregunta: "¿Cuál es el colmo de un libro de colmos?",
          remate: "Que el remate no se pueda escanear." }
      ]
    }
  ],

  // Créditos (HU-04 pide nombre y matrícula). Matrículas tomadas de la portada del acta.
  creditos: [
    { rol: "Product Owner",             nombre: "Melannie Aileén Reyna Pérez",        matricula: "2126091" },
    { rol: "Scrum Master / Líder",      nombre: "Maria Fernanda Ramírez Jiménez",     matricula: "2174000" },
    { rol: "Investigador de contenido", nombre: "Renato Sebastian Martinez Martinez", matricula: "2050622" },
    { rol: "Diseñador gráfico 1",       nombre: "Jatziri Nataly Valencia Bonilla",    matricula: "2059507" },
    { rol: "Diseñador gráfico 2",       nombre: "Jose Luis Romero Soto",              matricula: "2038132" },
    { rol: "QA / Revisor",              nombre: "Valeria Giselle Rodríguez Trinidad", matricula: "1851037" }
  ]
};
