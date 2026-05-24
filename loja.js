// PH Creative - Loja com preço único
(function () {
  const WHATSAPP_NUMERO = "5521984150295";
  const PRECO_ITEM = 30;
  const PRECO_PACOTE = 300;
  const MAX_ITENS_POR_CATEGORIA = 20;
  const EXTENSOES = ["jpg", "png", "jpeg", "webp", "JPG", "PNG", "JPEG", "WEBP"];

  const categorias = [
    {
      id: "arte",
      nomeSingular: "Arte",
      nomePlural: "Artes",
      pasta: "./img/loja/artes",
      descricao: "Modelo comprável e personalizável para divulgação, promoção, status ou post."
    },
    {
      id: "logo",
      nomeSingular: "Logo",
      nomePlural: "Logos",
      pasta: "./img/loja/logos",
      descricao: "Modelo de logo comprável para adaptar nome, cor, fundo e estilo."
    },
    {
      id: "banner",
      nomeSingular: "Banner",
      nomePlural: "Banners",
      pasta: "./img/loja/banners",
      descricao: "Modelo de banner comprável para loja, anúncio, promoção, site ou divulgação."
    },
    {
      id: "capa",
      nomeSingular: "Capa",
      nomePlural: "Capas",
      pasta: "./img/loja/capas",
      descricao: "Modelo de capa comprável para rede social, perfil, página, canal ou loja."
    }
  ];

  const grade = document.getElementById("gradeGaleriaLoja");
  const filtros = document.querySelectorAll(".filtro");
  const listaCarrinho = document.getElementById("listaCarrinhoLoja");
  const contador = document.getElementById("contadorLoja");
  const totalEl = document.getElementById("totalLoja");
  const btnEnviar = document.getElementById("btnEnviarLoja");
  const btnLimpar = document.getElementById("btnLimparLoja");
  const btnPacoteHero = document.getElementById("btnPacoteHero");
  const btnPacoteCard = document.getElementById("btnPacoteCard");

  const nomeCliente = document.getElementById("nomeClienteLoja");
  const marcaCliente = document.getElementById("marcaClienteLoja");
  const preferenciasCliente = document.getElementById("preferenciasClienteLoja");
  const obsCliente = document.getElementById("obsClienteLoja");

  const modalImagem = document.getElementById("modalImagemExemplo");
  const modalImagemFoto = document.getElementById("modalImagemFoto");
  const modalImagemLegenda = document.getElementById("modalImagemLegenda");
  const fecharModalImagem = document.getElementById("fecharModalImagem");

  let modelos = [];
  let filtroAtual = "todos";
  let carrinho = [];

  function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function numeroDoSlot(numero) {
    return String(numero).padStart(2, "0");
  }

  function imagemExiste(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => resolve(null);
      img.src = src + "?v=" + Date.now();
    });
  }

  async function procurarImagem(categoria, numero) {
    const slot = numeroDoSlot(numero);

    for (const ext of EXTENSOES) {
      const src = `${categoria.pasta}/${slot}.${ext}`;
      const encontrada = await imagemExiste(src);
      if (encontrada) {
        // Remove cache buster antes de salvar no HTML/WhatsApp.
        return src;
      }
    }

    return null;
  }

  async function carregarModelos() {
    if (!grade) return;

    grade.innerHTML = `
      <div class="estado-galeria-loja">
        <strong>Carregando modelos...</strong>
        <span>Preparando a vitrine da loja.</span>
      </div>
    `;

    const encontrados = [];

    for (const categoria of categorias) {
      for (let i = 1; i <= MAX_ITENS_POR_CATEGORIA; i++) {
        const src = await procurarImagem(categoria, i);

        if (src) {
          const slot = numeroDoSlot(i);
          encontrados.push({
            id: `${categoria.id}-${slot}`,
            categoria: categoria.id,
            categoriaLabel: categoria.nomePlural,
            nome: `${categoria.nomeSingular} Modelo ${slot}`,
            descricao: categoria.descricao,
            preco: PRECO_ITEM,
            imagem: src,
            pasta: categoria.pasta,
            slot
          });
        }
      }
    }

    modelos = encontrados;
    renderizarGaleria();
  }

  function renderizarGaleria() {
    if (!grade) return;

    const visiveis = filtroAtual === "todos"
      ? modelos
      : modelos.filter((modelo) => modelo.categoria === filtroAtual);

    if (visiveis.length === 0) {
      grade.innerHTML = `
        <div class="estado-galeria-loja">
          <strong>Novos modelos serão adicionados em breve.</strong>
          <span>Escolha outra categoria ou fale pelo WhatsApp para pedir um modelo personalizado por R$ 30.</span>
        </div>
      `;
      return;
    }

    grade.innerHTML = visiveis.map((modelo) => `
      <article class="modelo-card-loja" data-categoria="${modelo.categoria}">
        <button type="button" class="modelo-imagem-btn" data-imagem="${modelo.imagem}" data-legenda="${modelo.nome}" aria-label="Abrir ${modelo.nome} em tela cheia">
          <img src="${modelo.imagem}" alt="${modelo.nome}" loading="lazy" />
          <span>Clique para ampliar</span>
        </button>

        <div class="modelo-card-corpo">
          <div class="modelo-card-topo">
            <span>${modelo.categoriaLabel}</span>
            <strong>${dinheiro(modelo.preco)}</strong>
          </div>

          <h3>${modelo.nome}</h3>
          <p>${modelo.descricao}</p>

          <div class="modelo-card-acoes">
            <button type="button" class="botao-produto" data-acao="comprar" data-id="${modelo.id}">Comprar este modelo</button>
            <button type="button" class="botao-produto adicionado" data-acao="parecido" data-id="${modelo.id}">Pedir parecido</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function adicionarItem(modelo, tipo = "Comprar modelo") {
    carrinho.push({
      id: `${modelo.id}-${tipo}-${Date.now()}`,
      nome: modelo.nome,
      categoria: modelo.categoriaLabel,
      preco: modelo.preco,
      tipo,
      imagem: modelo.imagem || ""
    });

    atualizarCarrinho();
    mostrarToast(`${modelo.nome} adicionado ao pedido.`);
  }

  function adicionarPacote() {
    carrinho.push({
      id: `pacote-10-artes-${Date.now()}`,
      nome: "Pacote com até 10 serviços da loja",
      categoria: "Pacote",
      preco: PRECO_PACOTE,
      tipo: "Pacote principal",
      imagem: ""
    });

    atualizarCarrinho();
    mostrarToast("Pacote de até 10 serviços adicionado ao pedido.");
  }

  function removerItem(id) {
    carrinho = carrinho.filter((item) => item.id !== id);
    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    if (!listaCarrinho || !contador || !totalEl) return;

    contador.textContent = carrinho.length;

    if (carrinho.length === 0) {
      listaCarrinho.innerHTML = `<p class="carrinho-vazio">Nenhum item adicionado ainda.</p>`;
    } else {
      listaCarrinho.innerHTML = carrinho.map((item) => `
        <div class="item-carrinho-loja">
          <div>
            <strong>${item.nome}</strong>
            <span>${item.tipo} • ${dinheiro(item.preco)}</span>
          </div>
          <button type="button" data-remover="${item.id}" aria-label="Remover ${item.nome}">×</button>
        </div>
      `).join("");
    }

    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
    totalEl.textContent = dinheiro(total);
  }

  function enviarWhatsApp() {
    if (carrinho.length === 0) {
      mostrarToast("Adicione pelo menos um item antes de enviar.");
      return;
    }

    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

    const itens = carrinho.map((item, index) => {
      const imagem = item.imagem ? `\n   Referência: ${item.imagem}` : "";
      return `${index + 1}. ${item.nome} - ${item.tipo} - ${dinheiro(item.preco)}${imagem}`;
    }).join("\n");

    const mensagem = `Olá, PH Creative! Quero fazer um pedido pela loja.\n\n` +
      `Nome: ${nomeCliente?.value || "Não informado"}\n` +
      `Marca/loja: ${marcaCliente?.value || "Não informado"}\n\n` +
      `Itens escolhidos:\n${itens}\n\n` +
      `Total estimado: ${dinheiro(total)}\n\n` +
      `Alterações desejadas: ${preferenciasCliente?.value || "Não informado"}\n\n` +
      `Observações: ${obsCliente?.value || "Não informado"}`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function abrirImagem(src, legenda) {
    if (!modalImagem || !modalImagemFoto || !modalImagemLegenda) return;
    modalImagemFoto.src = src;
    modalImagemLegenda.textContent = legenda || "Modelo PH Creative";
    modalImagem.classList.add("visivel");
    modalImagem.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");
  }

  function fecharImagem() {
    if (!modalImagem || !modalImagemFoto) return;
    modalImagem.classList.remove("visivel");
    modalImagem.setAttribute("aria-hidden", "true");
    modalImagemFoto.src = "";
    document.body.classList.remove("modal-aberto");
  }

  function mostrarToast(texto) {
    let toast = document.querySelector(".toast-loja");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast-loja";
      document.body.appendChild(toast);
    }

    toast.textContent = texto;
    toast.classList.add("visivel");

    window.clearTimeout(mostrarToast.timer);
    mostrarToast.timer = window.setTimeout(() => {
      toast.classList.remove("visivel");
    }, 2400);
  }

  filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
      filtros.forEach((filtro) => filtro.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtroAtual = botao.dataset.filtro || "todos";
      renderizarGaleria();
    });
  });

  document.addEventListener("click", (evento) => {
    const botaoAcao = evento.target.closest("[data-acao]");
    if (botaoAcao) {
      const modelo = modelos.find((item) => item.id === botaoAcao.dataset.id);
      if (!modelo) return;

      const tipo = botaoAcao.dataset.acao === "parecido" ? "Pedir algo parecido" : "Comprar este modelo";
      adicionarItem(modelo, tipo);
      return;
    }

    const botaoRemover = evento.target.closest("[data-remover]");
    if (botaoRemover) {
      removerItem(botaoRemover.dataset.remover);
      return;
    }

    const botaoImagem = evento.target.closest(".modelo-imagem-btn");
    if (botaoImagem) {
      abrirImagem(botaoImagem.dataset.imagem, botaoImagem.dataset.legenda);
    }
  });

  btnEnviar?.addEventListener("click", enviarWhatsApp);

  btnLimpar?.addEventListener("click", () => {
    carrinho = [];
    atualizarCarrinho();
    mostrarToast("Pedido limpo.");
  });

  btnPacoteHero?.addEventListener("click", adicionarPacote);
  btnPacoteCard?.addEventListener("click", adicionarPacote);

  fecharModalImagem?.addEventListener("click", fecharImagem);
  modalImagem?.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("modal-imagem-fundo")) {
      fecharImagem();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharImagem();
  });

  carregarModelos();
  atualizarCarrinho();
})();
