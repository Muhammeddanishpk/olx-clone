import React,{useEffect,useState,useContext} from 'react';
import { postContaxt } from '../../store/postContaxt';
import Header from '../Header/Header'
import { collection, query, where,getDocs } from "firebase/firestore";
import './View.css';
import { FirebaseContaxt } from '../../store/firebaseContaxt';
function View() {
  const [userDetails,setUserDetails] = useState([])
  const [searchTerm,setTerm] = useState('')
  const [searchResult,setResult] = useState([])
  const {postDetails} = useContext(postContaxt)
  const { db } = useContext(FirebaseContaxt);

  useEffect(()=>{
    const {userId} = postDetails
    const colref = collection(db,'user')
    const q = query(colref, where("id", "==", userId)); 
    getDocs(q).then((res)=>{
      res.forEach(doc=>{
        setUserDetails(doc.data())
      })
    })
  },[])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
        <p className='price' >&#x20B9; {postDetails.price} </p>
          <span className='titls'>  Name : {postDetails.name}</span>
          <p className='titls'> Discription : {postDetails.category}</p>
          <span className='t'>Publish Date : {postDetails.createDate}</span>
        </div>
       {userDetails && <div className="contactDetails">
            <img className='userProfile' src="https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png"/>
          <p className='name'>{userDetails.username}</p>
          <p>&#128222; <a className='phone' href={`tel:${userDetails.phone}`} title="Click to call">  : {userDetails.phone}</a> </p>
        </div>}
      </div>
    </div>

  );
}
export default View;
