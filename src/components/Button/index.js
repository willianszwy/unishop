import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
    root: {
        background:
            "linear-gradient(90deg,  rgb(252, 108, 53), rgb(170, 18, 159))",
        borderRadius: 5,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        marginTop: "8px"
    }
})(Button);

export default StyledButton;
