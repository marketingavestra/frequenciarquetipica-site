'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';

const FAQS = [
  {
    q: 'O que é exatamente um arquétipo?',
    a: 'Arquétipos são padrões do inconsciente descritos por Carl Jung. Eles moldam pensamentos, emoções e decisões. Não é um teste de personalidade. É um mapeamento do padrão mais profundo que opera dentro de você, muito antes de você perceber.',
  },
  {
    q: 'O quiz é realmente gratuito?',
    a: 'Sim. O quiz, o resultado na tela e o PDF que chega pelo WhatsApp são 100% sem custo. Sem cartão de crédito. Sem pegadinha.',
  },
  {
    q: 'Como recebo meu resultado?',
    a: 'Ao concluir o quiz, seu arquétipo aparece na tela na hora. Depois, um guia em PDF com rituais, frequência Hz e afirmação de ativação chega no WhatsApp que você informou.',
  },
  {
    q: 'É diferente de outros testes de personalidade?',
    a: 'É diferente. Testes como MBTI mapeiam comportamento. O mapeamento arquetípico vai mais fundo. Ele revela a estrutura do inconsciente por trás do comportamento. Incluindo a sombra, o que você bloqueia, e a frequência de expansão, o que precisa ser ativado.',
  },
  {
    q: 'Meus dados estão seguros?',
    a: 'Seus dados são usados só pra enviar seu resultado pelo WhatsApp. Não compartilhamos, não vendemos e não enviamos spam. Pra sair, é só responder "SAIR" em qualquer mensagem.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Perguntas frequentes</span>
          <h2 className={styles.title}>Tudo que você<br />precisa saber.</h2>
        </div>
        <ul className={styles.list}>
          {FAQS.map((item, i) => (
            <li key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
              <button className={styles.q} onClick={() => toggle(i)}>
                {item.q}
                <span className={styles.icon}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className={styles.aWrap}>
                <p className={styles.a}>{item.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}