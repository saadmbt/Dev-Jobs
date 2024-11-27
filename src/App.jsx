import {Route , createBrowserRouter , createRoutesFromElements , RouterProvider} from'react-router-dom'
import { useState } from 'react'
import  Homepage  from './pages/Homepage'
import Mainlayout from './layouts/Mainlayout'
import Jobspage from './pages/Jobspage'
import NotFoundpage from './pages/NotFoundpage'
import JobInfo  from './pages/jobpageinfo'
import AddJob from './pages/AddJobpage'
import EditJobPage from './pages/jobEditpage'

function App() {
  const [id , setid] = useState(0)
  const [da , setda] = useState({})
 function getobject(x){
 }

  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Mainlayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path='/Jobs' element={<Jobspage/>}/>
        <Route path='/Jobs/Job-Info/:id' element={<JobInfo ch={getobject}/>}/>
        <Route path='/Add-job' element={<AddJob/>}/>
        <Route path='/Jobs/Job-Info/Edit-Job/:id' element={<EditJobPage id={fetch} data={da}/>} />
        <Route path='*' element={<NotFoundpage/>}/>
    </Route>
  ))
  return <RouterProvider router={router}/>
}

export default App
