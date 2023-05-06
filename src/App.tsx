import Router from "./router";
import {ThemeProvider} from "./theme";
import SettingsProvider from "./context/SettingsContext.tsx";
import 'simplebar-react/dist/simplebar.min.css';
import {useAppDispatch} from "./redux/store.ts";
import React from "react";
import {ProfileProvider} from "./context/FrofileContext.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {useTheme} from "@mui/material/styles";

function App() {
    const dispatch = useAppDispatch();

    const theme = useTheme();
    return (
        <>

            <SettingsProvider>
                <ThemeProvider>
                    <ProfileProvider>
                        <Router/>
                    </ProfileProvider>
                </ThemeProvider>
            </SettingsProvider>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme.palette.mode === "dark" ? "dark" : "light"}
            />

        </>
    )
}

export default App
