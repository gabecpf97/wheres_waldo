import React from "react";

const DropDown = ({ ansArr, x, y, ratioX, ratioY, displayX, displayY, onClickedAns }) => {
    const style = {
        top: `${displayY}px`,
        left: `${displayX}px`,
    }
    
    return (
        <div className="drop_down" style={style}>
            {ansArr.map((ans, i) => {
                return (
                    <button key={ans} onClick={() => {
                        onClickedAns(x, y, ratioX, ratioY, ans, i)}}
                        className="ansButt">
                            {ans.replaceAll('_', ' ')}
                    </button>
                )
            })}
        </div>
    );
}

export default DropDown;