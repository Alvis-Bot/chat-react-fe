import {useTheme} from '@mui/material/styles';
import {Box, Fab, IconButton, InputAdornment, Stack, styled, TextField, Tooltip} from '@mui/material';
import {Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User} from 'phosphor-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React, {FC, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store.ts';
import {AuthState} from '../../redux/slices/auth.ts';
import axiosInstance from '../../utils/axios.ts';
import {MessageSubType} from '../../type.ts';
// @ts-ignore
import {BaseEmoji} from 'emoji-mart';

const StyledInput = styled(TextField)(({theme}) => ({
    '& .MuiInputBase-input': {
        paddingTop: '12px !important',
        paddingBottom: '12px !important',
    },
}));

interface IChatInputProps {
    setOpenPicker: React.Dispatch<React.SetStateAction<boolean>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    openPicker: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
}

interface IAction {
    color: string;
    icon: JSX.Element;
    y: number;
    title: string;
}

const ACTIONS: IAction[] = [
    {
        color: '#1B8CFE',
        icon: <Image size={24}/>,
        y: 102,
        title: 'Photo/Video',
    },
    {
        color: '#1B8CFE',
        icon: <Sticker size={24}/>,
        y: 172,
        title: 'Sticker',
    },
    {
        color: '#1B8CFE',
        icon: <Camera size={24}/>,
        y: 242,
        title: 'Image',
    },
    {
        color: '#0159b2',
        icon: <File size={24}/>,
        y: 312,
        title: 'Document',
    },
    {
        color: '#013f7f',
        icon: <User size={24}/>,
        y: 382,
        title: 'Contact',
    },
];
const ChatInput = (props: IChatInputProps) => {
    const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    const [openActions, setOpenActions] = React.useState(false);
    return (
        <StyledInput
            value={props.content}
            inputRef={props.inputRef}
            onChange={(e) => props.setContent(e.target.value)}
            onMouseUp={(e) => {
                if (e.target instanceof HTMLInputElement) {
                    props.setCursorPosition(e.target.selectionStart!);
                }
            }}
            onKeyDown={(e) => {
                if (e.target instanceof HTMLInputElement) {
                    console.log(e.key)
                    if (ARROW_KEYS.includes(e.key)) {
                        props.setCursorPosition(e.target.selectionStart! - 1);
                    }

                }
            }}
            fullWidth
            placeholder={`Type a message...`}
            variant={`filled`}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{width: 'max-content'}}>
                        <Stack
                            sx={{
                                position: 'relative',
                                display: openActions ? 'inline-block' : 'none',
                            }}
                        >
                            {ACTIONS.map((item: IAction, index: number) => (
                                <Tooltip key={index} placement="right" title={item.title}>
                                    <Fab
                                        sx={{
                                            position: 'absolute',
                                            top: -item.y,
                                            backgroundColor: item.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {item.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>
                        <InputAdornment position={`end`}>
                            <IconButton onClick={() => setOpenActions(!openActions)}>
                                <LinkSimple/>
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <InputAdornment position={`end`}>
                        <IconButton onClick={() => props.setOpenPicker((prev) => !prev)}>
                            <Smiley/>
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

function linkify(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
}

function containsUrl(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}

interface IFooterProps {
    id: number;
}

const Footer: FC<IFooterProps> = ({id}) => {
    const theme = useTheme();
    const {isLoggedIn, accessToken} = useAppSelector<AuthState>((state) => state.auth);
    const dispatch = useAppDispatch();
    const [openPicker, setOpenPicker] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [cursorPosition, setCursorPosition] = React.useState(-1);
    const [content, setContent] = React.useState('');

    const handleEmojiClick = (emoji: BaseEmoji) => {
        setContent((prev) => prev.slice(0, cursorPosition) + emoji.native + prev.slice(cursorPosition));
    };

    const handleSend = () => {
        if (content.trim() !== '') {
            const message = {
                content: content,
                id: id,
                subtype: containsUrl(content) ? MessageSubType.LINK : MessageSubType.TEXT,
            };
            axiosInstance.post('/messages', message).then((res) => {
                console.log(res.data);
            });
        }
    };

    return (
        <Box
            p={2}
            sx={{
                width: '100%',
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
                boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
            }}
        >
            <Stack direction={`row`} alignItems={`center`} spacing={3}>
                <Stack width={`100%`}>
                    <Box
                        sx={{
                            display: openPicker ? 'block' : 'none',
                            zIndex: 10,
                            position: 'fixed',
                            bottom: 81,
                            right: 100,
                        }}
                    >
                        <Picker
                            theme={theme.palette.mode}
                            data={data}
                            onEmojiSelect={(emoji: BaseEmoji) => {
                                handleEmojiClick(emoji);
                            }}
                        />
                    </Box>
                    <ChatInput
                        inputRef={inputRef}
                        openPicker={openPicker}
                        content={content}
                        setContent={setContent}
                        setOpenPicker={setOpenPicker}
                        setCursorPosition={setCursorPosition}
                    />
                </Stack>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5,
                    }}
                >
                    <Stack
                        sx={{
                            height: '100%',
                            width: '100%',
                        }}
                        alignItems={`center`}
                        justifyContent={`center`}
                        direction={`row`}
                    >
                        <IconButton onClick={handleSend}>
                            <PaperPlaneTilt color={`#fff`}/>
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default Footer