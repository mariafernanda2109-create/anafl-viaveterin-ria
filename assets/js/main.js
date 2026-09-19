/* =========================================
   Ana Flávia · Médica veterinária
   main.js — o conteúdo nunca depende deste arquivo para aparecer.
   ========================================= */

/* =========================================
   1. Preferência de movimento
   ========================================= */
const raiz = document.documentElement;
raiz.classList.add('js');

function movimentoReduzido() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* =========================================
   2. Menu mobile
   Fecha por botão, por link, por Esc e por clique fora.
   ========================================= */
const botaoMenu = document.querySelector('.cabecalho_menu_botao');
const navegacao = document.querySelector('.cabecalho_nav');

function definirMenu(aberto) {
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  navegacao.classList.toggle('cabecalho_nav_aberto', aberto);
}

if (botaoMenu && navegacao) {
  botaoMenu.addEventListener('click', () => {
    definirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
  });

  navegacao.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => definirMenu(false));
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') {
      definirMenu(false);
      botaoMenu.focus();
    }
  });

  document.addEventListener('click', (evento) => {
    const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
    if (aberto && !navegacao.contains(evento.target) && !botaoMenu.contains(evento.target)) {
      definirMenu(false);
    }
  });
}

/* =========================================
   3. Cabeçalho ao rolar
   No desktop a faixa de contato recolhe e a barra branca sobe.
   ========================================= */
const cabecalho = document.querySelector('.cabecalho');

if (cabecalho) {
  const marcarRolagem = () => cabecalho.classList.toggle('cabecalho_rolado', window.scrollY > 40);
  window.addEventListener('scroll', marcarRolagem, { passive: true });
  marcarRolagem();
}

/* =========================================
   4. Animações GSAP
   Funções da biblioteca-animacoes (nomes mantidos, parâmetros
   adaptados às classes snake_case). Com prefers-reduced-motion,
   cada função sai cedo e o conteúdo fica no estado final.
   ========================================= */
const GATILHO = 'top 80%';

/** Divide um título em linhas mascaradas, sem duplicar texto no HTML. */
function dividirEmLinhas(el) {
  const texto = el.textContent.trim();
  el.innerHTML = texto
    .split(/\s+/)
    .map((p) => '<span class="anim_palavra">' + p + '</span>')
    .join(' ');

  const linhas = [];
  let topoAtual = null;
  let linha = null;
  el.querySelectorAll('.anim_palavra').forEach((p) => {
    const topo = Math.round(p.offsetTop);
    if (topo !== topoAtual) {
      topoAtual = topo;
      linha = [];
      linhas.push(linha);
    }
    linha.push(p.textContent);
  });

  el.innerHTML = linhas
    .map((l) => '<span class="anim_linha"><span class="anim_linha_interna">' + l.join(' ') + '</span></span>')
    .join(' ');

  return el.querySelectorAll('.anim_linha_interna');
}

/** revelaTextoLinhas — reveal padrão de todos os h2. */
function revelaTextoLinhas(seletor, opcoes) {
  seletor = seletor || "[data-anim='texto']";
  opcoes = opcoes || {};
  if (movimentoReduzido()) return;

  document.querySelectorAll(seletor).forEach((el) => {
    const linhas = dividirEmLinhas(el);
    gsap.set(el, { autoAlpha: 1 });
    gsap.from(linhas, {
      yPercent: 110,
      duration: opcoes.duracao || 0.9,
      stagger: opcoes.stagger || 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: opcoes.gatilho || GATILHO, once: true }
    });
  });
}

/** revelaLista — filhos de uma lista entrando em sequência. */
function revelaLista(seletor, opcoes) {
  seletor = seletor || "[data-anim='lista']";
  opcoes = opcoes || {};
  if (movimentoReduzido()) return;

  document.querySelectorAll(seletor).forEach((lista) => {
    gsap.from(lista.children, {
      y: 24,
      autoAlpha: 0,
      duration: opcoes.duracao || 0.8,
      stagger: opcoes.stagger || 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: lista, start: opcoes.gatilho || GATILHO, once: true }
    });
  });
}

/** imagemEscala — a imagem entra levemente ampliada e assenta. */
function imagemEscala(seletor, opcoes) {
  seletor = seletor || "[data-anim='imagem']";
  opcoes = opcoes || {};
  if (movimentoReduzido()) return;

  document.querySelectorAll(seletor).forEach((el) => {
    gsap.from(el, {
      scale: 1.12,
      duration: opcoes.duracao || 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: opcoes.gatilho || GATILHO, once: true }
    });
  });
}

/** parallaxSuave — deslocamento leve do tipo fantasma. Linear de propósito. */
function parallaxSuave(seletor, intensidade) {
  seletor = seletor || "[data-anim='parallax']";
  intensidade = intensidade || 0.15;
  if (movimentoReduzido()) return;

  document.querySelectorAll(seletor).forEach((el) => {
    gsap.to(el, {
      yPercent: intensidade * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

/** acordeao — abre com a altura real do conteúdo. details/summary dá o teclado. */
function acordeao(seletor, umPorVez, seletorCorpo) {
  seletor = seletor || "[data-anim='acordeao']";
  seletorCorpo = seletorCorpo || '.faq_resposta';
  if (umPorVez === undefined) umPorVez = true;

  document.querySelectorAll(seletor).forEach((bloco) => {
    const itens = bloco.querySelectorAll('details');
    itens.forEach((item) => {
      const corpo = item.querySelector(seletorCorpo);
      if (!corpo) return;

      item.addEventListener('toggle', () => {
        if (!item.open) return;
        if (umPorVez) itens.forEach((outro) => { if (outro !== item) outro.open = false; });
        if (movimentoReduzido()) return;
        gsap.from(corpo, { height: 0, autoAlpha: 0, duration: 0.4, ease: 'power2.out' });
      });
    });
  });
}

/**
 * hoverCartaoServico — transição sutil nas linhas de serviço.
 * Não existe na biblioteca-animacoes: pedido específico deste projeto.
 * Escuta foco junto com mouse, porque quem usa teclado não tem hover.
 */
function hoverCartaoServico(seletor) {
  seletor = seletor || '.servicos_item';
  if (movimentoReduzido()) return;

  document.querySelectorAll(seletor).forEach((item) => {
    const nome = item.querySelector('.servicos_nome');
    const icone = item.querySelector('.servicos_icone');
    const configuracao = { duration: 0.45, ease: 'power2.out', overwrite: 'auto' };

    const entrar = () => {
      gsap.to(nome, { x: 8, ...configuracao });
      gsap.to(icone, { rotate: -18, scale: 1.15, ...configuracao });
    };
    const sair = () => {
      gsap.to(nome, { x: 0, ...configuracao });
      gsap.to(icone, { rotate: 0, scale: 1, ...configuracao });
    };

    item.addEventListener('mouseenter', entrar);
    item.addEventListener('mouseleave', sair);
    item.addEventListener('focusin', entrar);
    item.addEventListener('focusout', (evento) => {
      if (!item.contains(evento.relatedTarget)) sair();
    });
  });
}

/** Entrada do hero: timeline curta no carregamento, sem ScrollTrigger. */
function entradaHero() {
  if (movimentoReduzido()) return;
  gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })
    .from('.hero_imagem', { scale: 1.1, duration: 1.6, ease: 'power2.out' })
    .from('.hero_selo', { autoAlpha: 0, y: 16 }, '-=1.4')
    .from('.hero_titulo', { autoAlpha: 0, y: 30 }, '-=0.85')
    .from('.hero_subtitulo, .hero_acoes', { autoAlpha: 0, y: 20, stagger: 0.1 }, '-=0.8')
    .from('.hero_fantasma', { autoAlpha: 0, yPercent: 35, duration: 1.3 }, '-=1');
}

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  if (!movimentoReduzido()) raiz.classList.add('anim');

  // o hero entra na hora, sem esperar fonte: é o maior elemento da primeira dobra
  entradaHero();
  revelaLista();
  imagemEscala();
  parallaxSuave(null, 0.12);
  hoverCartaoServico();
  acordeao("[data-anim='acordeao']", true, '.faq_resposta');

  // os títulos esperam as fontes para dividir as linhas com a largura real
  const fontesProntas = document.fonts && document.fonts.ready
    ? Promise.race([document.fonts.ready, new Promise((resolver) => setTimeout(resolver, 1200))])
    : Promise.resolve();

  fontesProntas.then(() => {
    revelaTextoLinhas();
    ScrollTrigger.refresh();
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
