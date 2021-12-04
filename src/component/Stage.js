import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../style/stage.css";
import DropDown from "./DropDown";

const Stage = () => {
    const [stageID] = useState(useParams().id);
    const [ans, setAns] = useState([]);
    const [found, setFound] = useState([]);
    const [ansCor, setAnsCor] = useState([]);
    const [area, setArea] = useState();
    const [showDrop, setShowDrop] = useState({});

    useEffect(() => {
        const standard = [5, 10];
        const sampleAns = ['Waldo', 'Peopl1', '2People'];
        const dataAns = ['1,1', '4, 16', '66, 2'];
        
        setAns(sampleAns);
        setAnsCor(dataAns);
        setArea(standard);
        setShowDrop({
            isShow:false,
            x:-1,
            y:-1,
            displayX: -1,
            displayY: -1
        });

        const sampleFound = [];
        sampleAns.forEach(() => {
            sampleFound.push(false);
        });
        setFound(sampleFound);
    }, []);

    const onClickedImg = (e) => {
        const xCorr = e.pageX - e.target.offsetLeft;
        const yCorr = e.pageY - e.target.offsetTop;
        setShowDrop({
            isShow:true,
            x:xCorr,
            y:yCorr,
            displayX: e.pageX,
            displayY: e.pageY
        });
    }

    const onClickedAnswer = (x, y, index) => {
        let [ansX, ansY] = ansCor[index].split(',');
        ansX = parseFloat(ansX);
        ansY = parseFloat(ansY); 
        if ((x >= ansX && x <= (ansX + area[0])) &&
            (y >= ansY && y <= (ansY + area[1]))) {
                const tempFound = [...found];
                tempFound[index] = true;
                setFound(tempFound);
        }
        setShowDrop({
            isShow:false,
            x:-1,
            y:-1,
            displayX: -1,
            displayY: -1
        });
    }

    return (
        <div className="stage">
            <h1>{stageID}</h1>
            <div className="content">
                <div className="info">
                    {ans.map((name, i) => {
                        return (
                            <div className="status" key={name}>
                                <label>{name}   {found[i].toString()}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="frame">
                    <div className="pic" onClick={(e) => onClickedImg(e)} >
                    </div>
                    {showDrop.isShow &&  
                        <DropDown
                            ansArr={ans}
                            x={showDrop.x}
                            y={showDrop.y}
                            displayX={showDrop.displayX}
                            displayY={showDrop.displayY}
                            onClickedAns={onClickedAnswer}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default Stage;