import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { storage } from "../../firebase/config";
import { v4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged,updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContaxt, FirebaseContaxt } from "../../store/firebaseContaxt";
import {useHistory} from 'react-router-dom'
import { async } from "@firebase/util";
const Create = () => {
  // const {fire} useContext(FirebaseContaxt)
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { db } = useContext(FirebaseContaxt);
  const history = useHistory() 
  const auth = getAuth()
  const date = new Date();
  const handleSubmit = () => {
    const storageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytesResumable(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("File available at", url);
          onAuthStateChanged(auth , async(product)=>{
              // const ref = doc(db, "product", user.uid);
             const docRef = await setDoc(doc(db,'product',product.uid ),{ name,category,price,url, userId:product.uid,createDate:date.toDateString()})
           
          })
          history.push('/')
      });
    });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Discription</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />

            <input
              className="input"
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="fname"
              value={price}
              name="Price"
            />
            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="180px"
            src={image ? URL.createObjectURL(image) : null}
          ></img>
          <form>
            <br />
            <input className="imageUp"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
            <br />
            <button
              onClick={(e) => handleSubmit(e.preventDefault())}
              className="uploadBtn"
            >
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
