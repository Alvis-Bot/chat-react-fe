import {CSSProperties} from 'react';
import Image from '../../Image';

interface AvatarPreviewProps {
    file: string | File;
}

const avatarStyles: CSSProperties = {
    zIndex: 8,
    overflow: 'hidden',
    borderRadius: '50%',
    position: 'absolute',
    width: `calc(100% - 16px)`,
    height: `calc(100% - 16px)`,
};

export default function AvatarPreview({file}: AvatarPreviewProps) {
    if (!file) {
        return null;
    }

    const imgUrl = 'string' === typeof file ? file : URL.createObjectURL(file);

    return (
        <Image
            alt="avatar"
            src={imgUrl}
            sx={avatarStyles}
        />
    );
}
