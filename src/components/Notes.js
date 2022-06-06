// import React from 'react'
import React , {useContext , useEffect} from 'react'

import noteContext from '../context/notes/noteContext';
import Addnotes from './Addnotes';
import Noteitem from './Noteitem';


const Notes = () => {
    const context = useContext(noteContext);
  const {notes ,getNotes } = context; 
  useEffect(() => {
    getNotes();
  }, [])
  
  return (
      <>
      <Addnotes/>
    <h1>Your Notes</h1>
    <div className='row my-4'>
    {notes.map(
      (note)=>
      {
        return <Noteitem key={note._id} note = {note}/>
      }
    )}
    </div>
    </>
  )
}

export default Notes