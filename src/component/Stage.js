import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import * as firestore from "firebase/firestore";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import DropDown from "./DropDown";
import setupFirebase from "./setupFirebase";
import "../style/stage.css";
import UserForm from "./UserForm";

const Stage = () => {
    const [stageID] = useState(useParams().id.replace());
    const [ans, setAns] = useState([]);
    const [found, setFound] = useState([]);
    const [ansCor, setAnsCor] = useState([]);
    const [area, setArea] = useState();
    const [showDrop, setShowDrop] = useState({});
    const [imgUrl] = useState(useLocation().state);
    const [loaded, setLoaded] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [charaImg, setCharaImg] = useState([]);
    const [allFound, setAllFound] = useState(false);
    const [myScore, setMyScore] = useState();
    const app = setupFirebase().app;

    useEffect(() => {
        const amountOfAns = 5;
        
        const myFireStore = firestore.getFirestore(app);
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
                    setDataLoaded(true);
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
        
    }, [stageID, app]);

    useEffect(() => {
        if (dataLoaded === true) {
            const myStorage = getStorage(app);
            const tempList = [];
            ans.forEach(id => {
                getDownloadURL(ref(myStorage, `${id}.jpg`))
                .then((url) => {
                    tempList.push({
                        id: id,
                        url: url
                    });
                    if (tempList.length === ans.length) {
                        setCharaImg(tempList);
                        setLoaded(true);
                        setMyScore(Math.floor(Date.now() / 1000));
                    }
                });
            });
        }
    }, [dataLoaded, app, ans]);

    useEffect(() => {
        let checkFound = true;
        for (let i = 0; i < ans.length; i++) {
            if (!found[i])
                checkFound = false;
        }
        setAllFound(checkFound);
        if (checkFound)
            setMyScore(myScore => {
                return (Math.floor(Date.now() / 1000) - myScore)
            });
    }, [found, ans]);
    
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

    function _getCharaUrl(name) {
        for (let i = 0; i < charaImg.length; i++) {
            if (charaImg[i].id === name)
                return charaImg[i].url;
        }
        return undefined;
    }

    return (
        <div className="stage">
            <h1>{stageID.replaceAll('_', ' ').replace('chara', 'Character')}</h1>
            {!loaded && <h2 className="loading">Loading...</h2>}
            {loaded &&
                <div className="content">
                    <div className="info">
                        {ans.map((name, i) => {
                            const charaUrl = _getCharaUrl(name);
                            const chara_name = name.replaceAll('_', ' ');
                            return (
                                <div className="status" key={name}>
                                    <img src={charaUrl} 
                                        className={(found[i] ? 'found' : 'not_found')}
                                        alt={name} />
                                    <label>{chara_name}</label>
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
                    {allFound &&
                        <UserForm
                            id={stageID}
                            theScore={myScore}
                        />
                    }
                </div>
            }
        </div>
    );
}

export default Stage;