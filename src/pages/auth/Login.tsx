import {Link, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import AuthLoginForm from "../../sections/auth/LoginForm.tsx";
import AuthSocial from "../../sections/auth/AuthSocial.tsx";

const Login = () => {
    return (
        <>
            <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
                <Typography variant="h4">Login to Tawk</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">New user?</Typography>

                    <Link
                        to={"/auth/register"}
                        component={RouterLink}
                        variant="subtitle2"
                    >
                        Create an account
                    </Link>
                </Stack>
            </Stack>
            {/* Form */}
            <AuthLoginForm/>

            <AuthSocial/>

        </>
    )
}

export default Login