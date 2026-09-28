# Ana Flávia · Médica veterinária

Landing page one-page de atendimento veterinário domiciliar para cães e gatos em Londrina-PR (CRMV-PR 24567), em HTML, CSS e JavaScript puros.

- No ar em **https://anaflaviavet.vercel.app**
- Repositório `mariafernanda2109-create/anafl-viaveterin-ria` (privado). Cada push na `main` republica sozinho
- Ação única: agendar atendimento domiciliar pelo WhatsApp (43) 99681-1409. Cada serviço abre a conversa com a mensagem já preenchida para aquele serviço
- Perfis: [@anaflavia.veterinaria](https://www.instagram.com/anaflavia.veterinaria) no rodapé; assinatura de [@maferrsantos](https://www.instagram.com/maferrsantos/)
- Animações: GSAP 3.13 + ScrollTrigger via CDN, respeitando `prefers-reduced-motion`
- Sem build, sem dependência instalada, sem backend

## Estrutura

```
index.html
404.html            página de erro, servida pela Vercel em rota inexistente
assets/css/style.css
assets/js/main.js
assets/img/
robots.txt          aponta o sitemap
sitemap.xml
vercel.json         cabeçalhos de segurança
.gitattributes
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
- A hero usa `min-height: min(<altura de desenho>, 100svh)`. O `svh` é a altura do viewport com a barra do navegador aberta, que é o estado da carga: garante que a primeira seção caiba inteira mesmo em celular baixo e em notebook de 1366x768

## Segurança, SEO e medição

Tudo abaixo já está aplicado e verificado em produção.

- `vercel.json` aplica `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` e `Permissions-Policy` em todas as rotas. **A CSP libera só cdnjs (GSAP) e Google Fonts. Script novo de terceiro precisa ser liberado ali, senão o navegador bloqueia**
- Os dois scripts do GSAP têm `integrity` SHA-384: se o cdnjs servir arquivo diferente, o navegador recusa
- Vercel Web Analytics via `/_vercel/insights/script.js`, nas duas páginas. Servido pelo próprio domínio, então a CSP `'self'` já cobre. Não usa cookie — por isso o site segue sem banner e sem obrigação de política de privacidade. Só conta visita; medir clique no CTA exigiria evento personalizado, e aí o stub inline precisaria de hash na CSP
- Google Search Console verificado por meta tag, com propriedade do tipo **prefixo de URL**. A do tipo domínio não serve: exige registro DNS em `vercel.app`, que é da Vercel. Sitemap enviado
- `sitemap.xml`, o `canonical` e o endereço real são a mesma string, com `https`, sem `www` e com barra final
- Ícones: `favicon.svg` e `favicon.ico` trazem a casa simplificada, sem os bichos, que é o que se lê em 16px; `apple-touch-icon.png` traz o logotipo inteiro em 180x180
- CTA fixo no mobile, entre a saída da hero e a chegada do CTA final, para o botão não sumir dentro do menu sanduíche

## O que falta

### Depende da cliente

1. **Testar o link do WhatsApp num celular.** Único item nunca verificado de ponta a ponta. Os 11 links apontam para `5543996811409`, mas só o aparelho confirma se existe conta nesse número. É o CTA único do site
2. **Horário de atendimento.** Não informado, então ficou fora da página e do schema. Se houver horário fixo, incluir nos dois — ajuda no resultado local
3. **Sobrenome e ano de formação.** A página usa "Ana Flávia" e "Medicina Veterinária - UEL". Acrescentar dá mais peso à credencial
4. **Endereço.** O schema declara só Londrina-PR, sem logradouro. Defensável para atendimento domiciliar, mas se houver endereço comercial vale usar o campo de área de atendimento do schema

### Decisões em aberto

5. **Política de privacidade e termos de uso.** Sem formulário, sem cookie e com analytics sem cookie, não há obrigação legal clara. Cuidado com template genérico: a Ana Flávia é profissional de saúde registrada, e o CFMV regula publicidade veterinária. Um texto curto e honesto — "este site não coleta dados" — corresponde à realidade
6. **Monitoramento de uptime.** A Vercel avisa se o deploy falhar, não se o site cair depois. Um monitor externo gratuito resolve
7. **Domínio próprio.** Hoje é o subdomínio da Vercel, já refletido em `canonical`, `og:url`, `og:image` e nos dois JSON-LD. Se a cliente registrar um domínio, trocar nesses cinco pontos e apontar o DNS na Vercel

### Só acompanhar

8. **Indexação.** Leva de alguns dias a duas semanas. Se depois de uma semana a home ainda constar como não indexada em **Páginas**, no Search Console, vale investigar

## Histórico de decisões

Registro do que mudou e por quê, para não se repetir a investigação.

- A seção "Área de atendimento" foi removida a pedido da cliente. A cidade continua no schema, no rodapé e na tarja do cabeçalho. As fotos `area-casa` e `area-pet` saíram em 18/09/2026 e seguem recuperáveis no commit `1d20425`
- O número do WhatsApp estava sem o nono dígito. Corrigido para `+55 43 99681-1409` em 18/09/2026, confirmado pela cliente
- O botão do CRMV apontava para `crmvpr.org.br`, que não existe no DNS. O conselho paranaense fica em `crmv-pr.org.br` e manda para a busca pública nacional do CFMV, que é o destino usado hoje: `https://app.cfmv.gov.br/paginas/busca`
- O projeto na Vercel chama `anaflaviavet`, diferente do nome do repositório. O nome do projeto é o que define o domínio
- Habilitar o Web Analytics no painel só injeta as rotas `/_vercel/insights/*` em deploys feitos **depois**. Se o script responder 404, force um redeploy

## Créditos das fotos

Fotos do [Pexels](https://www.pexels.com/license/), licença livre para uso comercial, sem atribuição obrigatória. Recortadas e comprimidas para o projeto.

| Arquivo | Origem |
|---|---|
| `hero` (desktop) | imagem enviada pela cliente |
| `hero-mobile` | imagem enviada pela cliente |
| `sobre-ana-flavia` | imagem enviada pela cliente |
| `marca-casa` (gif e png) | animação enviada pela cliente |
| `diferencial-transporte` | [20247767](https://www.pexels.com/photo/20247767/) |
| `diferencial-idosos` | [9361153](https://www.pexels.com/photo/9361153/) |
| `diferencial-varios` | [27806137](https://www.pexels.com/photo/27806137/) |
| `processo-agenda` | [5255523](https://www.pexels.com/photo/5255523/) |
| `processo-visita` | [6235654](https://www.pexels.com/photo/6235654/) |
| `agendar-pet` | [26756562](https://www.pexels.com/photo/26756562/) |

`og.jpg` é a arte gerada com nome e CRMV, 1200x630, que funciona melhor na prévia de link do WhatsApp.

`sobre-ana-flavia` é recortada em 4:5 a partir do original de 1024x1038, saindo em 830x1038 — 1,85x a moldura de 448x560 do desktop.

`marca-casa.gif` é o logotipo animado da cliente, recortado na caixa útil e reduzido para 96x76 com paleta global de 15 cores (47 KB, 41 quadros). Entra como `background-image` da marca no cabeçalho e no rodapé, e só é baixado dentro de `@media (prefers-reduced-motion: no-preference)`; quem pede menos movimento recebe `marca-casa.png`, o quadro de repouso.

## Trabalhar no projeto

Site estático: basta abrir `index.html`, ou servir a pasta para o `fetch` do JSON-LD e os caminhos absolutos funcionarem como em produção.

Para publicar uma alteração:

```bash
git add -A
git commit -m "descrição da mudança"
git push
```

A Vercel republica sozinha em cerca de um minuto. Rollback para qualquer deploy anterior é feito no painel, sem depender do git.
