import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import axios from 'axios';
import { url } from './assets/images/assets';
import { useDispatch } from 'react-redux';
import { addUser, fetchuserDetails } from './store/UserSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchuserDetails())
  },[])

  return (
    <>
      <ToastContainer/>
      <Header /> 
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
