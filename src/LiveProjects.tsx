import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Swiper from './vendor/swiper.js';
import projects from './live-projects.json';
import './vendor/swiper.css';
import './live-projects.css';

const lastSlide = projects.length - 1;

export function LiveProjects() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeProject = projects[activeSlide];

  function scrollRange(sectionElement: HTMLElement, stageElement: HTMLElement) {
    const stickyTop = parseFloat(getComputedStyle(stageElement).top);
    return {
      start: window.scrollY + sectionElement.getBoundingClientRect().top - stickyTop,
      distance: sectionElement.offsetHeight - stageElement.offsetHeight,
    };
  }

  useEffect(() => {
    if (!section.current || !stage.current || !slider.current) return;
    const sectionElement = section.current;
    const stageElement = stage.current;
    const swiper = new Swiper(slider.current, {
      allowTouchMove: false,
      parallax: true,
      slidesPerView: 1,
    });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const { start, distance } = scrollRange(sectionElement, stageElement);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      const position = reducedMotion.matches ? Math.round(progress * lastSlide) / lastSlide : progress;
      swiper.setProgress(position, 0);
      setActiveSlide(swiper.activeIndex);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
      swiper.destroy();
    };
  }, []);

  function goToSlide(index: number) {
    if (!section.current || !stage.current) return;
    const { start, distance } = scrollRange(section.current, stage.current);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: start + distance * (index / lastSlide),
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  return <section ref={section} className="live-projects" id="projetos-ao-vivo"
    aria-labelledby="live-projects-title" style={{ '--slide-steps': lastSlide } as CSSProperties}>
    <div ref={stage} className="live-projects-stage">
      <div className="wrap">
        <h2 id="live-projects-title">Projetos ao vivo<span className="accent">.</span></h2>
      </div>
      <div className="live-projects-panel">
        <div className="live-projects-layout wrap">
          <div ref={slider} className="swiper live-projects-slider" aria-roledescription="carrossel" role="group" aria-labelledby="live-projects-title">
            <div className="swiper-wrapper" id="live-projects-slides">
              {projects.map((project, index) => {
                const path = `/projetos-ao-vivo/${project.slug}`;
                return <article key={project.id} className="swiper-slide" aria-hidden={index !== activeSlide}>
                  <div data-swiper-parallax="-30">
                    <div className="live-projects-cover" aria-hidden="true">
                      <div data-swiper-parallax-scale="1.3">
                        <img src={`${path}/assets/img/projeto/${project.cover}`} alt="" width="1600" height="900" decoding="async"/>
                      </div>
                    </div>
                    <div className="live-projects-description-slot">
                      <div className="live-projects-description" data-swiper-parallax-x="104%" data-swiper-parallax-opacity="0">
                        <div data-swiper-parallax-y="100%" data-swiper-parallax-opacity="0">
                          <p className="live-projects-category">{project.category}</p>
                        <h3>{project.title}</h3>
                          <p className="live-projects-summary">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>;
              })}
            </div>
          </div>
          <div className="live-projects-controls" role="group" aria-label="Navegação do carrossel">
            <a className="live-projects-link" href={`/projetos-ao-vivo/${activeProject.slug}/index.html`}
              aria-label={`Abrir projeto ${activeProject.title}`}>Abrir projeto <span aria-hidden="true">↗</span></a>
            <div className="live-projects-buttons">
              <span aria-label={`Slide ${activeSlide + 1} de ${projects.length}`}>{activeSlide + 1} / {projects.length}</span>
              <button type="button" aria-label="Slide anterior" aria-controls="live-projects-slides" disabled={activeSlide === 0}
                onClick={() => goToSlide(activeSlide - 1)}>←</button>
              <button type="button" aria-label="Próximo slide" aria-controls="live-projects-slides" disabled={activeSlide === lastSlide}
                onClick={() => goToSlide(activeSlide + 1)}>→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
