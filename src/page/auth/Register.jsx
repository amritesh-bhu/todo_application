import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios';
import { nanoid } from 'nanoid';
import { httpClient } from '../../lib/http-client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [rgstrUser, setRgstrUser] = useState({
        username: "",
        password: ""
    })

    const notify = (msg) => toast.error(msg)

    const nav = useNavigate()

    const handleSignup = async (e) => {
        try {
            e.preventDefault()
            if (!rgstrUser?.username) {
                notify("name is required")
            }
            else if (!rgstrUser?.password) {
                notify("password is required")
            } else if (!rgstrUser?.password.length > 4) {
                notify("password must be more than 4 character")
            } else {
                console.log(rgstrUser);
                const user = await httpClient.post("/auth/signup", rgstrUser)
                console.log(user.data)

                toast.success("user successfully registered",{position:"top-center",autoClose:5000})
                setTimeout(() => {
                nav('/');
                }, 5000);
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='p-8 bg-white shadow-md rounded-lg'>
            <ToastContainer />
            <form onSubmit={handleSignup}>
                <span className='font-bold text-2xl'>Sign Up</span>
                <label htmlFor="Username" className='mt-5 flex flex-col text-slate-700'>Username</label>
                <input id="Username" className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-500 rounded-md shadow-sm focus:outline-none hover:border-sky-600 focus:ring-sky-500 focus:ring-1 py-2 px-5'
                    name="username"
                    type='text'
                    placeholder='Type your username'
                    onChange={(e) => setRgstrUser({ ...rgstrUser, username: e.target.value })}
                    value={rgstrUser.username}
                    autoComplete='off'
                />

                <label htmlFor='Password' className='mt-10 flex text-slate-700'>Password</label>
                <input id='Password' className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-500 rounded-md shadow-sm focus:outline-none hover:border-sky-600 focus:ring-sky-500 focus:ring-1 py-2 px-5'
                    name='password'
                    type='password'
                    placeholder='Type your password'
                    onChange={(e) => setRgstrUser({ ...rgstrUser, password: e.target.value })}
                    value={rgstrUser.password}

                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 rounded-md py-2 px-4"
                    type='submit'
                >Sign Up</button>

                <div className='mt-10 flex justify-center items-center'>
                    <span className='mr-2'>Already Signed up ? </span>
                    <nav>
                        <Link to='/' onClick={() => notify("Redirecting to the Login Page ")}>
                            <span className='text-blue-900 font-bold'>Log in</span>
                        </Link>
                    </nav>

                </div>
            </form>

        </div>
    )
}

export default Register;