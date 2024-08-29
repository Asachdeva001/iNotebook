import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/noteContext'
import NotesItem from './NotesItem'
import { useNavigate } from 'react-router-dom';

export default function Notes() {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const [myDisplay, setDisplay] = useState({
        display: "none"
    })
    useEffect(() => {!localStorage.getItem('token')?navigate('login'):getNotes()
        // eslint-disable-next-line
    }, [])
    const HandleAdd = () => {
        setDisplay({
            display: "block"
        })
    }
    const HandleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const HandleAddClick = (e) => {
        addNote(note.title, note.description, note.tag);
        setDisplay({ display: "none" })
        setNote({ title: "", description: "", tag: "" })
    }
    const HandleCloseClick = () => {
        setDisplay({ display: "none" })
    }
    return (
        <>
            <div className='container my-3'>
                <div className="d-flex justify-content-between">
                    <h2>Your Notes</h2>
                    <button type="button" className="btn btn-primary" onClick={HandleAdd}>Add New Note</button>
                </div>
                <div className="container" style={myDisplay}>
                    <div className="d-flex justify-content-center my-3">
                        <form  style={{width:'500px'}}>
                            <div className="">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" onChange={HandleOnChange} />
                            </div>
                            <div className="">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <input type="text" className="form-control" id="desc" name="description" onChange={HandleOnChange} />
                            </div>
                            <div className="">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="tag" name="tag" onChange={HandleOnChange} />
                            </div>
                        </form>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="button" className="btn btn-secondary mx-3" onClick={HandleCloseClick}>Close</button>
                        <button type="button" className="btn btn-primary mx-3" onClick={HandleAddClick}>Add Note</button>
                    </div>
                </div>
                <div className="row">
                    {notes?notes.map((note) => {
                        return <NotesItem key={note._id} note={note}/>
                    }):<p>No notes to display</p>}
                </div>
            </div>
        </>
    )
}
