import {Box, Divider, IconButton, Stack} from "@mui/material";
import logo from "../../assets/images/logo.ico";
import {INavButton, NAV_BUTTONS, Nav_Setting} from "../../data";
import AntSwitch from "../../components/AntSwitch.tsx";
import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import useSettings from "../../hooks/useSettings.ts";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {AppState, updateTab} from "../../redux/slices/app.ts";
import {useNavigate} from "react-router-dom";
import ProfileMenu from "./ProfileMenu.tsx";

const getPath = (index: number): string => {
    switch (index) {
        case 0:
            return "/app";

        case 1:
            // return "/group";
            return "/friends";

        case 2:
            return "/call";

        case 3:
            return "/settings";
        default:
            return "/404";
    }
};


const SideBar = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch()

    const {onToggleMode} = useSettings()
    const {tab, avatarUrl} = useAppSelector<AppState>((state) => state.app);
    const {accessToken} = useAppSelector((state) => state.auth);
    const selectedTab = tab;
    const navigate = useNavigate();

    const handleChangeTab = (index: number) => {
        dispatch(updateTab({tab: index}));
        navigate(getPath(index));
    };


    const [selected, setSelected] = React.useState<number>(0)

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            p={2}
            sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
                height: '100vh',
                width: 100,
            }}>
            <Stack direction={`column`} alignItems={`center`} justifyContent={`space-between`} sx={{
                height: '100%',
            }} spacing={3}>

                <Stack alignItems={`center`} spacing={4}>

                    <Box sx={{
                        backgroundColor: theme.palette.primary.main,
                        height: 64,
                        width: 64,
                        borderRadius: 1.5,
                    }}>
                        <img src={logo} alt="logo" style={{
                            width: 64,
                            height: 64,
                        }}/>
                    </Box>
                    <Stack spacing={3}
                           direction={`column`}
                           alignItems={`center`}
                           sx={{
                               width: 'max-content',
                           }}>
                        {
                            NAV_BUTTONS.map((el: INavButton) => {
                                return el.index === selectedTab ? (
                                    <Box
                                        key={el.index}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            borderRadius: 1.5,
                                        }}
                                        p={1}
                                    >
                                        <IconButton
                                            onClick={() => {
                                                handleChangeTab(el.index);
                                            }}
                                            sx={{width: "max-content", color: "#ffffff"}}
                                        >
                                            {el.icon}
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <IconButton
                                        key={el.index}
                                        onClick={() => {
                                            handleChangeTab(el.index);
                                        }}
                                        sx={{
                                            width: "max-content",
                                            color:
                                                theme.palette.mode === "light"
                                                    ? "#080707"
                                                    : theme.palette.text.primary,
                                        }}
                                    >
                                        {el.icon}
                                    </IconButton>
                                );
                            })}
                        <Divider sx={{
                            width: '48px',
                        }}/>
                        {Nav_Setting.map((el) => {
                            return el.index == selectedTab ? (
                                <Box
                                    key={el.index}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 1.5,
                                    }}
                                    p={1}
                                >
                                    <IconButton
                                        onClick={() => {
                                            handleChangeTab(el.index);
                                        }}
                                        sx={{width: "max-content", color: "#ffffff"}}
                                    >
                                        {el.icon}
                                    </IconButton>
                                </Box>
                            ) : (
                                <IconButton
                                    key={el.index}
                                    onClick={() => {
                                        handleChangeTab(el.index);

                                        // dispatch(UpdateTab(el.index));
                                    }}
                                    sx={{
                                        width: "max-content",
                                        color:
                                            theme.palette.mode === "light"
                                                ? "#080707"
                                                : theme.palette.text.primary,
                                    }}
                                >
                                    {el.icon}
                                </IconButton>
                            );
                        })}
                    </Stack>
                </Stack>

                <Stack justifyContent={`center`} alignItems={`center`} spacing={2}>
                    <AntSwitch
                        onChange={onToggleMode}
                        defaultChecked/>
                    {/* Profile Menu */}
                    <ProfileMenu/>
                </Stack>
            </Stack>


        </Box>
    )
}

export default SideBar;