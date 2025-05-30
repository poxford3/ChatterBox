import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import uuid from 'react-native-uuid';
import { UserContext } from "./UserContext";
import { ApiService } from "@/hooks/ApiService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

// clearAsyncStorage();

// SplashScreen.preventAutoHideAsync();


type createSeshProps = {
    name: string,
    type: "weight" | "run" | "bike",
    exercises?: Exercise[],
    userIds: number[]
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
    createSession: ({ name, type, exercises, userIds }: createSeshProps) => void;
    finishSession: ({ duration }: finishSeshProps) => void;
    deleteSession: ({ sesh_id }: deleteSeshProps) => void;
    getAllSessions: () => void;
}

const sessionStorageKey = "sesh-key";

export const SessionContext = createContext<SessionState>({
    session: null,
    allSessions: null,
    createSession: () => {},
    finishSession: () => {},
    deleteSession: () => {},
    getAllSessions: () => {},
});

export function SessionProvider({ children }: PropsWithChildren) {
    // const [isReady, setIsReady] = useState(false);
    const userContext = useContext(UserContext);
    const user = userContext.user;
    const jwt = userContext.jwt;
    const api = new ApiService("http://localhost:8080");
    const [session, setSession] = useState<Session | null>(null);
    const [allSessions, setAllSessions] = useState<Session[] | null>(null);
    const router = useRouter();

    const hasActiveSession = (sessions: Session[] | null): boolean => {
        if (sessions) {
            return sessions.some(sesh => sesh.active);
        } else {
            return false
        }
    }

    const createSession = async ({ name, type, exercises, userIds }: createSeshProps) => {
        // if a sessions list is found and if no session is active
        console.log('create session', name, userIds);
        if (!hasActiveSession(allSessions)) { 
            console.log("made it in");
            const newSesh: Session = {
                id: uuid.v4(),
                name: name,
                duration: 0,
                active: true,
                type: type,
                exercises: exercises,
                userIds: userIds
            }
            await api.post<Session>("/sessions", newSesh, jwt).then((res) => {
                setSession(res);
                router.replace("/");
            })
            .catch((err) => {
                console.error('error creating session: ', err);
            });
        } else if (session?.active === true) {
            console.log("session already active");
        }
    }


    const finishSession = async ({ duration }: finishSeshProps) => {
        if (!session) return;

        const finishedSession = {
            ...session,
            duration: duration,
            active: false
        };
        await api.put<Session>(`/sessions/${session.id}`, finishedSession, jwt).then(() => {
            setSession(null);
        });
    }

    const deleteSession = async ({ sesh_id }: deleteSeshProps) => {
        if (!allSessions) return;

        let deletedMessage = await api.delete<string>(`/sessions/${sesh_id}`, jwt).then(() => {});
        getAllSessions();
        console.log(deletedMessage);
    }

    const getAllSessions = async () => {
        await api.get<Session[]>(`/sessions?user_id=${user?.id}`, jwt).then((seshList) => {
            if (seshList) {
                setAllSessions(seshList);
                // console.log('all seshs', seshList);
                if (hasActiveSession(seshList) && seshList) {
                    const activeSession = seshList.filter(sesh => sesh.active)[0];
                    setSession(activeSession);
                }
            }
        });
    }

    useEffect(() => {
        getAllSessions();
    }, [user]);

    useEffect(() => {
        getAllSessions();
    }, [session]);

    useEffect(() => {
        getAllSessions();
    }, []);
    
    return (
        <SessionContext.Provider
            value={{ 
                session,
                allSessions,
                createSession,
                finishSession,
                deleteSession,
                getAllSessions,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}