import React, {useEffect} from "react";
import {Avatar, Box, Fade, Menu, MenuItem, Stack} from "@mui/material";

import {PROFILE_MENU} from "../../data";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {AppState, fetchImage} from "../../redux/slices/app.ts";
import {signOut} from "../../redux/slices/auth.ts";
import useProfile from "../../hooks/useProfile.ts";

const ProfileMenu = () => {
    const {user, avatarUrl} = useAppSelector<AppState>((state) => state.app);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const dispatch = useAppDispatch();
    const {profile} = useProfile()
    const {accessToken} = useAppSelector((state) => state.auth);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        dispatch(fetchImage({
            accessToken: accessToken,
            avatar: profile.avatar
        }));
    }, []);
    console.log(avatarUrl)


    return (
        <>
            <Avatar
                id="profile-positioned-button"
                aria-controls={openMenu ? "profile-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                alt={``}
                src={avatarUrl}
                onClick={handleClick}
            />
            <Menu
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                TransitionComponent={Fade}
                id="profile-positioned-menu"
                aria-labelledby="profile-positioned-button"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box p={1}>
                    <Stack spacing={1}>
                        {PROFILE_MENU.map((el, idx) => (
                            <MenuItem key={idx} onClick={handleClose}>
                                <Stack
                                    onClick={() => {
                                        if (idx === 0) {
                                            navigate("/profile");
                                        } else if (idx === 1) {
                                            navigate("/settings");
                                        } else {
                                            dispatch(signOut());
                                            // socket.emit("end", {user_id});
                                        }
                                    }}
                                    sx={{width: 100}}
                                    direction="row"
                                    alignItems={"center"}
                                    justifyContent="space-between"
                                >
                                    <span>{el.title}</span>
                                    {el.icon}
                                </Stack>{" "}
                            </MenuItem>
                        ))}
                    </Stack>
                </Box>
            </Menu>
        </>
    );
};

export default ProfileMenu;
