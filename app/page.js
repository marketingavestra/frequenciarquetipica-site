import Nav      from '@/components/Nav';
import LeadForm from '@/components/LeadForm';
import FAQ      from '@/components/FAQ';
import Reveal   from '@/components/Reveal';
import styles   from './page.module.css';

/* ── Dados estáticos ── */
const REVEALS = [
  { icon: '◈', title: 'Seu Arquétipo Dominante',  text: 'O padrão que governa suas escolhas, sua identidade e seus relacionamentos. Ele opera no fundo. Você nunca parou pra nomear. Mas sente toda hora.' },
  { icon: '🌑', title: 'Seu Arquétipo de Sombra',  text: 'O que está travando sua expansão. A parte que opera no inconsciente e sabota seus resultados em dinheiro, relacionamentos e propósito.' },
  { icon: '🎵', title: 'Sua Frequência Hz',         text: 'A frequência sonora que ressoa com o seu arquétipo. Usada pra induzir clareza mental, foco e reequilíbrio interno. Funciona porque vai direto ao sistema nervoso.' },
  { icon: '✨', title: 'Sua Afirmação de Ativação', text: 'Uma afirmação feita pra você. Não genérica. Criada pra ancoragem do seu arquétipo específico. Pequena. Poderosa.' },
];

const ARCHETYPES = [
  { sym: '🌀', name: 'O Mago',      active: true  },
  { sym: '⚔️', name: 'O Herói',     active: false },
  { sym: '👑', name: 'O Rei',       active: false },
  { sym: '🌿', name: 'A Curandeira',active: false },
  { sym: '🔭', name: 'O Sábio',     active: true  },
  { sym: '🌹', name: 'O Amante',    active: false },
  { sym: '🧭', name: 'O Explorador',active: false },
  { sym: '🎨', name: 'O Criador',   active: false },
  { sym: '⚡', name: 'O Rebelde',   active: true  },
];

const STEPS = [
  { num: '01', icon: '📝', title: 'Responda o Quiz',      text: '8 perguntas que mapeiam seu padrão arquetípico dominante. Leva menos de 3 minutos.' },
  { num: '02', icon: '🔍', title: 'Receba o Diagnóstico', text: 'Seu arquétipo é revelado na tela com análise completa da sua frequência atual e da sua sombra.' },
  { num: '03', icon: '📲', title: 'PDF pelo WhatsApp',    text: 'Seu guia completo chega no WhatsApp. Com rituais, frequência Hz e afirmação de ativação.' },
];

const TESTIMONIALS = [
  { initials: 'MA', colors: { bg: 'rgba(122,82,179,.25)', fg: '#c9a84c' }, name: 'Marina A.', city: 'São Paulo, SP', text: '"Quando vi meu arquétipo de sombra, entendi por que eu travava sempre no mesmo ponto. Em anos de terapia não tinha chegado tão perto."' },
  { initials: 'JC', colors: { bg: 'rgba(201,168,76,.15)', fg: '#9b72d4' }, name: 'Juliana C.', city: 'Curitiba, PR',  text: '"Em 3 minutos o quiz fez o que a terapia levou meses tentando fazer. Deu nome pra um padrão que eu sempre senti mas nunca consegui identificar."' },
  { initials: 'RL', colors: { bg: 'rgba(122,82,179,.20)', fg: '#e8cb7a' }, name: 'Raquel L.', city: 'Recife, PE',    text: '"Fiz sem expectativa nenhuma. Fiquei em choque com a precisão. A afirmação que recebi já mudou minha manhã no primeiro dia."' },
];

/* ─────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />

      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>

          {/* Copy + Form */}
          <div className={styles.heroContent}>
            <Reveal>
              <div className={styles.heroBadge}>
                <span>☽</span> Mapeamento Arquetípico · Gratuito
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className={styles.h1}>
                Qual Arquétipo Está<br />
                <em>Governando a Sua Vida</em><br />
                Agora?
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className={styles.heroSub}>
                Em 8 perguntas você descobre o código que molda suas decisões, seus bloqueios e o que está travando sua expansão. Sem perceber. Todo o tempo.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <LeadForm variant="hero" />
            </Reveal>

            <Reveal delay={320}>
              <div className={styles.heroProof}>
                <span className={styles.proofDot}></span> 8 perguntas · 3 minutos
                <span className={styles.proofDot}></span> 100% gratuito
                <span className={styles.proofDot}></span> Resultado pelo WhatsApp
              </div>
            </Reveal>
          </div>

          {/* Portal Visual */}
          <Reveal className={styles.heroVisual}>
            <div className={styles.portalWrap}>
              {['✦','☽','◈','✦','⬡','☾'].map((s, i) => (
                <span key={i} className={`${styles.floatSym} ${styles[`fs${i+1}`]}`}>{s}</span>
              ))}
              <div className={`${styles.ring} ${styles.ring1}`} />
              <div className={`${styles.ring} ${styles.ring2}`} />
              <div className={`${styles.ring} ${styles.ring3}`} />
              <div className={`${styles.ring} ${styles.ring4}`} />
              <div className={styles.portalGlow} />
              <div className={styles.portalTriangle}>
                <svg viewBox="0 0 200 200" fill="none">
                  <polygon points="100,20 185,165 15,165" stroke="rgba(201,168,76,0.3)" strokeWidth="1" fill="none"/>
                  <polygon points="100,180 185,35 15,35" stroke="rgba(122,82,179,0.2)" strokeWidth="1" fill="none"/>
                  <circle cx="100" cy="100" r="60" stroke="rgba(201,168,76,0.1)" strokeWidth="1" fill="none"/>
                  <circle cx="100" cy="100" r="40" stroke="rgba(122,82,179,0.15)" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div className={styles.portalCenter}>
                <span className={styles.portalSymbol}>◈</span>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══ PROOF STRIP ══ */}
      <div className={styles.proofStrip}>
        <div className={`wrap ${styles.proofInner}`}>
          {[['12','Arquétipos Mapeados'],['8','Perguntas no Quiz'],['3','Minutos para Descobrir'],['100%','Gratuito']].map(([n,l],i) => (
            <Reveal key={i} className={styles.proofStat} delay={i * 80}>
              <span className={styles.proofNum}>{n}</span>
              <span className={styles.proofLbl}>{l}</span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══ O QUE É UM ARQUÉTIPO ══ */}
      <section className={styles.whatSection}>
        <div className={`wrap ${styles.whatInner}`}>

          <Reveal className={styles.whatVisual}>
            <div className={styles.archGrid}>
              {ARCHETYPES.map((a, i) => (
                <div key={i} className={`${styles.archChip} ${a.active ? styles.archActive : ''}`}>
                  <span className={styles.archSym}>{a.sym}</span>
                  <span className={styles.archName}>{a.name}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className={styles.whatContent}>
            <Reveal><span className={styles.eyebrow}>O que é um arquétipo</span></Reveal>
            <Reveal delay={80}><h2 className={styles.sectionTitle}>Existe um padrão invisível<br />operando dentro de você.</h2></Reveal>
            <Reveal delay={120}><div className={styles.dividerGold} /></Reveal>
            <Reveal delay={160}>
              <p className={styles.garamond}>Carl Jung descobriu isso há mais de 100 anos. Ele chamou de arquétipos as estruturas que vivem no inconsciente e moldam o comportamento humano. Toda cultura, toda época. Os mesmos padrões.</p>
            </Reveal>
            <Reveal delay={220}>
              <p className={styles.garamond}>Seu arquétipo dominante não é um teste de personalidade. É o padrão mais fundo que existe em você. Ele explica por que você decide como decide, por que você trava sempre no mesmo ponto. E <em>o que precisa acontecer pra você mudar de nível.</em></p>
            </Reveal>
            <Reveal delay={280}>
              <blockquote className={styles.quote}>
                "Todo arquétipo tem uma face de expansão e uma face de sombra. Quando você descobre qual está operando agora, as coisas fazem sentido de um jeito que nunca fizeram antes."
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ O QUE O QUIZ REVELA ══ */}
      <section className={styles.revealsSection}>
        <div className="wrap">
          <Reveal><span className={styles.eyebrow} style={{ textAlign: 'center', display: 'block' }}>O que você vai descobrir</span></Reveal>
          <Reveal delay={80}><h2 className={`${styles.sectionTitle} ${styles.centered}`}>Quatro revelações.<br />Uma transformação.</h2></Reveal>
          <Reveal delay={120}><div className={`${styles.dividerGold} ${styles.mx}`} /></Reveal>

          <div className={styles.revealsGrid}>
            {REVEALS.map((r, i) => (
              <Reveal key={i} className={styles.revealCard} delay={i * 80}>
                <span className={styles.rcIcon}>{r.icon}</span>
                <h3 className={styles.rcTitle}>{r.title}</h3>
                <p className={`${styles.garamond} ${styles.rcText}`}>{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMO FUNCIONA ══ */}
      <section className={styles.howSection}>
        <div className="wrap">
          <div className={styles.howHeader}>
            <Reveal><span className={styles.eyebrow}>Como funciona</span></Reveal>
            <Reveal delay={80}><h2 className={styles.sectionTitle}>Três passos.<br />Resultado imediato.</h2></Reveal>
          </div>
          <div className={styles.stepsRow}>
            {STEPS.map((s, i) => (
              <Reveal key={i} className={styles.step} delay={i * 100}>
                <div className={styles.stepNum}><span className={styles.stepNumText}>{s.num}</span></div>
                <span className={styles.stepIcon}>{s.icon}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={`${styles.garamond} ${styles.stepText}`}>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEPOIMENTOS ══ */}
      <section className={styles.testiSection}>
        <div className="wrap">
          <div className={styles.testiHeader}>
            <Reveal><span className={styles.eyebrow}>O que estão dizendo</span></Reveal>
            <Reveal delay={80}><h2 className={styles.sectionTitle}>O que elas disseram<br />depois do quiz.</h2></Reveal>
          </div>
          <div className={styles.testiGrid}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} className={styles.testiCard} delay={i * 100}>
                <div className={styles.stars}>★★★★★</div>
                <p className={`${styles.garamond} ${styles.testiText}`}>{t.text}</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar} style={{ background: t.colors.bg, color: t.colors.fg }}>{t.initials}</div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiCity}>{t.city}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <FAQ />

      {/* ══ FINAL CTA ══ */}
      <section className={styles.finalSection}>
        <div className="wrap-sm" style={{ textAlign: 'center' }}>
          <Reveal><span className={styles.finalOrnament}>☽ ✦ ☾</span></Reveal>
          <Reveal delay={80}><h2 className={styles.finalTitle}>Seu Arquétipo está esperando<br />ser <em>revelado.</em></h2></Reveal>
          <Reveal delay={160}><p className={`${styles.garamond} ${styles.finalSub}`}>Leva 3 minutos. O resultado vai pro seu WhatsApp.<br />E você vai entender coisas sobre si mesmo que nunca tinham tido nome.</p></Reveal>
          <Reveal delay={240}><LeadForm variant="final" /></Reveal>
          <Reveal delay={300}><p className={styles.finalPrivacy}>🔒 Gratuito · Sem spam · Resultado em minutos</p></Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className={styles.footer}>
        <div className="wrap-sm" style={{ textAlign: 'center' }}>
          <span className={styles.footerSym}>☽ ✦ ☾</span>
          <span className={styles.footerLogo}>Frequência Arquetípica</span>
          <p className={styles.footerCopy}>
            © 2026 Frequência Arquetípica · Todos os direitos reservados<br />
            <a href="#">Política de Privacidade</a> · <a href="#">Termos de Uso</a> · <a href="https://frequenciarquetipica.site">frequenciarquetipica.site</a>
          </p>
        </div>
      </footer>
    </>
  );
}