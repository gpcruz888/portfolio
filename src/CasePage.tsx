import { caloriflix as content, caseImages, type Project } from './data';
import { CaseSectionIntro, CaseImage, CaseOpening, CaseNavigation, ProcessSteps } from './CaseComponents';
export function CasePage({ project }: { project: Project }) {
  return <main id="main" className="portfolio-case">
    <CaseOpening project={project} content={content} image={caseImages.hero}/>
    <div className="wrap case-narrative">
      <section id="contexto" className="case-section"><CaseSectionIntro section={content.context}/><CaseImage image={caseImages.overview}/></section>
      <section id="desafio" className="case-section"><CaseSectionIntro section={content.challenge}/><ol className="case-objectives reveal">{content.challenge.objectives.map((text) => <li key={text}><p>{text}</p></li>)}</ol></section>
      <section id="processo" className="case-section"><CaseSectionIntro section={content.process}/><ProcessSteps steps={content.process.steps}/><CaseImage image={caseImages.wireframes}/></section>
      <section id="interface" className="case-section"><CaseSectionIntro section={content.interface}/><CaseImage image={caseImages.hero}/><div className="case-gallery-two"><CaseImage image={caseImages.overview}/><CaseImage image={caseImages.responsive}/></div></section>
      <section id="design-system" className="case-section"><CaseSectionIntro section={content.system}/><div className="case-gallery-two"><CaseImage image={caseImages.typography}/><CaseImage image={caseImages.colors}/></div><CaseImage image={caseImages.components}/></section>
      <section id="entrega" className="case-section"><CaseSectionIntro section={content.delivery}/><CaseImage image={caseImages.delivery}/></section>
      <CaseNavigation project={project}/>
    </div>
  </main>;
}
