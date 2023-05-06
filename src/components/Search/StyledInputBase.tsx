import {InputBase} from "@mui/material";
import {styled} from "@mui/material/styles";


const StyledInputBase = styled(InputBase)(({theme}) => ({
    width: "100%",
    color: "inherit",
    "& .MuiInputBase-input": {
        width: "100%",
        padding: theme.spacing(2, 2, 2, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

export default StyledInputBase;