import {
  TimelineEvent,
  GalleryImage,
  LoveLetter,
  FamilyMember,
  LoveReason,
} from "./types";

// Import local images from assets
import robert from "./assets/images/robert.webp";
import maria from "./assets/images/maria.webp";
import isis from "./assets/images/isis.webp";
import isis1 from "./assets/images/isis1.webp";

import O_pedido from "./assets/images/o_pedido.webp";
import O_pedido_casamento from "./assets/images/o_pedido_casamento.webp";
import casamento from "./assets/images/casamento.webp";
import nos_conhecemos from "./assets/images/nos_conhecemos.webp";

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    year: "10/02/2018", // Ajustado para o padrão DD/MM/AAAA
    title: "Como nos Conhecemos",
    description:
      "O início de tudo. Foi naquele retiro que descobri que você era a mulher da minha vida. Conhecer a sua história, o seu caráter e o seu amor por Jesus fez o meus olhos brilharem",
    imageUrl: nos_conhecemos,
    tag: "O Início",
  },
  {
    id: "2",
    year: "24/05/2018",
    title: "O Pedido de Namoro",
    description:
      "Um dia muito especial que mudou o rumo da minha vida para sempre. O momento em que você aceitou segurar a minha mão e se tornou a minha primeira e única namorada.",
    imageUrl: O_pedido,
    tag: "O Pedido",
  },
  {
    id: "3",
    year: "04/11/2018",
    title: "O Sim (O Pedido de Casamento)",
    description:
      "O coração acelerado, o pedido de joelhos e a promessa de uma vida inteira juntos.",
    imageUrl: O_pedido_casamento,
    tag: "O Grande Sim",
  },
  {
    id: "4",
    year: "15/06/2019",
    title: "O Nosso Casamento",
    description:
      "Promessas eternas sob o olhar de Deus e de quem a gente mais ama. O dia mais importante das nossas vidas e o início da nossa união sagrada! O momento em que viramos uma só carne, unindo nossos corações e propósitos para sempre.",
    imageUrl: casamento,
    tag: "O GRANDE DIA",
  },
  {
    id: "5",
    year: "15/09/2022",
    title: "A Chegada da nossa Filha",
    description:
      "O amor puro que transbordou e ganhou nome, rosto e o sorriso mais lindo que já vimos. Nossa vida ganhou uma nova centralidade, um significado completo e indescritível.",
    imageUrl: isis,
    tag: "Nosso Milagre",
  },
];

export const INITIAL_LOVE_LETTERS: LoveLetter[] = [
  {
    id: "letter-1",
    sender: "Ele",
    recipient: "Ela",
    title: "Seis anos e 11 meses do Melhor Sim da Minha Vida",
    content: `minha eterna namorada,

Olhando para trás, ao contemplar esses quase sete anos de casados e oito anos juntos, meu coração transborda de alegria. Construímos muito mais do que um lar; nós erguemos um altar ao Senhor. E, a cada novo dia, seguimos firmes na busca por mais paz, amor e companheirismo.

Obrigado por ser essa esposa sábia e companheira, que tem edificado a nossa casa. Você tem sido uma ótima esposa e a mãe mais incrível desse mundo: atenciosa, carinhosa e detalhista, mais do que a nossa filha poderia sonhar em ter. Cada sorriso ao seu lado, cada momento que passamos juntos e até as batalhas que superamos só serviram para nos fortalecer e blindar o nosso matrimônio.

O desejo do meu coração é continuar te escolhendo todos os dias, nas batalhas e nas vitórias. Prometo cuidar do seu coração como o meu bem mais precioso. Que Deus nos conceda muitos e muitos anos juntos, abençoando e sustentando o nosso amor.

Com todo o meu amor, para sempre, do seu eterno companheiro.`,
    date: "12 de Junho de 2026",
    theme: "cream",
    stamp: "heart",
  },
];

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "fam1",
    name: "Robert",
    role: "Esposo, Companheiro e Protetor",
    quote:
      "Ver você feliz é o combustível que me faz buscar ser um homem melhor a cada amanhecer.",
    favoriteThings: [
      "Café preto forte e quente",
      "Tocar violão no fim de tarde e te ouvir cantar",
      "Caminhadas relaxantes de mãos dadas",
      "Ficar olhando vocês duas dormirem",
    ],
    imageUrl: robert,
  },
  {
    id: "fam2",
    name: "Maria",
    role: "Esposa, Mãe e Coração do Lar",
    quote:
      "Nosso amor não é perfeito, mas é de verdade, construído com paciência, perdão e muito carinho.",
    favoriteThings: [
      "Assistir séries grudada debaixo do cobertor",
      "Cheiro de flores colhidas no jardim",
      "Risada solta da nossa filha",
      "Abraços de urso logo cedo",
    ],
    imageUrl: maria,
  },
  {
    id: "fam3",
    name: "Nossa Princesa",
    role: "Filha Amada e Nossa maior Alegria",
    quote:
      "O riso que ilumina os cômodos de nossa casa e nos ensina o verdadeiro significado da pureza.",
    favoriteThings: [
      "Brincar de esconde-esconde no quintal",
      "Ouvir historinhas contadas imitando vozes",
      "Passear no parque de mãos dadas",
      "Dormir no meio do papai e da mamãe",
    ],
    imageUrl: isis1,
  },
];

export const INITIAL_LOVE_REASONS: LoveReason[] = [
  {
    id: "r1",
    text: "Pela forma corajosa com que você encara a vida física e emocionalmente.",
    category: "Força",
  },
  {
    id: "r2",
    text: "Seu sorriso puro, que acalma instantaneamente qualquer tempestade no meu peito.",
    category: "Sorriso",
  },
  {
    id: "r3",
    text: "Pelo cuidado milimétrico e carinho indescritível que você dedica à nossa filha amada.",
    category: "Família",
  },
  {
    id: "r4",
    text: "Pelo seu cheiro doce que fica gravado nos meus casacos todas as vezes que nos abraçamos.",
    category: "Intimidade",
  },
  {
    id: "r5",
    text: "O jeito fofo que você gesticula com as mãos quando está contando algo muito empolgada.",
    category: "Detalhes",
  },
  {
    id: "r6",
    text: "Sua resiliência inabalável e o modo como me incentiva a crescer e a ser um homem honrado.",
    category: "Apoio",
  },
  {
    id: "r7",
    text: "Pela cumplicidade de fazer piadas que só nós dois entendemos no meio de uma roda de conversa.",
    category: "Amizade",
  },
  {
    id: "r8",
    text: "Deitar no seu colo e sentir sua mão fazendo carinho na minha cabeça até eu adormecer.",
    category: "Carinho",
  },
  {
    id: "r9",
    text: "A tranquilidade de saber que, não importa onde eu esteja, meu coração tem um rumo e um lar.",
    category: "Segurança",
  },
];
