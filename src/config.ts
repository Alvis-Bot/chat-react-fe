// DEFAULT ROOT PATH
import {PATH_DASHBOARD} from "./router/paths";

export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app'

export const BASE_URL = "http://localhost:3005";


export interface IDefaultSettings {
    themeMode: string;
    themeDirection: string
    themeContrast: string
    themeLayout: string
    themeColorPresets: string
    themeStretch: boolean;
}

export const defaultSettings: IDefaultSettings = {
    themeMode: "light",
    themeDirection: "ltr",
    themeContrast: "default",
    themeLayout: "horizontal",
    themeColorPresets: "default",
    themeStretch: false,
};
