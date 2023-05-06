import React, {useState} from "react";
import * as Yup from "yup";
import {Link as RouterLink} from "react-router-dom";
// form
import {SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// @mui
import {IconButton, InputAdornment, Link, Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";
// components
// import FormProvider, { RHFTextField } from "../../components/hook-form";
import {Eye, EyeSlash} from "phosphor-react";
// import { LoginUser } from "../../redux/slices/auth";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {loginUser} from "../../redux/slices/auth.ts";

// ----------------------------------------------------------------------

export interface IAuthLoginForm {
    email: string;
    password: string;
}

export default function AuthLoginForm() {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const {isLoading} = useAppSelector((state) => state.auth);

    const LoginSchema: Yup.ObjectSchema<IAuthLoginForm> = Yup.object().shape({
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 7 characters")
            .max(255)
            .required("Password is required"),
    });
    const defaultValues = {
        email: "vietvodinh12547@gmail.com",
        password: "string",
    };

    const methods: UseFormReturn<IAuthLoginForm> = useForm<IAuthLoginForm>({
        defaultValues,
        resolver: yupResolver(LoginSchema),
    });

    const {
        handleSubmit,
        formState: {errors},
    } = methods;

    const onSubmit: SubmitHandler<IAuthLoginForm> = data => {
        console.log(data);
        dispatch(loginUser(data))
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {/*{!!errors.afterSubmit && (*/}
                {/*    <Alert severity="error">{errors.email.message}</Alert>*/}
                {/*)}*/}

                <RHFTextField name="email" label="Email address" type={`text`}/>

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
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
            </Stack>

            <Stack alignItems="flex-end" sx={{my: 2}}>
                <Link component={RouterLink} to="/auth/reset-password" variant="body2" color="inherit"
                      underline="always">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                sx={{
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
                Login
            </LoadingButton>
        </FormProvider>
    );
}
