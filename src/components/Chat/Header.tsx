import {Avatar, Box, Divider, IconButton, Stack, Typography} from "@mui/material";
import StyledBadge from "../StyledBadge.tsx";
import {CaretDown, MagnifyingGlass, VideoCamera} from "phosphor-react";
import {Phone} from "@phosphor-icons/react";
import {useTheme} from "@mui/material/styles";
import {ToggleSidebar} from "../../redux/slices/app.ts";
import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {getRecipientFromConversation} from "../ChatElement.tsx";
import {selectConversationById} from "../../redux/slices/conversation.ts";
import useProfile from "../../hooks/useProfile.ts";

interface HeaderProps {
    id: number
}

const Header: FC<HeaderProps> = ({id}) => {
    const theme = useTheme();

    const dispatch = useAppDispatch();
    const {profile} = useProfile();
    const conversation = useAppSelector((state) => selectConversationById(state.conversation, id));
    const recipient = conversation && getRecipientFromConversation(conversation, profile);


    return (
        <Box
            p={2}
            sx={{
                width: '100%',
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
                boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
            }}>
            <Stack
                alignItems={`center`}
                justifyContent={`space-between`}
                direction={`row`}
                sx={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <Stack
                    onClick={() => {
                        dispatch(ToggleSidebar())
                    }}
                    direction={`row`} spacing={2}>
                    <Box>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                            variant="dot"
                        >
                            <Avatar src={``} alt={`${recipient?.firstName} ${recipient?.lastName}`}/>
                        </StyledBadge>
                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant="subtitle2">
                            {`${recipient?.firstName} ${recipient?.lastName}`}
                        </Typography>
                        <Typography variant="caption">Online</Typography>
                    </Stack>
                </Stack>

                <Stack direction={`row`} spacing={2}>
                    <IconButton>
                        <VideoCamera/>
                    </IconButton>
                    <IconButton>
                        <Phone/>
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass/>
                    </IconButton>
                    <Divider orientation={`vertical`} flexItem/>
                    <IconButton>
                        <CaretDown/>
                    </IconButton>

                </Stack>

            </Stack>
        </Box>
    )
}

export default Header;