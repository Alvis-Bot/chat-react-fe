import {Navigate, Outlet} from "react-router-dom";
import {Container, Stack} from "@mui/material";
import logo from '../../assets/images/logo.ico'
import {useAppSelector} from "../../redux/store.ts";
import {AuthState} from "../../redux/slices/auth.ts";
import React from "react";

const AuthLayout = () => {
    const {isLoggedIn} = useAppSelector<AuthState>((state) => state.auth);
    if (isLoggedIn) {
        return <Navigate to={`/app`}/>;
    }
    return (
        <>
            <Container sx={{mt: 5}} maxWidth="sm">
                <Stack spacing={5}>
                    <Stack
                        sx={{width: "100%"}}
                        direction="column"
                        alignItems={"center"}
                    >
                        <img style={{height: 120, width: 120}} src={logo} alt="Logo"/>
                    </Stack>
                    <Outlet/>
                </Stack>
            </Container>
        </>
    )
}

export default AuthLayout