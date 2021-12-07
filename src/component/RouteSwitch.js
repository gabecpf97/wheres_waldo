import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import StageDisplay from "./StageDisplay";
import Stage from "./Stage";
import Footer from "./Footer";
import "../style/style.css";
import ScoreBoard from "./ScoreBoard";

const RouteSwitch = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/stages" element={<StageDisplay />} />
                    <Route path="/stages/:id" element={<Stage />} />
                    <Route path="/score_board" element={<ScoreBoard />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default RouteSwitch;