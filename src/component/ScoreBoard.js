import React from "react";
import { collection, getFirestore, query, orderBy, limit, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react/cjs/react.development";
import setupFirebase from "./setupFirebase";
import "../style/scoreBoard.css";
import Board from "./Board";

const ScoreBoard = () => {
    const [jumpBoard, setJumpBoard] = useState([]);
    const [marvelBoard, setMarvelBoard] = useState([]);
    const [opBoard, setOpBoard] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const myFireStore = getFirestore(setupFirebase().app);
    
    useEffect(() => {
        const idList = ['Jump_chara', 'Marvel_chara', 'One_Piece_chara'];
        idList.forEach(id => {
            const theBoard = query(collection(myFireStore, `score_board_${id}`) 
            ,orderBy('score', 'asc'), limit(10));
            onSnapshot(theBoard, (snapshot) => {
                const tempBoard = [];
                snapshot.forEach(doc => {
                    console.log(doc.data());
                    tempBoard.push(doc.data());
                })
                switch (id) {
                    case "Jump_chara":
                        setJumpBoard(tempBoard);
                        break;

                    case "Marvel_chara":
                        setMarvelBoard(tempBoard);
                        break;

                    case "One_Piece_chara":
                        setOpBoard(tempBoard);
                        break;

                    default:
                        break;
                }
            });
        });
    }, [myFireStore]);
    
    useEffect(() => {
        if (jumpBoard !== null && marvelBoard !== null &&
                opBoard !== null)
            setLoaded(true);
    }, [jumpBoard, marvelBoard, opBoard])

    return (
        <div className="score_div">
            <div className="score_board">
                {!loaded && 
                    <h1>loading...</h1>
                }
                {loaded &&
                    <div className="current_board">
                        <Board 
                            scores={jumpBoard}
                            id="Jump"
                        />
                        <Board 
                            scores={marvelBoard}
                            id="Marvel"
                        />
                        <Board 
                            scores={opBoard}
                            id="One Piece"
                        />
                    </div>
                }
            </div>
        </div>
    );
}



export default ScoreBoard;