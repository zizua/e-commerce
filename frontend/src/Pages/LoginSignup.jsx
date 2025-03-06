import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {

  // create state for login and signup 
  const [state, setState] = useState("Login"); // default state is login

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {/* <h1>Sign Up</h1> */}
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {/* <input type="text" placeholder="Your Name" /> */}
          {state === "Sign Up"? <input type="text" placeholder="Your Name" /> : <></>} 
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
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
