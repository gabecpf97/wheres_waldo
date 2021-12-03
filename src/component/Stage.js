import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../style/stage.css";

const Stage = () => {
    const [stageID] = useState(useParams().id);

    useEffect(() => {
        console.log(stageID);
    }, []);

    return (
        <div className="stage">
            <h1>{stageID}</h1>
            <div className="content">
                <div className="info">
                    <p>placeholer for infos</p>
                </div>
                <div className="frame">
                    <p>Placeholder for img</p>
                </div>
            </div>
        </div>
    );
}

export default Stage;