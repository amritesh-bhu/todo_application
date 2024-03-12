import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../page/auth/Login'
import Register from '../page/auth/Register'
import Parent from '../page/Parent'
import Forgotpassword from '../page/Forgotpassword'


const Routing = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/todo' element={<Parent />} />
                <Route path='/reset-password' element={<Forgotpassword />}/>
            </Routes>
        </>

    );
}

export default Routing;