import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

function AdminPanel() {

    const user = useSelector(state => state.user?.userdetails);

    return (
        <div className='h-screen flex gap-3'>
            <aside className='w-48 h-full bg-white shadow-md rounded-md'>
                <div className="flex flex-col justify-center items-center mt-3">
                    {user?.profileImage ?
                        <img src={user.profileImage}  width={50} height={50} alt="profile" className='rounded-full cursor-pointer' /> :
                        <CgProfile size={20} className='text-primary cursor-pointer' />
                    }
                    {user && <h1 className='text-lg font-medium'>{user.name}</h1>}
                    {user && <h1 className='text-base text-secondary uppercase'>{user.role}</h1>}
                </div>
                <div className="flex flex-col justify-start gap-2 mt-10">
                    <Link to={'all-users'} className='text-lg text-primary pl-5 bg-green-100 py-2 mx-2 rounded-md text-center hover:bg-blue-100 transition-all'>All Users</Link>
                    <Link to={'all-products'} className='text-lg text-primary pl-5 bg-green-100 py-2 mx-2 rounded-md text-center hover:bg-blue-100 transition-all'>All Products</Link>
                </div>
            </aside>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminPanel