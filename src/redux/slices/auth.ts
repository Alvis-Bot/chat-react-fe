import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShowSnackbar} from "./app.ts";
import {IAuthLoginForm} from "../../sections/auth/LoginForm.tsx";
import axiosInstance from "../../utils/axios.ts";
import {AppDispatch, RootState} from "../store.ts";
import {INewPasswordForm} from "../../sections/auth/NewPasswordForm.tsx";
import {IResetPasswordForm} from "../../sections/auth/ResetPasswordForm.tsx";
import {IAuthRegisterForm} from "../../sections/auth/RegisterForm.tsx";


export interface AuthState {
    isLoggedIn: boolean,
    accessToken: string
    isLoading: boolean
    email: string | null
    id: number | null
}


const initialState: AuthState = {
    isLoading: false,
    isLoggedIn: false,
    accessToken: '',
    email: null,
    id: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading;
        },
        login(state: AuthState, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.accessToken = action.payload.accessToken;
            state.id = action.payload.id;
        },
        signOut(state) {
            state.isLoggedIn = false;
            state.accessToken = '';
            state.id = null;
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email;
        }
    }
})
export default authSlice.reducer;

export const {signOut, updateIsLoading} = authSlice.actions;


export function loginUser(formValue: IAuthLoginForm) {
    return (dispatch: AppDispatch) => {
        dispatch(updateIsLoading({
            isLoading: true
        }))
        axiosInstance.post('/auth/login', formValue)
            .then((res) => {
                console.log(res);
                dispatch(authSlice.actions.login({
                    isLoggedIn: true,
                    accessToken: res.data.accessToken,
                    id: res.data.id
                }))
                dispatch(updateIsLoading({
                    isLoading: false
                }))
                dispatch(ShowSnackbar({
                    message: 'Login Successful',
                    severity: 'success'
                }));
            })
            .catch((err) => {
                console.log(err);
                dispatch(updateIsLoading({
                    isLoading: false
                }))
                dispatch(ShowSnackbar({
                    message: 'Login Failed',
                    severity: 'error'
                }));
            })
    }
}


export function ForgotPassword(email: IResetPasswordForm) {
    return (dispatch: AppDispatch) => {
        axiosInstance.post('/auth/forgot-password', email)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

}

export function NewPassword(formValue: INewPasswordForm) {
    return (dispatch: AppDispatch) => {
        axiosInstance.post('/auth/reset-password', formValue)
            .then((res) => {
                dispatch(authSlice.actions.login({
                    isLoggedIn: true,
                    accessToken: res.data.accessToken,
                }))
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export function RegisterUser(formValue: IAuthRegisterForm) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(authSlice.actions.updateIsLoading({
            isLoading: true,
        }))
        axiosInstance.post('/auth/register', formValue)
            .then((res) => {
                console.log(res);
                console.log(formValue)
                dispatch(authSlice.actions.updateRegisterEmail({
                    email: formValue.email
                }))
                dispatch(authSlice.actions.updateIsLoading({
                    isLoading: false,
                }))
            })
            .catch((err) => {
                console.log(err);
                dispatch(authSlice.actions.updateIsLoading({
                    isLoading: false,
                }))
            }).finally(() => {
            if (!getState().auth.email) {
                window.location.href = '/auth/verify'
            }
        })
    }
}

export function VerifyEmail(fomValue: { otp: string, email: string }) {
    return (dispatch: AppDispatch) => {
        axiosInstance.post('/auth/verify', fomValue)
            .then((res) => {
                console.log(res);
                dispatch(authSlice.actions.login({
                    isLoggedIn: true,
                    accessToken: res.data.accessToken,
                }))
            })
            .catch((err) => {
                console.log(err);
            })
    }
}