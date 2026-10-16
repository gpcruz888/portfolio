import { projects, type Project } from './data';
export type CaseImageAsset = { src: string; alt: string };
export type SectionContent = { title: string; paragraphs: string[] };
type OpeningContent = { subtitle: string; intro: string; facts: string[][] };
export function CaseSectionIntro({ section }: { section: SectionContent }) {
  return <div className="case-section-intro reveal"><h2>{section.title}</h2><div className="case-copy">{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div></div>;
}
export function CaseImage({ image, eager = false }: { image: CaseImageAsset; eager?: boolean }) {
  return <figure className={`case-figure ${eager ? '' : 'reveal'}`}><img src={image.src} alt={image.alt} width="2432" height="1800" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async"/></figure>;
}
export function CaseOpening({ project, content, image }: { project: Project; content: OpeningContent; image: CaseImageAsset }) {
  return <div className="case-opening wrap">
    <a href="/#projetos" className="case-back"><span aria-hidden="true">←</span> Voltar aos projetos</a>
    <h1>{project.title}<span className="accent">.</span></h1>
    <div className="case-lead"><h2>{content.subtitle}</h2><p>{content.intro}</p></div>
    <dl className="case-facts">{content.facts.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <CaseImage image={image} eager/>
  </div>;
}
export function ProcessSteps({ steps }: { steps: string[][] }) {
  return <ol className="process-steps reveal">{steps.map(([title,text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol>;
}
export function CaseNavigation({ project }: { project: Project }) {
  const visible = projects.filter(p => p.visible);
  const index = visible.findIndex(p => p.id === project.id);
  const previous = visible[index - 1];
  const next = visible[index + 1];
  return <><nav className="case-pagination reveal" aria-label="Navegação entre projetos">
    {previous && <a className="previous-case" href={previous.path} aria-label={`Projeto anterior: ${previous.title}`}><span aria-hidden="true">←</span> {previous.title}</a>}
    {next && <a className="next-case" href={next.path} aria-label={`Próximo projeto: ${next.title}`}>{next.title} <span className="accent" aria-hidden="true">↗</span></a>}
  </nav><div className="case-closing reveal"><a href="/#projetos">Voltar aos projetos <span className="accent" aria-hidden="true">↗</span></a></div></>;
}
