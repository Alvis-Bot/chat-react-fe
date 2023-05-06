import {Divider, IconButton, Stack, Typography,} from '@mui/material';
import {Bell, CaretLeft, Key, Lock,} from 'phosphor-react';
import {SimpleBarStyle} from '../../components/Scrollbar.tsx';
import {useTheme} from '@mui/material/styles';
import React from 'react';
import {AppState, FriendBarType, updateFriendBarType} from '../../redux/slices/app.ts';
import {useAppDispatch, useAppSelector} from '../../redux/store.ts';
import FriendRequests from '../../components/friend/FriendRequests.tsx';
import FriendsElement from "../../components/friend/FriendsElement.tsx";

const Friends = () => {
    const theme = useTheme();


    const {friendBar} = useAppSelector<AppState>((state) => state.app);

    const dispatch = useAppDispatch();
    const list = [
        {
            key: 0,
            icon: <Bell size={20}/>,
            title: 'Friends',
            onclick: () => {
                dispatch(updateFriendBarType(FriendBarType.FRIENDS))
            },
        },
        {
            key: 1,
            icon: <Lock size={20}/>,
            title: 'Friend Requests',
            onclick: () => {
                dispatch(updateFriendBarType(FriendBarType.FRIEND_REQUESTS))
            },
        },
        {
            key: 2,
            icon: <Key size={20}/>,
            title: 'Blocked',
            onclick: () => {
                dispatch(updateFriendBarType(FriendBarType.BLOCKED))
            },
        },
    ];
    return (
        <>
            <Stack direction="row" sx={{width: '100%'}}>
                {/* LeftPane */}
                <SimpleBarStyle
                    sx={{
                        // height: "100vh",
                        width: 320,
                        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,

                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <Stack p={4} spacing={5}>
                        {/* Header */}
                        <Stack direction="row" alignItems={'center'} spacing={3}>
                            <IconButton>
                                <CaretLeft size={24} color={'#4B4B4B'}/>
                            </IconButton>

                            <Typography variant="h5">Friends</Typography>
                        </Stack>
                        <Stack spacing={4}>
                            {list.map(({key, icon, title, onclick}) => {
                                return (
                                    <Stack key={key} onClick={onclick} sx={{cursor: 'pointer'}} spacing={2}>
                                        <Stack alignItems={'center'} direction="row" spacing={2}>
                                            {icon}
                                            <Typography variant="body2">{title}</Typography>
                                        </Stack>
                                        {key !== 7 && <Divider/>}
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Stack>
                </SimpleBarStyle>

                <Stack direction="row" sx={{width: '100%'}}>
                    {/* RightPane */}
                    {friendBar &&
                        (() => {
                            switch (friendBar.type) {
                                case 'FRIENDS':
                                    return <FriendsElement/>;
                                case 'FRIEND_REQUESTS':
                                    return <FriendRequests/>;
                                case 'BLOCKED':
                                    return <>BLOCKED</>;
                            }
                        })()}
                </Stack>
            </Stack>
        </>
    );
};

export default Friends;
