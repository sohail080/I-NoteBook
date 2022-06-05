import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "sohail",
        "age": "20"
    }
    const [state, setstate] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "mac",
                "age": "19"
            });
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state , update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;