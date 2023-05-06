import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import {TypedUseSelectorHook, useSelector,} from "react-redux";
import {rootPersistConfig, rootReducer} from "./rootReducer.ts";
import {setupListeners} from '@reduxjs/toolkit/query/react';

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store);

const {dispatch} = store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = () => dispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {store, persistor, useSelector, useAppDispatch, useAppSelector};