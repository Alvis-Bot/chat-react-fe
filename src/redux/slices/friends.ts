import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../type.ts";
import axiosInstance from "../../utils/axios.ts";

const user_id = window.localStorage.getItem("user_id");


export  type  FriendProps = {
    id: number,
    sender: User,
    receiver: User,
}

export interface FriendRequestState {
    friends: FriendProps[]
}

const initialState: FriendRequestState = {
    friends: [],
};


const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFriendsThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.friends = action.payload;
        })
    },
});

export default friendsSlice.reducer;

export const {} = friendsSlice.actions;


export const fetchFriendsThunk = createAsyncThunk(
    'friendRequest/getFriends',
    () => {
        return axiosInstance.get(`/friends`).then((response) => {
            return response.data;
        });
    }
)


