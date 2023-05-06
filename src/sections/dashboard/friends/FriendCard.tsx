import {Button, Card, CardActions, CardContent, Stack} from '@mui/material';
import FormProvider, {RHFTextField} from '../../../components/hook-form';

import InfoElement from '../../../components/InfoElement.tsx';
import {faker} from '@faker-js/faker';
import * as Yup from 'yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
    acceptFriendRequestThunk,
    cancelFriendRequestThunk,
    rejectFriendRequestThunk,
} from '../../../redux/slices/friendRequest.ts';
import {useAppDispatch} from '../../../redux/store.ts';
import {FriendRequest, FriendRequestAction} from '../../../type.ts';
import useProfile from '../../../hooks/useProfile.ts';
import {useTheme} from '@mui/material/styles';

interface IFriendRequestCard {
    readonly description: string;
}

export const FriendRequestCard = (props: FriendRequest) => {
    console.log(props);

    const dispatch = useAppDispatch();
    const {profile} = useProfile();
    const theme = useTheme();

    const isIncoming = profile.id === props.receiver?.id;

    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    });

    const defaultValues = {
        description: props.description,
    };

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const {handleSubmit} = methods;

    const onSubmit: SubmitHandler<IFriendRequestCard> = (data) => {
        console.log(data);
    };

    const handleFriendRequest = (action: FriendRequestAction) => {
        switch (action) {
            case FriendRequestAction.ACCEPT:
                dispatch(acceptFriendRequestThunk(props.id));
                break;
            case FriendRequestAction.REJECT:
                dispatch(rejectFriendRequestThunk(props.id));
                break;
            case FriendRequestAction.CANCEL:
                dispatch(cancelFriendRequestThunk(props.id))
                break;
        }
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            }}
        >
            <CardContent
                sx={{
                    flex: 1,
                }}
            >
                <InfoElement
                    src={faker.image.avatar()}
                    firstname={props.receiver?.firstName}
                    lastname={props.receiver?.lastName}
                    description={'27/03 - From Chats'}
                />
                <Stack mt={3}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <RHFTextField
                            fullWidth
                            size={`small`}
                            sx={{
                                fontSize: '9px !important',
                            }}
                            multiline
                            rows={2}
                            name="description"
                        />
                    </FormProvider>
                </Stack>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                {isIncoming ? (
                    <>
                        <Button
                            fullWidth
                            size="large"
                            sx={{
                                padding: 1.5,
                            }}
                            onClick={() => handleFriendRequest(FriendRequestAction.REJECT)}
                        >
                            Reject
                        </Button>
                        <Button
                            fullWidth
                            size="large"
                            sx={{
                                padding: 1.5,
                            }}
                            variant={`outlined`}
                            onClick={() => handleFriendRequest(FriendRequestAction.ACCEPT)}
                        >
                            Accept
                        </Button>
                    </>
                ) : (
                    <Button
                        fullWidth
                        size="large"
                        sx={{
                            padding: 1.5,
                            fontSize: theme.typography.h6.fontSize,
                        }}
                        onClick={() => handleFriendRequest(FriendRequestAction.CANCEL)}
                    >
                        Cancel
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};