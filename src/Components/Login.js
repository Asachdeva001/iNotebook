import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({email:'',password:''})
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/loginUser',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem('token',json.AuthToken);
    history("/")
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }
return (
    <div className='container my-3'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credentials.email}  onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
)
}
