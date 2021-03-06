import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { note } = props;
    const { deleteNote } = context;
    
    return (
       
            <div className='col-md-4'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title} </h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-trash-can mx-3" onClick={()=>{ deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3"></i>
                </div>
            </div>
            </div>

        
    )
}

export default Noteitem