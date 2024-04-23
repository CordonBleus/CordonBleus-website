import React from "react";
import styleHeader from "./Header.module.css"
import logoHorizontal from "../../assets/logo/1_treansparente.png"
function Header() {
    return (
        <header className={styleHeader.header}>
            <a href="" ><img src={logoHorizontal} className={styleHeader.logoheader}/></a>
            <input className={styleHeader.menubtn} type="checkbox" id="menubtn"/>
            <label className={styleHeader.menuIcon} htmlFor="menubtn"><span className={styleHeader.navicon}></span></label>
            <ul className={styleHeader.menu}>
                <li><a href="#work">Our Work</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </header>
    );
}

export default Header;