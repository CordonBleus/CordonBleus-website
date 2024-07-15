import styleHeader from "./Header.module.css";
import logoHorizontal from "../../assets/logo/1_treansparente.png";
import Button from "../button/button.jsx";

function Header() {

    const logOut = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("userUuid");
        localStorage.removeItem("googleToken");
        window.location.href = "/";
    };

    return (
        <header className={styleHeader.header}>
            <a href="/" className={styleHeader.logoContainer}>
                <img
                    src={logoHorizontal}
                    className={styleHeader.logoHeader}
                    alt={"logo"}/>
            </a>
            <Button
                text={localStorage.getItem("username") != null ? "Log Out" : "Log In"}
                onClick={logOut}/>
        </header>
    );
}

export default Header;
