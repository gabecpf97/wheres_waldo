import React from "react";
import { Link } from "react-router-dom";
import "../style/navBar.css";

const NavBar = () => {
    return (
        <div className="navBar">
            <Link to="/">
               <h1 className="title">Where's Waldo</h1>
            </Link>
            <ul className="tabs">
                <Link to="/stages">
                    <li>Stages</li>
                </Link>
                <Link to="/score_board">
                    <li>Score Board</li>
                </Link>
            </ul>
        </div>
    );
}

export default NavBar;