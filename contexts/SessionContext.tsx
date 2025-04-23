import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import uuid from 'react-native-uuid';


const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

// clearAsyncStorage();

SplashScreen.preventAutoHideAsync();


type createSeshProps = {
    name: string, 
    users: [User]
}
type finishSeshProps = {
    duration: number, // in milliseconds
}

type SessionState = {
    session: Session | null,
    createSession: ({ name, users }: createSeshProps) => void;
    finishSession: ({ duration }: finishSeshProps) => void;
}

const sessionStorageKey = "sesh-key";
const pastSessionsKey = "past-sesh-key";

export const SessionContext = createContext<SessionState>({
    session: null,
    createSession: () => {},
    finishSession: () => {}
});

export function SessionProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    const storeSessionState = async (newState: { session: Session }) => {
        try {
            const jsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(sessionStorageKey, jsonValue);
        } catch (error) {
            console.log("error storing session state", error);
        }
    }

    const storePastSession = async (newState: { session: Session }) => {
        try {
            const jsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(pastSessionsKey, jsonValue);
        } catch (error) {
            console.log("error storing past session state", error);
        }
    }

    const createSession = ({ name, users }: createSeshProps) => {
        console.log('activity', session?.active)
        if (!session || session.active === undefined || session.active === false) {
            console.log('here')
            const newSesh: Session = {
                id: uuid.v4(),
                name: name,
                active: true,
                date: new Date(),
                duration: 0,
                users: users
            }
            storeSessionState({ session: newSesh });
            setSession(newSesh);
            router.replace("/");
        } else if (session.active === true) {
            console.log("session already active");
        }
    }


    const finishSession = ({ duration }: finishSeshProps) => {
        if (!session) return;

        session.duration = duration;
        session.active = false
        storePastSession({ session: session })
        storeSessionState({ session: session });
        setSession(null);
    }

    useEffect(() => {
        const getSeshFromStorage = async () => {
          try {
            const value = await AsyncStorage.getItem(sessionStorageKey);
            if (value !== null) {
                const sesh = JSON.parse(value);
                setSession(sesh);
            }
          } catch (error) {
            console.log("Error fetching from storage", error);
          }
          setIsReady(true);
        };
        getSeshFromStorage();
      }, []);
    
      useEffect(() => {
        if (isReady) {
          SplashScreen.hideAsync();
        }
      }, [isReady]);

    return (
        <SessionContext.Provider
            value={{ 
                session,
                createSession,
                finishSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}