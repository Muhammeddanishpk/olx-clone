import React from 'react'
import {useHistory} from 'react-router-dom'
function Sell() {
    const history = useHistory()
  return (
    <div onClick={()=> history.push('/create')} className="sellBtn">
    <a href="">Sell product</a>
    <span className='one' ></span>
    <span className='two' ></span>
  </div>
  )
}

export default Sell