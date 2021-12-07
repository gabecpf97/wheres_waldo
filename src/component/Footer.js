import React from "react";
import logo from "../logo/GitHub-Mark.png";
import "../style/footer.css";

const Footer = () => {

    return (
        <footer>
            <label className="footer_label">
                Created by PuiFai Chau
            </label>
            <a href="https://github.com/gabecpf97">
                <img src={logo} alt="logo" />
            </a>
        </footer>
    );
}

export default Footer;