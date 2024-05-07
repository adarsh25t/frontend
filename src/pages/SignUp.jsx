import React, { useState } from 'react'
import { assets, url } from '../assets/images/assets'
import { Link, useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { imageTobase64 } from '../helpers/imageTobase64';
import axios from 'axios'
import { toast } from 'react-toastify';

function SignUp() {

    const [showPassword, setShowPassword] = useState(false);
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        profileImage:'',
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name,value} = e.target
        setData({
            ...data,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data);

        const response = await axios.post(url.signup,data);
        if (response.data.success) {
            toast.success(response.data.message)
            navigate('/login');
        }
        else {
            toast.error(response.data.message)
        }
    }

    const imagehandler = async (e) => {
        const file = e.target.files[0];
        const maxFileSize = 3 * 1024 * 1024; // Maximum file size (3MB)

        if (file.size > maxFileSize) {
            toast.error('File size exceeds the limit of 3MB');
            return;
        }
        const profileImage = await imageTobase64(file);
        setData({ ...data, profileImage });
    }


    return (
        <div className='conainer-div flex justify-center items-center h-screen'>
            <form className="flex flex-col items-center gap-3 bg-white shadow-md  p-8 rounded-lg  min-w-80" onSubmit={handleSubmit}>

                <div className="">
                    <label htmlFor="upload-photo">
                        <img 
                            src={data.profileImage || assets.profile_signup} 
                            alt="profile_signup" 
                            className='rounded-full border border-secondary'  
                            width={90}
                        />
                    </label>
                    <input type="file" id='upload-photo'  hidden onChange={imagehandler}/>
                </div>
  
                <div className="flex gap-3 items-center bg-slate-50 py-3 px-6 rounded-lg w-full"> 
                    <MdEmail size={20} className='text-primary' />
                    <input type="text" onChange={handleChange} name='name' placeholder='Enter your name' required className='border-none outline-none bg-transparent text-primary ' />
                </div>
                <div className="flex gap-3 items-center bg-slate-50 py-3 px-6 rounded-lg w-full">
                    <MdEmail size={20} className='text-primary' />
                    <input type="email" onChange={handleChange} name='email' placeholder='Enter your email' required className='border-none outline-none bg-transparent text-primary' />
                </div>

                <div className="flex gap-3 items-center bg-slate-50 py-3 px-6 rounded-lg w-full relative">
                    <RiLockPasswordFill size={20} className='text-primary' />
                    <input type={showPassword ? "text" : "password"} onChange={handleChange} name='password' placeholder='Enter your password' required className='border-none outline-none bg-transparent text-primary' />
                    {!showPassword && <FaEyeSlash size={20} className='absolute right-5 text-primary' onClick={() => setShowPassword(!showPassword)} />}
                    {showPassword && <FaRegEye size={20} className='absolute right-5 text-primary' onClick={() => setShowPassword(!showPassword)} />}
                </div>

                <button type='submit' className='bg-back-color text-white py-2 px-8 mt-3 rounded-full w-full text-lg font-semibold hover:bg-primary transition-all'>Sign up</button>
                <p>Already have an account? <Link to='/login' className=' text-primary text-sm underline underline-offset-2'>Login</Link></p>
            </form>

        </div>
    )
}

export default SignUp