import { createContext, ReactNode, useContext, useEffect, useState } from "react"


interface CountdownContextData {
  time: number;
  resetCountdown: () => void;
  startCountdown: () => void;
  isActive: boolean;
  hasFinished: boolean;
}

interface CountdownProviderProps {
  children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout
const initialTime = 2;

export function CountdownContextProvider({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(initialTime)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => setTime(time - 1), 1000)
    } else if (isActive && time === 0) {
      setIsActive(false)
      setHasFinished(true)
    }
  }, [isActive, time])


  return (
    <CountdownContext.Provider
      value={{
        time,
        resetCountdown,
        startCountdown,
        isActive,
        hasFinished
      }}
    >
      { children}
    </CountdownContext.Provider>
  )
}

export function useCountdown(): CountdownContextData {
  const context = useContext(CountdownContext);

  return context;
}