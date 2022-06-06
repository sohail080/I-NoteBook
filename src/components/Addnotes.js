import React , {useContext , useState} from 'react'
import noteContext from '../context/notes/noteContext';

const Addnotes = () => {
    const context = useContext(noteContext);
    const {addNote} = context; 
    const [note, setNote] = useState({title : "" , description : "" , tag : "default"})
    const handleSubmit = (e)=>
    {
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
    }
    const onChange = (e) =>
    {
setNote({...note,[ e.target.name] : e.target.value });
    }
  return (
    <div className='container mt-4'>
    <h1>Add a Note</h1>
    <form>
<div className="form-group">
  <label htmlFor="exampleInputEmail1">Title </label>
  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
</div>
<div className="form-group">
  <label htmlFor="exampleInputPassword1">Description</label>
  <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
</div>
<div className="form-group">
  <label htmlFor="exampleInputPassword1">Tag</label>
  <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
</div>
<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
</form>
  </div>
  )
}

export default Addnotes
