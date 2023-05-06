import {ChatFooter, ChatHeader} from '../../components/Chat';
import Message from '../../components/Chat/Message.tsx';
import {SimpleBarStyle} from '../../components/Scrollbar.tsx';
import {Stack} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {FC} from "react";

export type Params = {
    id: number;
}
const Conversation: FC<Params> = ({id}) => {
    const theme = useTheme();
    return (
        <Stack height={`100%`} maxHeight={`100vh`} width={`auto`}>
            <ChatHeader id={id}/>
            <SimpleBarStyle
                clickOnTrack={false}
                sx={{
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.paper,
                }}
            >
                <Message id={id}/>
            </SimpleBarStyle>
            {/*</Box>*/}
            <ChatFooter id={id}/>
        </Stack>
    );
};

export default Conversation