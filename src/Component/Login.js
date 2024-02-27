import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
    const [credentials, setCredentials] = useState({email : "", password: ""})
    const navigate = useNavigate();
    const handelsubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5050/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken)
            navigate("/");
            props.showAlert("Logged In Successfully", "success")
          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }

    }
    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
      <form onSubmit={handelsubmit}>
  <div class="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange}/>
  </div>
  <button type="submit" class="btn btn-primary" >Login</button>
</form>
    </div>
  )
}

export default Login
