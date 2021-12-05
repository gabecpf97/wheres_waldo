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
                tempImgList.push({
                    id: id,
                    url: url
                });
                if (tempImgList.length === 3) {
                    setPreviewImg(tempImgList);
                    setLoaded(true);
                }
            });
        })
    }, []);

    const _getUrl = (id) => {
        for (let i = 0; i < previewImg.length; i++) {
            if (previewImg[i].id === id)
                return previewImg[i].url;
        }
        return undefined;
    }

    return (
        <div className="stages">
            {!loaded && <div className="loading">
                    loading...
                </div>}
            {loaded && (
                stages.map((stageId, i) => { 
                    const imgUrl = _getUrl(stageId);
                    return (
                        <div className="stageDiv" key={stageId}>
                            <Link to={`/stages/${stageId}`}
                                    state={imgUrl}>
                                <img src={imgUrl} 
                                    alt={stageId}/>
                                    <label className="stageName">
                                        {
                                            stageId.replaceAll('_', ' ')
                                                .replace('chara', 'character')
                                        }
                                    </label>
                            </Link>     
                        </div>
                    )
                }))
            }
        </div>
    );
}

export default StageDisplay;