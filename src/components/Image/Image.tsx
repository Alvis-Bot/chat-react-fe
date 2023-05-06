import {forwardRef, ForwardRefRenderFunction} from 'react';
import {Effect, LazyLoadImage, LazyLoadImageProps} from 'react-lazy-load-image-component';
// @mui
import {Box, BoxProps} from '@mui/material';

// ----------------------------------------------------------------------

interface ImageProps extends BoxProps {
    disabledEffect?: boolean;
    effect?: Effect | undefined;
    lazyLoadImageProps?: LazyLoadImageProps;
    src?: string;
    alt?: string;
}

const Image: ForwardRefRenderFunction<HTMLSpanElement, ImageProps> =
    ({
         disabledEffect = false, effect = 'blur', sx,
         lazyLoadImageProps, ...other
     }, ref) => {

        const content = (
            <Box

                component={LazyLoadImage}
                wrapperClassName="wrapper"
                effect={disabledEffect ? undefined : effect}
                // placeholderSrc={disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.png'}
                placeholderSrc={other.src}
                sx={{width: 1, height: 1, objectFit: 'cover'}}
                {...lazyLoadImageProps}
            />
        );

        return (
            <Box
                ref={ref}
                component="span"
                sx={{
                    lineHeight: 1,
                    display: 'block',
                    overflow: 'hidden',
                    position: 'relative',
                    '& .wrapper': {
                        width: 1,
                        height: 1,
                        backgroundSize: 'cover !important',
                    },
                    ...sx,
                }}
                {...other}
            >
                {content}
            </Box>
        );
    };

export default forwardRef(Image);
