import React, {createContext, FC, useEffect} from "react";
import {useAppSelector} from "../redux/store.ts";
import {AuthState} from "../redux/slices/auth.ts";
import {User} from "../type.ts";
import axiosInstance from "../utils/axios.ts";
import LoadingScreen from "../components/LoadingScreen.tsx";


export const ProfileContext = createContext<{ profile: User }>({profile: {} as User});

interface ProfileProps {
    children: React.ReactNode;
}

export const ProfileProvider: FC<ProfileProps> = ({children}) => {
    const [profile, setProfile] = React.useState<User>({} as User);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const {isLoggedIn} = useAppSelector<AuthState>(state => state.auth)

    useEffect(() => {
        if (isLoggedIn) {
            axiosInstance.get("/users/profile")
                .then((res) => {
                    setProfile(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
    }, [isLoggedIn])

    return (
        <ProfileContext.Provider value={{profile}}>
            {
                isLoading && isLoggedIn ? <LoadingScreen/> : children
            }
        </ProfileContext.Provider>
    )

};

