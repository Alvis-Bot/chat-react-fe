import React, {useState} from "react";
import {Box, Divider, IconButton, Menu, MenuItem, Stack, Typography,} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import {DotsThreeVertical, DownloadSimple, Image} from "phosphor-react";
import Embed from "react-embed";
import {IChatData, MESSAGE_OPTIONS} from "../../data";
import {Message} from "../../type.ts";
import {useAppSelector} from "../../redux/store.ts";

const MessageOption = () => {
    const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <DotsThreeVertical
                size={20}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} px={1}>
                    {MESSAGE_OPTIONS.map((option, index) => (
                        <MenuItem key={index} onClick={handleClose}>{option.title}</MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    );
};

const TextMessage = ({menu, item, incoming}: IMessages) => {
    const theme = useTheme();
    const {user} = useAppSelector((state) => state.app)
    return (
        <Stack direction="row" justifyContent={incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Typography
                    variant="body2"
                    color={incoming ? theme.palette.text.primary : "#fff"}
                >
                    {item.content}
                </Typography>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};

interface IMessage {
    item: Message
    incoming: boolean
}

interface IMessages {
    item: Message
    incoming: boolean
    menu: any
}

const MediaMsg = ({menu, item, incoming}: IMessages) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={item.author.id ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={1}>
                    <img
                        src={``}
                        alt={item.content}
                        style={{maxHeight: 210, borderRadius: "10px"}}
                    />
                    <Typography
                        variant="body2"
                        color={incoming ? theme.palette.text.primary : "#fff"}
                    >
                        {item.content}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};
const DocMsg = ({menu, item, incoming}: IMessages) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <Image size={48}/>
                        <Typography variant="caption">Abstract.png</Typography>
                        <IconButton>
                            <DownloadSimple/>
                        </IconButton>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={incoming ? theme.palette.text.primary : "#fff"}
                    >
                        {item.content}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};

function checkImageUrl(url: string) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const LinkMessage = ({menu, item, incoming}: IMessages) => {
    const theme = useTheme();
    console.log(checkImageUrl(item.content))
    return (
        <Stack direction="row" justifyContent={incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: incoming
                        ? '#fff'
                        : '#007aff',
                    borderRadius: 1.5,
                    width: "100%",
                    maxWidth: 610,
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        direction="column"
                        spacing={3}
                        alignItems="start"
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: 1,
                        }}
                    >
                        {checkImageUrl(item.content) ? (
                            <img src={item.content} alt={item.content} style={{
                                width: '100%',
                                height: 'auto',
                            }}/>
                        ) : (
                            <Embed url={item.content}/>
                        )}
                    </Stack>
                    <Typography variant="body2">
                        <a href={item.content} target="_blank">{item.content}</a>
                    </Typography>
                    <Stack textAlign={`center`} justifyContent={`flex-end`} pt={1}>
                        <Typography
                            variant={"overline"}
                            sx={{
                                color: incoming ? '#000' : "#fff",
                                textAlign: "right",
                            }}
                        >
                            {/*<a href={item.content} target="_blank">{item.content}</a>*/}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};
const ReplyMsg = ({menu, item, incoming}: IMessages) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: incoming
                        ? alpha(theme.palette.background.paper, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: alpha(theme.palette.background.paper, 1),

                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body2" color={theme.palette.text.primary}>
                            {item.content}
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body2"
                        color={incoming ? theme.palette.text.disabled : "#fff"}
                    >
                        {/*{item.reply}*/}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOption/>}
        </Stack>
    );
};
const Timeline = (props: IChatData) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent="space-between" sx={{"& hr": {width: '46%'}}}>
            <Divider component="hr"/>
            <Typography variant="caption" sx={{color: theme.palette.text.primary}}>
                {props.text}
            </Typography>
            <Divider component="hr"/>
        </Stack>
    );
};


export {Timeline, MediaMsg, LinkMessage, DocMsg, TextMessage, ReplyMsg};