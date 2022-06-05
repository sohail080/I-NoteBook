// import React from 'react'
import React , {useContext} from 'react'

import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';


const Notes = () => {
    const context = useContext(noteContext);
  const {notes , setNotes} = context; 
  return (
      <>
    <h1>Your Notes</h1>
    <div className='row my-4'>
    {notes.map(
      (note)=>
      {
        return <Noteitem note = {note}/>
      }
    )}
    </div>
    </>
  )
}

export default Notes