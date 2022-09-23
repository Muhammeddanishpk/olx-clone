import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContaxt} from './store/firebaseContaxt'
import Contaxt from './store/firebaseContaxt'
import {auth ,db} from './firebase/config'
ReactDOM.render(
<FirebaseContaxt.Provider value={{auth,db}}>
    <Contaxt>
         <App /> 
    </Contaxt>
  
</FirebaseContaxt.Provider>
, document.getElementById('root'));
