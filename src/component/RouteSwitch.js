import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import StageDisplay from "./StageDisplay";
import Stage from "./Stage";
import "../style/style.css";

const RouteSwitch = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/stages" element={<StageDisplay />} />
                    <Route path="/stages/:id" element={<Stage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default RouteSwitch;