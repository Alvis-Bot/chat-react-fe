import React, {FC} from "react";
import {TransitionProps} from "@mui/material/transitions";
import {Button, Dialog, DialogContent, DialogTitle, Slide, Stack} from "@mui/material";
import * as Yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import useProfile from "../../hooks/useProfile.ts";
import {useAppDispatch} from "../../redux/store.ts";
import {sendFriendRequestThunk} from "../../redux/slices/friendRequest.ts";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface SendFriendRequestFormProps {
    handleClose: () => void;
}

export type ISendFriendRequestForm = {
    email: string;
    description: string
}

const SendFriendRequestForm: FC<SendFriendRequestFormProps> = ({handleClose}) => {

    const {profile} = useProfile()
    const dispatch = useAppDispatch()
    const newFriend = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        description: Yup.string(),
    });

    const defaultValues = {
        email: "",
        description: `Hi, I'm ${profile.firstName} ${profile.lastName}`,
    };

    const methods = useForm({
        resolver: yupResolver(newFriend),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: {isSubmitting, isValid},
    } = methods;

    const onSubmit: SubmitHandler<ISendFriendRequestForm> = data => {
        console.log(data);
        dispatch(sendFriendRequestThunk(data))
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="email" label="Email"/>
                <RHFTextField name="description" label="Description"/>
                <Stack
                    spacing={2}
                    direction={"row"}
                    alignItems="center"
                    justifyContent={"end"}
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
}


interface SendFriendRequestProps {
    handleClose: () => void;
    open: boolean;
}

const SendFriendRequest: FC<SendFriendRequestProps> = ({handleClose, open}) => {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{p: 4}}
        >
            <DialogTitle>Friend Add</DialogTitle>
            <DialogContent>
                {/* Create Group Form */}
                <Stack>
                    <SendFriendRequestForm handleClose={handleClose}/>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default SendFriendRequest