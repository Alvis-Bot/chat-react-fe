import {useState} from 'react';
import * as Yup from 'yup';
// form
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Button, IconButton, InputAdornment, Stack} from '@mui/material';
// components
import FormProvider, {RHFTextField} from '../../components/hook-form';
import {Eye, EyeSlash} from 'phosphor-react';
import {useSearchParams} from 'react-router-dom';
import {NewPassword} from "../../redux/slices/auth.ts";
import {useAppDispatch} from "../../redux/store.ts";

// ----------------------------------------------------------------------

export interface INewPasswordForm {
    password: string;
    passwordConfirm: string;
    token?: string | null;
}

export default function NewPasswordForm() {
    const dispatch = useAppDispatch();
    const [queryParameters] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);

    const VerifyCodeSchema = Yup.object().shape({

        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        passwordConfirm: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password') ?? null], 'Passwords must match')
    });

    const defaultValues = {
        password: '',
        passwordConfirm: '',
    };

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    });

    const {
        handleSubmit,
    } = methods;

    const onSubmit: SubmitHandler<INewPasswordForm> = data => {
        dispatch(NewPassword({...data, token: queryParameters.get('token')}))
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>


                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Eye/> : <EyeSlash/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <RHFTextField
                    name="passwordConfirm"
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Eye/> : <EyeSlash/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"

                    sx={{
                        mt: 3,
                        bgcolor: "text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                        "&:hover": {
                            bgcolor: "text.primary",
                            color: (theme) =>
                                theme.palette.mode === "light" ? "common.white" : "grey.800",
                        },
                    }}
                >
                    Update Password
                </Button>
            </Stack>
        </FormProvider>
    );
}