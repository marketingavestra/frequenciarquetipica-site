'use client';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.symbol}>◈</span>
          Frequência Arquetípica
        </a>
        <a href="#formulario" className={styles.cta}>
          Iniciar Quiz ↓
        </a>
      </div>
    </nav>
  );
}