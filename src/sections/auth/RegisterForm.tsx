import {useState} from "react";
import * as Yup from "yup";
// form
import {SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// @mui
import {IconButton, InputAdornment, Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";
// components
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {Eye, EyeSlash} from "phosphor-react";
import {useAppDispatch} from "../../redux/store.ts";
import {RegisterUser} from "../../redux/slices/auth.ts";
// import { RegisterUser } from "../../redux/slices/auth";

// ----------------------------------------------------------------------

export interface IAuthRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function AuthRegisterForm() {
    // const {isLoading} = useSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "demo@tawk.com",
        password: "demo1234",
    };

    const methods: UseFormReturn<IAuthRegisterForm> = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors},
    } = methods;

    const onSubmit: SubmitHandler<IAuthRegisterForm> = data => {
        console.log(data);
        dispatch(RegisterUser(data))
    }
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} mb={4}>
                <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                    <RHFTextField name="firstName" label="First name"/>
                    <RHFTextField name="lastName" label="Last name"/>
                </Stack>

                <RHFTextField name="email" label="Email address"/>

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

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                // loading={isLoading}
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
                Create Account
            </LoadingButton>
        </FormProvider>
    );
}