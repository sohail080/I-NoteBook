import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost/:5000"
    const initialNotes = []
      const [notes, setNotes] = useState(initialNotes);

      ////////////////////////////////////////////FETCH ALL NOTES /////////////////////////////////////////////////
      const getNotes = async ()=>
    {
      //API call 

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5YTZiYTYxYzljMzY3ODI0MThjYzczIn0sImlhdCI6MTY1NDM0MjcxNX0.7Dq7WlUTnxdsMO5rmqizfpjFc2Lv46c5Zj_H8eUs86c'
        },
       
      }); 

      //logic to add in client side
      const json = await response.json();
      console.log(json);
      setNotes(json);
   
    }
     
     
      ////////////////////////////////////////////ADD A NOTE /////////////////////////////////////////////////
      const addNote = async (title , description , tag)=>
    {
      //todo: API call

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5YTZiYTYxYzljMzY3ODI0MThjYzczIn0sImlhdCI6MTY1NDM0MjcxNX0.7Dq7WlUTnxdsMO5rmqizfpjFc2Lv46c5Zj_H8eUs86c'
        },
       
        body: JSON.stringify(title , description , tag) 
      }); 

      //logic to add in client side
      console.log("adding a new note");
      const note =  {
        "tag": tag,
        "_id": "6629b668760b52275405b8bc7e",
        "user": "629a6ba61c9c36782418cc734",
        "title": title,
        "description":description,
        "date": "2022-06-04T14:04:55.888Z",
        "__v": 0
      }
        setNotes(notes.concat(note));
    }
     ///////////////////////////////////////////////DELETE A NOTE//////////////////////////////////////// 
     const deleteNote = (id)=>
     {
       //todo: API call


      //logic to delete in client side
       console.log("deleting a note with id" + id);
       const newState = notes.filter((note)=>{return note._id!==id});
       setNotes(newState);
     }
      /////////////////////////////////////////////EDIT A NOTE//////////////////////////////////////////
      const editNote = async (id , title , description , tag )=>
    {
      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5YTZiYTYxYzljMzY3ODI0MThjYzczIn0sImlhdCI6MTY1NDM0MjcxNX0.7Dq7WlUTnxdsMO5rmqizfpjFc2Lv46c5Zj_H8eUs86c'
        },
       
        body: JSON.stringify(title , description , tag) 
      });
      const json = response.json(); 
    

      //logic to edit in client side
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id===id) {
          element.title=title;
          element.description=description;
          element.tag=tag;
        }
        
      }
    }
   
    return (
        <NoteContext.Provider value={{notes , addNote , deleteNote ,editNote , getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;