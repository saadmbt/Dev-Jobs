import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { FaArrowLeft } from "react-icons/fa"
import {FaMapMarker} from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

 export default function JobInfo(props){

    const {id}=useParams()
    const navigate=useNavigate()
    const [Loading, setLoading]=useState(true)
    const [job, setJob]=useState({})

    // delete specific job function 

    const deletg = async()=> {
        try{
        const res =await fetch(`http://localhost:5000/jobs/${id}`,{
            method: "DELETE" 
        })
       } catch (err){
        console.log('Error Deleting this job ',err)
    }finally{
        navigate('/Jobs')
    }}  

    // delete job handler  with  alert popup
    
   const  deleteJob = () =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this Job Offer !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Job Offer has been deleted.",
            icon: "success"
          });
           deletg();
        }
      });
    
   }   

    // fetch specific job with id 

    useEffect(()=>{
    const fetchjob= async()=>{
            try{
                const response= await fetch(`http://localhost:5000/jobs/${id}`)
                const data=await response.json()
                setJob(data)
            }
            catch(error){
                console.log("Error Fetching data" , Error)
            } finally{
                setLoading(false);
            }
        } 
        fetchjob() ;
    },[])
    props.ch(job)

    console.log(job)
    return (<>
    {
        Loading?<Spinner Loading={Loading} />:(
            <>
        {/* // <!-- Go Back --> */}
            <section>
              <div className="container m-auto py-6 px-6">
                <a
                  href="/jobs"
                  className="text-indigo-500 hover:text-indigo-600 flex items-center">
                  <FaArrowLeft className=" mr-2"></FaArrowLeft> Back to Job Listings
                </a>
              </div>
            </section>
        
            <section className="bg-indigo-50">
              <div className="container m-auto py-10 px-1">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                  <main>
                    <div
                      className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                    >
                      <div className="text-gray-500 mb-4">{job.type}</div>
                      <h1 className="text-3xl font-bold mb-4">
                      {job.title}
                      </h1>
                      <div
                        className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                      >
                        <FaMapMarker
                          className=" text-lg text-orange-700 mr-2"
                        ></FaMapMarker>
                        <p className="text-orange-700">{job.location}</p>
                      </div>
                    </div>
        
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <h3 className="text-indigo-800 text-lg font-bold mb-6">
                        Job Description
                      </h3>
        
                      <p className="mb-4">
                      {job.description}
                       </p>
        
                      <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>
        
                      <p className="mb-4"> {job.salary}/ Year</p>
                    </div>
                  </main>
        
                  {/* <!-- Sidebar --> */}
                  <aside>
                    {/* <!-- Company Info --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-6">Company Info</h3>
        
                      <h2 className="text-2xl">{job.company.name}</h2>
        
                      <p className="my-2">
                      {job.company.description}
                        </p>
        
                      <hr className="my-4" />
        
                      <h3 className="text-xl">Contact Email:</h3>
        
                      <p className="my-2 bg-indigo-100 p-1 font-bold">
                      {job.company.contactEmail}
                      </p>
        
                      <h3 className="text-xl">Contact Phone:</h3>
        
                      <p className="my-2 bg-indigo-100 p-2 font-bold">{job.company.contactPhone}</p>
                    </div>
        
                    {/* <!-- Manage --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                      <a
                        href={`/Jobs/Job-Info/Edit-Job/${id}`}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        >Edit Job</a>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        onClick={deleteJob}>Delete Job</button>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
        
            </>)
    }
    </>)
} ;
