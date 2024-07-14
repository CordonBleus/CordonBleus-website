import Header from "../../components/header/Header.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import {Link} from "react-router-dom";

/**
 * @type {React.FC}
 */
export const RegisterPage = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}>
            <Header/>
            <RegisterForm/>
            <Link
                to="/"
                style={{textAlign: "center"}}>Already have an account ?</Link>
        </div>
    );
};
