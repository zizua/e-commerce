import React, { useState } from 'react';
import './CSS/LoginSignup.css';

// create login and signup component #1a
const LoginSignup = () => { 

  // create state for login and signup #2
  const [state, setState] = useState("Login"); // default state is login
  // create state & handler for form data #4
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  // create end point for login and signup #3
  const login = async () => {
    // console.log("Login Function Executed");
    console.log("Login Function Executed", formData);
  }
  
  const signup = async () => {
    // console.log("Signup Function Executed");
    console.log("Signup Function Executed", formData);
    // create signup function #5
    let responseData;
    await fetch("http://localhost:4000/signup", { 
      method: "POST", 
      headers: { 
        "Content-Type":"application/json", // send data in json format
      },
      body: JSON.stringify(formData), // convert data to json
    }).then((response)=>response.json()).then((data)=>responseData=data); // convert response to json

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token); // save token in local storage
      window.location.replace("/"); // redirect to home page
    }
    else {
      alert(responseData.errors); // show error message
    }
  }

  // create login and signup component #1b
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {/* <h1>Sign Up</h1> */}
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {/* <input type="text" placeholder="Your Name" /> */}
          {/* {state === "Sign Up"? <input type="text" placeholder="Your Name" /> : <></>}  */}
          {state === "Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" /> : <></>} 
          {/* <input type="email" placeholder="Email Address" /> */}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        {/* <button>Continue</button> */}
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state === "Sign Up"? 
          <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p> 
          : <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
        }
        {/* <p className="loginsignup-login">Already have an account? <span>Login here</span></p> */}
        {/* <p className="loginsignup-login">Create an account? <span>Click here</span></p> */}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
