import LoginForm from "../../components/login/LoginForm.jsx";
import Header from "../../components/header/Header.jsx";
import LoginPageStyle from "./LoginPage.module.css";
import {Link} from "react-router-dom";

/**
 * Login Page
 * @returns {Element}
 * @constructor
 */
function LoginPage() {
    return (
        <section className={LoginPageStyle.page}>
            <Header />
            <LoginForm/>
            <p className={LoginPageStyle.textSinIn}>You don&apos;t have an account? <Link className={LoginPageStyle.textSinIn} to="/register">Sign Up</Link></p>
        </section>
    );
}

export default LoginPage;
