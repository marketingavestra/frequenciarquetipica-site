'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './LeadForm.module.css';

function maskPhone(value) {
  const v = value.replace(/\D/g, '');
  if (v.length <= 2)  return v;
  if (v.length <= 7)  return `(${v.slice(0,2)}) ${v.slice(2)}`;
  if (v.length <= 11) return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7,11)}`;
}

const AVATAR_PHOTOS = [
  '/2d00a126-b5b9-46ca-8782-73eb7412fdef.jfif',
  '/6062cfcc-b226-4285-8f4b-b21e224e8ea7.jfif',
  '/2a3a30d8-cbbc-48b8-983e-d38a3126b3f1.jfif',
  '/2ece979e-75f5-4abe-a226-fedd91aeae25.jfif',
];

/* ─── Mapa de arquétipos ─── */
const ARCHETYPES = {
  Herói:      { label: 'O Herói',        emoji: '⚔️',  desc: 'Você nasceu para superar limites. Seu fogo interno move montanhas — mas às vezes o peso que carrega sozinho é grande demais.' },
  Governante: { label: 'O Governante',   emoji: '👑',  desc: 'Sua energia é de comando e estrutura. Você organiza o caos onde outros desistem — e teme, no fundo, perder as rédeas.' },
  Sábio:      { label: 'O Sábio',        emoji: '🔮',  desc: 'Sua alma busca o que está além da superfície. Você vê o que poucos percebem — e carrega o peso silencioso desse conhecimento.' },
  Mago:       { label: 'O Mago',         emoji: '✦',   desc: 'Você transforma realidades com presença e intenção. Sua intuição é bússola — e ela raramente mente quando você a escuta.' },
  Amante:     { label: 'O Amante',       emoji: '🌹',  desc: 'Conexão é sua linguagem primordial. Você ama com profundidade rara — e sente as perdas com a mesma intensidade.' },
  Criador:    { label: 'O Criador',      emoji: '🎨',  desc: 'Você traz forma ao que ainda não existe. Sua visão é seu maior dom — e sua maior batalha é não se perder dentro dela.' },
  Explorador: { label: 'O Explorador',   emoji: '🧭',  desc: 'Liberdade é sua necessidade vital. Você nasceu para descobrir territórios novos — e sufoca quando as paredes chegam perto.' },
  Cuidador:   { label: 'O Cuidador',     emoji: '🤍',  desc: 'Seu coração é sua maior força. Você cuida com generosidade rara — e esquece, às vezes, que também precisa ser cuidado.' },
  FóraDaLei:  { label: 'O Fora-da-Lei',  emoji: '🔥',  desc: 'Você desafia o que não faz sentido. Seu espírito rebelde é revolução pura — e carrega uma sede antiga de ser visto de verdade.' },
  Inocente:   { label: 'O Inocente',     emoji: '☀️',  desc: 'Você preserva a magia onde outros desistiram. Sua fé é um escudo — e também sua vulnerabilidade mais honesta.' },
};

/* ─── 5 perguntas diagnósticas junguianas ─── */
const QUESTIONS = [
  {
    id: 'q1',
    layer: 'Camada I · Medo',
    question: 'O que mais te paralisa hoje?',
    sub: 'Escolha a que ressoa mais fundo — não a mais bonita.',
    options: [
      { label: 'Falhar e decepcionar quem depende de mim',          scores: { Herói: 2, Cuidador: 1 } },
      { label: 'Ser abandonado ou deixar de ser amado',             scores: { Amante: 2, Inocente: 1 } },
      { label: 'Perder o controle da situação',                     scores: { Governante: 2, Herói: 1 } },
      { label: 'Não saber a resposta ou tomar a decisão errada',    scores: { Sábio: 2, Mago: 1 } },
      { label: 'Ficar preso numa vida sem significado real',        scores: { Explorador: 2, Criador: 1 } },
      { label: 'Ser visto como fraco ou vulnerável',                scores: { FóraDaLei: 2, Herói: 1 } },
    ],
  },
  {
    id: 'q2',
    layer: 'Camada II · Sombra',
    question: 'Quando algo dá errado, sua primeira reação é:',
    sub: 'A resposta automática — não a ideal.',
    options: [
      { label: 'Analisar friamente e buscar uma solução lógica',    scores: { Sábio: 2, Mago: 1 } },
      { label: 'Sentir raiva intensa, mas guardar para si',         scores: { FóraDaLei: 2, Governante: 1 } },
      { label: 'Se culpar e revisar o que poderia ter feito melhor',scores: { Herói: 1, Inocente: 1, Cuidador: 1 } },
      { label: 'Se afastar das pessoas e processar sozinho',        scores: { Explorador: 2, Sábio: 1 } },
      { label: 'Buscar apoio emocional de alguém próximo',          scores: { Amante: 2, Cuidador: 1 } },
      { label: 'Agir imediatamente para consertar, sem parar',      scores: { Governante: 2, Herói: 1 } },
    ],
  },
  {
    id: 'q3',
    layer: 'Camada III · Desejo',
    question: 'No fundo, o que você mais deseja para sua vida?',
    sub: 'O desejo que você raramente diz em voz alta.',
    options: [
      { label: 'Ser lembrado como quem fez a diferença de verdade', scores: { Herói: 2, Governante: 1 } },
      { label: 'Viver com autenticidade total, sem máscaras',       scores: { FóraDaLei: 2, Explorador: 1 } },
      { label: 'Ser amado de forma profunda e incondicional',       scores: { Amante: 2, Inocente: 1 } },
      { label: 'Entender o sentido real das coisas e transmiti-lo', scores: { Sábio: 2, Mago: 1 } },
      { label: 'Criar algo que perdure — uma obra, um legado',      scores: { Criador: 2, Governante: 1 } },
      { label: 'Ver quem amo protegido, bem e feliz',               scores: { Cuidador: 2, Amante: 1 } },
    ],
  },
  {
    id: 'q4',
    layer: 'Camada IV · Poder',
    question: 'Como você toma decisões importantes?',
    sub: 'Qual processo é mais natural para você — não o mais racional.',
    options: [
      { label: 'Pesquiso muito — preciso de dados e certeza antes', scores: { Sábio: 2, Governante: 1 } },
      { label: 'Confio no instinto — sinto quando é certo',         scores: { Mago: 2, Amante: 1 } },
      { label: 'Penso primeiro no impacto sobre as pessoas',        scores: { Cuidador: 2, Amante: 1 } },
      { label: 'Avalio riscos, recursos e consequências primeiro',  scores: { Governante: 2, Herói: 1 } },
      { label: 'Questiono se essa decisão me liberta ou me prende', scores: { Explorador: 2, FóraDaLei: 1 } },
      { label: 'Visualizo o que precisa existir e simplesmente crio',scores: { Criador: 2, Mago: 1 } },
    ],
  },
  {
    id: 'q5',
    layer: 'Camada V · Persona',
    question: 'Em grupos e ambientes sociais, você costuma:',
    sub: 'Como os outros te percebem — não como você quer ser visto.',
    options: [
      { label: 'Assumir a liderança naturalmente, mesmo sem querer',scores: { Governante: 2, Herói: 1 } },
      { label: 'Observar tudo antes de agir, preferir discreção',   scores: { Sábio: 2, Explorador: 1 } },
      { label: 'Criar conexões profundas com poucas pessoas',       scores: { Amante: 2, Cuidador: 1 } },
      { label: 'Questionar o que todos aceitam sem pensar',         scores: { FóraDaLei: 2, Explorador: 1 } },
      { label: 'Inspirar com ideias, visões e possibilidades',      scores: { Criador: 2, Mago: 1 } },
      { label: 'Adaptar-se ao ambiente, buscar harmonia e paz',     scores: { Inocente: 2, Cuidador: 1 } },
    ],
  },
];

function calcArchetype(answers) {
  const scores = Object.fromEntries(Object.keys(ARCHETYPES).map(k => [k, 0]));
  answers.forEach((answerIdx, qIdx) => {
    if (answerIdx === null || answerIdx === undefined) return;
    const option = QUESTIONS[qIdx]?.options[answerIdx];
    if (!option) return;
    Object.entries(option.scores).forEach(([arch, pts]) => {
      scores[arch] = (scores[arch] || 0) + pts;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/* ═══════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════ */
export default function LeadForm({ variant = 'hero' }) {
  const [nome,      setNome]      = useState('');
  const [phone,     setPhone]     = useState('');
  const [step,      setStep]      = useState(0);   // 0 = dados, 1-5 = perguntas
  const [answers,   setAnswers]   = useState([null, null, null, null, null]);
  const [selected,  setSelected]  = useState(null); // feedback visual imediato
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [success,   setSuccess]   = useState(false);
  const [arquetipo, setArquetipo] = useState('');

  const qIdx = step - 1;

  /* Avança do step 0 (dados) para step 1 (perguntas) */
  function handleStepZero(e) {
    e.preventDefault();
    setError('');
    setStep(1);
  }

  /* Seleciona uma opção e avança (ou submete se for a última) */
  function handleAnswer(optIdx) {
    if (loading || selected !== null) return;
    const newAnswers = [...answers];
    newAnswers[qIdx] = optIdx;
    setAnswers(newAnswers);
    setSelected(optIdx);

    if (step < QUESTIONS.length) {
      // Próxima pergunta com delay visual
      setTimeout(() => {
        setSelected(null);
        setStep(s => s + 1);
      }, 280);
    } else {
      // Última pergunta — calcula e envia
      setTimeout(() => {
        const arch = calcArchetype(newAnswers);
        setArquetipo(arch);
        submitForm(arch, newAnswers);
      }, 280);
    }
  }

  /* Envia dados para API */
  async function submitForm(arch, ans) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          whatsapp: phone,
          arquetipo: arch,
          respostas: ans,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Erro ao enviar.'); setSelected(null); return; }
      if (data.redirect && data.redirect !== '/') {
        window.location.href = data.redirect;
      } else {
        setSuccess(true);
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
      setSelected(null);
    } finally {
      setLoading(false);
    }
  }

  /* ── Estado de sucesso ── */
  if (success) {
    const arch = ARCHETYPES[arquetipo] || null;
    return (
      <div className={styles.successCard}>
        <span className={styles.successIcon}>{arch ? arch.emoji : '✦'}</span>
        {arch ? (
          <>
            <p className={styles.successEyebrow}>Seu Arquétipo Dominante</p>
            <h3 className={styles.successTitle}>{arch.label}</h3>
            <p className={styles.successText}>{arch.desc}</p>
            <p className={styles.successSub}>
              Seu mapa arquetípico completo chegará no seu WhatsApp em instantes.
            </p>
          </>
        ) : (
          <>
            <h3 className={styles.successTitle}>Jornada iniciada.</h3>
            <p className={styles.successText}>
              Seu mapa arquetípico chegará no seu WhatsApp em instantes.
            </p>
          </>
        )}
      </div>
    );
  }

  /* ── Variant inline (final CTA) — sem quiz ── */
  if (variant !== 'hero') {
    return (
      <form onSubmit={handleStepZero} className={styles.inlineForm}>
        <div className={styles.inlineRow}>
          <input
            type="text"
            className={styles.inlineInput}
            placeholder="Seu nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <input
            type="tel"
            className={styles.inlineInput}
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={e => setPhone(maskPhone(e.target.value))}
            required
          />
          <button type="submit" className={styles.inlineBtn} disabled={loading}>
            {loading ? '…' : 'Revelar →'}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    );
  }

  /* ── Step 0: Card com dados ── */
  if (step === 0) {
    return (
      <div className={styles.card} id="formulario">
        <div className={styles.glowBorder} aria-hidden />

        {/* Avatares + social proof */}
        <div className={styles.socialProof}>
          <div className={styles.avatarStack}>
            {AVATAR_PHOTOS.map((src, i) => (
              <div key={i} className={styles.avatar} style={{ zIndex: AVATAR_PHOTOS.length - i }}>
                <Image src={src} alt="Aluno" width={32} height={32} className={styles.avatarImg} />
              </div>
            ))}
            <div className={styles.avatarCount}>+8</div>
          </div>
          <div className={styles.proofText}>
            <span className={styles.proofHighlight}>+1.200 ativações</span>
            <span className={styles.proofSub}> essa semana</span>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.cardHeader}>
          <span className={styles.cardEyebrow}>◈ Portal de Entrada</span>
          <h3 className={styles.cardTitle}>Descubra Seu Arquétipo Dominante</h3>
          <p className={styles.cardSub}>
            Preencha abaixo e responda 5 perguntas. O resultado chega gratuitamente no seu WhatsApp.
          </p>
        </div>

        <form onSubmit={handleStepZero} className={styles.form}>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="f-nome">
                <span className={styles.labelIcon}>☽</span> Seu nome
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="f-nome" type="text" className={styles.input}
                  placeholder="Como posso te chamar?"
                  value={nome} onChange={e => setNome(e.target.value)}
                  required autoComplete="given-name"
                />
                <span className={styles.inputGlow} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="f-wpp">
                <span className={styles.labelIcon}>✦</span> WhatsApp
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="f-wpp" type="tel" className={styles.input}
                  placeholder="(00) 00000-0000"
                  value={phone} onChange={e => setPhone(maskPhone(e.target.value))}
                  required autoComplete="tel"
                />
                <span className={styles.inputGlow} />
              </div>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn}>
            <span className={styles.btnShine} />
            <span className={styles.btnContent}>
              Iniciar Diagnóstico <span className={styles.btnArrow}>→</span>
            </span>
          </button>
        </form>

        <div className={styles.badges}>
          <span className={styles.badge}><span>🔒</span> 100% gratuito</span>
          <span className={styles.badge}><span>⚡</span> Resultado imediato</span>
          <span className={styles.badge}><span>🚫</span> Sem spam</span>
        </div>
      </div>
    );
  }

  /* ── Steps 1-5: Perguntas ── */
  const q = QUESTIONS[qIdx];

  return (
    <div className={styles.card} id="formulario">
      <div className={styles.glowBorder} aria-hidden />

      {/* Barra de progresso */}
      <div className={styles.progressWrap}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span className={styles.progressLabel}>{step} de {QUESTIONS.length}</span>
      </div>

      {/* Rótulo da camada */}
      <div className={styles.questionLayer}>{q.layer}</div>

      {/* Pergunta */}
      <h3 className={styles.questionTitle}>{q.question}</h3>
      <p className={styles.questionSub}>{q.sub}</p>

      {/* Opções */}
      <div className={styles.optionList}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.optionBtn} ${selected === i ? styles.optionBtnSelected : ''}`}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null || loading}
          >
            <span className={styles.optionAlpha}>{String.fromCharCode(65 + i)}</span>
            <span className={styles.optionLabel}>{opt.label}</span>
          </button>
        ))}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {loading && (
        <div className={styles.loadingState}>
          <span className={styles.spinner} />
          <span>Calculando seu arquétipo…</span>
        </div>
      )}
    </div>
  );
}
