import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {ArchiveBox} from "phosphor-react";
import ChatElement from "../../components/ChatElement.tsx";
import {SimpleBarStyle} from "../../components/Scrollbar.tsx";
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {fetchConversationsThunk} from "../../redux/slices/conversation.ts";
import {Conversation} from "../../type.ts";
import ContactSearch from "../../components/ContactSearch.tsx";

const Chats = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch()
    const [openDialogConversation, setOpenDialogConversation] = useState(false);

    const {conversations} = useAppSelector(state => state.conversation)
    useEffect(() => {
        // dispatch(updateType('private'));
        dispatch(fetchConversationsThunk());
    }, []);


    return (
        <>
            <Box sx={{
                position: 'relative',
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
            }}>
                <Stack p={3} spacing={2} sx={{
                    height: '100vh',
                    width: 360,
                }}>

                    <ContactSearch/>
                    <Stack spacing={1} width={'100%'}>
                        <Stack direction={`row`} alignItems={`center`} spacing={1.5}>
                            <ArchiveBox size={24}/>
                            <Button>Archive</Button>
                        </Stack>
                        <Divider/>
                    </Stack>
                    <SimpleBarStyle clickOnTrack={false} sx={{
                        height: '100%',
                    }}>
                        <Stack spacing={2.4}>
                            <Typography variant={`subtitle2`} color={`#676767`}>All</Typography>
                            {
                                conversations.map((item: Conversation) => ( //IChatList

                                    <ChatElement key={item.id} {...item} />
                                ))
                            }
                        </Stack>
                    </SimpleBarStyle>
                </Stack>

            </Box>
        </>
    )
}

export default Chats