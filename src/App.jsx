import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import {login,logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import {HeaderE, FooterE} from './component/index'

function App() {

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData})
        )
      }
      else{
        console.log("Loggout set");
        
        dispatch(logout())


      }
    })
    .finally(()=> setLoading(false))
  },[])

  //conditional rendering
  
  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <HeaderE/>
        <main>
          <Outlet />
        </main>
        <FooterE/>
      </div>
    </div>
  ) : null

}
import { formatProdErrorMessage } from '@reduxjs/toolkit'

export default App
