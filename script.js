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

  // Loja liberada como página de aviso "Em breve". Sem bloqueio por modal.

  console.log("PH Creative carregado com sucesso.");
})();