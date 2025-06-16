import React, {useState} from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Logo, Button, Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Login() {

    const navigate =useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("")

    const user = useSelector((state) => state.auth.user);
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const login =async(data)=>{
        setError("")
        try{
            const session= await authService.login(data)// service me login
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData))//store me update

                    if(user && isLoggedIn){
                    navigate("/")
                    }
                }
            }


        }catch(error){
            setError(error.message)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full m-2'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-500 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don't have any account? 
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email"
                placeholder="Enter your email" //gets included in ...props as placeholder is not specified
                type="email"
                {...register("email",{//these are props
                    required:true,
                    validate:{
                        matchPattern: (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) //test if the value is mathing the regilar expression
                        ||
                        "Email address must be a valid address", 
                    }
                })//this name is to tell kis chiz ki input field hai
                } //if ... is not used i.e. we havent spread then value will be overwritten if we us eregister in other inptut to
                />

                <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required:true,                
                })}
                />


                <Button
                type="Submit"
                className="w-full">
                    Sign In
                </Button>
            </div>

        </form>
        </div>
        
        
    
    </div>
  )
}

export default Login