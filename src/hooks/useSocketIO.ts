import {useContext} from 'react';
import SocketIOContext from "../context/SocketIOContext.tsx";


// ----------------------------------------------------------------------


const useSocketIO = () => useContext(SocketIOContext);

export default useSocketIO;

