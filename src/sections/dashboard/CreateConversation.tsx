import React from "react";
import * as Yup from "yup";
import {Button, Dialog, DialogContent, DialogTitle, Slide, Stack,} from "@mui/material";

import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import {RHFTextField} from "../../components/hook-form";
import {TransitionProps} from "@mui/material/transitions";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {sendFriendRequestThunk} from "../../redux/slices/friendRequest.ts";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface CreateConversationFormProps {
    handleClose: () => void;
}

export interface ICreatConversationForm {
    email: string;
    description: string
}

const CreateConversationForm = ({handleClose}: CreateConversationFormProps) => {

    const {user} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    const conversation = Yup.object().shape({
        email: Yup.string(),
        description: Yup.string(),
    });

    const defaultValues = {
        email: 'vietvodinh12547@gmail.com',
        description: `Hi, I'm ${user.firstName} ${user.lastName}`
    };

    const methods = useForm({
        resolver: yupResolver(conversation),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: {isSubmitting, isValid},
    } = methods;

    const onSubmit: SubmitHandler<ICreatConversationForm> = data => {
        dispatch(sendFriendRequestThunk(data))

    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="email" label="Email"/>
                <RHFTextField
                    rows={2}
                    name="description" label="Description"/>
                <Stack
                    spacing={2}
                    direction={"row"}
                    alignItems="center"
                    justifyContent={"end"}
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleClose} variant="contained">
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

interface CreateGroupProps {
    open: boolean;
    handleClose: () => void;
}

const CreateConversation = ({open, handleClose}: CreateGroupProps) => {
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
            <DialogTitle>Create Conversation</DialogTitle>
            <DialogContent>
                {/* Create Group Form */}
                <Stack pt={3}>
                    <CreateConversationForm handleClose={handleClose}/>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default CreateConversation;