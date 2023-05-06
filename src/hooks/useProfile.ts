import {useContext} from 'react';
import {ProfileContext} from "../context/FrofileContext.tsx";


// ----------------------------------------------------------------------


const useProfile = () => useContext(ProfileContext);

export default useProfile;

