import io, {Socket} from "socket.io-client";
import React, {createContext, useEffect} from "react";
import {useAppSelector} from "../redux/store.ts";
import {AuthState} from "../redux/slices/auth.ts";


export const socket = io('http://localhost:3005', {
    reconnection: true,
    reconnectionDelay: 500,
});
const socketIOContext = createContext<Socket>(socket);

interface SocketIOProviderProps {
    children: React.ReactNode;
}

export const SocketIOProvider: React.FC<SocketIOProviderProps> = ({children}: any) => {
    const {isLoggedIn, accessToken} = useAppSelector<AuthState>(state => state.auth)


    useEffect(() => {
        if (isLoggedIn) {
            socket.connect();
            socket.auth = {accessToken};
        }
    }, [])
    return (
        <socketIOContext.Provider value={socket}>
            {children}
        </socketIOContext.Provider>
    )
};

export default socketIOContext;