import React from "react";
import LoginForm from "../../components/login/LoginForm.jsx";
import Header from "../../components/header/Header.jsx";
import LoginPageStyle from "./LoginPage.module.css";
import Help from "../../components/help/Help.jsx";
import helpicon from "../../assets/icons/HelpIcon.svg";

/**
 * Login Page
 * @returns {Element}
 * @constructor
 */
function LoginPage() {
    return (
        <section className={LoginPageStyle.page}>
            <Header />
            <br/>
            <LoginForm/>
            <p className={LoginPageStyle.textSinIn}>You don't have an account? <a className={LoginPageStyle.textSinIn} href={"#"}>Sin Up</a></p>
        </section>
    );
}

export default LoginPage;