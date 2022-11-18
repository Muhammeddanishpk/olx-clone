import React from 'react';
import './Home.css'
import Sell from '../Components/Header/sell'
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';

function Home(props) {
  return (
    <div className="homeParentDiv">
    <Posts />
    <Sell/>
    </div>
  );
}

export default Home;
 
