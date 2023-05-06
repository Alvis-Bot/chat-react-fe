import * as Yup from "yup";
// form
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
// components
import FormProvider, {RHFTextField} from "../../components/hook-form";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch} from "../../redux/store.ts";
import {ForgotPassword} from "../../redux/slices/auth.ts";

// ----------------------------------------------------------------------

export interface IResetPasswordForm {
    email: string;
}

export default function AuthResetPasswordForm() {
    const dispatch = useAppDispatch();

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
    });

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: {email: "demo@tawk.com"},
    });

    const {handleSubmit} = methods;

    const onSubmit: SubmitHandler<IResetPasswordForm> = data => {
        console.log("jdfhjksdhfjhsd")
        dispatch(ForgotPassword(data));
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="email" label="Email address"/>

            <LoadingButton
                // loading={isLoading}
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
                Send Request
            </LoadingButton>
        </FormProvider>
    );
}