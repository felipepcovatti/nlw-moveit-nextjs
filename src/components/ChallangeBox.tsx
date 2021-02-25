import { useChallanges } from '../contexts/ChallangesContext'
import { useCountdown } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallangeBox.module.css'

export function ChallangeBox() {
  const { activeChallange, resetChallange, completeChallange } = useChallanges();
  const { resetCountdown } = useCountdown();

  function handleChalangeSucceeded() {
    completeChallange();
    resetCountdown();
  }

  function handleChallangeFailed() {
    resetChallange();
    resetCountdown();
  }

  return (
    <div className={styles.challangeBoxContainer}>
      { activeChallange
        ? (
          <div className={styles.challangeActive}>
            <header>Ganhe {activeChallange.amount} xp</header>

            <main>
              <img src={`icons/${activeChallange.type}.svg`} alt="" />
              <strong>Novo desafio</strong>
              <p>{activeChallange.description}</p>
            </main>

            <footer>
              <button
                type="button"
                className={styles.challangeFailedButton}
                onClick={handleChallangeFailed}
              >
                Falhei
              </button>
              <button
                type="button"
                className={styles.challangeSucceededButton}
                onClick={handleChalangeSucceeded}
              >
                Completei
              </button>
            </footer>
          </div>
        )
        : (
          <div className={styles.challangeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
              Avance de level completando desafios.
            </p>
          </div>
        )
      }
    </div >
  )
}