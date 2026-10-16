# Gabriel Cruz — Portfólio

Portfólio editorial em dark mode permanente, implementado em React, TypeScript e Tailwind CSS, com Vite e Satoshi hospedada localmente. As cores estão centralizadas em tokens CSS: fundos #09090B, #111113 e #18181B, bordas #27272A, texto #F4F4F5, texto secundário #A1A1AA, texto discreto #71717A e acento pontual #C6FF3D.

## Executar

```sh
npm ci
npm run dev
```

Para revisar a versão de produção:

```sh
npm run build
npm run preview -- --port 5173
```

## Páginas

- `/`: home, com Caloriflix, Santa Maria e Discover nessa ordem.
- `/projetos/caloriflix`: case completo do Caloriflix.
- `/projetos/santa-maria`: case completo da Santa Maria.
- `/projetos/discover`: case completo do Discover, da Rocketseat.

O build gera `index.html` próprio para cada case, com título, descrição e metadados Open Graph específicos. O servidor deve resolver diretórios para `index.html`. O arquivo `_redirects` também fornece as três rotas sem barra final para hospedagens compatíveis.

Caso seja necessário, configure `SITE_ORIGIN` com a origem real da publicação antes de executar o build. O gerador acrescentará URLs canônicas e imagens Open Graph absolutas. Nenhuma URL de produção foi presumida.

## Conteúdo e manutenção

- `src/data.ts`: projetos da home, conteúdo e imagens do Caloriflix, competências e contatos.
- `src/santaMaria.ts`: conteúdo e imagens da Santa Maria.
- `src/discover.ts`: conteúdo, imagens e resultado atribuído do Discover.
- `src/CaseComponents.tsx`: abertura, introduções, imagens, etapas e navegação compartilhadas.
- `src/CasePage.tsx`, `src/SantaMariaPage.tsx` e `src/DiscoverPage.tsx`: composição narrativa dos cases.
- `src/main.tsx`: home, navegação e seleção das páginas.
- `src/metadata.json`: rotas e SEO dos cases.
- `src/styles.css`: identidade, layout, responsividade e movimento.
- `public/images/`: imagens originais, em WebP, sem recompressão ou recortes.

Novos projetos devem ser adicionados à lista de dados e às rotas, sem cartões vazios. A navegação entre cases usa a ordem dos projetos visíveis. O Caloriflix aponta para Santa Maria; a Santa Maria oferece o retorno ao Caloriflix e acesso ao Discover; o Discover retorna à Santa Maria, sem um próximo case fictício.

Os contatos oficiais estão ativos:

- LinkedIn: https://www.linkedin.com/in/gabriel-cruz-09367b1a1/
- Behance: https://www.behance.net/gabrielcruz9
- E-mail: mailto:gabriel@feitojunto.com
- Currículo: /gabriel-cruz-curriculo.pdf

LinkedIn, Behance e o PDF abrem em nova aba com `rel="noopener noreferrer"`. O e-mail utiliza diretamente `mailto:`. O currículo é o PDF original fornecido, sem alterações. O link não contém o atributo `download`, e o servidor de prévia não envia `Content-Disposition: attachment`.

Microtítulos, overlines e numeração das seções foram removidos do JSX e dos dados obsoletos. A identificação junto à foto é Product Designer · Full-Stack · Mobile, com Product Designer como foco principal. A apresentação e o Sobre representam a atuação em design e desenvolvimento web e mobile. As competências estão organizadas em Design, Desenvolvimento Web e Desenvolvimento Mobile. Os títulos principais, textos narrativos, fotos, imagens dos projetos, ordem e rotas foram preservados. O layout das introduções foi reorganizado para não deixar colunas vazias. Não há alternância de tema. `color-scheme: dark`, cor de tema do navegador, foco, hover e seleção utilizam a nova paleta.

Não foram inventadas métricas, pesquisas ou responsabilidades individuais.

## Materiais originais

As imagens foram recuperadas diretamente dos arquivos presentes nestes estudos de caso:

- https://jonasmilan.cc/cases/caloriflix
- https://jonasmilan.cc/cases/santa-maria
- https://jonasmilan.cc/cases/discover

Caloriflix: oito imagens originais, incluindo wireframes, interfaces, versões mobile e style guide. As duas reapresentações existentes na narrativa do Caloriflix foram preservadas.

Santa Maria: nove imagens originais, apresentadas sem repetição dentro do case. Incluem home, interfaces de imóveis, filtros, institucional, versões mobile e sistema visual. A referência não disponibiliza pranchas específicas de wireframes ou pesquisas para esse projeto; o processo é apresentado em texto, sem produzir imagens fictícias.

Discover: oito imagens originais, incluindo hero, conteúdo, benefícios, versões mobile, tipografia e cores. Não há pranchas específicas de wireframes ou pesquisas disponíveis na referência; nenhuma foi fabricada. O resultado de +12 mil novos alunos orgânicos é apresentado como informação reportada no case original, com link para a fonte, sem atribuição exclusiva ao design ou a uma pessoa.

As imagens mantêm os arquivos originais de 2432 × 1800 px. As imagens principais dos cases são prioritárias; as demais utilizam carregamento sob demanda, proporções reservadas e textos alternativos. Nenhum elemento da navegação ou do rodapé do portfólio de referência foi incluído.

## Verificação

- Build TypeScript e Vite concluído.
- HTML estático e SEO específicos gerados para os três cases.
- Rotas verificadas por HTTP.
- Quatro páginas verificadas em 1440, 768 e 390 px, sem transbordamento horizontal, fundos claros na estrutura ou microtítulos. As cores originais das imagens foram preservadas.
- Conteúdo textual do Caloriflix comparado com a versão anterior e preservado integralmente.
- Textos narrativos, imagens, ordem e rotas dos três cases preservados na migração para dark mode.
- Navegação entre os cases e retorno à home implementados.
- Suporte a teclado, foco visível e prefers-reduced-motion mantidos.
- Sem erros de console observados na revisão. Currículo testado em nova aba.
- Não existe script de lint configurado no projeto; a verificação TypeScript integra o build.

## Publicação

A identidade do Site existente foi mantida em `.openai/hosting.json`. A sincronização com Sites foi bloqueada anteriormente pela revisão automática de aprovação, sem detalhar um motivo específico; esta versão não foi publicada. Nenhuma credencial foi gravada neste projeto ou no arquivo ZIP.

Para outra hospedagem estática, envie o conteúdo de `dist/` a um servidor HTTP. O HTML deve ser servido por HTTP; abrir diretamente por file:// não é suportado.
