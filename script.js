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

  function ehPaginaLoja() {
    return document.body.classList.contains("pagina-catalogo-loja") || /loja\.html$/i.test(window.location.pathname);
  }

  function removerTabelaDuplicadaLoja() {
    if (!ehPaginaLoja()) return;
    const tabelaDuplicada = document.querySelector(".grade-categorias-preview");
    if (tabelaDuplicada) tabelaDuplicada.remove();
  }

  function personalizarTextoLoja() {
    if (!ehPaginaLoja()) return;

    const intro = document.querySelector(".loja-em-breve-texto");
    if (intro) {
      intro.innerText = "A loja funciona como uma vitrine da PH Creative: aqui estão exemplos reais de artes publicitárias, logos para empresas e modelos visuais que mostram o que a marca pode criar para o seu projeto.";
    }

    const blocoLoja = document.querySelector(".quadro-preco-loja");
    if (blocoLoja) {
      blocoLoja.setAttribute("aria-label", "Informações sobre os modelos da loja");
      blocoLoja.innerHTML = `
        <div>
          <span>Vitrine criativa</span>
          <h2>Modelos da loja e projetos personalizados</h2>
          <p>
            Esses modelos são apenas exemplos do que a PH Creative pode fazer. A loja já conta com artes publicitárias e logos para empresas, e em breve novas categorias e mais exemplos serão adicionados. Caso queira comprar algum desses modelos ou pedir uma versão personalizada para sua marca, o valor pode ser conversado diretamente pelo WhatsApp.
          </p>
        </div>
      `;
    }
  }

  function inserirGaleriaLogos() {
    if (!ehPaginaLoja() || document.getElementById("logos-identidades")) return;

    const pontoDeInsercao = document.getElementById("artes-publicitarias") || document.querySelector(".catalogo-loja-card");
    if (!pontoDeInsercao) return;

    const grupos = [
      {
        nome: "Sabor Express Marmitas",
        descricao: "Linha gastronômica para marmitas, delivery e marcas de comida.",
        itens: [
          { src: "./21e04d001-ea74-4abf-98cf-505da508026c.png", titulo: "Sabor Express Marmitas", tipo: "Logo clean" },
          { src: "./21e04001-ea74-4abf-98cf-505da508026c.png", titulo: "Sabor Express Marmitas", tipo: "Logo fundo escuro" },
          { src: "./62f43944-ba07-432a-9c9b-65c412e748a0.png", titulo: "Sabor Express Marmitas", tipo: "Logo cinematográfica" }
        ]
      },
      {
        nome: "Elevare",
        descricao: "Sequência de logos imobiliárias e aplicações visuais da marca.",
        itens: [
          { src: "./545cafd7-cbe8-4756-b871-43eaf2b90bfe.png", titulo: "Elevare", tipo: "Logo imobiliária" },
          { src: "./6427c0f7-cd2d-4ff0-9a79-ef1fa27917a6.png", titulo: "Elevare", tipo: "Logo em ambiente interno" },
          { src: "./ce0e53db-8ab4-4cd6-a2d4-cac19acc0110.png", titulo: "Elevare", tipo: "Logo em fachada" },
          { src: "./a588002b-3517-45f9-bde5-383d9c364853.png", titulo: "Elevare", tipo: "Logo alto padrão" },
          { src: "./86b3525e-f745-4c4e-914d-dd4b02939296.png", titulo: "Elevare", tipo: "Logo imobiliária premium" }
        ]
      },
      {
        nome: "Zena Moda Masculina",
        descricao: "Sequência de logos para marca de moda masculina.",
        itens: [
          { src: "./ff30f682-db4a-43a9-b306-ac716cb25dc3.png", titulo: "Zena Moda Masculina", tipo: "Logo minimalista" },
          { src: "./74766a8c-4f97-40bf-a378-2026eb45e581.png", titulo: "Zena Moda Masculina", tipo: "Logo fundo claro" },
          { src: "./fa019d57-2a04-426b-a7a8-616572b805e1.png", titulo: "Zena Moda Masculina", tipo: "Logo em textura" }
        ]
      }
    ];

    const estiloId = "estilo-galeria-logos-ph";
    if (!document.getElementById(estiloId)) {
      const estilo = document.createElement("style");
      estilo.id = estiloId;
      estilo.textContent = `
        .secao-logos-ph {
          margin-top: 34px;
          padding: clamp(22px, 4vw, 34px);
          border: 1px solid rgba(245, 215, 110, 0.24);
          border-radius: 28px;
          background: radial-gradient(circle at top left, rgba(245, 215, 110, 0.12), transparent 36%), linear-gradient(180deg, rgba(5, 5, 7, 0.52), rgba(5, 5, 7, 0.24));
          box-shadow: 0 24px 58px rgba(0, 0, 0, 0.34);
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
        .secao-logos-ph .cabecalho-logos-ph p,
        .grupo-logos-ph > p {
          color: #cfc6a8;
          line-height: 1.75;
        }
        .grupo-logos-ph {
          padding-top: 26px;
          margin-top: 26px;
          border-top: 1px solid rgba(245, 215, 110, 0.18);
        }
        .grupo-logos-ph:first-of-type {
          margin-top: 0;
        }
        .grupo-logos-ph h3 {
          margin: 0 0 8px;
          color: #f5d76e;
          font-size: clamp(1.35rem, 2.5vw, 2rem);
        }
        .grid-logos-ph {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
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
        .logo-card-ph h4 {
          margin: 0;
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
        <p>Galeria organizada por marca, sem tabela de preços no meio. Cada fileira mantém a mesma identidade, indo dos modelos mais simples até os mais fortes visualmente.</p>
      </div>
      ${grupos.map((grupo) => `
        <div class="grupo-logos-ph">
          <h3>${grupo.nome}</h3>
          <p>${grupo.descricao}</p>
          <div class="grid-logos-ph" aria-label="Galeria ${grupo.nome}">
            ${grupo.itens.map((item) => `
              <article class="logo-card-ph">
                <figure><img src="${item.src}" alt="${item.titulo}" loading="lazy"></figure>
                <div><span>${item.tipo}</span><h4>${item.titulo}</h4></div>
              </article>
            `).join("")}
          </div>
        </div>
      `).join("")}
    `;

    pontoDeInsercao.insertAdjacentElement("afterend", secaoLogos);
  }

  function iniciarCarrinhoLoja() {
    if (!ehPaginaLoja()) return;

    const estiloId = "estilo-carrinho-loja-ph";
    if (!document.getElementById(estiloId)) {
      const estilo = document.createElement("style");
      estilo.id = estiloId;
      estilo.textContent = `
        .botao-carrinho-produto-ph { width: 100%; margin-top: 14px; padding: 12px 14px; border: 1px solid rgba(245, 215, 110, 0.42); border-radius: 14px; background: linear-gradient(135deg, #fff1a6, #d4af37, #8c661b); color: #070707; font-weight: 950; letter-spacing: 0.02em; cursor: pointer; transition: 0.24s ease; }
        .botao-carrinho-produto-ph:hover { transform: translateY(-2px); filter: brightness(1.06); }
        .carrinho-loja-ph { position: fixed; right: 14px; bottom: 84px; z-index: 9999; width: min(330px, calc(100vw - 28px)); color: #fff; font-family: inherit; }
        .carrinho-toggle-ph { width: 100%; border: 1px solid rgba(245, 215, 110, 0.38); border-radius: 999px; padding: 13px 18px; background: rgba(5, 5, 7, 0.86); color: #f5d76e; font-weight: 950; cursor: pointer; backdrop-filter: blur(12px); box-shadow: 0 18px 42px rgba(0, 0, 0, 0.45); }
        .carrinho-painel-ph { display: none; margin-bottom: 10px; padding: 16px; border: 1px solid rgba(245, 215, 110, 0.30); border-radius: 22px; background: rgba(5, 5, 7, 0.94); box-shadow: 0 22px 60px rgba(0, 0, 0, 0.55); backdrop-filter: blur(14px); }
        .carrinho-loja-ph.aberto .carrinho-painel-ph { display: block; }
        .carrinho-painel-ph strong { display: block; color: #f5d76e; margin-bottom: 10px; font-size: 1.02rem; }
        .lista-carrinho-ph { list-style: none; margin: 0 0 12px; padding: 0; max-height: 190px; overflow: auto; }
        .lista-carrinho-ph li { display: flex; justify-content: space-between; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #e9dec2; font-size: 0.9rem; line-height: 1.35; }
        .remover-item-carrinho-ph { border: 0; background: transparent; color: #f5d76e; font-weight: 900; cursor: pointer; }
        .acoes-carrinho-ph { display: grid; gap: 8px; }
        .acoes-carrinho-ph a, .acoes-carrinho-ph button { width: 100%; border: 0; border-radius: 14px; padding: 11px 12px; text-align: center; text-decoration: none; font-weight: 950; cursor: pointer; }
        .enviar-carrinho-ph { background: #25d366; color: #051008; }
        .limpar-carrinho-ph { background: rgba(255, 255, 255, 0.08); color: #fff; }
        .carrinho-vazio-ph { color: #cfc6a8; line-height: 1.5; margin-bottom: 10px; }
        @media (max-width: 560px) { .carrinho-loja-ph { right: 10px; bottom: 72px; width: calc(100vw - 20px); } }
      `;
      document.head.appendChild(estilo);
    }

    const chaveCarrinho = "phcreative-carrinho-loja";
    const numeroWhatsApp = "5521984150295";
    const carregarCarrinho = () => {
      try { return JSON.parse(localStorage.getItem(chaveCarrinho)) || []; } catch (erro) { return []; }
    };
    const salvarCarrinho = (itens) => {
      try { localStorage.setItem(chaveCarrinho, JSON.stringify(itens)); } catch (erro) { console.warn("Carrinho não salvo no navegador:", erro); }
    };
    const textoItem = (item) => `${item.tipo} — ${item.titulo}`;

    function criarCarrinhoVisual() {
      let carrinhoVisual = document.querySelector(".carrinho-loja-ph");
      if (carrinhoVisual) return carrinhoVisual;
      carrinhoVisual = document.createElement("div");
      carrinhoVisual.className = "carrinho-loja-ph";
      carrinhoVisual.innerHTML = `<div class="carrinho-painel-ph"><strong>Carrinho da loja</strong><div class="conteudo-carrinho-ph"></div></div><button class="carrinho-toggle-ph" type="button">Carrinho • <span class="contador-carrinho-ph">0 itens</span></button>`;
      document.body.appendChild(carrinhoVisual);
      carrinhoVisual.querySelector(".carrinho-toggle-ph").addEventListener("click", () => carrinhoVisual.classList.toggle("aberto"));
      return carrinhoVisual;
    }

    function atualizarCarrinhoVisual() {
      const carrinhoVisual = criarCarrinhoVisual();
      const itens = carregarCarrinho();
      const contador = carrinhoVisual.querySelector(".contador-carrinho-ph");
      const conteudo = carrinhoVisual.querySelector(".conteudo-carrinho-ph");
      contador.innerText = itens.length === 1 ? "1 item" : `${itens.length} itens`;
      conteudo.innerHTML = "";
      if (!itens.length) {
        const vazio = document.createElement("p");
        vazio.className = "carrinho-vazio-ph";
        vazio.innerText = "Adicione um modelo da loja para montar seu pedido.";
        conteudo.appendChild(vazio);
        return;
      }
      const lista = document.createElement("ul");
      lista.className = "lista-carrinho-ph";
      itens.forEach((item, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const remover = document.createElement("button");
        span.innerText = textoItem(item);
        remover.type = "button";
        remover.className = "remover-item-carrinho-ph";
        remover.innerText = "remover";
        remover.addEventListener("click", () => {
          const novosItens = carregarCarrinho();
          novosItens.splice(index, 1);
          salvarCarrinho(novosItens);
          atualizarCarrinhoVisual();
        });
        li.appendChild(span);
        li.appendChild(remover);
        lista.appendChild(li);
      });
      conteudo.appendChild(lista);
      const mensagem = encodeURIComponent(`Olá, quero falar com a PH Creative sobre estes modelos da loja:\n\n${itens.map((item, i) => `${i + 1}. ${textoItem(item)}`).join("\n")}\n\nPodemos conversar sobre o valor e a personalização pelo WhatsApp?`);
      const acoes = document.createElement("div");
      acoes.className = "acoes-carrinho-ph";
      acoes.innerHTML = `<a class="enviar-carrinho-ph" href="https://wa.me/${numeroWhatsApp}?text=${mensagem}" target="_blank" rel="noopener noreferrer">Enviar pedido no WhatsApp</a><button class="limpar-carrinho-ph" type="button">Limpar carrinho</button>`;
      acoes.querySelector(".limpar-carrinho-ph").addEventListener("click", () => { salvarCarrinho([]); atualizarCarrinhoVisual(); });
      conteudo.appendChild(acoes);
    }

    function adicionarAoCarrinho(item, botao) {
      const itens = carregarCarrinho();
      const jaExiste = itens.some((produto) => produto.titulo === item.titulo && produto.tipo === item.tipo);
      if (!jaExiste) itens.push(item);
      salvarCarrinho(itens);
      atualizarCarrinhoVisual();
      if (botao) {
        const textoOriginal = botao.innerText;
        botao.innerText = jaExiste ? "Já está no carrinho" : "Adicionado ao carrinho";
        setTimeout(() => { botao.innerText = textoOriginal; }, 1400);
      }
      criarCarrinhoVisual().classList.add("aberto");
    }

    function prepararBotoesDosCards() {
      const cards = document.querySelectorAll(".arte-publicitaria-card, .logo-card-ph");
      cards.forEach((card) => {
        if (card.querySelector(".botao-carrinho-produto-ph")) return;
        const titulo = card.querySelector("h3, h4")?.innerText?.trim() || "Modelo da loja";
        const tipo = card.querySelector("span")?.innerText?.trim() || "Produto visual";
        const imagem = card.querySelector("img")?.getAttribute("src") || "";
        const info = card.querySelector(".arte-publicitaria-info") || card.querySelector("div");
        if (!info) return;
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-carrinho-produto-ph";
        botao.innerText = "Adicionar ao carrinho";
        botao.addEventListener("click", () => adicionarAoCarrinho({ titulo, tipo, imagem }, botao));
        info.appendChild(botao);
      });
    }

    criarCarrinhoVisual();
    prepararBotoesDosCards();
    atualizarCarrinhoVisual();
  }

  removerTabelaDuplicadaLoja();
  personalizarTextoLoja();
  inserirGaleriaLogos();
  iniciarCarrinhoLoja();

  // Loja liberada como página de aviso "Em breve". Sem bloqueio por modal.

  console.log("PH Creative carregado com sucesso.");
})();
