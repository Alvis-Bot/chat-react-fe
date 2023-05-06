import {alpha, styled} from "@mui/material/styles";

const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: 10,
    border: "1px solid #E0E0E0",
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
}));

export default Search;