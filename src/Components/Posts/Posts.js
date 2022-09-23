import React,{useState,useEffect,useContext} from 'react';
// import { getDoc, doc } from "firebase/firestore";
import { useHistory } from 'react-router-dom';
import { AuthContaxt, FirebaseContaxt } from '../../store/firebaseContaxt';
import './Post.css';
import Header from '../Header/Header';
import { doc, collection,getDocs } from "firebase/firestore";
import { postContaxt } from '../../store/postContaxt';
function Posts() {
  const [products,setProducts] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [result,setResult] = useState([])
  
  const { db } = useContext(FirebaseContaxt);
const {setPost} = useContext(postContaxt)
const history = useHistory()
useEffect(()=>{
const colref = collection(db,'product')
getDocs(colref).then((snapshot)=>{
  const allPost = snapshot.docs.map((products)=>{
    return {
      ...products.data(),
      id:products.id
    }
  })
  console.log(allPost);
  setProducts(allPost)
})
},[])
const  searchHandler = (searchTerm) =>{
    setSearchTerm(searchTerm)
    if(searchTerm !== ""){
      const newList = products.filter((product)=>{
        return Object.values(product).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      })
      setResult(newList)
    }else{
      setResult(products)
    }
}
  return (
    <>
  <Header
    tern={searchTerm}
    searchKey={searchHandler}
    product={searchTerm.length < 1 ?  products : result}
  />
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         {products.filter((val)=>{
          if(searchTerm == ""){
            return val
          }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.price.toLowerCase().includes(searchTerm.toLowerCase()) ){
            return val
          }
         }).map((product,key)=>{
         return (<div key={key}
         onClick={()=>{
          setPost(product)
          history.push('/view')
         }}
            className="card"
          >
            <div className="favorite">
            
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content"> 
              <p className="name"> { product.name}</p>
              {/* <span className="kilometer">{product.category}</span> */}
             <p className="rate">&#x20B9; {product.price}</p>
            </div>
            <div className="date">
              <span>{product.createDate}</span>
            </div>
          </div>)
         }) }
        </div>
      </div>
    </div> 
    </>
  );
}

export default Posts;
