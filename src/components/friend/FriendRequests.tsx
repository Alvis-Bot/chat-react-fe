import {Grid, Stack, Typography} from "@mui/material";
import {EnvelopeSimpleOpen} from "phosphor-react";
import {FriendRequestCard} from "../../sections/dashboard/friends/FriendCard.tsx";
import {SimpleBarStyle} from "../Scrollbar.tsx";
import React, {useEffect} from "react";
import {getFriendRequestsThunk} from "../../redux/slices/friendRequest.ts";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import useProfile from "../../hooks/useProfile.ts";

const FriendRequests = () => {

    const dispatch = useAppDispatch();
    const {profile} = useProfile();
    const {friendRequests} = useAppSelector((state) => state.friendRequest);

    useEffect(() => {
        dispatch(getFriendRequestsThunk())
    }, [dispatch]);


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
                    <Typography variant="subtitle1">Friend Request</Typography>
                </Stack>
            </Stack>
            <Stack p={3} spacing={2}>
                <Typography variant={`subtitle1`}>Requests received</Typography>
                <Grid container spacing={2}>
                    {
                        friendRequests.filter(item => item.receiver.id === profile.id).map((item, index) => {
                            return <Grid key={index} item xs={12} sm={6} md={4}>
                                <FriendRequestCard {...item}/>
                            </Grid>
                        })
                    }
                </Grid>
            </Stack>
            <Stack p={3} spacing={2}>
                <Typography variant={`subtitle1`}>Requests sent</Typography>
                <Grid container>
                    {
                        friendRequests.filter(item => item.sender.id === profile.id).map((item, index) => {
                            return <Grid key={index} item xs={12} sm={6} md={4}>
                                <FriendRequestCard {...item}/>
                            </Grid>
                        })
                    }
                </Grid>
            </Stack>
        </SimpleBarStyle>
    )
}

export default FriendRequests;