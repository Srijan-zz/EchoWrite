import React, { useState } from 'react'
import { Input, Button, Logo } from './index'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("")

    const signup = async (data) => {
        setError("")
        try {
            const acc = await authService.createAccount(data)

            if (acc) {
                const currUser = await authService.getCurrentUser(acc)
                if (currUser) {
                    dispatch(login(currUser))                  
                    navigate('/')
                    
                }
            }

        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex justify-center items-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-500 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("Name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email" //gets included in ...props as placeholder is not specified
                            type="email"
                            {...register("email", {//these are props
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) //test if the value is mathing the regilar expression
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
                            {...register("password", {
                                required: true,
                            })}
                        />


                        <Button
                            type="Submit"
                            className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUp