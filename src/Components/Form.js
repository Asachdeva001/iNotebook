import React,{useState} from 'react'

export default function Form() {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const HandleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={HandleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="description" onChange={HandleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={HandleOnChange} />
                </div>
            </form>
        </div>
    )
}
