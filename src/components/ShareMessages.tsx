import {Box, Grid, IconButton, Stack, Tab, Tabs, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ArrowLeft} from "phosphor-react";
import React, {useState} from "react";
import {faker} from "@faker-js/faker";
import {Shared_docs, Shared_links} from "../data";
import {DocMsg, LinkMessage} from "../sections/dashboard/Conversation";
import {useAppDispatch} from "../redux/store.ts";
import {UpdateSidebarType} from "../redux/slices/app.ts";

const ShareMessages = () => {
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
                <Tabs
                    onChange={handleChange}
                    value={value}
                    sx={{
                        px: 2,
                        pt: 1,
                    }}>
                    <Tab label={`Media`}/>
                    <Tab label={`Links`}/>
                    <Tab label={`Docs`}/>
                </Tabs>

                {/*Body*/}
                <Stack
                    height={`100%`}
                    sx={{
                        position: 'relative',
                        flexGrow: 1,
                        overflowY: 'scroll',
                    }}
                    p={3}
                    spacing={value === 1 ? 1 : 3}
                >

                    {
                        (() => {
                            switch (value) {
                                case 0:
                                    return (
                                        <Grid container spacing={2}>
                                            {
                                                Array.from({length: 10}).map((_, index) => {
                                                    return <Grid key={index} item xs={4}>
                                                        <img src={faker.image.avatar()} alt={faker.name.fullName()}
                                                             width={`100%`}/>
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    )
                                case 1:
                                    return Shared_links.map((link, index) =>
                                        <LinkMessage key={index} item={link} menu={false}/>)
                                case 2:
                                    return Shared_docs.map((doc, index) =>
                                        <DocMsg key={index} item={doc} menu={false}/>)
                            }
                        })()
                    }

                </Stack>
            </Stack>
        </Box>
    )
}

export default ShareMessages