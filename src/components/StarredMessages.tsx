import {Box, IconButton, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useAppDispatch} from "../redux/store.ts";
import {UpdateSidebarType} from "../redux/slices/app.ts";
import {ArrowLeft} from "phosphor-react";
import React, {useState} from "react";
import Message from "./Chat/Message.tsx";

const StarredMessages = () => {
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const dispatch = useAppDispatch();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{width: 320, maxHeight: "100vh"}}>
            <Stack sx={{height: "100%"}}>
                <Box
                    sx={{
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        width: "100%",
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background.default,
                    }}
                >
                    <Stack
                        sx={{height: "100%", p: 2}}
                        direction="row"
                        alignItems={"center"}
                        spacing={3}
                    >
                        <IconButton
                            onClick={() => {
                                dispatch(UpdateSidebarType("CONTACT"));
                            }}
                        >
                            <ArrowLeft/>
                        </IconButton>
                        <Typography variant="subtitle2">Starred Messages</Typography>
                    </Stack>
                </Box>

                {/*Body*/}
                <Stack
                    height={`100%`}
                    sx={{
                        position: 'relative',
                        flexGrow: 1,
                        overflowY: 'scroll',
                    }}
                    p={3}
                    spacing={3}
                >
                    <Message/>
                </Stack>
            </Stack>
        </Box>
    )
}

export default StarredMessages