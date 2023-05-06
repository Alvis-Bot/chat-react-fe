// provider === component
import React, {createContext, useEffect} from "react";
import {defaultSettings, IDefaultSettings} from "../config";
import useLocalStorage from "../hooks/useLocalStorage";
import getColorPresets, {colorPresets, defaultPreset,} from "../utils/getColorPresets";

interface ContextProps extends IDefaultSettings {
    onToggleMode: () => void;
    onChangeMode: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onToggleDirection: () => void;
    onChangeDirection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeDirectionByLang: (lang: string) => void;
    onToggleLayout: () => void;
    onChangeLayout: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onToggleContrast: () => void;
    onChangeContrast: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeColor: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    setColor: any;
    colorOption: { name: string; value: string }[];
    onToggleStretch: () => void;
    onResetSetting: () => void;
}

const initialState: ContextProps = {
    ...defaultSettings,

    // Mode
    onToggleMode: () => {
    },
    onChangeMode: () => {
    },

    // Direction
    onToggleDirection: () => {
    },
    onChangeDirection: () => {
    },
    onChangeDirectionByLang: () => {
    },

    // Layout
    onToggleLayout: () => {
    },
    onChangeLayout: () => {
    },

    // Contrast
    onToggleContrast: () => {
    },
    onChangeContrast: () => {
    },

    // Color
    onChangeColor: () => {
    },
    setColor: defaultPreset,
    colorOption: [],

    // Stretch
    onToggleStretch: () => {
    },

    // Reset
    onResetSetting: () => {
    },
};

const SettingsContext = createContext(initialState);

const SettingsProvider = ({children}: { children: React.ReactNode }) => {
    const [settings, setSettings] = useLocalStorage("Settings", {
        themeMode: initialState.themeMode,
        themeLayout: initialState.themeLayout,
        themeStretch: initialState.themeStretch,
        themeContrast: initialState.themeContrast,
        themeDirection: initialState.themeDirection,
        themeColorPresets: initialState.themeColorPresets,
    });

    const isArabic = localStorage.getItem("i18nextLng") === "ar";

    useEffect(() => {
        if (isArabic) {
            onChangeDirectionByLang("ar");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isArabic]);

    // Mode

    const onToggleMode = () => {
        console.log("onToggleMode");
        setSettings({
            ...settings,
            themeMode: settings.themeMode === "light" ? "dark" : "light",
        });
    };

    const onChangeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings({
            ...settings,
            themeMode: event.target.value,
        });
    };

    // Direction

    const onToggleDirection = () => {
        setSettings({
            ...settings,
            themeDirection: settings.themeDirection === "rtl" ? "ltr" : "rtl",
        });
    };

    const onChangeDirection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings({
            ...settings,
            themeDirection: event.target.value,
        });
    };

    const onChangeDirectionByLang = (lang: string) => {
        setSettings({
            ...settings,
            themeDirection: lang === "ar" ? "rtl" : "ltr",
        });
    };

    // Layout

    const onToggleLayout = () => {
        setSettings({
            ...settings,
            themeLayout:
                settings.themeLayout === "vertical" ? "horizontal" : "vertical",
        });
    };

    const onChangeLayout = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings({
            ...settings,
            themeLayout: event.target.value,
        });
    };

    // Contrast

    const onToggleContrast = () => {
        setSettings({
            ...settings,
            themeContrast: settings.themeContrast === "default" ? "bold" : "default",
        });
    };

    const onChangeContrast = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings({
            ...settings,
            themeContrast: event.target.value,
        });
    };

    // Color

    const onChangeColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings({
            ...settings,
            themeColorPresets: event.target.value,
        });
    };

    // Stretch

    const onToggleStretch = () => {
        setSettings({
            ...settings,
            themeStretch: !settings.themeStretch,
        });
    };

    // Reset

    const onResetSetting = () => {
        setSettings({
            themeMode: initialState.themeMode,
            themeLayout: initialState.themeLayout,
            themeStretch: initialState.themeStretch,
            themeContrast: initialState.themeContrast,
            themeDirection: initialState.themeDirection,
            themeColorPresets: initialState.themeColorPresets,
        });
    };

    return (
        <SettingsContext.Provider
            value={{
                ...settings, // Mode
                onToggleMode,
                onChangeMode,

                // Direction
                onToggleDirection,
                onChangeDirection,
                onChangeDirectionByLang,

                // Layout
                onToggleLayout,
                onChangeLayout,

                // Contrast
                onChangeContrast,
                onToggleContrast,

                // Stretch
                onToggleStretch,

                // Color
                onChangeColor,
                setColor: getColorPresets(settings.themeColorPresets),
                colorOption: colorPresets.map((color) => ({
                    name: color.name,
                    value: color.main,
                })),

                // Reset
                onResetSetting,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export {SettingsContext};

export default SettingsProvider;
