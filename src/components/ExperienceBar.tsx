import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallangesContext)
  const percentOfLevel = Math.round((currentExperience / experienceToNextLevel) * 100)

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentOfLevel}%` }}></div>
        <span
          className={styles.currentExperience}
          style={{ left: `${percentOfLevel}%` }}
        >{currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}