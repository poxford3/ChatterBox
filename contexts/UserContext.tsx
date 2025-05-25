import { act, createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiService } from "@/hooks/ApiService";
import { useRouter } from "expo-router";

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

type UserState = {
    user: User | null,
    createUser: ({ username, password }: createUserProps) => void
    updateUser: ({ username, name, password, profilePic, email }: updateUserProps) => void
    deleteUser: ({ id }: deleteUserProps) => void
}

export const UserContext = createContext<UserState>({
    user: null,
    createUser: () => {},
    updateUser: () => {},
    deleteUser: () => {},
});

export function UserProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const api = new ApiService("http://localhost:8080");

    type storeUserProps = {
        id: string,
        jwt: string
    }

    const storeUser = async ({id, jwt}: storeUserProps) => {
        await AsyncStorage.setItem('jwt', jwt);
        await AsyncStorage.setItem('user_id', id);
    }

    const getUser = async () => {
        try {
            const user_id = await AsyncStorage.getItem("user_id");
    
            const activeUser = await api.get<User>(`/users/${user_id}`);

            if (activeUser) {
                setUser(activeUser);
                return activeUser
            }
        } catch (err) {
            console.error(`error! ${err}`)
        }
    }

    type SignupResponse = {
        id: string,
        token: string,
        tokenType: string,
        roles: any,
        username: string,
        type: string
    }

    const createUser = async ({ username, password }: createUserProps) => {
        try {
            const data = await api.post<SignupResponse>("/api/auth/signup", {
                username: username,
                password: password
            });

            storeUser({ id: data.id, jwt: data.token });
            router.replace("/");
            console.log('User registered', data);
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
            const data = await api.delete(`/users/${id}`);

            console.log('User updated', data);
        } catch (err) {
            console.error('Update user failed', err)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                createUser,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
