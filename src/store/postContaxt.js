import { createContext, useState } from 'react'

export const postContaxt = createContext(null)


function Post({children}){
    const [postDetails,setPost] = useState('')
    return (
        <postContaxt.Provider value={{postDetails,setPost}}>

            {children}
        </postContaxt.Provider>
    )
}

export default Post