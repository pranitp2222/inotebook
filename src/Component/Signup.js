import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    const[credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""})
    const navigate = useNavigate();
    const handelsubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials
        const response = await fetch(`http://localhost:5050/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken)
            navigate("/");
            props.showAlert("Account created Successfully", "success")
          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }

    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
      <div className="container">
        <form onSubmit={handelsubmit}>
        <div class="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div class="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div class="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div class="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm - Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              inLength={5}
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            SignUp
          </button>
        </form>
      </div>
    
  );
};

export default Signup;
