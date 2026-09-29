# Scrapbook das Senhas ♡

## Rodar
    npm install
    npm run dev        # abre em http://localhost:5173
    npm run build      # gera a pasta dist/ (Vercel/Netlify: build = npm run build, output = dist)

## Onde editar
| O que                     | Onde                                                    |
|---------------------------|---------------------------------------------------------|
| Nome, @, senha, dica, recompensa | `src/data/friends.js` (um bloco por amigo)       |
| Fotos de perfil           | `public/fotos/` → `photo: "/fotos/7.jpg"`               |
| Fotos/GIFs/vídeos de recompensa | `public/fotos/rewards/` → `reward.content`        |
| Cores e fontes            | `src/styles.css` (variáveis no topo)                    |

## Tipos de recompensa
`text` · `image` · `images` (lista) · `gif` · `video` (.mp4)

## Atenção
Senhas ficam dentro do código do site: quem abrir o DevTools consegue ver. Para brincadeira entre amigos funciona bem.
Dica: comprima fotos (~200 KB cada) para o mural carregar rápido no celular.
