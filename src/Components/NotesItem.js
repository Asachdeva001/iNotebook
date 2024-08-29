import React, { useContext, useRef } from 'react'
import noteContext from '../Context/noteContext'
import Modal from "./Modal"

export default function NotesItem(props) {
    const context = useContext(noteContext);
    const { delNote } = context;
    const { note } = props;
    const ref1 = useRef(null);
    const HandleEdit = ()=>{
        ref1.current.click();
    }
    return (
        <div className='col-md-3 my-3'>
            <Modal initialNote={note}/>
            <button type="button" className="btn btn-primary d-none" ref={ref1} data-bs-toggle="modal" data-bs-target="#exampleModal">btn</button>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className='far fa-trash-alt mx-2' onClick={() => { delNote(note._id) }} style={{ fontSize: "20px", cursor:"pointer"}}></i>
                            <i className='far fa-edit mx-2' onClick={HandleEdit} style={{ fontSize: "20px", cursor:"pointer"}}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
