import { useEffect, useRef, useState } from 'react';
import assets from './feitojunto.json';

const clients = assets.filter(asset => asset.logo);
const works = assets.filter(asset => !asset.logo);

function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const update = () => setEdges({ start: track.scrollLeft <= 2, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); track.removeEventListener('scroll', update); };
  }, []);
  const move = (direction: number) => {
    const track = ref.current;
    if (!track) return;
    const item = track.firstElementChild as HTMLElement | null;
    const step = item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || '0') : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return { ref, edges, move };
}

function CarouselControls({ id, label, edges, move }: { id: string; label: string; edges: { start: boolean; end: boolean }; move: (direction: number) => void }) {
  return <div className="carousel-controls" aria-label={`Navegação de ${label}`}>
    <button type="button" aria-label={`Ver ${label} anteriores`} aria-controls={id} disabled={edges.start} onClick={() => move(-1)}>←</button>
    <button type="button" aria-label={`Ver próximos ${label}`} aria-controls={id} disabled={edges.end} onClick={() => move(1)}>→</button>
  </div>;
}

export function ClientLogos() {
  const { ref, edges, move } = useCarousel<HTMLUListElement>();
  return <section className="client-section wrap" aria-labelledby="clients-title" aria-roledescription="carrossel">
    <div className="client-heading reveal">
      <h2 id="clients-title">Mais de <span className="accent">200</span><br/>projetos criados<span className="accent">.</span></h2>
      <p>Marcas que fazem parte dessa trajetória.</p>
    </div>
    <ul ref={ref} id="client-carousel" className="client-logos carousel-track" aria-label="Marcas atendidas" tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
      {clients.map(client => <li key={client.path}><img src={client.path} alt={client.name} loading="lazy" decoding="async" width="180" height="64"/></li>)}
    </ul>
    <CarouselControls id="client-carousel" label="logos" edges={edges} move={move}/>
  </section>;
}

export function SelectedWork() {
  const { ref, edges, move } = useCarousel<HTMLDivElement>();
  return <section className="selected-work wrap" aria-labelledby="work-title" aria-roledescription="carrossel">
    <div className="selected-work-heading reveal">
      <h2 id="work-title">Alguns trabalhos<br/>feitos<span className="accent">.</span></h2>
      <p>Uma seleção de projetos de design e presença digital.</p>
    </div>
    <div ref={ref} className="work-grid carousel-track" id="work-gallery" tabIndex={0} role="group" aria-label="Galeria de trabalhos" onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
      {works.map((work, index) => <a
        key={work.path}
        className="work-thumbnail"
        href={work.path}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ampliar imagem do trabalho ${index + 1} de ${works.length} (abre em nova aba)`}
      ><img src={work.path} alt={`Projeto de design do portfólio Feito Junto — trabalho ${index + 1}`} loading="lazy" decoding="async" width="808" height="632"/><span className="work-zoom" aria-hidden="true">↗</span></a>)}
    </div>
    <CarouselControls id="work-gallery" label="trabalhos" edges={edges} move={move}/>
  </section>;
}
