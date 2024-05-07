import React, { useState } from 'react'
import './header.css'
import Logo from '../Logo/Logo'
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { assets, url } from '../../assets/images/assets';
import { toast } from 'react-toastify';
import { addUser } from '../../store/UserSlice';

function Header() {

    const [showCollapse, setShowCollapse] = useState(false);
    const user = useSelector(state => state.user?.userdetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await axios.get(url.logout,{ withCredentials: true })
        if (response.data.success) {
            toast.success(response.data.message)
            dispatch(addUser(null))
            navigate('/')
        }
        else {
            toast.error(response.data.message)
        }
    }

  return (
    <header className='h-16 bg-white'>
        <div className="conainer-div flex justify-between items-center">
            <Link to='/'>
                <Logo width={60} height={60}/>
            </Link>
            
            <div className="items-center border border-gray-300 rounded-full py-2 px-4 min-w-96 hidden md:flex">
                <FaSearch size={20} className='text-primary'/>
                <input type="text" placeholder='Search products here...' className='border-none outline-none pl-3 text-gray-500'/>
            </div>

            <div className="flex items-center gap-5">
                <div className="relative">
                    {user?.profileImage ?
                        <img src={user.profileImage} onClick={() => setShowCollapse(!showCollapse)} width={50} height={50} alt="profile" className='rounded-full cursor-pointer'/> :
                        <CgProfile size={20} className='text-primary cursor-pointer' onClick={() => setShowCollapse(!showCollapse)}/>
                    } 
                    {showCollapse && user?._id && 
                        (<div className="absolute flex flex-col justify-center text-center items-center gap-2 transition-all top-14 -left-10 bg-white whitespace-nowrap min-w-32 rounded-2xl shadow-md">
                            <Link to='/profile' className='bg-rose-50 p-3 w-full text-sm text-primary font-semibold hover:text-secondary'>My Profile</Link>
                            <Link to='/admin' className='bg-slate-50 p-3 w-full text-sm text-primary font-semibold hover:text-secondary'>Admin Panel</Link>
                        </div>)
                    }
                </div>

                <div className="relative">
                    <FaShoppingCart size={20} className='text-primary'/>
                    <span className='absolute -top-4 -right-2 w-4 h-4 text-sm rounded-full bg-secondary text-white flex justify-center items-center'>0</span>
                </div>
                {
                    user?._id ? 
                    <button onClick={handleLogout} className='bg-secondary text-white py-2 px-8 rounded-full text-base hover:bg-primary transition-all'>Logout</button> :
                    <Link to='/login' className='bg-secondary text-white py-2 px-8 rounded-full text-base hover:bg-primary transition-all'>Login</Link>
                }
                
            </div>
        </div>
    </header>
  )
}

export default Header