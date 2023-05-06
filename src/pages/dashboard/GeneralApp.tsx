import Chats from './Chats.tsx';
import {Box, Stack, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Contact from '../../components/Contact.tsx';
import {useAppSelector} from '../../redux/store.ts';
import {AppState} from '../../redux/slices/app.ts';
import ShareMessages from '../../components/ShareMessages.tsx';
import StarredMessages from '../../components/StarredMessages.tsx';
import NoChat from '../../assets/Illustration/NoChat.tsx';
import {Link, useParams} from 'react-router-dom';
import Conversation from './Conversation.tsx';


const GeneralApp = () => {
    const theme = useTheme();

    const {sidebar} = useAppSelector<AppState>((state) => state.app);

    const {id} = useParams();
    return (
        <Stack
            direction={`row`}
            width={`100%`}
            sx={{
                overflow: 'hidden',
            }}
        >
            <Chats/>
            <Box
                sx={{
                    width: sidebar.open ? 'calc(100vw - 720px)' : 'calc(100vw - 20px)',
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
                }}
            >
                {/*Chats*/}
                {
                    // chat_type === "individual" &&
                    id ? (
                        <Conversation id={parseInt(id)}/>
                    ) : (
                        <Stack spacing={2} sx={{height: '100%', width: '100%'}} alignItems="center"
                               justifyContent={'center'}>
                            <NoChat/>
                            <Typography variant="subtitle2">
                                Select a conversation or start a{' '}
                                <Link
                                    style={{
                                        color: theme.palette.primary.main,
                                        textDecoration: 'none',
                                    }}
                                    to="/"
                                >
                                    new one
                                </Link>
                            </Typography>
                        </Stack>
                    )
                }
            </Box>

            {sidebar.open &&
                ((): any => {
                    switch (sidebar.type) {
                        case 'CONTACT':
                            return <Contact/>;
                        case 'STARRED':
                            return <StarredMessages/>;
                        case 'SHARED':
                            return <ShareMessages/>;
                    }
                })()}
        </Stack>
    );
};

export default GeneralApp
