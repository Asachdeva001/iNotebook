import React,{useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const host = 'http://localhost:5000/api/';
    const [notes, setNotes] = useState([]);
    const getNotes = async ()=>{
        const response = await fetch(host+"notes/fetchAllNotes",{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }
    const addNote = async (title,description,tag)=>{

        const response = await fetch(host+"notes/addNotes",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);
        getNotes();
    }
    const delNote = async (id)=>{
        
        const response = await fetch(host+"notes/deleteNote/"+id,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }
    const editNote = async (id,title,description,tag)=>{
        console.log(id)
        const response = await fetch(host+"notes/updateNote/"+id,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);
        getNotes()
    }
    return(
        <noteContext.Provider value={{notes,addNote,delNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;