import React from "react";
import uniqid from "uniqid";
import { addDoc, collection, getFirestore, query, orderBy, limit, onSnapshot, getDocs, doc } from "@firebase/firestore";
import { useEffect, useState } from "react/cjs/react.development";
import setupFirebase from "./setupFirebase";
import UserForm from "./UserForm";
import "../style/scoreBoard.css";

const ScoreBoard = ({id, theScore}) => {
    const [board, setBoard] = useState();
    const [myScore] = useState(theScore);
    const [added, setAdded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const myFireStore = getFirestore(setupFirebase().app);

    useEffect(() => {
        const theBoard = query(collection(myFireStore, `score_board_${id}`) 
        ,orderBy('score', 'asc'), limit(10));
        onSnapshot(theBoard, (snapshot) => {
            const tempBoard = [];
            console.log('new snap');
            // snapshot.docChanges().forEach((change) => {
            //     console.log(change.doc.data())
            //     tempBoard.push(change.doc.data());
            // })
            snapshot.forEach(doc => {
                console.log(doc.data());
                tempBoard.push(doc.data());
            })
            setBoard(tempBoard);
            setLoaded(true);
        })
    }, [myFireStore, id]);

    const onClickedSubmit = (newName) => {
        console.log(newName);
        addDoc(collection(myFireStore, `score_board_${id}`), {
            name: newName,
            score: myScore
        });
        setAdded(true);
    }
    
    return (
        <div className="overlay">
            <div className="score_board">
                {!added && <UserForm 
                    onHandleSubmit={onClickedSubmit}
                />}
                {added && loaded &&
                    <div className="current_board">
                        {board.map(player => {
                            return (
                                <div className="score" key={uniqid()}>
                                    <label className="name">{player.name}:</label>
                                    <label className="time">{player.score}</label>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    );
}

export default ScoreBoard;