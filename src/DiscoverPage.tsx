import { type Project } from './data';
import { discover as content, discoverImages as images } from './discover';
import { CaseSectionIntro, CaseImage, CaseOpening, CaseNavigation, ProcessSteps } from './CaseComponents';
export function DiscoverPage({ project }: { project: Project }) {
  return <main id="main" className="portfolio-case discover-case">
    <CaseOpening project={project} content={content} image={images.cover}/>
    <div className="wrap case-narrative">
      <section id="contexto" className="case-section"><CaseSectionIntro section={content.context}/><CaseImage image={images.identity}/></section>
      <section id="desafio" className="case-section"><CaseSectionIntro section={content.challenge}/><ol className="case-objectives detailed-objectives reveal">{content.challenge.objectives.map(([title,text]) => <li key={title}><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
      <section id="processo" className="case-section"><CaseSectionIntro section={content.process}/><ProcessSteps steps={content.process.steps}/></section>
      <section id="interface" className="case-section"><CaseSectionIntro section={content.interface}/><CaseImage image={images.overview}/><div className="case-gallery-two"><CaseImage image={images.hero}/><CaseImage image={images.benefits}/></div><CaseImage image={images.responsive}/></section>
      <section id="sistema-visual" className="case-section"><CaseSectionIntro section={content.system}/><CaseImage image={images.system}/></section>
      <section id="resultado" className="case-section"><CaseSectionIntro section={content.delivery}/><aside className="case-result-stat reveal" aria-label="Resultado reportado no projeto"><p><strong>{content.delivery.metric}</strong><span>{content.delivery.metricLabel}</span></p><a href={content.delivery.source} target="_blank" rel="noopener noreferrer">Fonte: case original <span aria-hidden="true">↗</span></a></aside><CaseImage image={images.delivery}/></section>
      <CaseNavigation project={project}/>
    </div>
  </main>;
}
