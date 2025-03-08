import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout as logoutS} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

    const dispatch =useDispatch()
    const navigate = useNavigate()

    const logoutHandler  = ()=>{

      console.log("Entered logoutHandler");
      
        authService.logout()
        .then(()=>{
            dispatch(logoutS())
            navigate('/')
            console.log("Should've navigated");
        })
    }
  return (
    <button className='inline-block px-6 m-1  py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>
            Logout
    </button>
  )
}

export default LogoutBtn