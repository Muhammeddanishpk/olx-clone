import React, { useContext, useState, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import { postContaxt } from "../../store/postContaxt";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FirebaseContaxt } from "../../store/firebaseContaxt";

import "./Header.css";
import { AuthContaxt } from "../../store/firebaseContaxt";
import { useHistory, Link } from "react-router-dom";
function Header(props) {
  const [search, setsearch] = useState("");
  const [contact, setcontact] = useState([]);
  const [result, setresult] = useState([]);
  const inputEl = useRef("");
  const { user } = useContext(AuthContaxt);
  const history = useHistory();
  const { db } = useContext(FirebaseContaxt);
  const { postDetails } = useContext(postContaxt);
  const signout = () => {
    const auth = getAuth();
    if (window.confirm("Are shure Logout")) {
      signOut(auth);
      history.push("/");
    }
  };

  const login = () => {
    history.push("/login");
  };
  
  const getSearch = () => {
    props.searchKey(inputEl.current.value)   
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <img src="../../../Images/logo.png" />
        </div>
        <div className="search-bar">
          <input  
            type="text"
            ref={inputEl}
            placeholder="search...."
            value={props.tern}
            onChange={getSearch}
          />
        </div>
        <div className="nav">
          <Link to="/">Home</Link>
        </div>
        {user && (
          <span className="Logout" onClick={() => signout()}>
            Logout
          </span>
        )}
        <div className="loginPage">
          <span
            className={user ? "dada" : "login"}
            onClick={user ? null : login}
          >
            {user ? user.displayName : "Login"}
          </span>
          <img
            src={user ? "../../../Images/user.png" : null}
            className={user ? "blaaa" : "imageHide"}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
