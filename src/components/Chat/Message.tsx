import {Box, Stack} from "@mui/material";
import {DocMsg, LinkMessage, MediaMsg, ReplyMsg, TextMessage, Timeline} from "../../sections/dashboard/Conversation";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {fetchMessagesThunk} from "../../redux/slices/message.ts";
import {Message} from "../../type.ts";
import useProfile from "../../hooks/useProfile.ts";

interface ChatMessageProps {
    menu?: any;
    id: number;
}

const Message: FC<ChatMessageProps> = ({menu, id}) => {
    const dispatch = useAppDispatch();
    const {profile} = useProfile();
    const {messages} = useAppSelector((state) => state.message);
    useEffect(() => {
        dispatch(fetchMessagesThunk(id));
    }, [id]);


    return (
        <Box p={3}
        >
            <Stack spacing={3}>
                {
                    messages.map((item: Message, index: number) => {
                        console.log(item)
                        switch (item.type) {
                            case 'divider':
                                return <Timeline key={index} {...item}/>
                            case 'msg':
                                switch (item.subtype) {
                                    case 'img':
                                        return <MediaMsg key={index} incoming={item.author.id !== profile?.id}
                                                         item={item}
                                                         menu={menu}/>
                                    case 'doc':
                                        return <DocMsg key={index} incoming={item.author.id !== profile?.id} item={item}
                                                       menu={menu}/>
                                    case 'link':
                                        return <LinkMessage key={index} incoming={item.author.id !== profile?.id}
                                                            item={item}
                                                            menu={menu}/>
                                    case 'reply':
                                        return <ReplyMsg key={index} incoming={item.author.id !== profile?.id}
                                                         item={item}
                                                         menu={menu}/>
                                    default:
                                        return <TextMessage key={index} incoming={item.author.id !== profile?.id}
                                                            item={item} menu={menu}/>
                                }
                            default:
                                return <></>;
                        }
                    })

                }
            </Stack>

        </Box>
    )
}

export default Message