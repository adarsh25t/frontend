import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../store/UserSlice';
import axios from 'axios';
import { url } from '../../assets/images/assets';
import { toast } from 'react-toastify';

function EdituserDetails({showEdit,setShowedit,userId}) {
    Modal.setAppElement('#root');

    const [user, setUser] = useState({
        name: '',
        email: '',
        role:'',
        id:''
    });

    const dispatch = useDispatch()
    const users = useSelector(state => state.user?.allusers);

    useEffect(()=>{
        if (users && users.length > 0) {
            const user = users.find(user => user._id === userId);
            setUser({
                id: user?._id,
                name: user?.name,
                email: user?.email,
                role: user?.role
            })
        }

    },[userId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(url.updateuser, user, { withCredentials: true });
        if (response.data.success) {
            toast.success(response.data.message);
            dispatch(updateStatus('pending'));
            setShowedit(false)
        }
        else {
            toast.error(response.data.message);
        }
    }
    
    return (
        <Modal
            isOpen={showEdit}
            className={'bg-none'}
            onRequestClose={()=>setShowedit(false)}
      > 
            <div className="relative p-4 w-full max-w-lg max-h-full m-auto mt-28">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit user details
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setShowedit(false)}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        <input 
                            type="text" 
                            value={user?.name} 
                            onChange={(e)=>setUser({...user,name:e.target.value})} 
                            placeholder="Name" className='bg-transparent w-full border text-gray-400  border-gray-500 p-2 rounded-lg outline-secondary focus:border-none' 
                        />
                        <input 
                            type="text" 
                            value={user?.email} 
                            onChange={(e)=>setUser({...user,email:e.target.value})}
                            placeholder="Email" 
                            className='bg-transparent w-full border text-gray-400 border-gray-500 p-2 rounded-lg outline-secondary' 
                        />
                        <select className='w-full border border-gray-500 p-2 rounded-lg bg-transparent text-gray-400 outline-secondary' value={user?.role} onChange={(e)=>setUser({...user,role:e.target.value})}>
                            <option value="user">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" onClick={handleSubmit}  className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Save Details</button>
                        <button onClick={()=>setShowedit(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                    </div>
                </div>
            </div>
    </Modal>
    )
    
}

export default EdituserDetails