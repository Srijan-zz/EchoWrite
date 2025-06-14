import React from 'react'
import {ContainerE as Container, Logo , LogoutBtn }from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";


function HeaderE() {

  const authStatus = useSelector((state)=> state.auth.status)

  
  
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>

      <Container>
        <nav className='flex'>
          <div className='mr-4 bg-blue-100'>
            <Link to ='/'>
                <Logo width='70px'/>
            </Link>
          </div>

           <div className='text-gray-950 text-2xl font-bold px-2 py-2 m-1'>EchoWrite</div>                

          <ul className='flex ml-auto'>
               
                {
                
                navItems.map((item)=>
                item.active? (

                  <React.Fragment key={item.name}>
                    <li  >
                    <button
                    onClick={()=>navigate(item.slug)}
                    className='inline-block px-6 py-2 m-1 duration-200  hover:bg-blue-100 rounded-full'

                    >{item.name}
                    </button>
                  </li>
                  </React.Fragment>
                  
                ):null
              )}
                {authStatus && (
                  <li>
                    <LogoutBtn/>
                  </li>
                )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default HeaderE