import React from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {CaretLeft} from "phosphor-react";
import ProfileForm from "../../../sections/dashboard/settings/ProfileForm.tsx";
import {useNavigate} from "react-router-dom";
import {SimpleBarStyle} from "../../../components/Scrollbar.tsx";
import NoChat from "../../../assets/Illustration/NoChat.tsx";
// import { FetchUserProfile } from "../../../redux/slices/app";

const Profile = () => {

    const navigate = useNavigate();


    return (
        <>
            <Stack direction="row" width={`100%`} height={`100vh`}>
                {/* Left Pane */}
                <Box
                    sx={{
                        height: "100vh",
                        width: 320,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background.default,

                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <SimpleBarStyle sx={{minHeight: 300}}>

                        <Stack p={4} spacing={5}>
                            {/* Header */}
                            <Stack direction="row" alignItems={"center"} spacing={3}>
                                <IconButton
                                    onClick={() => {
                                        navigate("/app");
                                    }}
                                >
                                    <CaretLeft size={24} color={"#4B4B4B"}/>
                                </IconButton>

                                <Typography variant="h5">Profile</Typography>
                            </Stack>

                            {/* Profile Edit Form */}
                            <ProfileForm/>
                        </Stack>
                    </SimpleBarStyle>
                </Box>


                {/* Right Pane */}
                <Box
                    sx={{
                        height: "100%",
                        width: "calc(100vw - 420px )",
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "#FFF"
                                : theme.palette.background.paper,
                        borderBottom: "6px solid #0162C4",
                    }}
                >
                    <Stack justifyContent={`center`} alignItems={`center`} width={`100%`} height={`100%`}>
                        <NoChat/>
                    </Stack>
                </Box>
            </Stack>
        </>
    );
};

export default Profile;
