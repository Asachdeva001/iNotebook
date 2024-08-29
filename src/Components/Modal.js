import React, { useState, useContext, useRef } from 'react'
import noteContext from '../Context/noteContext'

export default function Modal(props) {
    const context = useContext(noteContext);
    const { editNote } = context;
    const { initialNote } = props;
    const refClose = useRef(null)
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const HandleEditClick = (e) => {
        e.preventDefault();
        editNote(initialNote._id,note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        refClose.current.click();
    }
    const HandleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Existing Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" required onChange={HandleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="desc" name="description" required onChange={HandleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" required onChange={HandleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={HandleEditClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
