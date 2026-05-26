// PH Creative - JavaScript global
(function () {
  const estilosAviso = document.createElement("style");
  estilosAviso.textContent = `
    .aviso-agendamento-ph {
      max-width: 780px;
      margin: 0 auto;
      padding: 16px 20px;
      border-radius: 20px;
      border: 1px solid rgba(245, 215, 110, 0.34);
      background: rgba(5, 5, 7, 0.68);
      color: #f5d76e;
      font-weight: 800;
      line-height: 1.55;
      box-shadow: 0 0 28px rgba(212, 175, 55, 0.16);
    }
  `;
  document.head.appendChild(estilosAviso);

  const heroConteudo = document.querySelector(".hero-conteudo");
  const heroActions = document.querySelector(".hero-actions");

  if (heroConteudo && heroActions && !document.querySelector(".aviso-agendamento-ph")) {
    const avisoAgendamento = document.createElement("p");
    avisoAgendamento.className = "descricao-hero aviso-agendamento-ph";
    avisoAgendamento.innerText = "Quer agendar um serviço ou tirar dúvidas? Me chame no WhatsApp — respondo na hora.";
    heroConteudo.insertBefore(avisoAgendamento, heroActions);
  }

  const elementosAnimados = document.querySelectorAll("section, .categoria-card, .card-orcamento, li, .produto-home, .caminho-card, .produto-loja");

  if ("IntersectionObserver" in window && elementosAnimados.length) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("aparecer");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("esconder");
      observador.observe(elemento);
    });
  }

  if (!document.querySelector(".botao-topo")) {
    const botaoTopo = document.createElement("button");
    botaoTopo.innerText = "↑";
    botaoTopo.type = "button";
    botaoTopo.title = "Voltar ao topo";
    botaoTopo.classList.add("botao-topo");
    document.body.appendChild(botaoTopo);

    window.addEventListener("scroll", () => {
      botaoTopo.classList.toggle("mostrar", window.scrollY > 500);
    });

    botaoTopo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (!document.querySelector(".whatsapp-flutuante")) {
    const botaoWhatsApp = document.createElement("a");
    const texto = encodeURIComponent("Olá, quero falar com a PH Creative sobre um projeto.");
    botaoWhatsApp.href = `https://wa.me/5521984150295?text=${texto}`;
    botaoWhatsApp.target = "_blank";
    botaoWhatsApp.rel = "noopener noreferrer";
    botaoWhatsApp.innerText = "WhatsApp";
    botaoWhatsApp.classList.add("whatsapp-flutuante");
    document.body.appendChild(botaoWhatsApp);
  }

  const titulo = document.querySelector(".texto-logo h2");
  if (titulo) {
    titulo.addEventListener("mouseenter", () => {
      titulo.style.letterSpacing = window.innerWidth <= 480 ? "5px" : "14px";
    });

    titulo.addEventListener("mouseleave", () => {
      titulo.style.letterSpacing = window.innerWidth <= 480 ? "4px" : "10px";
    });
  }

  function iniciarContadorVisitas() {
    if (document.querySelector(".contador-visitas-ph")) return;

    const estiloId = "estilo-contador-visitas-ph";
    if (!document.getElementById(estiloId)) {
      const estilosContador = document.createElement("style");
      estilosContador.id = estiloId;
      estilosContador.textContent = `
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
          opacity: 0.88;
        }
        .contador-visitas-ph svg {
          width: 15px;
          height: 15px;
          flex: 0 0 auto;
        }
        .contador-visitas-ph span {
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .contador-visitas-ph {
            left: 8px;
            bottom: 8px;
            padding: 6px 8px;
            font-size: 11px;
          }
        }
      `;
      document.head.appendChild(estilosContador);
    }

    const contador = document.createElement("div");
    contador.className = "contador-visitas-ph";
    contador.setAttribute("aria-label", "Contador de acessos do site");
    contador.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
      </svg>
      <span id="contadorVisitasPh">0 acessos</span>
    `;
    document.body.appendChild(contador);

    const numero = document.getElementById("contadorVisitasPh");
    const siteId = "site-oficial";
    const chaveLocal = `phcreative-visita-contada-${siteId}`;
    const firebaseConfig = {
      apiKey: "AIzaSyCGaAMXH6JZvkxTjOQswClherBNpO8OlyY",
      authDomain: "ph-creative.firebaseapp.com",
      projectId: "ph-creative",
      storageBucket: "ph-creative.firebasestorage.app",
      messagingSenderId: "838725389820",
      appId: "1:838725389820:web:e361e5c021ae6593277679"
    };

    Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]).then(([firebaseApp, firestore]) => {
      const app = firebaseApp.getApps().length ? firebaseApp.getApps()[0] : firebaseApp.initializeApp(firebaseConfig);
      const db = firestore.getFirestore(app);
      const contadorRef = firestore.doc(db, "contadores", siteId);

      firestore.onSnapshot(contadorRef, (snapshot) => {
        const total = snapshot.exists() ? Number(snapshot.data().total) || 0 : 0;
        numero.innerText = `${total} ${total === 1 ? "acesso" : "acessos"}`;
      }, () => {
        numero.innerText = "-- acessos";
      });

      let jaContou = false;
      try {
        jaContou = localStorage.getItem(chaveLocal) === "sim";
      } catch (erro) {
        jaContou = false;
      }

      if (!jaContou) {
        firestore.runTransaction(db, async (transaction) => {
          const atual = await transaction.get(contadorRef);
          const totalAtual = atual.exists() ? Number(atual.data().total) || 0 : 0;
          transaction.set(contadorRef, {
            total: totalAtual + 1,
            atualizadoEm: firestore.serverTimestamp()
          }, { merge: true });
        }).then(() => {
          try {
            localStorage.setItem(chaveLocal, "sim");
          } catch (erro) {
            console.warn("Contador registrado sem salvar no navegador:", erro);
          }
        }).catch((erro) => {
          console.warn("Contador de acessos não atualizado:", erro);
        });
      }
    }).catch((erro) => {
      console.warn("Contador de acessos não carregado:", erro);
      numero.innerText = "-- acessos";
    });
  }

  function removerTabelaDuplicadaLoja() {
    const tabelaDuplicada = document.querySelector(".grade-categorias-preview");
    if (tabelaDuplicada) tabelaDuplicada.remove();
  }

  function inserirGaleriaLogos() {
    if (document.getElementById("logos-identidades")) return;

    const secaoLoja = document.getElementById("loja");
    if (!secaoLoja) return;

    const logos = [
      { src: "./62f43944-ba07-432a-9c9b-65c412e748a0.png", titulo: "Sabor Express Marmitas", tipo: "Logo gastronômica" },
      { src: "./86b3525e-f745-4c4e-914d-dd4b02939296.png", titulo: "Elevare Alto Padrão", tipo: "Identidade premium" },
      { src: "./0272f6ca-e3da-4ad2-8a87-b7e0ccdef10d.png", titulo: "Tabela de Preços", tipo: "Apresentação comercial" },
      { src: "./545cafd7-cbe8-4756-b871-43eaf2b90bfe.png", titulo: "Elevare Imóveis", tipo: "Logo imobiliária" },
      { src: "./6427c0f7-cd2d-4ff0-9a79-ef1fa27917a6.png", titulo: "Elevare Imóveis", tipo: "Aplicação em fachada" },
      { src: "./74766a8c-4f97-40bf-a378-2026eb45e581.png", titulo: "Zena Moda Masculina", tipo: "Logo fashion" },
      { src: "./a588002b-3517-45f9-bde5-383d9c364853.png", titulo: "Elevare Alto Padrão", tipo: "Aplicação externa" },
      { src: "./ce0e53db-8ab4-4cd6-a2d4-cac19acc0110.png", titulo: "Elevare Imóveis", tipo: "Aplicação urbana" },
      { src: "./fa019d57-2a04-426b-a7a8-616572b805e1.png", titulo: "Zena Moda Masculina", tipo: "Logo em textura" },
      { src: "./ff30f682-db4a-43a9-b306-ac716cb25dc3.png", titulo: "Zena Moda Masculina", tipo: "Logo minimalista" },
      { src: "./21e04d001-ea74-4abf-98cf-505da508026c.png", titulo: "Sabor Express Marmitas", tipo: "Logo clean" },
      { src: "./21e04001-ea74-4abf-98cf-505da508026c.png", titulo: "Sabor Express Marmitas", tipo: "Logo fundo escuro" },
      { src: "./55c1cc0e-d7bf-41b9-8d22-f38e04ce6071.png", titulo: "Zena Moda Masculina", tipo: "Logo premium" }
    ];

    const estiloId = "estilo-galeria-logos-ph";
    if (!document.getElementById(estiloId)) {
      const estilo = document.createElement("style");
      estilo.id = estiloId;
      estilo.textContent = `
        .secao-logos-ph {
          width: min(1180px, calc(100% - 32px));
          margin: 80px auto;
          padding: clamp(28px, 4vw, 44px);
          border: 1px solid rgba(245, 215, 110, 0.22);
          border-radius: 34px;
          background: radial-gradient(circle at top left, rgba(245, 215, 110, 0.12), transparent 34%), rgba(5, 5, 7, 0.56);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.36);
        }
        .secao-logos-ph .cabecalho-logos-ph {
          max-width: 860px;
          margin-bottom: 28px;
        }
        .secao-logos-ph .cabecalho-logos-ph h2 {
          margin: 8px 0 12px;
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: #fff;
        }
        .secao-logos-ph .cabecalho-logos-ph p {
          color: #cfc6a8;
          line-height: 1.75;
        }
        .grid-logos-ph {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .logo-card-ph {
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.20);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.035);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.30);
          transition: 0.28s ease;
        }
        .logo-card-ph:hover {
          transform: translateY(-6px);
          border-color: rgba(245, 215, 110, 0.52);
          box-shadow: 0 28px 60px rgba(0, 0, 0, 0.42), 0 0 24px rgba(212, 175, 55, 0.12);
        }
        .logo-card-ph figure {
          aspect-ratio: 1 / 1;
          background: #050507;
        }
        .logo-card-ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .logo-card-ph div {
          padding: 18px;
        }
        .logo-card-ph span {
          display: inline-flex;
          margin-bottom: 8px;
          color: #f5d76e;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .logo-card-ph h3 {
          color: #fff;
          font-size: 1.1rem;
          line-height: 1.25;
        }
        @media (max-width: 900px) {
          .grid-logos-ph { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 560px) {
          .grid-logos-ph { grid-template-columns: 1fr; }
        }
      `;
      document.head.appendChild(estilo);
    }

    const secaoLogos = document.createElement("section");
    secaoLogos.id = "logos-identidades";
    secaoLogos.className = "secao-logos-ph";
    secaoLogos.innerHTML = `
      <div class="cabecalho-logos-ph">
        <span class="tag-mini">Logos</span>
        <h2>Logos e identidades visuais</h2>
        <p>Alguns exemplos de logos, marcas e aplicações visuais criadas pela PH Creative, com foco em presença profissional, impacto e identidade de marca.</p>
      </div>
      <div class="grid-logos-ph" aria-label="Galeria de logos e identidades visuais">
        ${logos.map((item) => `
          <article class="logo-card-ph">
            <figure><img src="${item.src}" alt="${item.titulo}" loading="lazy"></figure>
            <div><span>${item.tipo}</span><h3>${item.titulo}</h3></div>
          </article>
        `).join("")}
      </div>
    `;

    secaoLoja.insertAdjacentElement("afterend", secaoLogos);
  }

  removerTabelaDuplicadaLoja();
  inserirGaleriaLogos();

  if (document.readyState === "complete") {
    iniciarContadorVisitas();
  } else {
    window.addEventListener("load", iniciarContadorVisitas, { once: true });
  }

  // Loja liberada como página de aviso "Em breve". Sem bloqueio por modal.

  console.log("PH Creative carregado com sucesso.");
})();