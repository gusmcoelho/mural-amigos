const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../public/fotos');
const excludeSet = new Set(['alvessssz.0f.jpg', '_xdp_458_.jpg', 'jujux_xiss.jpg', 'lz.tmz.jpg']);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !excludeSet.has(f)).sort();


const nameMap = {
  'gusmcoelho': 'Gustavo',
  '2vezesfelipe_': 'Felipe',
  '4umeida': 'Almeida',
  'adrielgombatt': 'Adriel Gombatt',
  'alex.mz01': 'Alex',
  'alvessssz.0f': 'Alves',
  'anabfellix': 'Ana Felix',
  'anacstoledo': 'Ana Toledo',
  'arirocha13': 'Ari Rocha',
  'arthur_zty': 'Arthur',
  'beto._.018': 'Beto',
  'by.madux': 'Madu',
  'ccauansouza': 'Cauan Souza',
  'cristiangbrl': 'Cristian Gabriel',
  'dailyluyzz': 'Luiz',
  'daviiivad': 'Davi',
  'dix.zafret': 'Zafret',
  'dixuriell': 'Uriel',
  'drawand0': 'Drawando',
  'drogaehogab': 'Gabriel',
  'dudasdaily.s': 'Duda',
  'e.alvessz': 'E. Alves',
  'eduuardoopereiraa': 'Eduardo Pereira',
  'eojaobbz_': 'João',
  'esqzofrn.gravesevera': 'Esqzofrn',
  'estabanardo': 'Bernardo',
  'ester_suzuki13': 'Ester Suzuki',
  'euamanda_moraes': 'Amanda Moraes',
  'euzinhobe': 'Bê',
  'fais_quinhaa': 'Faisquinha',
  'fecoppola_': 'Fê Coppola',
  'felipe_sribeiro': 'Felipe Ribeiro',
  'fofoletttt': 'Fofolet',
  'futurogp': 'Futuro GP',
  'g.diasz5': 'Gabriel Dias',
  'gabrielfranceschet': 'Gabriel Franceschet',
  'gabrielplongo': 'Gabriel Longo',
  'girottobnn': 'Girotto',
  'guiiug.s': 'Guilherme',
  'hcsram': 'Hcsram',
  'hussmateus': 'Mateus Huss',
  'igor_agriao': 'Igor Agrião',
  'ileomz': 'Léo',
  'isabrito.pvd': 'Isa Brito',
  'itsnotmeeeeeee_____': 'Not Me',
  'jaoyz7': 'Jão',
  'jeffersondepiro': 'Jefferson Depiro',
  'jfrancisco_021': 'J. Francisco',
  'joao___matosss': 'João Matos',
  'jujux_x.x': 'Juju',
  'jujux_xiss': 'Juju Xiss',
  'juuh.brito_': 'Ju Brito',
  'kauaf.lima': 'Kauã Lima',
  'kaw_pilan': 'Kaw Pilan',
  'kayckbrazz': 'Kayck Braz',
  'kpugliess': 'Kauã Pugliese',
  'lauramiranda.r': 'Laura Miranda',
  'leo_fraga7': 'Léo Fraga',
  'livsdailyrando': 'Lív',
  'lolovspriv': 'Lolo',
  'lucas.ubirajara018': 'Lucas Ubirajara',
  'lucasgmeira': 'Lucas Meira',
  'lufrancoz': 'Lu Franco',
  'luizalalier_': 'Luiza Lalier',
  'lu_rzss': 'Lu',
  'lvicentez': 'L. Vicente',
  'lz.guiz': 'Gui',
  'lz.tmz': 'Tmz',
  'm4rtin.ty': 'Martin',
  'maah.fr': 'Maah',
  'marcosviniciusg_': 'Marcos Vinicius',
  'marc_piresco': 'Marc Pires',
  'mariaflavia_jardim': 'Maria Flávia Jardim',
  'matheustvs_': 'Matheus',
  'maycezareto': 'May Cezareto',
  'mayquekrlh': 'Mayque',
  'mendezz.priv': 'Mendez',
  'nicomaindot': 'Nico',
  'off.flores__': 'Flores',
  'pedroesquizogato': 'Pedro',
  'pedrorodrigsh': 'Pedro Rodrigues',
  'ph4_br': 'PH',
  'predo.why': 'Pedro',
  'prhelenc': 'Helen',
  'priv._.foxyy': 'Foxyy',
  'privdomahh': 'Mahh',
  'pvd.jops': 'Jops',
  'pvd.lalier': 'Lalier',
  'pvdocultoo': 'Oculto',
  'pvdorianmartins': 'Dorian Martins',
  'ramalhense.pv': 'Ramalhense',
  'raulmanorl': 'Raul Manoel',
  'robertsouzax': 'Robert Souza',
  'smile.biel_9': 'Biel',
  'sofwwng': 'Sofi',
  'sopinhaburra_': 'Sopinha',
  'sx_douguinha': 'Douguinha',
  'tata_xz__': 'Tata',
  'th.sikra': 'Th. Sikra',
  'thamoreiiraa': 'Thaís Moreira',
  'thiagofelipech': 'Thiago Felipe',
  'thiagorodriguessoliv': 'Thiago Rodrigues',
  'thurrz_zz': 'Arthur',
  'thurzanon': 'Arthur Zanon',
  'triiz_granadoo': 'Beatriz Granado',
  'turz.ofc': 'Arthur',
  'twinpeaksg': 'Twin Peaks',
  'victorvieira721': 'Victor Vieira',
  'viitoriaa.gabrielle': 'Vitória Gabrielle',
  'vitor_santxss': 'Vitor Santos',
  'vixtorleite': 'Victor Leite',
  'x.marquesx': 'Marques',
  'xandrooo': 'Xandro',
  'yrafatin': 'Rafa',
  'z4rthurr': 'Arthur',
  '_amauri.junior_': 'Amauri Junior',
  '_augusto.snt': 'Augusto Santos',
  '_costarwx': 'Costa',
  '_erva.daninha': 'Erva Daninha',
  '_gu1lherme1': 'Guilherme',
  '_kauan.dias': 'Kauan Dias',
  '_llenys': 'Llenys',
  '_sanchx': 'Sancho',
  '_siqueiraxx': 'Siqueira',
  '_xdp_458_': 'XDP'
};

function formatHandle(h) {
  if (nameMap[h]) return nameMap[h];
  let clean = h.replace(/^[_.]+/, '').replace(/[_.]+$/, '').replace(/[_.]+/g, ' ');
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

const friends = files.map((file) => {
  const handle = file.replace(/\.jpg$/, '');
  const name = formatHandle(handle);
  const isGustavo = handle === 'gusmcoelho';

  return {
    name,
    instagram: handle,
    photo: '/fotos/' + file,
    password: '1234',
    hint: isGustavo
      ? 'A senha tem a ver com o dia em que nos conhecemos 👀'
      : 'Qual é o nosso código secreto? 🤫 (senha padrão: 1234)',
    reward: {
      type: 'text',
      message: isGustavo
        ? 'Você desbloqueou uma lembrança minha com você ♡ (aqui entra sua mensagem!)'
        : `Oi, ${name}! Você desbloqueou uma lembrança especial do nosso Scrapbook ♡ (edite esta mensagem em friends.js!)`
    }
  };
});

// Sort alphabetically by name (ignoring accents and case)
friends.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));

// Assign sequential IDs
friends.forEach((f, idx) => {
  f.id = idx + 1;
});

const header = `/* ============================================================
   ✏️  AQUI É O ÚNICO LUGAR QUE VOCÊ PRECISA EDITAR  ✏️
   Uma linha de objeto = um amigo. Edite senhas, dicas e recompensas.

   - id:        número único (1, 2, 3 ... ${friends.length})
   - name:      nome que aparece no card
   - instagram: @ sem o "@" (a busca funciona com ou sem @)
   - photo:     "/fotos/nome.jpg" (arquivo dentro de public/fotos/)
   - password:  4 dígitos, entre aspas (ex.: "1234" ou "0705")
   - hint:      a dica personalizada
   - reward.message: mensagem que aparece ao acertar
   - reward.type:    "text" | "image" | "images" | "gif" | "video"
   - reward.content: caminho do arquivo (ou lista de caminhos para "images")
                     ex.: "/fotos/rewards/foto.jpg"
   ============================================================ */\n\n`;

const content = header + 'export const friends = ' + JSON.stringify(friends, null, 2) + ';\n';

const targetPath = path.resolve(__dirname, '../src/data/friends.js');
fs.writeFileSync(targetPath, content, 'utf-8');
console.log(`Successfully generated ${friends.length} friends in ${targetPath}`);
