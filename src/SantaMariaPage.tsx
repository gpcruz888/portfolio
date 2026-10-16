import { type Project } from './data';
import { santaMaria as content, santaMariaImages as images } from './santaMaria';
import { CaseSectionIntro, CaseImage, CaseOpening, CaseNavigation, ProcessSteps } from './CaseComponents';
export function SantaMariaPage({ project }: { project: Project }) {
  return <main id="main" className="portfolio-case santa-maria-case">
    <CaseOpening project={project} content={content} image={images.hero}/>
    <div className="wrap case-narrative">
      <section id="contexto" className="case-section"><CaseSectionIntro section={content.context}/><CaseImage image={images.home}/></section>
      <section id="desafio" className="case-section"><CaseSectionIntro section={content.challenge}/><ol className="case-objectives detailed-objectives reveal">{content.challenge.objectives.map(([title,text]) => <li key={title}><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
      <section id="processo" className="case-section"><CaseSectionIntro section={content.process}/><ProcessSteps steps={content.process.steps}/></section>
      <section id="interface" className="case-section"><CaseSectionIntro section={content.interface}/><CaseImage image={images.property}/><div className="case-gallery-two"><CaseImage image={images.listing}/><CaseImage image={images.filters}/></div><CaseImage image={images.institutional}/><CaseImage image={images.responsive}/></section>
      <section id="sistema-visual" className="case-section"><CaseSectionIntro section={content.system}/><CaseImage image={images.system}/></section>
      <section id="resultado" className="case-section"><CaseSectionIntro section={content.delivery}/><CaseImage image={images.delivery}/></section>
      <CaseNavigation project={project}/>
    </div>
  </main>;
}
