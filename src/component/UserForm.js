import { addDoc, collection, getFirestore } from "@firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import setupFirebase from "./setupFirebase";
import { useNavigate } from "react-router-dom";
import "../style/userForm.css";

const UserForm = ({id, theScore}) => {
    const [myName , setName] = useState('');
    let navi = useNavigate();

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const onSubmit = () => {
        addDoc(collection(getFirestore(setupFirebase().app), `score_board_${id}`), {
            name: myName,
            score: theScore
        });
        navi("/score_board");
    }

    return (
        <div className="userInput">
            <h2>You finished in {theScore} sec</h2>
            <h2>Would you like to add your name to the Score Board</h2>
            <form>
                <label>Name: </label>
                <input type="text" 
                    value={myName}
                    onChange={(e) => handleChange(e)}
                />
            </form>
            <div className="links"></div>
            <button className="toScore" onClick={onSubmit}>
                add
            </button>
            <Link className="toScore_link" to="/score_board">Score Board</Link>
        </div>
    );
}

export default UserForm;