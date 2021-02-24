import { createContext, ReactNode, useEffect, useState } from "react"
import challanges from '../../challenges.json'

interface Challange {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challangesCompleted: number;
  activeChallange: Challange;
  levelUp: () => void;
  startNewChallange: () => void;
  resetChallange: () => void;
  finishChallange: () => void;
}

interface ChallangesProviderProps {
  children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallangesContextData)

export function ChallangesContextProvider({ children }: ChallangesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challangesCompleted, setChallangesCompleted] = useState(0)
  const [activeChallange, setActiveChallange] = useState<Challange>(null)
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(0)

  useEffect(() => {
    setExperienceToNextLevel(Math.pow((level + 1) * 4, 2))
  }, [level])


  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length)
    const challange = challanges[randomChallangeIndex]

    setActiveChallange(challange as Challange)
  }

  function resetChallange() {
    setActiveChallange(null)
  }

  function finishChallange() {
    const updatedExperience = currentExperience + activeChallange.amount
    if (updatedExperience >= experienceToNextLevel) {
      levelUp()
    }
    setCurrentExperience(updatedExperience)
    setChallangesCompleted(challangesCompleted + 1)
    resetChallange()
  }

  return (
    <ChallangesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challangesCompleted,
        activeChallange,
        levelUp,
        startNewChallange,
        resetChallange,
        finishChallange,
      }}>
      { children}
    </ChallangesContext.Provider>
  )
}