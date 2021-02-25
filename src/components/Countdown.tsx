import { useContext, useEffect, useState } from 'react'
import { useChallanges } from '../contexts/ChallangesContext'
import { useCountdown } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const { startNewChallange } = useChallanges();

  const {
    time,
    resetCountdown,
    startCountdown,
    isActive,
    hasFinished
  } = useCountdown()

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')

  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  useEffect(() => {
    if (time === 0) {
      startNewChallange();
    }
  }, [time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished
        ? (
          <button
            disabled
            className={styles.countdownButton}
          >
            Ciclo encerrado
          </button>
        )
        : (
          <>
            { isActive
              ? (
                <button
                  onClick={resetCountdown}
                  type="button"
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                >
                  Abandonar ciclo
                </button>
              )
              : (
                <button
                  onClick={startCountdown}
                  type="button"
                  className={styles.countdownButton}
                >
                  Iniciar ciclo
                </button>
              )
            }
          </>
        )
      }

    </div>
  )
}