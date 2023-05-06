import {Avatar, Badge, Box, Stack, styled, Typography} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import StyledBadge from "./StyledBadge.tsx";
import {useAppDispatch} from "../redux/store.ts";
import {Conversation, User} from "../type.ts";
import {faker} from "@faker-js/faker";
import {useNavigate, useParams} from "react-router-dom";
import useProfile from "../hooks/useProfile.ts";


const StyledChatBox = styled(Box)(({theme}) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

export const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {hour: 'numeric', hour12: true, minute: 'numeric'})
}

const truncateText = (value: string, length: number) => {
    return value?.length > length ? `${value?.slice(0, length)}...` : value;
};

export const getRecipientFromConversation = (
    conversation: Conversation,
    user: User
) => {
    if (!conversation) return null;
    return user.id === conversation.creator.id
        ? conversation?.recipient
        : conversation?.creator;
};


const ChatElement = (props: Conversation) => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {profile} = useProfile();
    const navigate = useNavigate();

    const recipient = getRecipientFromConversation(props, profile);
    const isSelected = id && parseInt(id) === props.id;
    const theme = useTheme();
    return (
        <StyledChatBox
            onClick={() => {
                navigate(`/chat/${props.id}`)
            }}
            p={2}
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: isSelected
                    ? theme.palette.mode === "light"
                        ? alpha(theme.palette.primary.main, 1)
                        : theme.palette.primary.main
                    : theme.palette.mode === "light"
                        ? "#fff"
                        : theme.palette.background.paper,
            }}>
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                        variant="dot"
                    >
                        <Avatar alt={""} src={faker.image.avatar()}/>
                    </StyledBadge>
                    <Stack spacing={0.3}>
                        <Typography
                            sx={{
                                color: isSelected ? "#fff" : theme.palette.text.primary,
                            }}
                            variant="subtitle2">{`${recipient?.firstName} ${recipient?.lastName}`}</Typography>
                        <Typography sx={{
                            color: isSelected ? "#fff" : theme.palette.text.primary,
                        }} variant="caption">{truncateText(props.lastMessage?.content, 15)}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: isSelected ? "#fff" : theme.palette.text.primary,

                        }} variant="caption">
                        {
                            formatTime(props.lastMessage?.createdAt)
                        }
                    </Typography>
                    <Badge
                        className="unread-count"
                        color={isSelected ? "secondary" : "primary"}
                        badgeContent={1}
                    />
                </Stack>
            </Stack>

        </StyledChatBox>
    )
}

export default ChatElement