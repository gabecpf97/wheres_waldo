import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../style/stageDisplay.css";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import setupFirebase from "./setupFirebase";

const StageDisplay = () => {
    const [stages, setStages] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const idList = ['Jump_chara', 'Marvel_chara', 'One_Piece_chara'];
        setStages(idList);
        const myStorage = getStorage(setupFirebase().app);
        const tempImgList = [];
        idList.forEach(id => {
            getDownloadURL(ref(myStorage, `${id}.jpg`))
            .then((url) =>  {
                tempImgList.push(url);
                if (id === 'One_Piece_chara')
                    setLoaded(true);
            });
        })
        setPreviewImg(tempImgList);
    }, []);

    return (
        <div className="stages">
            {
                stages.map((stageId, i) => {
                    return (
                        <div className="stageDiv" key={stageId}>
                            {!loaded && <div className="loading">
                                    loading...
                                </div>}
                            {loaded && 
                                <Link to={`/stages/${stageId}`}
                                        state={previewImg[i]}>
                                    <img src={previewImg[i]} 
                                        alt={stageId}/>
                                        <label className="stageName">
                                            {
                                                stageId.replaceAll('_', ' ')
                                                    .replace('chara', 'character')
                                            }
                                        </label>
                                </Link>     
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default StageDisplay;