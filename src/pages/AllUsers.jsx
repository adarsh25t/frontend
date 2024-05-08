import React, { useEffect, useState } from 'react'
import { url } from '../assets/images/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading/Loading';
import moment from 'moment/moment';
import { FaEdit } from "react-icons/fa";
import EdituserDetails from '../components/EdituserDetails/EdituserDetails';
import { fetchallUsers, setAllUsers } from '../store/UserSlice';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';



function AllUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEdit,setShowedit] = useState(false);
    const [userId,setuserId] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.user);

    const showeditHandler = (id) => {
        setShowedit(true)
        setuserId(id)
    }
     

    useEffect(() => {
        const tokenValue = Cookies.get();
        console.log(tokenValue);

        if (selector.status === "succeeded") {
            setUsers(selector.allusers)
            setLoading(true)
        }
        else {
            dispatch(fetchallUsers());
        }
        

    }, [selector.status])



    if (loading) {
        return (
            <div className='mx-3'>
                <h1 className='text-primary text-xl font-semibold py-4'>All Users</h1>

                <div className="relative flex flex-col w-full h-full mt-2 overflow-x-hidden text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <table className='w-[calc(100vw-200px)] text-left table-auto min-w-max'>
                        <thead>
                            <tr>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-auto'>No.</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Name</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Email</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Role</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Created Date</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => (
                                <tr key={index}>
                                    <td className='p-4 border-b border-blue-gray-50'>{index + 1}</td>
                                    <td className='p-4 border-b border-blue-gray-50'>{user.name}</td>
                                    <td className='p-4 border-b border-blue-gray-50'>{user.email}</td>
                                    <td className='p-4 border-b border-blue-gray-50'>{user.role}</td>
                                    <td className='p-4 border-b border-blue-gray-50'>{moment(user.createdAt).format('LL')}</td>
                                    <td className='p-4 border-b border-blue-gray-50 '>
                                        <p className='text-primary w-fit cursor-pointer bg-green-100 p-2 rounded-full  hover:bg-blue-100 transition-all' onClick={() => showeditHandler(user._id)} >
                                            <FaEdit size={20} className=''/>
                                        </p>
                                    </td>
                                </tr>
                            ))}  
                        </tbody> 
                    </table> 
                </div>

                <EdituserDetails 
                    showEdit={showEdit} 
                    setShowedit={setShowedit}
                    userId={userId}
                />
            </div> 
        )
    }
    else {
        return (
            <div className="h-screen w-[calc(100vw-200px)] flex justify-center items-center">
                <Loading />
            </div>
        )
    }

}

export default AllUsers