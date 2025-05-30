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
    username?: string,
    name?: string,
    password?: string,
    email?: string,
    profilePic?: string
}

type deleteUserProps = {
    id: string
}

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
        await AsyncStorage.setItem('user_id', id.toString());
    }

    const getUser = async () => {
        try {
            const user_id = await AsyncStorage.getItem("user_id");
            const storedJwt = await AsyncStorage.getItem("jwt");
            if (user_id !== null && storedJwt !== null) {
                const activeUser = await api.get<User>(`/users/${user_id}`, storedJwt);
                console.log('user found', activeUser);
                
                if (activeUser) {
                    setUser(activeUser);
                    setJwt(storedJwt);
                    setIsReady(true);
                    // return activeUser;
                    router.replace("/(tabs)")
                }
            } else {
                console.log('user not found, need to sign in');
                router.replace('/signin');
            } 

        } catch (err) {
            console.error(`error finding user! ${err}`);
            router.replace('/signin');
        }
        setIsReady(true);
    }

    type SigninResponse = {
        id: string,
        token: string,
        tokenType: string,
        roles: any,
        username: string,
        type: string
    }
    
    const signin = async ({ username, password }: createUserProps) => {
        try {
            const user_data = await api.post<SigninResponse>(`/api/auth/signin`, {
                username,
                password
            });

            storeUserLocal({ id: user_data.id, jwt: user_data.token });
            setJwt(user_data.token);
            getUser();
        } catch (err) {
            console.error(`sign in error: ${err}`);
        }
    }

    const signout = async () => {
        await AsyncStorage.multiRemove(["id", "jwt"]);
        setUser(null);
        setJwt("");
        router.replace("/signin");
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
                signin({ username, password });
                console.log('User registered', data);
                router.replace("/");
            }

        } catch (err) {
            console.error('Registration failed', err)
        }
    }

    const updateUser = async ({ id, username, name, profilePic, email }: updateUserProps) => {
        try {
            const data = await api.put(`/users/${id}`, {
                username: username,
                name: name,
                profilePic: profilePic,
                email: email
            }, jwt);

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
            console.error('Delete user failed', err)
        }
    }

    // useEffect(() => {
    //     getUser();
    // }, [user])

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
