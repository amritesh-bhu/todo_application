import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import Parent from '../Parent';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { httpClient } from '../../lib/http-client';
// import { Form } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [user, setUser] = useState({
        //  username: "", password: ""
        username: "",
        password: ""
    });
    const [logIn, setLogIn] = useState(false);
    const [vald, setVald] = useState(true);

    const notify = (msg) => toast.error(msg, { position: 'top-center', autoClose: 5000 })

    const navigate = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await httpClient.get('/auth/me')
                console.log(session)
                if (session) {
                    navigate("/todo")
                }
            } catch (err) {
                console.log("Please login")
            }
        }

        checkSession();

    }, [])

    const handleUsrLogin = async (e) => {
        try {
            e.preventDefault();
            if (!user?.username) {
                notify("username and password is required")
            }
            else if (!user?.password) {
                notify("password is required")
            }
            else if (!user?.password.length > 4) {
                notify("password must be more than 4 character")
            }
            else {
                const userval = await httpClient.post("/auth/login", user)
                console.log(userval.data)
                toast.success("logged in successfully!", { position: 'top-center', autoClose: 2000 })
                setTimeout(() => {
                    navigate('/todo')
                }, 2000);
            }

        }
        catch (err) {
            console.log(err.message)
        }
    }


    return (<>
        <div className='p-8 bg-white shadow-md rounded-lg'>
            <ToastContainer />
            <form onSubmit={handleUsrLogin}>
                <span className='font-bold text-2xl'>Log In</span>
                <label htmlFor="Username" className='mt-5 flex flex-col text-slate-700'>Username</label>
                <input id="Username" className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-500 rounded-md shadow-sm focus:outline-none hover:border-sky-600 focus:ring-sky-500 focus:ring-1 py-2 px-5'
                    name="username"
                    type='text'
                    placeholder='Type your username'
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    value={user.username}
                    autoComplete='off'
                />

                <label htmlFor='Password' className='mt-10 flex text-slate-700'>Password</label>
                <input id='Password' className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-500 rounded-md shadow-sm focus:outline-none hover:border-sky-600 focus:ring-sky-500 focus:ring-1 py-2 px-5'
                    name='password'
                    type='password'
                    placeholder='Type your password'
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    value={user.password}

                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 rounded-md flex justify-center py-2 px-4"
                    type='submit'
                >Log In</button>
                <div>
                    <nav>
                        <Link to='reset-password'>
                            <span className='text-blue-900 flex justify-center mt-2 '>Forgot password ?</span>
                        </Link>
                    </nav>
                </div>
                <div className='mt-10 flex justify-center items-center'>
                    <span className='mr-2'>New User ? </span>
                    <nav>
                        <Link to='signup'>
                            <span className='text-blue-900 font-bold'>Register</span>
                        </Link>
                    </nav>

                    {/* <Outlet /> */}

                </div>
            </form>
        </div>
    </>
    );
}

export default Login;