import { useParams } from "react-router-dom"
import { useState , useEffect  } from "react";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function AddJob() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [Job, setJob] = useState({});
    const [loading,setLoading]=useState(true)
    const [JobtypeList, setJobtypeList] = useState([]);
    const [JobSalaryList, setJobSalaryList] = useState([]);

   //  useState to storge data that fetching from the server
    const [title, setTitle] = useState('');    
    const [type, setType] = useState('');    
    const [location, setLocation] = useState('');    
    const [description, setDescription] = useState('');    
    const [salary, setSalary] = useState('');  

    useEffect(()=>{
        const fatchjob= async()=>{
            try{
                const response= await fetch(`http://localhost:5000/jobs/${id}`)
                const data =await response.json()
                setJob(data)
                setTitle(data.title)
                setType(data.type)
                setLocation(data.location)
                setDescription(data.description)
                setSalary(data.salary)
            } catch(err){
                console.error("Error Failed To Fetch Job  List",err)
            } 
        }
        fatchjob()
    },[])

      //  fetching Job type list and Job salary list from the server 

      useEffect(()=>{
        const fatchjobtype= async()=>{
            try{
                const response= await fetch(`http://localhost:5000/JobType`)
                const data =await response.json()
                setJobtypeList(data)
        
            } catch(err){
                console.error("Error Failed To Fetch Job Type List",err)
            } 
        }
        const fatchJobSalary= async()=>{
            try{
                const res=await fetch(`http://localhost:5000/JobSalary`)
                const data2 = await res.json()
                setJobSalaryList(data2)
            } catch(err){
                console.error("Error Failed To Fetch Job Salary List",err)
            } finally{
                setLoading(false)
            }
        }
        fatchJobSalary()
        fatchjobtype()
    },[])


     // function to Update job to  the json server 

const UpdatePostJob= async(UpdateJob)=> {
  try{
      const response = await fetch(`http://localhost:5000/jobs/${id}`,{
          method: "PUT",
          headers: {
          "Content-Type": "Application/JSON",
          },
          body: JSON.stringify(UpdateJob),

      });
  } catch(err){
  console.error("Error Failed To  Update Job",err)
} finally{
  navigate(`/Jobs/Job-Info/${id}`)
}
return console.log(" all is done "); }
    
 

    //  form handling  submision :

    function handlformsubmit(e){
        e.preventDefault();
        const UpdateJob = {
          id:id,
          title :title,
          type : type,
          location : location,
          description : description ,
          salary : salary,
          
        };

        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* check if the request is Confirmed or is Denied  */
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");

            UpdatePostJob(UpdateJob);
            
            
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });


    } 

    return ( <>
    {loading?<Spinner Loading={loading} />:<section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
            {/* Form Data */}
          <form onSubmit={handlformsubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6"> Edit Job</h2>

            <div className="mb-4">
              <label htmFor="type" className="block text-gray-700 font-bold mb-2"
                >Job Type</label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={type}
                onChange={(e)=>setType(e.target.value)}
              >
               {
                JobtypeList.map(function(x,i){
                    return <option key={i} value={x}>{x}</option>
                })
               }
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Job Listing Name</label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Dev Job In Miami"
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmFor="description"
                className="block text-gray-700 font-bold mb-2"
                >Description</label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmFor="type" className="block text-gray-700 font-bold mb-2"
                >Salary</label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}
              >
                {
                    JobSalaryList.map(function(x,i){
                        return <option key={i} value={x}>{x}</option>
                    })
                }
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required      
                value={location}
                onChange={(e)=>setLocation(e.target.value)}     
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>}
    </> );
}
