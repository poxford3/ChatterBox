import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { ApiService } from "@/hooks/ApiService";

SplashScreen.preventAutoHideAsync();

type createUserProps = {
    username: string,
    password: string
}

export type updateUserProps = {
    id: number,
    username: string,
    name?: string,
    password?: string,
    email?: string,
    profilePic?: string
}

type deleteUserProps = {
    id: string
}

// TODO implement login/out
type UserState = {
    user: User | null,
    jwt: string,
    signin: ({ username, password }: createUserProps) => void,
    signout: () => void,
    createUser: ({ username, password }: createUserProps) => void
    updateUser: ({ username, name, password, profilePic, email }: updateUserProps) => void
    deleteUser: ({ id }: deleteUserProps) => void
}

export const UserContext = createContext<UserState>({
    user: null,
    jwt: "",
    signin: () => {},
    signout: () => {},
    createUser: () => {},
    updateUser: () => {},
    deleteUser: () => {},
});

export function UserProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [jwt, setJwt] = useState<string>("");
    const router = useRouter();

    const api = new ApiService("http://localhost:8080");

    type storeUserProps = {
        id: string,
        jwt: string
    }

    const storeUserLocal = async ({id, jwt}: storeUserProps) => {
        await AsyncStorage.setItem('jwt', jwt);
        await AsyncStorage.setItem('user_id', id);
    }

    const getUser = async () => {
        try {
            const user_id = await AsyncStorage.getItem("user_id");
            const storedJwt = await AsyncStorage.getItem("jwt");
            if (user_id !== null && storedJwt !== null) {
                const activeUser = await api.get<User>(`/users/${user_id}`, storedJwt);
                
                if (activeUser) {
                    setUser(activeUser);
                    setIsReady(true);
                    return activeUser;
                }
            }

        } catch (err) {
            console.error(`error! ${err}`);
            return false;
        }
    }

    
    type SigninResponse = {
        id: string,
        token: string,
        tokenType: string,
        roles: any,
        username: string,
        type: string
    }
    
    const signIn = async (id: number) => {
        try {
            const user_data = await api.get<SigninResponse>(`/users/${id}`);

            storeUserLocal({ id: user_data.id, jwt: user_data.token });
            setJwt(user_data.token);
            getUser();
        } catch (err) {
            console.error(`sign in error: ${err}`);
        }
    }

    type SignupResponse = {
        message: string,
        id: number
    }

    const createUser = async ({ username, password }: createUserProps) => {
        try {
            const data = await api.post<SignupResponse>("/api/auth/signup", {
                username: username,
                password: password
            });

            if (data.id !== null) {
                signIn(data.id);
                console.log('User registered', data);
                router.replace("/");
            }

        } catch (err) {
            console.error('Registration failed', err)
        }
    }

    const updateUser = async ({ id, username, name, password, profilePic, email }: updateUserProps) => {
        try {
            const data = await api.post(`/users/${id}`, {
                username: username,
                password: password,
                name: name,
                profilePic: profilePic,
                email: email
            });

            console.log('User updated', data);
        } catch (err) {
            console.error('Update user failed', err)
        }
    }

    const deleteUser = async ({ id }: deleteUserProps) => {
        try {
            const data = await api.delete(`/users/${id}`, jwt);

            console.log('User updated', data);
        } catch (err) {
            console.error('Update user failed', err)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
    if (isReady) {
        SplashScreen.hideAsync();
    }
    }, [isReady]);

    return (
        <UserContext.Provider
            value={{
                user,
                jwt,
                signin,
                signout,
                createUser,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
