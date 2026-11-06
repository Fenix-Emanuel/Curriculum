/* ==========================================================================
   Emanuel Benitez · Portafolio
   1. Idioma   2. Scroll suave   3. Chispas del hero   4. Hero (nombre que se abre)
   5. Manifiesto (palabras que se encienden)   6. Proyectos en fila horizontal
   7. Marquesina   8. Línea de experiencia   9. Entradas y copiar email
   ========================================================================== */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('reduced');
  const motion = !!window.gsap && !reduced;

  /* ---------------- 1. Idioma ---------------- */
  const ES = {
    skip: 'Ir al contenido', navWork: 'Proyectos', navAbout: 'Sobre mí', navExp: 'Experiencia', navContact: 'Contacto', talk: 'Hablemos',
    heroKicker: 'Desarrollador frontend · Fundador de Ignis', heroLine: 'Hago webs cinematográficas que no se leen. Se sienten.',
    heroStatus: 'Disponible para roles frontend · Austin, TX', scroll: 'Deslizá',
    aboutKicker: 'Sobre mí',
    manifesto: 'Pasé años en hotelería aprendiendo qué necesita la gente real de las cosas que usa. Hoy diseño y programo webs con movimiento, historia y carácter, para que las marcas se recuerden.',
    about1: 'Desarrollador frontend en Austin, TX, nacido en Tucumán, Argentina. Trabajo en inglés y en español, del primer boceto a la última línea de código.',
    about2: 'En 2026 fundé Ignis Studio, un estudio de webs cinematográficas. Combino video generado con IA, GSAP y canvas para que una web se sienta como una sola toma continua.',
    stat1: 'Proyectos en vivo', stat2: 'Totalmente bilingüe', stat3: 'Mi estudio web',
    workKicker: 'Proyectos seleccionados · 2025–2026', workTitle: 'Lo que construí.', featured: 'Mi estudio', live: 'Ver en vivo ↗',
    bilingual: 'Bilingüe', scrollVideo: 'Video al scroll', income: 'Ingresos', expenses: 'Gastos',
    pIgnis: 'La web de mi estudio de webs cinematográficas: partículas de brasa, un proceso contado con el scroll y Brasa, un bot que manda los contactos directo a WhatsApp.',
    pHugos: 'Una cafetería argentina contada en una sola toma: video con IA que avanza cuadro a cuadro con el scroll y una carta que se abre en abanico.',
    pFogon: 'Del fuego a la mesa: un video que avanza con el scroll y platos que se arman solos, ingrediente por ingrediente.',
    pEvo: 'Cableado, fibra y seguridad explicados claro, con todo el contacto directo a WhatsApp.',
    pBalance: 'Un e-commerce de fitness: suplementos, cursos y marca en cuatro páginas pensadas para el celular.',
    pFin: 'Una app de finanzas personales con login, ingresos y gastos, filtros y gráficos en vivo. Hecha desde cero.',
    stackTitle: 'Herramientas con las que trabajo',
    expKicker: 'Dónde estuve', expTitle: 'Experiencia',
    jsWhen: 'Ene 2026 – Actualidad', jsRole: 'Desarrollador web', jsWhere: 'Strubbe Consultants · Remoto, Estados Unidos · Contrato', jsDesc: 'Puesto remoto por contrato, desarrollando sitios web para la empresa.',
    j0when: '2026 – Actualidad', j0role: 'Fundador y desarrollador frontend', j0desc: 'Webs cinematográficas con animación al scroll para clientes de EE. UU. y Latinoamérica: concepto, visuales con IA, código y lanzamiento.',
    j1when: 'Dic 2024 – Actualidad', j1role: 'Agente de recepción', j1desc: 'Atención de huéspedes, manejo del PMS, check-in y check-out, coordinación entre áreas y capacitación de nuevos agentes en uno de los complejos de resort y convenciones más grandes de EE. UU.',
    j2when: 'Dic 2023 – Dic 2024', j2role: 'Supervisor de housekeeping', j2desc: 'Lideré la operación diaria de housekeeping, los horarios del equipo, el control de calidad y la incorporación de personal en un resort de gran escala.',
    j3when: 'Oct 2022 – Dic 2023', j3role: 'Asistente administrativo', j3desc: 'Documentación administrativa, reportes internos y operación de oficina. Supervisé personal asignado y coordiné procesos internos.',
    ringText: 'DESARROLLADOR FRONTEND · FUNDADOR DE IGNIS · AUSTIN, TX ·',
    contactKicker: 'Contacto', contactTitle: 'Construyamos algo que se sienta.', contactLead: 'Disponible para roles frontend y proyectos nuevos. Suelo responder en el día, en inglés o en español.',
    copy: 'Copiar email', copied: 'Email copiado', footer: 'Diseñada y programada por mí, con GSAP y mucho café.'
  };
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = {};
  nodes.forEach(n => { EN[n.dataset.i18n] = n.textContent; });
  EN.copied = 'Email copied';
  let lang = 'en';
  const langBtn = document.getElementById('lang');
  function setLang(l) {
    lang = l;
    const dict = l === 'es' ? ES : EN;
    nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v) n.textContent = v; });
    document.documentElement.lang = l;
    langBtn.querySelectorAll('[data-l]').forEach(s => s.classList.toggle('is-on', s.dataset.l === l));
    langBtn.setAttribute('aria-label', l === 'es' ? 'Switch to English' : 'Cambiar a español');
    splitManifesto();
    try { localStorage.setItem('eb-lang', l); } catch (e) {}
  }
  langBtn.addEventListener('click', () => setLang(lang === 'en' ? 'es' : 'en'));

  /* ---------------- 5a. Manifiesto: cada palabra en su propio span ---------------- */
  const manifesto = document.querySelector('[data-split]');
  const HOT = ['real', 'motion,', 'story', 'character,', 'remembered.', 'movimiento,', 'historia', 'carácter,', 'recuerden.'];
  function splitManifesto() {
    const words = manifesto.textContent.trim().split(/\s+/);
    manifesto.innerHTML = words.map(w => `<span class="w${HOT.includes(w) ? ' w--ember' : ''}">${w}</span>`).join(' ');
    if (motion) updateManifesto();
  }
  let manifestoProgress = 0;
  function updateManifesto() {
    const ws = manifesto.querySelectorAll('.w');
    const lit = Math.round(manifestoProgress * ws.length);
    ws.forEach((w, i) => w.classList.toggle('is-hot', i < lit));
  }

  let saved = null;
  try { saved = localStorage.getItem('eb-lang'); } catch (e) {}
  setLang(saved || ((navigator.language || 'en').startsWith('es') ? 'es' : 'en'));

  /* ---------------- 9. Copiar email ---------------- */
  const copyBtn = document.getElementById('copyMail');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('emanuelbenitez658@gmail.com'); } catch (e) { return; }
    copyBtn.textContent = (lang === 'es' ? ES : EN).copied;
    setTimeout(() => { copyBtn.textContent = (lang === 'es' ? ES : EN).copy; }, 2000);
  });

  /* Header con fondo cuando ya no estamos arriba */
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > window.innerHeight * 0.9);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Entradas suaves */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.about__grid > *, .job, .contact__inner > *').forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${(i % 3) * 90}ms`; io.observe(el); });

  if (!motion) return;

  /* ---------------- 2. Scroll suave ---------------- */
  gsap.registerPlugin(ScrollTrigger);
  const lenis = window.Lenis ? new Lenis({ lerp: 0.1, smoothWheel: true }) : null;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const el = document.querySelector(a.getAttribute('href'));
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: a.getAttribute('href') === '#top' ? 0 : -10 }); }
    }));
  }

  /* ---------------- 3. Chispas del hero (canvas liviano) ---------------- */
  const cv = document.getElementById('embers');
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, sparks = [], heroVisible = true;
  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = W < 700 ? 34 : 70;
    sparks = Array.from({ length: n }, () => newSpark(true));
  }
  function newSpark(anyY) {
    return { x: W * (0.15 + Math.random() * 0.7), y: anyY ? Math.random() * H : H + 10, r: 0.6 + Math.random() * 2.2, vy: 0.25 + Math.random() * 0.9, vx: (Math.random() - 0.5) * 0.35, life: Math.random() * Math.PI * 2 };
  }
  function tick() {
    if (heroVisible) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (const s of sparks) {
        s.y -= s.vy; s.x += s.vx + Math.sin(s.life) * 0.25; s.life += 0.03;
        if (s.y < -10) Object.assign(s, newSpark(false));
        const a = Math.max(0, Math.min(1, s.y / H)) * (0.55 + Math.sin(s.life * 3) * 0.35);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, ${120 + Math.round(s.r * 30)}, 60, ${a})`;
        ctx.shadowColor = 'rgba(255, 91, 31, 0.9)'; ctx.shadowBlur = 8;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  }
  sizeCanvas(); tick();
  window.addEventListener('resize', sizeCanvas);

  /* ---------------- 4. Hero: el nombre se abre y la foto se aleja ---------------- */
  const hero = document.querySelector('.hero');
  hero.classList.add('is-anim');
  gsap.from('.hero__half--l', { xPercent: -14, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.1 });
  gsap.from('.hero__half--r', { xPercent: 14, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.1 });
  gsap.from('.hero__photo', { yPercent: 12, opacity: 0, duration: 1.6, ease: 'power3.out', delay: 0.25 });
  gsap.from('.hero__intro, .hero__meta', { y: 24, opacity: 0, duration: 1.2, ease: 'power2.out', delay: 0.8, stagger: 0.1 });

  const heroTl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.6, onToggle: s => { heroVisible = s.isActive || s.progress < 1; } } });
  heroTl.to('.hero__half--l', { xPercent: -38, opacity: 0.12 }, 0)
        .to('.hero__half--r', { xPercent: 38, opacity: 0.12 }, 0)
        .to('.hero__photo', { scale: 0.86, yPercent: 6, filter: 'brightness(0.55)', transformOrigin: '50% 100%' }, 0)
        .to('.hero__glow', { scale: 1.5, opacity: 0.5 }, 0)
        .to('.hero__intro, .hero__meta', { opacity: 0, y: -30 }, 0);

  /* ---------------- 5b. Manifiesto: se enciende palabra por palabra ---------------- */
  ScrollTrigger.create({
    trigger: manifesto, start: 'top 80%', end: 'bottom 40%', scrub: true,
    onUpdate: s => { manifestoProgress = s.progress; updateManifesto(); }
  });

  /* Retrato: crece y se endereza al entrar en pantalla */
  gsap.fromTo('.portrait', { scale: 0.78, rotate: -10, opacity: 0.4 }, { scale: 1, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.portrait', start: 'top bottom', end: 'center 55%', scrub: true } });

  /* ---------------- 6. Proyectos: fila horizontal ---------------- */
  const work = document.querySelector('.work');
  const track = document.getElementById('workTrack');
  const bar = document.getElementById('workBar');
  const now = document.getElementById('workNow');
  const cards = track.querySelectorAll('.proj');
  work.classList.add('is-anim');
  const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
  gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: {
      trigger: work, start: 'top top', end: () => '+=' + dist(), pin: '.work__pin', scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: s => {
        bar.style.transform = `scaleX(${s.progress})`;
        now.textContent = String(Math.min(cards.length, Math.floor(s.progress * (cards.length - 0.01)) + 1)).padStart(2, '0');
      }
    }
  });

  /* ---------------- 7. Marquesina: se mueve sola y acelera con el scroll ---------------- */
  gsap.utils.toArray('.marquee__row').forEach((row, i) => {
    const dir = i % 2 ? 1 : -1;
    const tw = gsap.fromTo(row, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 40, ease: 'none', repeat: -1 });
    ScrollTrigger.create({ trigger: '.stack', start: 'top bottom', end: 'bottom top', onUpdate: s => { gsap.to(tw, { timeScale: 1 + Math.abs(s.getVelocity()) / 400, duration: 0.2, overwrite: true }); gsap.to(tw, { timeScale: 1, duration: 1, delay: 0.2 }); } });
  });

  /* ---------------- 8. Línea de experiencia que se llena ---------------- */
  gsap.to('#expLine', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } });
  gsap.utils.toArray('.job').forEach(job => {
    ScrollTrigger.create({ trigger: job, start: 'top 65%', onEnter: () => job.classList.add('is-lit'), onLeaveBack: () => job.classList.remove('is-lit') });
  });

  /* Brillo del contacto que sube */
  gsap.fromTo('.contact__glow', { yPercent: 25, opacity: 0.4 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'center center', scrub: true } });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
