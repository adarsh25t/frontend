import React, { useState } from 'react'
import { assets, url } from '../assets/images/assets'
import { Link, useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchuserDetails } from '../store/UserSlice';
import { useDispatch } from 'react-redux';


function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [data,setData] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name,value} = e.target
        setData({
            ...data,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        
        const response = await axios.post(url.signin,data,{ withCredentials: true });
        if(response.data.success){
            toast.success(response.data.message)
            dispatch(fetchuserDetails())
            navigate('/')
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='conainer-div flex justify-center items-center h-screen'>
            <form className="flex flex-col items-center gap-3 bg-white shadow-md min-w-80 p-8 rounded-lg" onSubmit={handleSubmit}>

                <div className="">
                    <img src={assets.profile_login} alt="" />
                </div>
                <div className="flex gap-3 items-center bg-slate-50 py-3 px-6 rounded-lg w-full">
                    <MdEmail size={20} className='text-primary' />
                    <input type="email" name='email' onChange={handleChange} placeholder='Enter your email' required className='border-none outline-none bg-transparent text-primary' />
                </div>

                <div className="flex gap-3 items-center bg-slate-50 py-3 px-6 rounded-lg w-full relative">
                    <RiLockPasswordFill size={20} className='text-primary' />
                    <input type={showPassword ? "text" : "password"} name='password' onChange={handleChange} placeholder='Enter your password' required className='border-none outline-none bg-transparent text-primary' />
                    {!showPassword && <FaEyeSlash size={20} className='absolute right-5 text-primary' onClick={() => setShowPassword(!showPassword)} />}
                    {showPassword && <FaRegEye size={20} className='absolute right-5 text-primary' onClick={() => setShowPassword(!showPassword)} />}
                </div>

                <div className="flex justify-end items-end w-full">
                    <Link to='/forgotpassword' className=' text-primary text-sm underline underline-offset-2'>Forgot password</Link>
                </div>

                <button type='submit' className='bg-back-color text-white py-2 px-8 rounded-full w-full text-lg font-semibold hover:bg-primary transition-all'>Login</button>
                <p>Don't have an account? <Link to='/signup' className=' text-primary text-sm underline underline-offset-2'>Sign up</Link></p>
            </form>

        </div>
    )
}

export default Login