import React, { useState,useContext } from 'react';
import {} from '../../store/firebaseContaxt'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'
import { FirebaseContaxt } from "../../store/firebaseContaxt";
import {signInWithEmailAndPassword} from 'firebase/auth'
function Login() {
  const { auth, db } = useContext(FirebaseContaxt);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const history = useHistory()
  const handleLogin = () =>{
  
    signInWithEmailAndPassword(auth, email, password).then(()=>{
     history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
    
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e)=>handleLogin(e.preventDefault())}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=> history.push('/signup')} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
