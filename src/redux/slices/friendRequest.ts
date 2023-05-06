import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AcceptFriendRequestResponse, FriendRequest, MessageError} from "../../type.ts";
import {ISendFriendRequestForm} from "../../sections/dashboard/SendFriendRequest.tsx";
import {
    acceptFriendRequest as acceptFriendRequestAPI,
    cancelFriendRequest as cancelFriendRequestAPI,
    getFriendRequests,
    rejectFriendRequest as rejectFriendRequestAPI,
    sendFriendRequest as sendFriendRequestAPI,
} from "../../utils/api.ts";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";


export interface FriendRequestState {
    friendRequests: FriendRequest[],
}

const initialState: FriendRequestState = {
    friendRequests: [],
};


const friendRequestSlice = createSlice({
    name: "friendRequest",
    initialState,
    reducers: {
        addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
            state.friendRequests.push(action.payload);
        },
        removeFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
            const {id} = action.payload;
            state.friendRequests = state.friendRequests.filter((friendRequest) => friendRequest.id !== id);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getFriendRequestsThunk.fulfilled, (state, action: PayloadAction<AxiosResponse<FriendRequest[]>>) => {
                state.friendRequests = action.payload.data;
            })
            .addCase(acceptFriendRequestThunk.fulfilled, (state, action: PayloadAction<AxiosResponse<AcceptFriendRequestResponse>>) => {
                const {id} = action.payload.data.friendRequest;
                state.friendRequests = state.friendRequests.filter((friendRequest) => friendRequest.id !== id);
            })
            .addCase(cancelFriendRequestThunk.fulfilled, (state, action: PayloadAction<AxiosResponse<FriendRequest>>) => {
                const {id} = action.payload.data;
                state.friendRequests = state.friendRequests.filter((friendRequest) => friendRequest.id !== id);
            })
            .addCase(rejectFriendRequestThunk.fulfilled, (state, action: PayloadAction<AxiosResponse<FriendRequest>>) => {
                const {id} = action.payload.data;
                state.friendRequests = state.friendRequests.filter((friendRequest) => friendRequest.id !== id);
                toast.success("Friend request rejected")
            })
            .addCase(sendFriendRequestThunk.fulfilled, (state, action: PayloadAction<AxiosResponse<FriendRequest>>) => {
                state.friendRequests.push(action.payload.data);
                toast.success("Friend request sent")
            })
            .addCase(sendFriendRequestThunk.rejected, (state, action) => {
                const {message} = action.payload as MessageError;
                toast.error(message);
            })

    },
});

export default friendRequestSlice.reducer;

export const {addFriendRequest, removeFriendRequest} = friendRequestSlice.actions;

export const getFriendRequestsThunk = createAsyncThunk(
    'friendRequest/getFriendRequests',
    () => getFriendRequests()
);

export const sendFriendRequestThunk = createAsyncThunk(
    'friendRequest/sendFriendRequest',
    (data: ISendFriendRequestForm, {rejectWithValue}) => {
        return sendFriendRequestAPI(data).then((response) => {
            return response;
        }).catch((err) => {
            return rejectWithValue(err.response.data);
        })
    }
);

export const acceptFriendRequestThunk = createAsyncThunk(
    'friendRequest/acceptFriendRequest',
    (id: number) => acceptFriendRequestAPI(id)
)

export const cancelFriendRequestThunk = createAsyncThunk(
    'friendRequest/cancelFriendRequest',
    (id: number) => cancelFriendRequestAPI(id)
)

export const rejectFriendRequestThunk = createAsyncThunk(
    'friendRequest/rejectFriendRequest',
    (id: number) => rejectFriendRequestAPI(id)
);
