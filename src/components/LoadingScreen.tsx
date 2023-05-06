import {Stack} from '@mui/material'

const LoadingScreen = () => {
    return (
        <Stack direction='row' width={`100%`} height={`100vh`} justifyContent={`center`} alignItems={`center`}>
            <img src={`https://miro.medium.com/v2/resize:fit:1100/1*DXvI3dy2rKOMzV8S3fKFMQ.gif`} alt='loading' style={{
                width: '100%',
                height: '100%',
            }}/>
        </Stack>
    )
}

export default LoadingScreen
