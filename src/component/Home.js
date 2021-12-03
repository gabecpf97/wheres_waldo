import React from "react";
import { Link } from "react-router-dom";
import "../style/home.css";

function Home() {
  return (
    <div className="home">
      <h1 className="title">Where is Waldo?</h1>
      <div className="intro">
        <p>This is a simple web game that is Where's Waldo</p>
        <p>Lets find Waldo</p>
        <Link to="/stages">
          <div className="butt-to-stages">Lets go</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
