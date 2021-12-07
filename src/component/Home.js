import React from "react";
import { Link } from "react-router-dom";
import "../style/home.css";

function Home() {
  return (
    <div className="home">
      <h1 className="title">Where is Waldo?</h1>
      <div className="intro">
        <p>This is a simple game that asks you to find specific character from an image</p>
        <p>Then you can record your score in the score board</p>
        <Link to="/stages">
          <div className="butt-to-stages">Lets go</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
