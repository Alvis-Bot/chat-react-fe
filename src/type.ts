//-----------------Audit-----------------//

export type  Audit = {
    createdAt: Date,
    updatedAt: Date,
}

//-----------------Conversation-----------------//

export type Conversation = Audit & {
    id: number,
    creator: User,
    recipient: User,
    createdAt: Date,
    lastMessage: Message
}

//-----------------User-----------------//

export  type User = Audit & {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
}


//-----------------Message-----------------//

export enum MessageType {
    MSG = 'msg',
    DIVIDER = 'divider',
}

export enum MessageSubType {
    TEXT = 'text',
    DOC = 'doc',
    IMG = 'img',
    LINK = 'link',
    REPLY = 'reply',
}

export type Message = Audit & {
    id: number,
    content: string,
    type: MessageType,
    subtype: MessageSubType,
    author: User,
}

//-----------------Friend Request-----------------//
export enum FriendRequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export type FriendRequest = Audit & {
    id: number,
    sender: User,
    receiver: User,
    description: string,
    status: FriendRequestStatus,
}


//-----------------Friend-----------------//

export type Friend = Audit & {
    id: number,
    sender: User,
    receiver: User,
}


//-----------------Another-----------------//

export type AcceptFriendRequestResponse = {
    friend: Friend;
    friendRequest: FriendRequest
}


export type MessageEventPayload = {
    message: Message;
    conversation: Conversation;
};


export type ConversationMessage = {
    id: number;
    messages: Message[];
};


export enum FriendRequestAction {
    ACCEPT = 'accept',
    REJECT = 'reject',
    CANCEL = 'cancel',
}

export type MessageError = {
    message: string;
    code: string;
}

