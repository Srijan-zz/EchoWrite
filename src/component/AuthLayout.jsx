import React, {Children, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({
    children,
    authentication=true
}) {

    const navigate=useNavigate()
    const [loader,SetLoader]=useState(true)
    const authStatus= useSelector(state => state.auth.status )


    useEffect(()=>{

        // if(authStatus==true)navigate('/')
        // else if (authStatus==false)navigate('/login')

        // let authValue = authStatus===true?true:false; //can use this in place of second condition

        if(authentication && authStatus!== authentication){ //authenticated nahi hai so authstatus is false aur authentication true hai
            navigate('/login')
        }
        else if(!authentication && authStatus!== authentication){//authentication is false && authStatus is true
            navigate('/')
        }
        SetLoader(false)
    },[authStatus,navigate, authentication])







  return loader? <h1>Loading...</h1>: <>{children}</>
}
