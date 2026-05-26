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

  if (document.readyState === "complete") {
    iniciarContadorVisitas();
  } else {
    window.addEventListener("load", iniciarContadorVisitas, { once: true });
  }

  // Loja liberada como página de aviso "Em breve". Sem bloqueio por modal.

  console.log("PH Creative carregado com sucesso.");
})();