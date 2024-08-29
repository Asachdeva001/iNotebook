import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    
    let history = useNavigate();
    const [credentials, setCredentials] = useState({name:'',email:'',password:'',cpassword:''})
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createUser',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
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
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' value={credentials.name}  onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credentials.email}  onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
