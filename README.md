# Ana Flávia · Médica veterinária

Landing page one-page de atendimento veterinário domiciliar para cães e gatos em Londrina-PR (CRMV-PR 24567), em HTML, CSS e JavaScript puros.

- Ação única: agendar atendimento domiciliar pelo WhatsApp (43) 99681-1409
- Cada serviço abre o WhatsApp com a mensagem já preenchida para aquele serviço
- Perfis: [@anaflavia.veterinaria](https://www.instagram.com/anaflavia.veterinaria) no rodapé; assinatura de [@maferrsantos](https://www.instagram.com/maferrsantos/)
- Animações: GSAP 3.13 + ScrollTrigger via CDN, respeitando `prefers-reduced-motion`
- Hospedagem: Vercel (site estático, sem build)
- No ar em https://anaflaviavet.vercel.app · repositório `mariafernanda2109-create/anafl-viaveterin-ria`, deploy automático a cada push na `main`

## Estrutura

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/
robots.txt
.gitignore
README.md
```

## Sistema visual

Linguagem traduzida da referência "Happy Tails Pet Care & Veterinary" (estrutura e tratamento, sem copiar cores, fotos ou textos).

- Base tipográfica: `1rem = 16px`. Todas as medidas em `rem`, tokens no `:root` de `style.css`
- Tipografia: Manrope em uma família só, com tracking fechado nos títulos e no tipo fantasma
- Paleta (adaptada do PDF "Paleta — LP Verde Sálvia"): verde sálvia `#3F5143` (ação, navbar, blocos de seção), areia `#F5F2EB` (fundo), terracota `#C2703D` (ícones, badges e números de destaque), grafite esverdeado `#1C2320` (texto)
- Tons derivados: areia clara `#FAF8F3`, areia média `#EFEADE`, areia escura `#E6E0D1`, verde escuro `#324135` (hover), rodapé `#26302A`, texto suave `#57625A`
- Proporção da paleta: 60% areia, 25% verde, 10% grafite, 5% terracota
- Breakpoints: 48rem (768px), 64rem (1024px), 90rem (1440px)

## Pendências antes de publicar

1. **Retrato.** `sobre-ana-flavia` é a foto real da Ana Flávia, recortada em 4:5 a partir do original de 1024x1038 (830x1038, 1,85x a moldura de 448x560 do desktop)
2. **Testar o link no celular.** O número é `+55 43 99681-1409`, confirmado pela cliente em 18/09/2026 (antes estava sem o nono dígito). Abrir o site publicado e conferir se o WhatsApp encontra o contato
3. **Domínio próprio.** Hoje o site usa o subdomínio da Vercel, `anaflaviavet.vercel.app`, já refletido em `canonical`, `og:url`, `og:image` e no JSON-LD. Se a cliente registrar um domínio, trocar nesses cinco pontos e apontar o DNS na Vercel
4. **Nome completo e ano de formação.** A página usa "Ana Flávia" e "Medicina Veterinária - UEL". Acrescentar sobrenome e ano de conclusão, se ela quiser
5. **Área de atendimento.** A seção "Área de atendimento" foi removida a pedido da cliente. A cidade continua no schema, no rodapé e na tarja do cabeçalho. As fotos `area-casa` e `area-pet` saíram de `assets/img/` em 18/09/2026 e seguem recuperáveis no commit `1d20425`
6. **Horário de atendimento.** Não informado, então ficou fora da página e do schema. Se houver horário fixo, incluir nos dois

## Créditos das fotos

Fotos do [Pexels](https://www.pexels.com/license/), licença livre para uso comercial, sem atribuição obrigatória. Recortadas e comprimidas para o projeto.

| Arquivo | Foto no Pexels |
|---|---|
| `hero` (desktop) | imagem enviada pela cliente |
| `hero-mobile` | imagem enviada pela cliente |
| `diferencial-transporte` | [20247767](https://www.pexels.com/photo/20247767/) |
| `diferencial-idosos` | [9361153](https://www.pexels.com/photo/9361153/) |
| `diferencial-varios` | [27806137](https://www.pexels.com/photo/27806137/) |
| `processo-agenda` | [5255523](https://www.pexels.com/photo/5255523/) |
| `processo-visita` | [6235654](https://www.pexels.com/photo/6235654/) |
| `sobre-ana-flavia` | imagem enviada pela cliente |
| `agendar-pet` | [26756562](https://www.pexels.com/photo/26756562/) |
| `marca-casa` (gif e png) | animação enviada pela cliente |

`og.jpg` continua sendo a arte gerada com nome e CRMV, que funciona melhor na prévia de link do WhatsApp.

`marca-casa.gif` é o logotipo animado da cliente, recortado na caixa útil e reduzido para 96x76 com paleta global de 15 cores (47 KB, 41 quadros). Entra como `background-image` da marca do rodapé e só é baixado dentro de `@media (prefers-reduced-motion: no-preference)`; quem pede menos movimento recebe `marca-casa.png`, o quadro de repouso.

## Links externos

- Consulta de registro: `https://app.cfmv.gov.br/paginas/busca`, a busca pública nacional do CFMV. O domínio `crmvpr.org.br`, usado antes, não existe no DNS; o site do conselho paranaense fica em `crmv-pr.org.br` e aponta para essa mesma busca

## Publicar

Crie o repositório vazio no GitHub e rode, dentro desta pasta:

```bash
git init
git add .
git commit -m "primeira versão da página"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ana-flavia-vet.git
git push -u origin main
```

Na Vercel: Add New → Project → importar o repositório, Framework Preset **Other**, sem Build Command. A cada `git push` na `main` o deploy acontece sozinho.
