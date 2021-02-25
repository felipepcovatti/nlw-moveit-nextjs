import { createContext, ReactNode, useContext, useEffect, useState } from "react"
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
  completeChallange: () => void;
}

interface ChallangesProviderProps {
  children: ReactNode;
}

const ChallangesContext = createContext({} as ChallangesContextData)

export function ChallangesContextProvider({ children }: ChallangesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challangesCompleted, setChallangesCompleted] = useState(0)
  const [activeChallange, setActiveChallange] = useState<Challange>(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length)
    const challange = challanges[randomChallangeIndex]

    setActiveChallange(challange as Challange)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challange.amount} xp!`
      })
    }
  }

  function resetChallange() {
    setActiveChallange(null)
  }

  function completeChallange() {
    if (!activeChallange) return

    const { amount } = activeChallange

    let updatedExperience = currentExperience + amount

    if (updatedExperience >= experienceToNextLevel) {
      updatedExperience = updatedExperience - experienceToNextLevel
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
        completeChallange,
      }}>
      { children}
    </ChallangesContext.Provider>
  )
}

export function useChallanges(): ChallangesContextData {
  const context = useContext(ChallangesContext);

  return context;
}