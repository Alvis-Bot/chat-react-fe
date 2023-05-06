import {Theme, useTheme} from '@mui/material/styles';
import useResponsive from '../hooks/useResponsive';

export default function GetFontValue(variant: string) {
    const theme: Theme = useTheme();
    const breakpoints: string | any = useWidth();
    const key = theme.breakpoints.up(breakpoints === 'xl' ? 'lg' : breakpoints);
    const hasResponsive =
        variant === 'h1' ||
        variant === 'h2' ||
        variant === 'h3' ||
        variant === 'h4' ||
        variant === 'h5' ||
        variant === 'h6';
    const getFont =
        hasResponsive && (theme.typography as Record<string, any>)[variant][key]
            ? (theme.typography as Record<string, any>)[variant][key]
            : (theme.typography as Record<string, any>)[variant];
    const fontSize = remToPx(getFont.fontSize);
    const lineHeight = Number((theme.typography as Record<string, any>).lineHeight) * fontSize;
    const {fontWeight} = (theme.typography as Record<string, any>);
    const {letterSpacing} = (theme.typography as Record<string, any>);

    return {fontSize, lineHeight, fontWeight, letterSpacing};
}

export function remToPx(value: string) {
    return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
    return `${value / 16}rem`;
}

export function responsiveFontSizes({sm, md, lg}: { sm: number; md: number; lg: number }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    };
}

function useWidth() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();

    return (
        keys.reduce((output: string | null, key) => {
            const matches = useResponsive('up', key);

            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}
