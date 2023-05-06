import {Stack} from '@mui/material'
import React, {useEffect} from "react";

import {Navigate, Outlet} from "react-router-dom";
import SideBar from "./SideBar.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {AuthState} from "../../redux/slices/auth.ts";
import {connectSocket, socket} from "../../socket.ts";
import {AcceptFriendRequestResponse, Conversation, FriendRequest, MessageEventPayload} from "../../type.ts";
import {addMessage} from "../../redux/slices/message.ts";
import {addConversation, updateConversation} from "../../redux/slices/conversation.ts";
import {addFriendRequest, removeFriendRequest} from "../../redux/slices/friendRequest.ts";


const DashboardLayout = () => {

    const dispatch = useAppDispatch()

    const {isLoggedIn, accessToken} = useAppSelector<AuthState>((state) => state.auth);


    useEffect(() => {
        if (isLoggedIn) {
            if (!socket) {
                connectSocket(accessToken)
            }
            socket?.on('onMessage', (payload: MessageEventPayload) => {
                console.log('Received onMessage Event');
                const {conversation, message} = payload;
                dispatch(addMessage(payload));
                dispatch(updateConversation(conversation));
            });
            socket?.on('onConversation', (payload: Conversation) => {
                console.log('Received onConversation Event');
                console.log(payload);
                dispatch(addConversation(payload));
            });
            socket?.on("onFriendRequestReceived", (payload: FriendRequest) => {
                console.log("onFriendRequestReceived");
                dispatch(addFriendRequest(payload));
            });
            socket?.on("onFriendRequestCanceled", (payload: FriendRequest) => {
                console.log("onFriendRequestCanceled");
                dispatch(removeFriendRequest(payload));
            });
            socket?.on("onFriendRequestAccepted", (payload: AcceptFriendRequestResponse) => {
                console.log("onFriendRequestAccepted");
                dispatch(removeFriendRequest(payload.friendRequest));
            })

        }
        return () => {
            socket?.removeAllListeners()
        }
    }, [socket]);

    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"}/>;
    }

    return (
        <>
            <Stack direction="row" sx={{width: "100%"}}>
                <SideBar/>
                <Outlet/>
            </Stack>
        </>
    )
}

export default DashboardLayout
