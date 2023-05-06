import {useContext} from 'react';
import {SettingsContext} from "../context/SettingsContext.tsx";


// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;