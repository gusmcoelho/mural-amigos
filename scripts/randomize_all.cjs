const fs = require('fs');
const path = require('path');

const friendsPath = path.resolve(__dirname, '../src/data/friends.js');

const content = fs.readFileSync(friendsPath, 'utf-8');
const jsonMatch = content.match(/export const friends = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  console.error("Could not find friends array in friends.js");
  process.exit(1);
}

const friends = JSON.parse(jsonMatch[1]);
console.log(`Loaded ${friends.length} friends.`);

const normalHintsPool = [
  "Quatro últimos dígitos do meu telefone fixo antigo",
  "Número da casa onde eu morava antigamente",
  "Os 4 últimos dígitos da placa do meu primeiro carro",
  "O ano em que terminei o ensino fundamental",
  "O código do armário que eu usava na escola",
  "A senha do Wi-Fi que tinha na casa dos meus pais",
  "O número do meu primeiro quarto de hotel em viagem",
  "O ano em que entrei no meu primeiro emprego",
  "Os 4 dígitos que eu sempre colocava no cadeado da mala",
  "O ano em que tirei minha carteira de motorista",
  "Código de identificação do meu primeiro crachá",
  "Número do apartamento onde passei as férias de 2021",
  "Os 4 últimos dígitos da matrícula da minha antiga escola",
  "O ano em que comprei meu primeiro computador",
  "Número do box da garagem onde eu estacionava",
  "Os 4 números da senha que eu usava no computador antigo",
  "O ano em que me mudei de bairro pela primeira vez",
  "Código do portão eletrônico da casa de praia",
  "Os 4 dígitos que eu usava no cartão de transporte",
  "Número do assento do cinema no meu filme favorito",
  "Os 4 dígitos do código postal da minha antiga rua",
  "Número do voo da minha primeira viagem interestadual",
  "Ano em que ganhei meu primeiro videogame",
  "O código do alarme da minha antiga casa",
  "Número da sala onde fiz minha primeira prova importante",
  "Ano do meu primeiro show de música ao vivo",
  "Os 4 números que sempre jogava no bolão",
  "Número do quiosque que eu sempre frequentava na praia",
  "Os 4 dígitos que estavam gravados na chave reserva de casa",
  "Número do armário da academia que eu sempre pegava",
  "Ano da reforma da minha antiga casa",
  "Os 4 números da rota de ônibus que eu pegava todo dia",
  "Código do interfone do prédio onde morei",
  "Os 4 dígitos finais do código de barras da minha primeira compra",
  "Número do quarto onde fiquei na minha última viagem",
  "Ano em que comprei meu primeiro celular",
  "Os 4 últimos dígitos do cartão da biblioteca que eu frequentava",
  "Número da baia de trabalho no meu primeiro estágio",
  "Código do cadeado da minha bicicleta antiga",
  "O ano em que comecei a dirigir sozinho",
  "Número do prédio onde fiz meu primeiro curso",
  "Os 4 dígitos finais do contrato de aluguel antigo",
  "Número do armário do clube que eu frequentava",
  "O ano em que montei meu primeiro quarto sozinho",
  "Código que eu usava no cofre do antigo quarto",
  "Os 4 últimos números da carteirinha de estudante antiga",
  "Número da placa de trânsito que ficava em frente à minha casa",
  "Ano em que participei do meu primeiro torneio",
  "Os 4 dígitos da senha padrão do meu antigo modem",
  "Número do bilhete daquele voo que atrasou horas"
];

// Carinhosas, humanas, sem emojis e variadas
const friendlyMessages = [
  (name) => `cara, você achou! fico feliz de ver seu nome aqui, sério, você importa pra mim`,
  (name) => `${name} conseguiu! sempre soube que ia dar conta. obrigado por fazer parte da minha vida`,
  (name) => `passou! você não imagina o quanto eu gosto de você como pessoa`,
  (name) => `achou a senha ${name}. de verdade, você é uma das pessoas que eu guardo com carinho`,
  (name) => `${name}! fico tão feliz de te ter por aqui. obrigado por ser quem você é`,
  (name) => `conseguiu né. a gente não se fala tanto quanto deveria mas eu penso em você sim`,
  (name) => `entrou no mural, ${name}. cada lembrança que tenho com você é boa, sabia?`,
  (name) => `achou! tem poucas pessoas que me fazem sentir do jeito que você me faz, fico grato de te conhecer`,
  (name) => `${name} acertou! você torna meus dias mais leves só de existir, obrigado por estar na minha vida`,
  (name) => `passou! você é do tipo raro sabe. fico feliz quando a gente se encontra, sempre parece pouco`,
  (name) => `cara, achei que ia demorar mais kkk. mas você aí, isso que importa, obrigado por tudo`,
  (name) => `${name}! entrou. você é uma das pessoas que ficam na memória da gente, do jeito bom`,
  (name) => `acertou. não sei se você sabe mas você importa de verdade pra mim, não é papo`,
  (name) => `passou! a gente precisa se ver mais. fico com saudade das nossas conversas quando a gente some`,
  (name) => `${name} descobriu! obrigado por sempre estar por perto quando eu precisei, você faz diferença`,
  (name) => `achou a senha! você faz parte de uma fase muito boa da minha vida, obrigado`,
  (name) => `entrou, ${name}. tem gente que entra na vida da gente e muda tudo sem nem perceber, você é uma delas`,
  (name) => `conseguiu! cada vez que a gente se vê eu fico mais feliz de te conhecer, sério`,
  (name) => `${name} acertou! você não faz ideia do quanto já me ajudou só sendo você mesmo`,
  (name) => `passou. fico feliz de você existir do jeito que você existe, de verdade`,
  (name) => `achou! obrigado por cada momento bom que já tivemos, espero que a gente tenha muito mais`,
  (name) => `${name}! conseguiu. você é do tipo de pessoa que a gente se arrepende de não dar mais valor enquanto está perto`,
  (name) => `entrou no mural! obrigado por tudo que você já fez por mim, mesmo sem perceber que estava fazendo`,
  (name) => `acertou, ${name}. você é uma das pessoas que eu mais gosto de ver feliz`,
  (name) => `passou! não precisa de muito pra perceber o quanto você é especial, obrigado por estar aqui`,
  (name) => `cara, ${name} conseguiu! fico contente de ter você na minha vida, faz diferença saber que você está por aí`,
  (name) => `achou a senha. você é incrível do jeito que você é, espero que saiba disso`,
  (name) => `${name} entrou! obrigado por cada vez que você esteve presente quando eu precisei`,
  (name) => `passou! você é o tipo de amigo que a gente não troca por nada, obrigado por ser assim`,
  (name) => `acertou. tem coisa que a gente não fala mas sente, e eu sinto muito carinho por você`,
  (name) => `${name} descobriu! fico feliz toda vez que a gente se encontra, sempre é bom demais`,
  (name) => `conseguiu né ${name}. obrigado por fazer parte dessa fase da minha vida`,
  (name) => `entrou! você é uma das pessoas mais legais que eu conheço, e não tô falando por falar`,
  (name) => `achou! ${name}, fico feliz de você estar aqui. você importa pra mim de um jeito que é difícil explicar`,
  (name) => `passou. obrigado por ser uma presença boa na minha vida, isso não é pequena coisa`,
  (name) => `${name} acertou! você é especial e eu espero que a gente continue se encontrando pela vida`,
  (name) => `conseguiu! tem gente que a gente olha e sabe que é parceria de verdade, você é assim`,
  (name) => `achou a senha ${name}! obrigado por todas as vezes que você me fez sorrir sem nem tentar`,
  (name) => `entrou, ${name}. você é uma pessoa que deixa saudade quando some, e isso diz tudo`,
  (name) => `passou! de verdade, obrigado por existir e por cruzar o meu caminho`,
  (name) => `${name} acertou! fico feliz de ter alguém como você na minha vida, obrigado por tudo`,
  (name) => `conseguiu. tem gente que aparece e faz tudo fazer mais sentido, você é assim pra mim`,
  (name) => `achou! ${name}, você é uma das pessoas que eu mais tenho carinho, sério mesmo`,
  (name) => `entrou no mural! obrigado por ser presente do jeito que você é, faz diferença`,
  (name) => `passou, ${name}. você é do tipo de pessoa que a gente quer ter por perto pra sempre`,
  (name) => `acertou! você não sabe mas você torna minha vida melhor só de estar nela`,
  (name) => `${name} conseguiu! obrigado por tudo, por cada conversa, cada momento, cada risada`,
  (name) => `achou a senha! você é uma das pessoas que eu mais gosto de ter por perto, obrigado`,
  (name) => `entrou! ${name}, fico feliz que você exista do jeito que você é, não muda não`,
  (name) => `passou. obrigado por sempre ser você mesmo comigo, isso é mais raro do que parece`,
  (name) => `${name} acertou! cada vez que a gente se vê parece que não passou tempo nenhum, é bom demais`
];

// STRICT OVERRIDE FOR KAUÃ PUGLIESE (boyfriend)
const overrides = {
  'kpugliess': {
    password: "020506",
    hint: "Data do meu aniversário completa com o ano 😬 (dia, mês e ano, ex: 16/08/06 = 160806)",
    type: "image",
    content: "/fotos/rewards/kaua.png",
    message: "Kauã, obrigado por ser essa pessoa incrível que você é. A cada dia que passa, fico mais feliz de você ter entrado tanto assim na minha vida esse ano. Eu gosto muuuuuuuuito de você! ♡\n\nQue as nossas memórias fiquem pra sempre na minha mente... desde a Geórgia expulsando a gente da casa dela até as nossas noites no carro, bebendo, cantando e se beijando. São momentos que eu vou guardar com muito carinho.\n\nE você é dono do abraço mais gostoso que eu já recebi. Inclusive, eu não consigo mais escutar Beyoncé sem lembrar de você KKKKK. E, pra falar a verdade, tô doido pra dar um beijo nessa sua boca gostosa de novo.\n\nObrigado por ser quem você é e por ter feito esse ano ser muito mais especial pra mim. ♡"
  },
  'z4rthurr': {
    password: "020506",
    hint: "Data do meu aniversário completa com o ano 😬 (dia, mês e ano, ex: 16/08/06 = 160806)",
    message: "oi migo seu lindo saudades, nunca vou esquecer dos nossos roles com a dani e idas no repp te adoro muito lindo"
  },
  'ph4_br': {
    password: "020506",
    hint: "Data do meu aniversário completa com o ano 😬 (dia, mês e ano, ex: 16/08/06 = 160806)",
    message: "oii ph seu lindo, adoro muito sua amizade, te amo tanto, saudades de ir no rep com você, vc é uma das se não a melhor pessoa que eu conheço, tee amo"
  },
  'fecoppola_': {
    password: "020506",
    hint: "Data do meu aniversário completa com o ano 😬 (dia, mês e ano, ex: 16/08/06 = 160806)",
    message: "oi fe, eu gosto muito da sua amizade, minha amizade mais duradoura eu te amo obrigado por ser meu best, as vezes vc surta e se passa de louco mas vc é uma das minhas pessoas favoritas mesmo eu nao demonstrando tanto"
  },
  '_kauan.dias': {
    password: "020506",
    hint: "Data do meu aniversário completa com o ano 😬 (dia, mês e ano, ex: 16/08/06 = 160806)",
    message: "Oi amigo, eu te amo, obrigado por ser meu amigo inteligente legal bonito nao ser falso comigo, vc é muito mulherengo mas eu te adoro muito obrigado por nao ser homofobico e me aceitar do jeito que sou"
  },
  'ester_suzuki13': {
    password: "0410",
    hint: "O dia que você vai votar no Lula no primeiro turno (DDMM)",
    message: "Oi amiga, você é muito bonita, saudades de você, queria te agradecer por ter me ajudado na situação que passei com o Kauã, te considero muito, se precisar de mim pra algo qualquer dia pode me chamar, fiquei muito feliz de ver você namorando porquê você merece muito ser felizzzz, beijo sua linda"
  },
  'off.flores__': {
    password: "0410",
    hint: "O dia que você vai votar no Lula no primeiro turno (DDMM)",
    message: "Oi Val, você é muito linda, saudades, cheirosa, adoro te encontrar nos roles c o kauã, um beijo na sua bochecha e um abraço te erguendo pro alto!!"
  }
};

// Gerador de senhas difíceis e imprevisíveis de 4 dígitos
function generateHardCode(seed) {
  const s = (seed * 8121 + 28411) % 134456;
  const num = (s % 9000) + 1000;
  return num.toString();
}

const updatedFriends = friends.map((f, i) => {
  // STRICTLY preserve Kauã Pugliese
  if (overrides[f.instagram]) {
    const o = overrides[f.instagram];
    return {
      ...f,
      password: o.password,
      hint: o.hint,
      reward: {
        type: o.type || "text",
        content: o.content || undefined,
        message: o.message
      }
    };
  }

  const hint = "Data do meu aniversário completa com o ano 😬 (dia, mês e ano, ex: 16/08/06 = 160806)";
  const password = "020506";
  const msgGen = friendlyMessages[i % friendlyMessages.length];

  return {
    ...f,
    password: password,
    hint: hint,
    reward: {
      type: "text",
      message: msgGen(f.name)
    }
  };
});

const header = `/* ============================================================
   ✏️  AQUI É O ÚNICO LUGAR QUE VOCÊ PRECISA EDITAR  ✏️
   Uma linha de objeto = um amigo. Senhas difíceis e dicas comuns/pessoais.

   - id:        número único (1, 2, 3 ... ${updatedFriends.length})
   - name:      nome que aparece no card
   - instagram: @ sem o "@" (a busca funciona com ou sem @)
   - photo:     "/fotos/nome.jpg" (arquivo dentro de public/fotos/)
   - password:  dígitos da senha
   - hint:      pergunta/dica
   - reward.message: mensagem personalizada ao acertar
   - reward.type:    "text" | "image" | "images" | "gif" | "video"
   - reward.content: caminho do arquivo (ou lista de caminhos para "images")
   ============================================================ */\n\n`;

const outContent = header + 'export const friends = ' + JSON.stringify(updatedFriends, null, 2) + ';\n';
fs.writeFileSync(friendsPath, outContent, 'utf-8');

console.log(`Successfully updated ${updatedFriends.length} friends with normal hints, hard codes and non-romantic messages!`);
