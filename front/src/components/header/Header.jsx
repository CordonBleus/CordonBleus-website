// eslint-disable-next-line no-unused-vars
import React from "react";
import styleHeader from "./Header.module.css"
import logoHorizontal from "../../assets/logo/1_treansparente.png"
import Button from "../button/button.jsx";
function Header() {
    return (
        <header className={styleHeader.header}>
            <a href="" ><img src={logoHorizontal} className={styleHeader.logoheader}/></a>
            <input className={styleHeader.menubtn} type="checkbox" id="menubtn"/>
            <label className={styleHeader.menuIcon} htmlFor="menubtn"><span className={styleHeader.navicon}></span></label>
            <ul className={styleHeader.menu}>
                <li><a href="#">Do you have an acccount ?</a></li>
                <Button text={"Sigin up"}/>
            </ul>
        </header>
    );
}

export default Header;