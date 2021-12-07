import React from "react";
import uniqid from "uniqid";

const Board = ({ scores, id }) => {   

    return (
        <div className="board">
            <h2>{`${id} character`}</h2>
            <div className="labels">
                <label className="label_name">Name: </label>
                <label className="label_time">Time: </label>
            </div>
            {scores.map(player => {
                return(
                <div className="score" key={uniqid()}>
                    <label className="name">{player.name}</label>
                    <label className="time">{player.score} sec</label>
                </div>
                )
            })}
        </div>
    )
}

export default Board;