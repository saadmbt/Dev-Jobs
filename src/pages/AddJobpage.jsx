import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function AddJob() {
    //  useState to storge data that fetching from the server 

    const [JobtypeList, setJobtypeList] = useState([]);
    const [JobSalaryList, setJobSalaryList] = useState([]);
    const [loading, setLoading] = useState(true);

    // form inputs useState data fetching 

    const [title, setTitle] = useState('');
    const [type, setType] = useState('Full-Time');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('Under $50K');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
  
    const navigate = useNavigate();

// function to add New job   to  the json server 

const NewPostJob= async(newJob)=> {
    try{
        const response = await fetch('http://localhost:5000/jobs',{
            method: "POST",
            headers: {
            "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(newJob),

        });
    } catch(err){
    console.error("Error Failed To Create New Job",err)
} finally{
    
    toast.success("Job Add Successfully")
    navigate('/Jobs')
}
return console.log(" all is done "); }

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

    //  form handling  submision :

    function handlformsubmit(e){
        e.preventDefault();
        const newJob = {
            title :title,
            type : type,
            location : location,
            description : description ,
            salary : salary,
            company: {
              name: companyName,
              description: companyDescription,
              contactEmail :contactEmail,
              contactPhone : contactPhone,
            },
          };

          NewPostJob(newJob);
    } 

    return ( <>
    {loading?<Spinner Loading={loading} />:<section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
            {/* Form Data */}
          <form onSubmit={handlformsubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

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

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label htmFor="company" className="block text-gray-700 font-bold mb-2"
                >Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmFor="company_description"
                className="block text-gray-700 font-bold mb-2"
                >Company Description</label>
              <textarea
                id="company_description"
                name="company_description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
                value={companyDescription}
                onChange={(e)=>setCompanyDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
                >Contact Email</label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                value={contactEmail}
                onChange={(e)=>setContactEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
                >Contact Phone</label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                value={contactPhone}
                onChange={(e)=>setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>}
    </> );
}
