import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css';

 export default function Mainlayout(){
    return ( <>
        <Navbar />
        <Outlet/>
       <ToastContainer autoClose={7000}/>
    </>

    )
 }