import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Conversation} from "../../type.ts";
import axiosInstance from "../../utils/axios.ts";


export interface ConversationState {
    conversations: Conversation[]
    isLoading: boolean,
}

const initialState: ConversationState = {
    conversations: [],
    isLoading: false,
};


const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        addConversation: (state, action: PayloadAction<Conversation>) => {
            state.conversations.push(action.payload);
        },
        updateConversation: (state, action: PayloadAction<Conversation>) => {
            console.log('Inside updateConversation');
            const conversation = action.payload;
            const index = state.conversations.findIndex((c) => c.id === conversation.id);
            state.conversations.splice(index, 1);
            state.conversations.unshift(conversation);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversationsThunk.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
                state.conversations = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchConversationsThunk.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createConversationThunk.fulfilled, (state, action) => {
                state.conversations.unshift(action.payload);
            });
    },
});

export const {addConversation, updateConversation} = conversationSlice.actions;

export default conversationSlice.reducer;
const getConversations = (state: ConversationState) => state.conversations;

export const selectConversationById = createSelector(
    [getConversations, (state: ConversationState, id: number) => id],
    (conversations, id) => conversations.find((conv) => conv.id === id)
);
export const fetchConversationsThunk =
    createAsyncThunk('conversation/getConversations', async () => {
        const response = await axiosInstance.get(`/conversations`);
        return response.data;
    });


export const createConversationThunk = createAsyncThunk(
    'conversations/create',
    async (data: any) => {
        const response = await axiosInstance.post(`/conversations`, data);
        return response.data;
    }
);



