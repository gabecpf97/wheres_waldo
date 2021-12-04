import React from "react";

const DropDown = ({ ansArr, x, y, displayX, displayY, onClickedAns }) => {
    const style = {
        top: `${displayY}px`,
        left: `${displayX}px`,
    }
    
    return (
        <div className="drop_down" style={style}>
            {ansArr.map((ans, i) => {
                return (
                    <button key={ans} onClick={() => onClickedAns(x, y, i)}
                        className="ansButt">
                            {ans}
                    </button>
                )
            })}
        </div>
    );
}

export default DropDown;