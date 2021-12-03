import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../style/stageDisplay.css";

const StageDisplay = () => {
    const [stages, setStages] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);

    useEffect(() => {
        const idList = ['123', '234', '345'];
        setStages(idList);
        const imgList = ['1img', '2img', '3img'];
        setPreviewImg(imgList);
    }, []);

    return (
        <div className="stages">
            {
                stages.map((stageId, i) => {
                    return (
                        <div className="stageDiv" key={stageId}>
                            <Link to={`/stages/${stageId}`}>
                                <p>{previewImg[i]}</p>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default StageDisplay;