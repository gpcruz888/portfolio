import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Swiper from './vendor/swiper.js';
import projects from './live-projects.json';
import './vendor/swiper.css';
import './live-projects.css';

const gymPages = [
  { title: 'Centro de fitness', file: 'index.html', cover: 'centro-de-fitness.jpg', width: 1400, height: 770 },
  { title: 'Academia', file: 'home-gym.html', cover: 'academia.jpg', width: 1440, height: 634 },
  { title: 'Personal trainer', file: 'home-personal-trainer.html', cover: 'personal-trainer.jpg', width: 1440, height: 747 },
].map(page => ({
  title: page.title,
  href: `/projetos/gymcare/${page.file}`,
  cover: `/images/gymcare/${page.cover}`,
  width: page.width,
  height: page.height,
}));

type ProjectSlide = {
  title: string;
  href: string;
  cover: string;
  width: number;
  height: number;
  category?: string;
  description?: string;
};

const livePages = projects.map(project => {
  const path = `/projetos-ao-vivo/${project.slug}`;
  return { ...project, href: `${path}/index.html`, cover: `${path}/assets/img/projeto/${project.cover}`, width: 1600, height: 900 };
});

export function LiveProjects() {
  return <ProjectCarousel id="projetos-ao-vivo" title="Projetos ao vivo" slides={livePages}/>;
}

export function GymProjects() {
  return <ProjectCarousel id="projetos-de-academia" title="Projetos de academia" slides={gymPages} coverOnly/>;
}

function ProjectCarousel({ id, title, slides, coverOnly = false }: { id: string; title: string; slides: ProjectSlide[]; coverOnly?: boolean }) {
  const lastSlide = slides.length - 1;
  const headingId = `${id}-title`;
  const slidesId = `${id}-slides`;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeProject = slides[activeSlide];

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
  }, [lastSlide]);

  function goToSlide(index: number) {
    if (!section.current || !stage.current) return;
    const { start, distance } = scrollRange(section.current, stage.current);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: start + distance * (index / lastSlide),
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  return <section ref={section} className={coverOnly ? 'live-projects live-projects-previews' : 'live-projects'} id={id}
    aria-labelledby={headingId} style={{ '--slide-steps': lastSlide } as CSSProperties}>
    <div ref={stage} className="live-projects-stage">
      <div className="wrap">
        <h2 id={headingId}>{title}<span className="accent">.</span></h2>
      </div>
      <div className="live-projects-panel">
        <div className="live-projects-layout wrap">
          <div ref={slider} className="swiper live-projects-slider" aria-roledescription="carrossel" role="group" aria-labelledby={headingId}>
            <div className="swiper-wrapper" id={slidesId}>
              {slides.map((project, index) => (
                <article key={project.href} className="swiper-slide" aria-hidden={index !== activeSlide}>
                  <div data-swiper-parallax="-30">
                    <div className="live-projects-cover" aria-hidden="true">
                      <div data-swiper-parallax-scale="1.3">
                        <img src={project.cover} alt="" width={project.width} height={project.height} loading={coverOnly ? 'lazy' : undefined} decoding="async"/>
                      </div>
                    </div>
                    {!coverOnly && <div className="live-projects-description-slot">
                      <div className="live-projects-description" data-swiper-parallax-x="104%" data-swiper-parallax-opacity="0">
                        <div data-swiper-parallax-y="100%" data-swiper-parallax-opacity="0">
                          <p className="live-projects-category">{project.category}</p>
                          <h3>{project.title}</h3>
                          <p className="live-projects-summary">{project.description}</p>
                        </div>
                      </div>
                    </div>}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="live-projects-controls" role="group" aria-label="Navegação do carrossel">
            <a className="live-projects-link" href={activeProject.href}
              aria-label={`Abrir projeto ${activeProject.title}`}>Abrir projeto <span aria-hidden="true">↗</span></a>
            <div className="live-projects-buttons">
              <span aria-label={`Slide ${activeSlide + 1} de ${slides.length}`}>{activeSlide + 1} / {slides.length}</span>
              <button type="button" aria-label="Slide anterior" aria-controls={slidesId} disabled={activeSlide === 0}
                onClick={() => goToSlide(activeSlide - 1)}>←</button>
              <button type="button" aria-label="Próximo slide" aria-controls={slidesId} disabled={activeSlide === lastSlide}
                onClick={() => goToSlide(activeSlide + 1)}>→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
