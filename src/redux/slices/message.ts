import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ConversationMessage, Message, MessageEventPayload} from "../../type.ts";
import axiosInstance from "../../utils/axios.ts";

const user_id = window.localStorage.getItem("user_id");


export interface MessageState {
    id: number,
    messages: Message[]
}

const initialState: MessageState = {
    id: 0,
    messages: [],
};


const conversationSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
            const {message, conversation} = action.payload;
            const index = state.messages.findIndex((m) => m.id === message.id);
            if (index === -1) {
                state.messages.push(message);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesThunk.fulfilled, (state, action: PayloadAction<ConversationMessage>) => {
                state.id = action.payload.id;
                state.messages = action.payload.messages;
            })
            .addCase(fetchMessagesThunk.pending, (state, action) => {
            })
    },
});

export default conversationSlice.reducer;

export const {addMessage} = conversationSlice.actions;


export const fetchMessagesThunk = createAsyncThunk(
    'messages/getMessages',
    (id: number) => {
        return axiosInstance.get(`/messages`, {
            params: {
                id,
            },
        }).then((response) => {
            return response.data;
        });
    }
);


