import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    Slide,
    Stack,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Bell, CaretRight, Prohibit, Star, Trash, VideoCamera, X} from "phosphor-react";
import {useAppDispatch} from "../redux/store.ts";
import {ToggleSidebar, UpdateSidebarType} from "../redux/slices/app.ts";
import {faker} from "@faker-js/faker";
import {Phone} from "@phosphor-icons/react";
import AntSwitch from "./AntSwitch.tsx";
import {SimpleBarStyle} from "./Scrollbar.tsx";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface BlockDialogProps {
    open: boolean,
    handleClose: () => void
}

const BlockDialog = ({open, handleClose}: BlockDialogProps) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Block this contact</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}


const DeleteDialog = ({open, handleClose}: BlockDialogProps) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Delete this chat</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}


const Contact = () => {

    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [openBlock, setOpenBlock] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleCloseBlock = () => {
        setOpenBlock(false);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    return (
        <Box sx={{
            width: 320,
            height: '100vh',
        }}>

            <Stack height={`100%`}>
                <Box sx={{
                    boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
                    width: '100%',
                    backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
                }}>

                    <Stack
                        sx={{
                            height: '100%',
                            p: 2,
                        }}
                        direction={`row`}
                        alignItems={`center`}
                        justifyContent={`space-between`}
                        spacing={3}
                    >

                        <Typography variant={`subtitle2`}>Contact Info</Typography>
                        <IconButton
                            onClick={() => {
                                dispatch(ToggleSidebar())
                            }}
                        >
                            <X color={`#000`} size={24}/>
                        </IconButton>
                    </Stack>
                </Box>

                {/*Body*/}

                <SimpleBarStyle clickOnTrack={false} sx={{
                    height: '100%',
                }}>
                    <Stack
                        sx={{
                            height: '100%',
                            position: 'relative',
                            flexGrow: 1,
                        }}
                        p={3}
                        spacing={3}
                    >
                        <Stack
                            alignItems={`center`}
                            direction={`row`}
                            spacing={2}
                        >
                            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} sx={{
                                width: 64,
                                height: 64,
                            }}/>

                            <Stack spacing={0.5}>
                                <Typography fontWeight={600} variant={`subtitle2`}>{faker.name.fullName()}</Typography>
                                <Typography variant={`body2`}
                                            fontWeight={500}
                                >{
                                    `+84 0394021814`
                                }</Typography>
                            </Stack>

                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={"space-evenly"}
                        >
                            <Stack alignItems={"center"} spacing={1}>
                                <IconButton>
                                    <Phone/>
                                </IconButton>

                                <Typography variant="overline">Voice</Typography>
                            </Stack>
                            <Stack alignItems={"center"} spacing={1}>
                                <IconButton>
                                    <VideoCamera/>
                                </IconButton>
                                <Typography variant="overline">Video</Typography>
                            </Stack>
                        </Stack>
                        <Divider/>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle2" fontWeight={600}>
                                About
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                                {`Lo`}
                            </Typography>
                        </Stack>
                        <Divider/>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={"space-between"}
                        >
                            <Typography variant="subtitle2">Media, Links & Docs</Typography>
                            <Button
                                onClick={() => {
                                    dispatch(UpdateSidebarType("SHARED"));
                                }}
                                endIcon={<CaretRight/>}
                            >
                                401
                            </Button>
                        </Stack>
                        <Stack direction={"row"} alignItems="center" spacing={2}>
                            {[1, 2, 3].map((el) => (
                                <Box>
                                    <img
                                        width={`100%`}
                                        src={faker.image.city()} alt={faker.internet.userName()}/>
                                </Box>
                            ))}
                        </Stack>
                        <Divider/>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={"space-between"}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Star size={21}/>
                                <Typography variant="subtitle2">Starred Messages</Typography>
                            </Stack>

                            <IconButton
                                onClick={() => {
                                    dispatch(UpdateSidebarType("STARRED"));
                                }}
                            >
                                <CaretRight/>
                            </IconButton>
                        </Stack>
                        <Divider/>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={"space-between"}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Bell size={21}/>
                                <Typography variant="subtitle2">Mute Notifications</Typography>
                            </Stack>

                            <AntSwitch/>
                        </Stack>
                        <Divider/>
                        <Typography variant="body2">1 group in common</Typography>
                        <Stack direction="row" alignItems={"center"} spacing={2}>
                            <Avatar src={faker.image.imageUrl()} alt={faker.name.fullName()}/>
                            <Stack direction="column" spacing={0.5}>
                                <Typography variant="subtitle2">Camel’s Gang</Typography>
                                <Typography variant="caption">
                                    Owl, Parrot, Rabbit , You
                                </Typography>
                            </Stack>
                        </Stack>
                        <Divider/>
                        <Stack direction="row" alignItems={"center"} spacing={2}>
                            <Button
                                onClick={() => {
                                    setOpenBlock(true);
                                }}
                                fullWidth
                                startIcon={<Prohibit/>}
                                variant="outlined"
                            >
                                Block
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpenDelete(true);
                                }}
                                fullWidth
                                startIcon={<Trash/>}
                                variant="outlined"
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Stack>
                </SimpleBarStyle>
            </Stack>
            {openBlock && <BlockDialog handleClose={handleCloseBlock} open={openBlock}/>}
            {openDelete && <DeleteDialog handleClose={handleCloseDelete} open={openDelete}/>}

        </Box>
    );
};

export default Contact;