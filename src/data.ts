export type Project = {
  id: string; title: string; titleSuffix?: string; description: string; skills: string;
  image: string; imageAlt: string; path: string; year: string; visible: boolean;
};
export const projects: Project[] = [{
  id: 'caloriflix', title: 'Caloriflix', year: '2025',
  description: 'Um site para apresentar um aplicativo que usa inteligência artificial no acompanhamento alimentar. O desafio era explicar como o produto funciona, destacar suas funcionalidades e facilitar o caminho até o download.',
  skills: 'UI Design · Web Experience · Framer',
  image: '/images/caloriflix/hero.webp',
  imageAlt: 'Website Caloriflix: apresentação do aplicativo em desktop e mobile.',
  path: '/projetos/caloriflix', visible: true,
}, {
  id: 'santa-maria', title: 'Santa Maria', titleSuffix: '.', year: '2025',
  description: 'Uma nova identidade, um novo momento para a marca. O projeto levou essa mudança para o ambiente digital, com uma interface mais consistente, navegação objetiva e uma apresentação mais clara dos empreendimentos.',
  skills: 'UI Design · Website · Redesign',
  image: '/images/santa-maria/home.webp',
  imageAlt: 'Website da Santa Maria em desktop e mobile: busca de imóveis e apresentação de empreendimentos.',
  path: '/projetos/santa-maria', visible: true,
}, {
  id: 'discover', title: 'Discover', titleSuffix: '.', year: '2023',
  description: 'Uma nova página para apresentar o curso gratuito de programação da Rocketseat. O redesign trouxe mais clareza para o conteúdo, melhor organização das informações e uma experiência pensada para facilitar a inscrição.',
  skills: 'UI Design · Landing Page · Redesign',
  image: '/images/discover/hero.webp',
  imageAlt: 'Hero original da landing page Discover da Rocketseat, com apresentação do curso gratuito e chamada para criar uma conta.',
  path: '/projetos/discover', visible: true,
}];
export const contactDetails = {
  email: 'gabriel@feitojunto.com',
  whatsapp: { display: '(11) 4689-8620', href: 'https://wa.me/551146898620' },
};
export const contactLinks: { label: string; href: string }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gabriel-cruz-09367b1a1/' }, { label: 'Behance', href: 'https://www.behance.net/gabrielcruz9' },
  { label: 'E-mail', href: `mailto:${contactDetails.email}` }, { label: 'Currículo', href: '/gabriel-cruz-curriculo.pdf' },
];
export const skillAreas = [
  { title: 'Design', items: ['Product Design', 'UX/UI Design', 'Design Systems', 'Prototipação', 'Arquitetura da Informação', 'Design de Interação'] },
  { title: 'Desenvolvimento Web', items: ['Front-end', 'Back-end', 'Desenvolvimento Full-Stack', 'React', 'TypeScript'] },
  { title: 'Desenvolvimento Mobile', items: ['Desenvolvimento de aplicativos', 'Flutter', 'Interfaces mobile', 'Integração com APIs'] },
];
export const caloriflix = {
  subtitle: 'Uma apresentação mais clara para um aplicativo de alimentação.',
  intro: 'O Caloriflix utiliza inteligência artificial para facilitar o registro de refeições, calcular calorias e acompanhar metas alimentares. O trabalho foi criar um website que apresentasse essas funcionalidades de forma simples e ajudasse as pessoas a conhecer o aplicativo.',
  facts: [ ['Projeto', 'Caloriflix'], ['Ano', '2025'], ['Duração', '30 dias'], ['Atuação', 'UI Design / Web Experience'], ['Equipe', 'Trabalho em colaboração com o time'] ],
  context: {
    title: 'Antes de usar, é preciso entender.',
    paragraphs: ['O Caloriflix reúne diferentes funcionalidades para ajudar no acompanhamento alimentar. Mas, para quem ainda não conhece o aplicativo, essas possibilidades precisam ser apresentadas de maneira clara.', 'O website tinha esse papel: mostrar o que o produto oferece, explicar seus principais recursos e criar um caminho simples para quem deseja começar a usar.'],
  },
  challenge: {
    title: 'Explicar o produto sem complicar a experiência.',
    paragraphs: ['O desafio não era apenas criar uma página visualmente interessante. Era organizar as informações para que o visitante entendesse rapidamente a proposta do aplicativo.', 'A estrutura precisava apresentar os benefícios, mostrar as funcionalidades e manter o download acessível ao longo da navegação.'],
    objectives: ['Clareza na comunicação.', 'Organização das informações.', 'Facilidade de acesso ao aplicativo.'],
  },
  process: {
    title: 'Da ideia à interface.',
    paragraphs: ['O projeto passou por etapas de entendimento, organização do conteúdo, exploração visual e construção da interface. Cada decisão precisava ajudar a apresentar o produto de forma mais direta.'],
    steps: [ ['Descoberta', 'Briefing, pesquisa e entendimento do projeto.'], ['Ideação', 'Referências, organização do conteúdo, wireframes e copy.'], ['Prototipação', 'Exploração visual, protótipos e ajustes de interface.'], ['Entrega', 'Página final, documentação e style guide.'] ],
  },
  interface: {
    title: 'Uma página pensada para mostrar o produto.',
    paragraphs: ['A interface combina apresentação das funcionalidades, recursos visuais e chamadas para download. O conteúdo foi organizado para que cada seção ajudasse o visitante a entender um pouco mais sobre o aplicativo, sem perder de vista a ação principal.'],
  },
  system: {
    title: 'Consistência também faz parte da entrega.',
    paragraphs: ['Além da interface, o projeto contou com um style guide para documentar os principais elementos visuais e facilitar sua aplicação em novas páginas e materiais do produto.'],
  },
  delivery: {
    title: 'Do conceito à página final.',
    paragraphs: ['O resultado foi um website que reúne a apresentação do Caloriflix em uma experiência única, com navegação direta, informações organizadas e chamadas para download distribuídas ao longo da página.'],
  },
};
export const caseImages = {
  hero: { src: '/images/caloriflix/hero.webp', alt: 'Hero do website Caloriflix em desktop e mobile, com apresentação do aplicativo e botões de download.' },
  overview: { src: '/images/caloriflix/overview.webp', alt: 'Visão geral das seções do website Caloriflix: apresentação, funcionamento, benefícios e perguntas frequentes.' },
  wireframes: { src: '/images/caloriflix/wireframes.webp', alt: 'Wireframes reais do Caloriflix com estrutura de conteúdo, funcionalidades e chamadas para download.' },
  responsive: { src: '/images/caloriflix/responsive.webp', alt: 'Versões mobile do Caloriflix: apresentação, funcionalidades, benefícios e encerramento.' },
  typography: { src: '/images/caloriflix/typography.webp', alt: 'Style guide original do Caloriflix: tipografia Manrope, hierarquias e estilos de texto.' },
  colors: { src: '/images/caloriflix/colors.webp', alt: 'Style guide original do Caloriflix: paletas principal, neutra e de apoio.' },
  components: { src: '/images/caloriflix/components.webp', alt: 'Style guide original do Caloriflix: botões, marca e grids para desktop, tablet e celular.' },
  delivery: { src: '/images/caloriflix/delivery.webp', alt: 'Seção final do website Caloriflix com chamadas para download e rodapé.' },
};
