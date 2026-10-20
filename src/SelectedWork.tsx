import { useState } from 'react';
import assets from './feitojunto.json';

const clients = assets.filter(asset => asset.logo);
const works = assets.filter(asset => !asset.logo);

export function ClientLogos() {
  return <section className="client-section wrap" aria-labelledby="clients-title">
    <div className="client-heading reveal">
      <h2 id="clients-title">Mais de <span className="accent">200</span><br/>projetos criados<span className="accent">.</span></h2>
      <p>Marcas que fazem parte dessa trajetória.</p>
    </div>
    <ul className="client-logos reveal" aria-label="Marcas atendidas">
      {clients.map(client => <li key={client.path}><img src={client.path} alt={client.name} loading="lazy" decoding="async" width="180" height="64"/></li>)}
    </ul>
  </section>;
}

export function SelectedWork() {
  const [expanded, setExpanded] = useState(false);
  return <section className="selected-work wrap" aria-labelledby="work-title">
    <div className="selected-work-heading reveal">
      <h2 id="work-title">Alguns trabalhos<br/>feitos<span className="accent">.</span></h2>
      <p>Uma seleção de projetos de design e presença digital.</p>
    </div>
    <div className="work-grid" id="work-gallery">
      {works.map((work, index) => <a
        key={work.path}
        className="work-thumbnail"
        href={work.path}
        target="_blank"
        rel="noopener noreferrer"
        hidden={!expanded && index >= 6}
        aria-label={`Ampliar imagem do trabalho ${index + 1} (abre em nova aba)`}
      ><img src={work.path} alt={`Projeto de design do portfólio Feito Junto — trabalho ${index + 1}`} loading="lazy" decoding="async" width="808" height="632"/><span className="work-zoom" aria-hidden="true">↗</span></a>)}
    </div>
    <button className="work-toggle" type="button" aria-expanded={expanded} aria-controls="work-gallery" onClick={() => setExpanded(!expanded)}>
      {expanded ? 'Mostrar menos trabalhos' : `Ver todos os ${works.length} trabalhos`} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
    </button>
  </section>;
}
