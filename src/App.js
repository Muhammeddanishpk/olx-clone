import React,{useEffect,useContext} from 'react';
import './App.css';
import Signup from './Pages/Signup'
import View from './Pages/ViewPost'
import Create from './Pages/Create'
import {BrowserRouter ,Route} from 'react-router-dom'
import Post from './store/postContaxt'
import Home from './Pages/Home';
// import SignupPage from './Pages/Signup';
import Login from './Components/Login/Login';
import { AuthContaxt, FirebaseContaxt } from './store/firebaseContaxt';

function App() {

  const {setUser} = useContext(AuthContaxt)
  const {auth} = useContext(FirebaseContaxt)
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
      <BrowserRouter>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route path='/login'>
          <Login/>
      </Route>
      <Route path='/create'>
        <Create/>
      </Route>
      <Route path='/view'>
        <View/>
      </Route>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
