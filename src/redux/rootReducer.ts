import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/app';
import authReducer from './slices/auth';
import conversationReducer from './slices/conversation';
import messageReducer from './slices/message';
import friendRequestReducer from './slices/friendRequest';
import friendsReducer from './slices/friends';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: ["auth"],
    blacklist: [],
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    conversation: conversationReducer,
    message: messageReducer,
    friendRequest: friendRequestReducer,
    friends: friendsReducer
});

export {rootReducer, rootPersistConfig};
