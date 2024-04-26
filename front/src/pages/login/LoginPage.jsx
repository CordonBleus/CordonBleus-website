import React from "react";
import LoginForm from "../../components/login/LoginForm.jsx";
import Header from "../../components/header/Header.jsx";

/**
 * Login Page
 * @returns {Element}
 * @constructor
 */
function LoginPage() {
    return (
        <>
            <Header />
            <br/>
            <LoginForm />
        </>
    );
}

export default LoginPage;