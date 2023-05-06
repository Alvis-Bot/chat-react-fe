import {faker} from "@faker-js/faker";
import {ChatCenteredDots, Phone, Users} from '@phosphor-icons/react'
import {Gear, GearSix, SignOut, User} from "phosphor-react";

export interface INavButton {
    index: number,
    icon: JSX.Element
}

export interface IChatList {
    id: string,
    img: string,
    name: string,
    msg: string,
    time: string,
    unread: number,
    pinned: boolean,
    online: boolean
}


export const NAV_BUTTONS: INavButton[] = [
    {
        index: 0,
        icon: <ChatCenteredDots/>
    },
    {
        index: 1,
        icon: <Users/>
    },
    {
        index: 2,
        icon: <Phone/>
    },
]

interface INavSetting {
    index: number,
    icon: JSX.Element
}

export const Nav_Setting: INavSetting[] = [
    {
        index: 3,
        icon: <GearSix/>,
    },
];

export const CHAT_LIST: IChatList[] = [
    {
        id: '0',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: true,
        online: true,
    },
    {
        id: '1',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "12:02",
        unread: 2,
        pinned: true,
        online: false,
    },
    {
        id: '2',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "10:35",
        unread: 3,
        pinned: false,
        online: true,
    },
    {
        id: '3',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "04:00",
        unread: 0,
        pinned: false,
        online: true,
    },
    {
        id: '4',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: '5',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: '6',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: '7',
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
];


export interface IChatData {
    type: string,
    message?: string,
    incoming?: boolean | undefined,
    outgoing?: boolean,
    subtype?: string,
    img?: string,
    text?: string
    preview?: string
    reply?: string

}


export const CHAT_DATA: IChatData[] = [
    {
        type: "msg",
        message: "Hi 👋🏻, How are ya ?",
        incoming: true,
        outgoing: false,
    },
    {
        type: "divider",
        text: "Today",
    },
    {
        type: "msg",
        message: "Hi 👋 Panda, not bad, u ?",
        incoming: false,
        outgoing: true,
    },
    {
        type: "msg",
        message: "Can you send me an abstarct image?",
        incoming: false,
        outgoing: true,
    },
    {
        type: "msg",
        message: "Ya sure, sending you a pic",
        incoming: true,
        outgoing: false,
    },

    {
        type: "msg",
        subtype: "img",
        message: "Here You Go",
        img: faker.image.abstract(),
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        message: "Can you please send this in file format?",
        incoming: false,
        outgoing: true,
    },

    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.cats(),
        message: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "reply",
        reply: "This is a reply",
        message: "Yep, I can also do that",
        incoming: false,
        outgoing: true,
    },
];

export interface IProfileMenu {
    title: string,
    icon: JSX.Element
}


export const PROFILE_MENU: IProfileMenu[] = [
    {
        title: "Profile",
        icon: <User/>,
    },
    {
        title: "Settings",
        icon: <Gear/>,
    },
    {
        title: "Sign Out",
        icon: <SignOut/>,
    },
];

export interface IMessageOptions {
    title: string
}

export const MESSAGE_OPTIONS: IMessageOptions[] = [
    {
        title: "Reply",
    },
    {
        title: "React to message",
    },
    {
        title: "Forward message",
    },
    {
        title: "Star message",
    },
    {
        title: "Report",
    },
    {
        title: "Delete Message",
    },
];

export interface ISharedDocs {
    type: string,
    subtype: string,
    message: string,
    incoming: boolean,
    outgoing: boolean,
}

export const Shared_docs: ISharedDocs[] = [
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "doc",
        message: "Yes sure, here you go.",
        incoming: true,
        outgoing: false,
    },
];

export interface ISharedLink {
    type: string,
    subtype: string,
    preview: string,
    message: string,
    incoming: boolean,
    outgoing: boolean
}

export const Shared_links: ISharedLink[] = [
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.cats(),
        message: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.cats(),
        message: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.cats(),
        message: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.cats(),
        message: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.cats(),
        message: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subtype: "link",
        preview: faker.image.cats(),
        message: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
];