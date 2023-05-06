import {IconButton, Stack} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "./Search";
import {MagnifyingGlass, UserCirclePlus, UsersThree} from "phosphor-react";
import {useState} from "react";
import SendFriendRequest from "../sections/dashboard/SendFriendRequest.tsx";

export const ContactSearch = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    return (
        <>
            <Stack width={`100%`} direction={`row`} justifyContent={`space-between`} alignItems={`center`}>
                <Search>
                    <SearchIconWrapper>
                        <MagnifyingGlass color={`#709CE6`}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        inputProps={{'aria-label': 'search'}}
                        placeholder="Search…"/>
                </Search>
                <IconButton onClick={handleOpenDialog}>
                    <UserCirclePlus size={24}/>
                </IconButton>
                <IconButton>
                    <UsersThree size={24} weight="bold"/>
                </IconButton>
            </Stack>
            {openDialog &&
                <SendFriendRequest open={openDialog} handleClose={handleCloseDialog}/>}
        </>

    )
}

export default ContactSearch