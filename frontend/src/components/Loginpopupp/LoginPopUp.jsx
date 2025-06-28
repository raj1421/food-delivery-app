import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios'

const LoginPopUp = ({ setShowLogin }) => {
  const {url}=useContext(StoreContext);
  const {token,setToken}=useContext(StoreContext);
  const [currentState, setcurrentState] = useState("Login");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler = (event) => {
       const name=event.target.name;
       const value = event.target.value; 
       setData(data=>({...data,[name]:value}));
  }

  const onLogin = async(event) => {
      event.preventDefault()
      let newUrl=url;
      if(currentState=="Login"){
        newUrl+="/api/user/login"
      }else{
        newUrl+="/api/user/register"
      }
      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }
  }
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt=""
          />
        </div>
        <div className="login-popoup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your Name" required />
          )}
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder="Your Email" required />
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Password" required />
        </div>
        <button type="Submit">
          {currentState === "Sign Up" ? "Create account" : "Login "}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing,i agree to terms of use & privacy policy.</p>
        </div>
       {currentState==="Sign In"?<p>Already Have an Account? <span onClick={()=>setcurrentState('Login')}>Login here</span></p>:
       <p>Create a new Account? <span onClick={()=>setcurrentState('Sign Up')}>Click here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopUp;
