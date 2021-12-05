import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import "../style/stage.css";
import DropDown from "./DropDown";
import setupFirebase from "./setupFirebase";
import * as firestore from "firebase/firestore";

const Stage = () => {
    const [stageID] = useState(useParams().id.replace());
    const [ans, setAns] = useState([]);
    const [found, setFound] = useState([]);
    const [ansCor, setAnsCor] = useState([]);
    const [area, setArea] = useState();
    const [showDrop, setShowDrop] = useState({});
    const [imgUrl] = useState(useLocation().state);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const amountOfAns = 5;
        
        const myFireStore = firestore.getFirestore(setupFirebase().app);
        firestore.getDocs(firestore.collection(myFireStore, "problems"))
        .then((snapShot) => {
            snapShot.docs.forEach(doc => {
                if (doc.id === stageID) {
                    const data = doc.data();
                    setAns(data.ans);
                    const corr = data.coordinate;
                    const stand = data.standard;
                    setAnsCor(corr);
                    setArea(stand.split(','));
                    setLoaded(true);
                }
            })
        });
        
        const sampleFound = [];
        for (let i = 0; i < amountOfAns; i++) {
            sampleFound.push(false);
        };
        setFound(sampleFound);
        setShowDrop({
            isShow:false,
        });

        document.querySelector('body').addEventListener('click', (e) => {
            if (e.target !== document.querySelector('.pic')) {
                setShowDrop({
                    isShow:false,
                });
            }
        });

        return () => {
            document.querySelector('body').removeEventListener('click', () => {
                setShowDrop({
                    isShow:false,
                });
            });
        }

    }, [stageID]);

    const onClickedImg = (e) => {
        const xCorr = e.pageX - e.target.offsetLeft;
        const yCorr = e.pageY - e.target.offsetTop;
        setShowDrop({
            isShow:true,
            x:xCorr,
            y:yCorr,
            ratioX:e.target.clientWidth,
            ratioY:e.target.clientHeight,
            displayX: e.pageX,
            displayY: e.pageY
        });
    }

    const onClickedAnswer = (x, y, ratioX, ratioY, ansName, index) => {
        const ansX = [];
        const ansY = [];
        for (let i = 0; i < ansCor[ansName].length; i++) {
            const [curX, curY] = ansCor[ansName][i].split(',');
            ansX.push(Math.floor(parseFloat(curX) / (area[0] / ratioX)));
            ansY.push(Math.floor(parseFloat(curY) / (area[1] / ratioY)));
        }
        if ((x >= ansX[0] && y >= ansY[0]) &&
        (x <= ansX[1] && y >= ansY[1]) &&
        (x >= ansX[2] && y <= ansY[2]) &&
        (x <= ansX[3] && y <= ansY[3])) {
            const tempFound = [...found];
            tempFound[index] = true;
            setFound(tempFound);
        }     
        setShowDrop({
            isShow:false,
        });
    }

    return (
        <div className="stage">
            <h1>{stageID}</h1>
            {!loaded && <h2 className="loading">Loading...</h2>}
            {loaded &&
                <div className="content">
                    <div className="info">
                        {ans.map((name, i) => {
                            return (
                                <div className="status" key={name}>
                                    <label>{name.replaceAll('_', ' ')}   {found[i].toString()}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="frame">
                        <img className="pic" onClick={(e) => onClickedImg(e)} 
                                src={imgUrl} alt={stageID}/>
                        {showDrop.isShow &&  
                            <DropDown
                                ansArr={ans}
                                x={showDrop.x}
                                y={showDrop.y}
                                ratioX={showDrop.ratioX}
                                ratioY={showDrop.ratioY}
                                displayX={showDrop.displayX}
                                displayY={showDrop.displayY}
                                onClickedAns={onClickedAnswer}
                            />
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Stage;