import React, { useState, useContext } from "react";
import "./Signup.css";
import Logo from "../../olx-logo.png";
import { useHistory } from "react-router-dom";
import { FirebaseContaxt } from "../../store/firebaseContaxt";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword,updateProfile ,getAuth} from "firebase/auth";
export default function Signup() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { auth, db } = useContext(FirebaseContaxt);
  const auth1 = getAuth()
  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
    updateProfile(auth1.currentUser,{displayName: username}).then(async()=>{
       const ref = doc(db, "user", res.user.uid);
      const id = res.user.uid;
      const docRef = await setDoc(ref, { username ,phone,id })
    }) .then(() => {
        history.push("/login");
      }).catch((e)=>{
        window.confirm(e.message)
      });
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e) => handleSubmit(e.preventDefault())}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>history.push('/login')} >Login</a>
      </div>
    </div>
  );
}
