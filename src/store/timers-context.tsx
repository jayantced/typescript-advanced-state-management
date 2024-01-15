import { ReactNode, createContext } from "react";

type Timer = {
    name: string;
    duration: string;
}

type TimerState = {
    isRunning: boolean;
    timers: Timer[];
}

type TimersContextValue = TimerState & {
    addTimer: (timerData: Timer) => void;
    stopTimers: () => void;
    startTimer: () => void;
}

const TimersContext = createContext<TimersContextValue | null>(null);

type TimersContextProviderProps = {
    children: ReactNode;
}

function TimersContextProvider({children}: TimersContextProviderProps) {

    const ctx = {
        timers: [],
        isRunning: false,
        addtimers: (timerData) => {
            //...
        },
        startTimers() {
            //...
        },
        stopTimers: {} {
            //..
        }
    }
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}