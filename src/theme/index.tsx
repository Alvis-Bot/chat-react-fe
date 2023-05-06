import {CssBaseline, ThemeProvider as MUIThemeProvider} from '@mui/material'
import {ReactNode, useMemo} from 'react'
import {createTheme, StyledEngineProvider} from '@mui/material/styles'
import {ThemeOptions} from "@mui/material/styles/createTheme";
import breakpoints from "./breakpoints";
import typography from "./typography";
import palette from "./palette";
import useSettings from "../hooks/useSettings.ts";
import shadows, {customShadows} from "./shadows";


export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const {themeMode, themeDirection} = useSettings();
    const isLight: boolean = themeMode === "light";
    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: isLight ? palette.light : palette.dark,
            shape: {borderRadius: 8},
            breakpoints,
            shadows: isLight ? shadows.light : shadows.dark,
            typography,
            customShadows: isLight ? customShadows.light : customShadows.dark,

        }),
        [isLight, themeDirection]
    )

    const theme = createTheme(themeOptions)

    // theme.components = componentsOverride(theme);
    return (
        <>
            <StyledEngineProvider injectFirst>
                {/* MUI (but actually underlying Emotion) isn't ready to work with Next's experimental `app/` directory feature.
          I'm using the lowest-code approach suggested by this guy here: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1386197925 */}
                <MUIThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </MUIThemeProvider>
            </StyledEngineProvider>
        </>
    )
}
