import {Breakpoint, useMediaQuery} from "@mui/material";
import {Theme, useTheme} from "@mui/material/styles";

export default function useResponsive(
    query: 'up' | 'down' | 'between' | 'only',
    key: Breakpoint,
    start?: Breakpoint,
    end?: Breakpoint,
): boolean {
    const theme = useTheme<Theme>();

    return ((): boolean => {
        switch (query) {
            case 'up':
                return useMediaQuery(theme.breakpoints.up(key));
            case 'down':
                return useMediaQuery(theme.breakpoints.down(key));
            case 'between':
                return useMediaQuery(theme.breakpoints.between(start!, end!));
            case 'only':
                return useMediaQuery(theme.breakpoints.only(key));
        }
    })();
}
