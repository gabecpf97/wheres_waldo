import React from "react";
import { useState } from "react/cjs/react.development";

const UserForm = ({onHandleSubmit}) => {
    const [name , setName] = useState('');


    const handleChange = (e) => {
        setName(e.target.value);
    }

    return (
        <form onSubmit={() => onHandleSubmit(name)}>
            <label>Name: </label>
            <input type="text" 
                value={name}
                onChange={(e) => handleChange(e)}
            />
            <input type="submit" value="Add Score" /> 
        </form>
    );
}

export default UserForm;