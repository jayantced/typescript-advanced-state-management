import { ReactNode, createContext, useContext, useReducer } from "react";

type Timer = {
    name: string;
    duration: string;
}

type TimerState = {
    isRunning: boolean;
    timers: Timer[];
}

const initialState: TimerState = {
    isRunning: true,
    timers: [],
}

type TimersContextValue = TimerState & {
    addTimer: (timerData: Timer) => void;
    stopTimers: () => void;
    startTimer: () => void;
}

export const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
    const timerCtx = useContext(TimersContext);

    if (timerCtx === null) {
        throw new Error("Something went wrong here");
        
    }

    return timerCtx;
}

type TimersContextProviderProps = {
    children: ReactNode;
}

type Action = {
    type: 'ADD_TIMERS' | 'STOP_TIMERS' | 'START_TIMERS';
}

function timersReducers(state: TimerState, action:Action): TimerState {
    if (action.type === 'START_TIMERS') {
        return {
            ...state,
            isRunning: true
        }
    }
    if (action.type === 'STOP_TIMERS') {
        return {
            ...state,
            isRunning: false
        }
    }
    if (action.type === 'ADD_TIMERS') {
        return {
            ...state,
            timers: [
                ...state.timers,
                {
                    duration,
                    name
                }
            ]
        }
    }
}

export default function TimersContextProvider({children}: TimersContextProviderProps) {

    const [timerState, dispatchTimerState] = useReducer(timersReducers, initialState)
  
    const ctx = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {
            dispatchTimerState({type: 'ADD_TIMERS'});
        },
        startTimers() {
            dispatchTimerState({type: 'START_TIMERS'})
        },
        stopTimers() {
            dispatchTimerState({type: 'STOP_TIMERS'})
        }
    }
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}