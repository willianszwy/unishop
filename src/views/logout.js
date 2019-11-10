import { logout } from "../services/auth";

const Logout = props => {
    logout();
    props.history.push("/");
    return "";
};

export default Logout;
