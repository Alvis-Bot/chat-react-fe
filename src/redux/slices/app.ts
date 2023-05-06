import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, useAppDispatch} from "../store.ts";
import {AlertColor} from "@mui/material/Alert/Alert";
import axiosInstance from "../../utils/axios.ts";
import {User} from "../../type.ts";


export interface SnackbarState {
    open?: boolean
    message: string
    severity: AlertColor
}

export enum FriendBarType {
    FRIENDS = "FRIENDS",
    FRIEND_REQUESTS = "FRIEND_REQUESTS",
    BLOCKED = "BLOCKED"
}

export interface AppState {
    user: User,
    sidebar: {
        open: boolean,
        type: "CONTACT" | "STARRED" | "SHARED"
    },
    avatarUrl: string,
    snackbar: SnackbarState
    openDialogCreateConversation: boolean,
    room_id: number,
    tab: number,
    isLoadingUser: boolean
    friendBar: {
        type: FriendBarType
    }
}


const initialState: AppState = {
    friendBar: {
        type: FriendBarType.FRIENDS
    },
    isLoadingUser: true,
    avatarUrl: "",
    user: {} as User,
    sidebar: {
        open: false,
        type: "CONTACT" // can be "CONTACT" or "STARRED" or "SHARED"
    },
    snackbar: {
        open: false,
        message: '',
        severity: 'success'
    },
    tab: 0, // [0, 1, 2, 3]
    openDialogCreateConversation: false,
    room_id: 0,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action: PayloadAction<"CONTACT" | "STARRED" | "SHARED">) {
            state.sidebar.type = action.payload;
        },
        updateSnackbar(state, action: PayloadAction<{
            open: boolean,
            message: string,
            severity: "success" | "info" | "warning" | "error"
        }>) {
            state.snackbar.open = action.payload.open;
            state.snackbar.message = action.payload.message;
            state.snackbar.severity = action.payload.severity;
        },
        updateTab(state, action: PayloadAction<{ tab: number }>) {
            state.tab = action.payload.tab;
        },
        closeSnackbar(state) {
            state.snackbar.open = false;
            state.snackbar.message = '';
            state.snackbar.severity = 'success';
        },
        selectConversation(state, action: PayloadAction<{ room_id: number }>) {
            // state.chat_type = 'individual'
            state.room_id = action.payload.room_id;
        },
        updateStatusDialogCreateConversation(state) {
            state.openDialogCreateConversation = !state.openDialogCreateConversation;
        },
        updateFriendBarType(state, action: PayloadAction<FriendBarType>) {
            state.friendBar.type = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoadingUser = false;
            })

        builder.addCase(fetchImage.fulfilled, (state, action) => {
            state.avatarUrl = action.payload;
        })
    }
})
export default appSlice.reducer;

export const {updateTab, updateFriendBarType} = appSlice.actions;

export const fetchUserProfile = createAsyncThunk('users/getConversations', async () => {
    const response = await axiosInstance.get(`/users/profile`);
    return response.data;
})

export const fetchImage = createAsyncThunk(
    'users/fetchImage',

    async (data: any) => {
        console.log("fetchImage", data)
        const response = await axiosInstance.get(`/users/image/${data.avatar}/${data.accessToken}`);
        return response.request.responseURL;
    }
)


export const fetchUpdateUserProfile =
    createAsyncThunk('users/updateProfile', async (data: FormData) => {
        const dispatch = useAppDispatch();
        return axiosInstance.patch(`/users/profile`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                dispatch(ShowSnackbar({message: "Profile updated successfully", severity: "success"}));
                return response.data;
            }).catch(error => {
                console.log(error);
                dispatch(ShowSnackbar({message: error.response.data.message, severity: "error"}));
                throw error;
            })
    })


export function ToggleSidebar() {
    return (dispatch: AppDispatch) => {
        dispatch(appSlice.actions.toggleSidebar());
    }
}

export function UpdateSidebarType(type: "CONTACT" | "STARRED" | "SHARED") {
    return (dispatch: AppDispatch) => {
        dispatch(appSlice.actions.updateSidebarType(type));
    }
}

export function ShowSnackbar({message, severity}: SnackbarState) {
    return (dispatch: AppDispatch) => {
        dispatch(appSlice.actions.updateSnackbar({open: true, message, severity}));

        setTimeout(() => {
            dispatch(appSlice.actions.closeSnackbar());
        }, 4000);
    }
}

export function CloseSnackbar() {
    return (dispatch: AppDispatch) => {
        dispatch(appSlice.actions.closeSnackbar());
    }
}

export const SelectConversation = ({room_id}: { room_id: number }) => {
    console.log("SelectConversation", typeof room_id);
    return (dispatch: AppDispatch) => {
        dispatch(appSlice.actions.selectConversation({room_id}));
    }
}

export const UpdateStatusDialogCreateConversation = () => {
    return (dispatch: AppDispatch) => {
        dispatch(appSlice.actions.updateStatusDialogCreateConversation());
    }
}
