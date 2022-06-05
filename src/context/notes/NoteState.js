import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const initialNotes = [
        {
          "tag": "General",
          "_id": "629b658a1ee95d639d6b0e57",
          "user": "629a6ba61c9c36782418cc73",
          "title": "note1",
          "description": "this a note",
          "date": "2022-06-04T14:00:42.676Z",
          "__v": 0
        },
        {
          "tag": "General",
          "_id": "629b668760b52275405b8bc7",
          "user": "629a6ba61c9c36782418cc73",
          "title": "note2",
          "description": "this a note2",
          "date": "2022-06-04T14:04:55.888Z",
          "__v": 0
        }
        ,
        {
          "tag": "General",
          "_id": "629b668760b52275405b8bc7",
          "user": "629a6ba61c9c36782418cc73",
          "title": "note3",
          "description": "this a note2",
          "date": "2022-06-04T14:04:55.888Z",
          "__v": 0
        }
        ,
        {
          "tag": "General",
          "_id": "629b668760b52275405b8bc7",
          "user": "629a6ba61c9c36782418cc73",
          "title": "note4",
          "description": "this a note2",
          "date": "2022-06-04T14:04:55.888Z",
          "__v": 0
        }
        ,
        {
          "tag": "General",
          "_id": "629b668760b52275405b8bc7",
          "user": "629a6ba61c9c36782418cc73",
          "title": "note5",
          "description": "this a note2",
          "date": "2022-06-04T14:04:55.888Z",
          "__v": 0
        }
        ,
        {
          "tag": "General",
          "_id": "629b668760b52275405b8bc7",
          "user": "629a6ba61c9c36782418cc73",
          "title": "note6",
          "description": "this a note2",
          "date": "2022-06-04T14:04:55.888Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(initialNotes);
   
    return (
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;