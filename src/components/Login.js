import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""});
    
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const json=await response.json();
        // const status=await response.status();
        if(json.success){
            //console.log(json);
            //redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully","success");
            setcredentials({email:"", password:""})
        }else{
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})

    }

  return (
    <div className='mt-3'>
        <h2>Login to continue to E-Notebook</h2>
        <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
