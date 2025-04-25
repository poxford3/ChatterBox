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

type deleteSeshProps = {
    sesh_id: string
}

type SessionState = {
    session: Session | null,
    allSessions: Session[] | null
    createSession: ({ name, users }: createSeshProps) => void;
    finishSession: ({ duration }: finishSeshProps) => void;
    deleteSession: ({ sesh_id }: deleteSeshProps) => void
}

const sessionStorageKey = "sesh-key";

export const SessionContext = createContext<SessionState>({
    session: null,
    allSessions: null,
    createSession: () => {},
    finishSession: () => {},
    deleteSession: () => {},
});

export function SessionProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [allSessions, setAllSessions] = useState<Session[] | null>(null);
    const router = useRouter();

    type storeSeshProps = {
        newState?: Session,
        sessions?: Session[]
    }

    const storeSessionState = async ({newState, sessions}: storeSeshProps) => {

        let allSessionsJson;

        if (newState) {
            try {
                // check if the session already exists
                const tempAllSessions: Session[] = allSessions ?? [];
                const updatedSessions = tempAllSessions.some(s => s.id === newState.id)
                ? tempAllSessions.map(s => (s.id === newState.id ? newState : s))
                : [...tempAllSessions, newState];
          
                setAllSessions(updatedSessions);
                allSessionsJson = JSON.stringify(updatedSessions);
                // console.log('store', allSessionsJson);
                await AsyncStorage.setItem(sessionStorageKey, allSessionsJson);
            } catch (error) {
                console.log("error storing session state", error);
            }
        } else if (sessions) {
            try {
                // check if the session already exists
                allSessionsJson = JSON.stringify(sessions);
                // console.log('store', allSessionsJson);
                await AsyncStorage.setItem(sessionStorageKey, allSessionsJson);
            } catch (error) {
                console.log("error storing session state", error);
            }
        }
    }

    const createSession = ({ name, users }: createSeshProps) => {
        // console.log('activity', session?.active);
        if (!session || session.active === undefined || session.active === false) {
            const newSesh: Session = {
                id: uuid.v4(),
                name: name,
                active: true,
                date: new Date(),
                duration: 0,
                users: users
            }
            storeSessionState({ newState: newSesh });
            setSession(newSesh);
            router.replace("/");
        } else if (session.active === true) {
            console.log("session already active");
        }
    }


    const finishSession = ({ duration }: finishSeshProps) => {
        if (!session) return;

        session.duration = duration;
        session.active = false;
        storeSessionState({ newState: session });
        setSession(null);
    }

    const deleteSession = ({ sesh_id }: deleteSeshProps) => {
        if (!allSessions) return;

        const sessions = allSessions;
        const new_sessions = sessions?.filter((sesh) => sesh.id !== sesh_id);

        setAllSessions(new_sessions);
        storeSessionState({ sessions: new_sessions });
    }

    useEffect(() => {
        const getSeshFromStorage = async () => {
          try {
            const value = await AsyncStorage.getItem(sessionStorageKey);
            // console.log('value', value);
            if (value !== null) {
                const sessions = JSON.parse(value);
                // console.log('all sessions', sessions);
                const active_sesh = sessions.filter((a: Session) => a.active === true)[0];
                // console.log(active_sesh);
                setAllSessions(sessions);
                setSession(active_sesh);
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
                allSessions,
                createSession,
                finishSession,
                deleteSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}