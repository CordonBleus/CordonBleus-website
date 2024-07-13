// eslint-disable-next-line no-unused-vars
import React from "react";
import styleHeader from "./Header.module.css"
import logoHorizontal from "../../assets/logo/1_treansparente.png"
import Button from "../button/button.jsx";
function Header({user}) {
    const logOut = () => {
        localStorage.removeItem("googleToken");
        window.location.href = "/";
    }

    const headerBtnText = () => {
      if (localStorage.getItem("googleToken") != null) {
        return "Log Out";
      }
      return "Log In";
    }

    return (
        <header className={styleHeader.header}>
            <a href="/" ><img src={logoHorizontal} className={styleHeader.logoheader} alt={"logo"}/></a>
            <input className={styleHeader.menubtn} type="checkbox" id="menubtn"/>
            <label className={styleHeader.menuIcon} htmlFor="menubtn"><span className={styleHeader.navicon}></span></label>
            <ul className={styleHeader.menu}>
                <Button text={headerBtnText()} onClick={logOut}/>
            </ul>
        </header>
    );
}

export default Header;