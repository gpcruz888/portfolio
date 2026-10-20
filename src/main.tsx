import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { projects, contactLinks, contactDetails, skillAreas, type Project } from './data';
import './styles.css';
import { CasePage } from './CasePage';
import { SantaMariaPage } from './SantaMariaPage';
import { DiscoverPage } from './DiscoverPage';
import metadata from './metadata.json';
import { ClientLogos, SelectedWork } from './SelectedWork';

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

function Arrow({ className = '' }: { className?: string }) { return <span aria-hidden="true" className={`arrow ${className}`}>↗</span>; }
function ProjectCard({ project }: { project: Project }) {
  return <article className="project featured-project reveal">
    <a className="project-image-link" href={project.path} aria-label={`Explorar projeto ${project.title}`}><div className="project-image"><img src={project.image} alt={project.imageAlt} loading="lazy" width="2432" height="1800"/></div></a>
    <div className="project-details"><div><h2>{project.title}<span className="accent">{project.titleSuffix}</span></h2><p className="project-skills">{project.skills}</p></div><div><p className="project-description">{project.description}</p><a className="text-link project-cta" href={project.path}>Explorar projeto <Arrow/></a></div></div>
  </article>;
}
function App() {
  const [active, setActive] = useState('');
  const project = projects.find(p => p.visible && window.location.pathname.replace(/\/$/, '') === p.path);
  useEffect(() => {
    if (project) {
      const seo = metadata.cases.find(entry => entry.path === project.path);
      if (seo) {
        document.title = seo.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
      }
    }
    const reveal = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
    const section = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > section').forEach(el => section.observe(el));
    const anchor = window.location.hash.slice(1);
    const frame = requestAnimationFrame(() => {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant' });
    });
    return () => { reveal.disconnect(); section.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return <><a className="skip-link" href="#main">Pular para o conteúdo</a><header><div className="header-inner"><a className="logo" href="/" aria-label="Gabriel Cruz, início">gabriel cruz<span className="accent">.</span></a><nav aria-label="Navegação principal">{[['projetos','Projetos'],['sobre','Sobre'],['contato','Contato']].map(([id,label]) => <a key={id} href={project ? `/#${id}` : `#${id}`} className={(active === id || (project && id === 'projetos')) ? 'active' : ''} aria-current={(active === id || (project && id === 'projetos')) ? 'location' : undefined}>{label}</a>)}</nav></div></header>
  {project ? (project.id === 'discover' ? <DiscoverPage project={project}/> : project.id === 'santa-maria' ? <SantaMariaPage project={project}/> : <CasePage project={project}/>) : <main id="main">
    <section className="hero wrap" id="inicio"><div className="hero-grid"><div className="hero-identity"><img className="hero-avatar" src="/images/gabriel-cruz.png" alt="Gabriel Cruz" width="60" height="60" decoding="async"/><span className="hero-role"><strong>Product Designer</strong> · Full-Stack · Mobile</span></div><div className="hero-content"><h1>Design para o que<br className="desktop-break"/> realmente importa<span className="accent">.</span></h1><div className="hero-bottom"><p className="hero-description">Sou Gabriel Cruz, designer e desenvolvedor com experiência na criação de produtos digitais, interfaces e aplicações web e mobile. Minha atuação conecta design, experiência do usuário e desenvolvimento, permitindo acompanhar um produto desde a concepção até a implementação.</p><a href="#projetos" className="hero-cta">Conheça meu trabalho <span className="arrow-circle"><Arrow/></span></a></div></div></div></section>
    <ClientLogos/>
    <section id="projetos" className="projects wrap">{projects.filter(p => p.visible).map(p => <ProjectCard key={p.id} project={p}/>)}</section>
    <SelectedWork/>
    <section id="sobre" className="about"><div className="wrap"><div className="section-intro reveal"><h2>Entre o design<br/> e o código<span className="accent">.</span></h2><div className="about-copy"><p>Sou Product Designer e desenvolvedor com experiência em produtos digitais, aplicações web e aplicativos mobile. Minha atuação inclui design de interfaces, desenvolvimento front-end, back-end e full-stack, conectando a experiência do usuário à implementação.</p><p>Essa experiência mudou bastante a forma como penso design. Hoje, quando olho para uma tela, não penso apenas na aparência. Quero entender o que a pessoa precisa fazer, quais informações são importantes e como tudo aquilo vai funcionar na prática.</p><p>Gosto de projetos que exigem organização, atenção aos detalhes e boas decisões. Principalmente quando existe muita informação envolvida e o desafio é tornar tudo mais simples de usar.</p></div></div><div className="competencies reveal">{skillAreas.map(area => <div className="skill-area" key={area.title}><h3>{area.title}</h3><ul>{area.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></div></section>
    <section id="contato" className="contact wrap"><div className="section-intro reveal"><h2>Tem algo em mente?<br/> Vamos conversar<span className="accent">.</span></h2><div><p className="section-description">Estou aberto a novas oportunidades em Product Design. Se quiser conhecer melhor meu trabalho ou trocar uma ideia, é só entrar em contato.</p><div className="contact-direct"><a className="direct-contact" href={`mailto:${contactDetails.email}`}>{contactDetails.email}<Arrow/></a><a className="direct-contact" href={contactDetails.whatsapp.href} target="_blank" rel="noopener noreferrer">WhatsApp · {contactDetails.whatsapp.display}<Arrow/></a></div><div className="contact-links">{contactLinks.filter(link => link.label !== 'E-mail').map(link => <a className="contact-link" key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}>{link.label} <Arrow/></a>)}</div></div></div></section>
  </main>}<footer className="wrap"><span>Gabriel Cruz © 2026</span><span>Design e desenvolvimento por Gabriel Cruz.</span></footer></>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
