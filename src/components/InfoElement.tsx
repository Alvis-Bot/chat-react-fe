import {Avatar, Stack, Typography} from "@mui/material";

export interface IInfoElement {
    src: string;
    firstname: string;
    lastname: string;
    description?: string;
}

const InfoElement = ({lastname, firstname, description, src}: IInfoElement) => {
    return (
        <Stack direction="row" spacing={3}>
            <Avatar
                src={src}
                sx={{height: 56, width: 56}}
            />
            <Stack spacing={0.5}>
                <Typography
                    variant="h6">{`${firstname} ${lastname}`}</Typography>
                <Typography variant="caption">{description}</Typography>
            </Stack>
        </Stack>
    )
}

export default InfoElement