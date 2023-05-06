import {SimpleBarStyle} from '../Scrollbar.tsx';
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import {EnvelopeSimpleOpen} from 'phosphor-react';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store.ts';
import {fetchFriendsThunk} from '../../redux/slices/friends.ts';

const FriendsElement = () => {
    const dispatch = useAppDispatch();

    const {friends} = useAppSelector((state) => state.friends);

    useEffect(() => {
        dispatch(fetchFriendsThunk());
    }, []);

    return (
        <SimpleBarStyle sx={{width: '100%', height: '100vh'}}>
            <Stack
                p={3}
                spacing={5}
                sx={{
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                }}
            >
                {/* Header */}
                <Stack alignItems={'center'} direction="row" spacing={2}>
                    <EnvelopeSimpleOpen size={24}/>
                    <Typography variant="subtitle1">Friends</Typography>
                </Stack>
            </Stack>
            <Stack p={2}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {friends.map((item, index) => {
                        return (
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        padding: 2,
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt={item.receiver.firstName}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${item.sender.firstName} ${item.sender.lastName}`}/>
                                </ListItemButton>
                                <Divider variant="inset" component="li"/>
                            </ListItem>
                        );
                    })}
                </List>
            </Stack>
        </SimpleBarStyle>
    );
};

export default FriendsElement;