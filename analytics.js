// PH Creative - analytics de visitas e cliques
// Registra entradas no site, cliques em links/botoes e atualiza o contador visual.
(function () {
  if (window.__phCreativeAnalyticsStarted) return;
  window.__phCreativeAnalyticsStarted = true;

  const SITE_ID = "site-oficial";
  const NUMERO_WHATSAPP = "5521984150295";
  const EVENTOS_COLLECTION = "analytics_eventos";
  const CONTADORES_COLLECTION = "contadores";
  const firebaseConfig = {
    apiKey: "AIzaSyCGaAMXH6JZvkxTjOQswClherBNpO8OlyY",
    authDomain: "ph-creative.firebaseapp.com",
    projectId: "ph-creative",
    storageBucket: "ph-creative.firebasestorage.app",
    messagingSenderId: "838725389820",
    appId: "1:838725389820:web:e361e5c021ae6593277679"
  };

  let firestoreApi = null;
  let db = null;
  let firebasePromise = null;
  let contadorEl = null;

  function criarId(prefixo) {
    const aleatorio = Math.random().toString(36).slice(2, 10);
    return `${prefixo}-${Date.now().toString(36)}-${aleatorio}`;
  }

  function lerStorage(storage, chave) {
    try { return storage.getItem(chave); } catch (erro) { return null; }
  }

  function salvarStorage(storage, chave, valor) {
    try { storage.setItem(chave, valor); } catch (erro) { /* navegador bloqueou storage */ }
  }

  function obterVisitanteId() {
    const chave = `phcreative-visitante-${SITE_ID}`;
    let id = lerStorage(localStorage, chave);
    if (!id) {
      id = criarId("visitante");
      salvarStorage(localStorage, chave, id);
    }
    return id;
  }

  function obterSessaoId() {
    const chave = `phcreative-sessao-${SITE_ID}`;
    let id = lerStorage(sessionStorage, chave);
    if (!id) {
      id = criarId("sessao");
      salvarStorage(sessionStorage, chave, id);
    }
    return id;
  }

  function dispositivo() {
    const ua = navigator.userAgent || "";
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) return "celular";
    return "computador";
  }

  function textoLimpo(valor) {
    return String(valor || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);
  }

  function dadosBase() {
    return {
      siteId: SITE_ID,
      url: window.location.href,
      caminho: window.location.pathname || "/",
      pagina: document.title || "PH Creative",
      origem: document.referrer || "direto",
      visitanteId: obterVisitanteId(),
      sessaoId: obterSessaoId(),
      dispositivo: dispositivo(),
      idioma: navigator.language || "pt-BR",
      criadoEmLocal: new Date().toISOString(),
      userAgent: (navigator.userAgent || "").slice(0, 300)
    };
  }

  function garantirContadorVisual() {
    const estiloId = "estilo-contador-visitas-ph-analytics";
    if (!document.getElementById(estiloId)) {
      const style = document.createElement("style");
      style.id = estiloId;
      style.textContent = `
        .contador-visitas-ph {
          position: fixed;
          left: 12px;
          bottom: 12px;
          z-index: 9998;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border: 1px solid rgba(245, 215, 110, 0.28);
          border-radius: 999px;
          background: rgba(5, 5, 7, 0.72);
          color: #f5dc82;
          font-size: 12px;
          font-weight: 800;
          line-height: 1;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
          opacity: 0.9;
        }
        .contador-visitas-ph svg { width: 15px; height: 15px; flex: 0 0 auto; }
        .contador-visitas-ph span { white-space: nowrap; }
        @media (max-width: 480px) {
          .contador-visitas-ph { left: 8px; bottom: 8px; padding: 6px 8px; font-size: 11px; }
        }
      `;
      document.head.appendChild(style);
    }

    let caixa = document.querySelector(".contador-visitas-ph");
    if (!caixa) {
      caixa = document.createElement("div");
      caixa.className = "contador-visitas-ph";
      caixa.setAttribute("aria-label", "Contador de acessos do site");
      caixa.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
        </svg>
        <span id="contadorVisitasPh">Carregando...</span>
      `;
      document.body.appendChild(caixa);
    }

    contadorEl = document.getElementById("contadorVisitasPh") || caixa.querySelector("span");
    return contadorEl;
  }

  function formatarTotal(total) {
    const numero = Number(total) || 0;
    return `${numero.toLocaleString("pt-BR")} ${numero === 1 ? "acesso" : "acessos"}`;
  }

  function carregarFirebase() {
    if (firebasePromise) return firebasePromise;
    firebasePromise = Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]).then(([firebaseApp, firestore]) => {
      const app = firebaseApp.getApps().length ? firebaseApp.getApps()[0] : firebaseApp.initializeApp(firebaseConfig);
      firestoreApi = firestore;
      db = firestore.getFirestore(app);
      return { firestore, db };
    });
    return firebasePromise;
  }

  async function atualizarContador(tipo) {
    if (!firestoreApi || !db) return;
    const contadorRef = firestoreApi.doc(db, CONTADORES_COLLECTION, SITE_ID);
    const incremento = {
      atualizadoEm: firestoreApi.serverTimestamp(),
      siteId: SITE_ID
    };

    if (tipo === "visita") {
      incremento.total = firestoreApi.increment(1);
      incremento.visitas = firestoreApi.increment(1);
    }

    if (tipo === "clique") {
      incremento.cliques = firestoreApi.increment(1);
    }

    await firestoreApi.setDoc(contadorRef, incremento, { merge: true });
  }

  async function registrarEvento(tipo, detalhes) {
    await carregarFirebase();
    const evento = {
      ...dadosBase(),
      tipo,
      detalhes: detalhes || {},
      criadoEm: firestoreApi.serverTimestamp()
    };
    await firestoreApi.addDoc(firestoreApi.collection(db, EVENTOS_COLLECTION), evento);
    await atualizarContador(tipo);
  }

  function iniciarLeituraDoContador() {
    garantirContadorVisual();
    carregarFirebase().then(() => {
      const contadorRef = firestoreApi.doc(db, CONTADORES_COLLECTION, SITE_ID);
      firestoreApi.onSnapshot(contadorRef, (snapshot) => {
        const dados = snapshot.exists() ? snapshot.data() : {};
        const total = Number(dados.total ?? dados.visitas ?? 0) || 0;
        if (contadorEl) contadorEl.innerText = formatarTotal(total);
      }, (erro) => {
        console.warn("PH Creative analytics: nao foi possivel ler o contador.", erro);
        if (contadorEl) contadorEl.innerText = "contador indisponivel";
      });
    }).catch((erro) => {
      console.warn("PH Creative analytics: Firebase nao carregou.", erro);
      if (contadorEl) contadorEl.innerText = "contador indisponivel";
    });
  }

  function registrarVisita() {
    const chavePagina = `phcreative-visita-pagina-${SITE_ID}-${window.location.pathname}`;
    if (lerStorage(sessionStorage, chavePagina) === "sim") return;
    salvarStorage(sessionStorage, chavePagina, "sim");
    registrarEvento("visita", {
      largura: window.innerWidth,
      altura: window.innerHeight
    }).catch((erro) => console.warn("PH Creative analytics: visita nao registrada.", erro));
  }

  function detalhesDoElemento(elemento) {
    const link = elemento.closest("a");
    const href = link ? link.href : "";
    const rotulo = textoLimpo(
      elemento.getAttribute("data-analytics") ||
      elemento.getAttribute("aria-label") ||
      elemento.getAttribute("title") ||
      elemento.innerText ||
      elemento.textContent ||
      href ||
      "clique"
    );

    return {
      rotulo,
      tag: elemento.tagName ? elemento.tagName.toLowerCase() : "",
      href,
      alvo: link ? (link.getAttribute("target") || "") : "",
      whatsapp: href.includes("wa.me") || href.includes("whatsapp") || rotulo.toLowerCase().includes("whatsapp")
    };
  }

  function seguirLinkDepois(link, eventoOriginal) {
    const href = link.href;
    const target = link.getAttribute("target");
    if (!href || href.startsWith("javascript:")) return;
    if (target && target !== "_self") {
      window.open(href, target, "noopener,noreferrer");
      return;
    }
    if (eventoOriginal.metaKey || eventoOriginal.ctrlKey || eventoOriginal.shiftKey || eventoOriginal.altKey || eventoOriginal.button === 1) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = href;
  }

  function iniciarRastreamentoDeCliques() {
    document.addEventListener("click", (evento) => {
      const elemento = evento.target && evento.target.closest ? evento.target.closest("a, button, [role='button']") : null;
      if (!elemento || elemento.classList.contains("botao-topo")) return;

      const detalhes = detalhesDoElemento(elemento);
      const link = elemento.closest("a");
      const promessa = registrarEvento("clique", detalhes)
        .catch((erro) => console.warn("PH Creative analytics: clique nao registrado.", erro));

      if (link && link.href && !link.href.startsWith("#") && !link.href.startsWith("javascript:")) {
        evento.preventDefault();
        Promise.race([
          promessa,
          new Promise((resolve) => setTimeout(resolve, 550))
        ]).finally(() => seguirLinkDepois(link, evento));
      }
    }, true);
  }

  function iniciar() {
    iniciarLeituraDoContador();
    registrarVisita();
    iniciarRastreamentoDeCliques();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();
