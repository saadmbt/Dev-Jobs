import { JobOffer } from "./JobOffer"
import { useState, useEffect } from "react"
import Spinner from "./Spinner"

export default function Joblisting(props){
const [jobs, setjobs]=useState([])
const [Loading, setLoading]=useState(true)
useEffect(()=> {
    
const fetchJobs =async()=>{
    const apiUrl=(props.isHome)?'http://localhost:5000/jobs?_limit=3':'http://localhost:5000/jobs'
    try{
        const response=await fetch(apiUrl)
        const data=await response.json()
        setjobs(data);
    } catch(Error){
            console.log("Error Fetching data" , Error)
    } finally {
        setLoading(false);
    }

    }
    fetchJobs();
}, [])

    return(
        // <!-- Browse Jobs -->
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
         {(props.isHome)?'Recent Jobs':'Browse Jobs'}
        </h2>

        {/* -- All  Jobs block -- */}
        {
            Loading ? <Spinner Loading={Loading} /> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
                jobs.map(function(x,i){
                    return <JobOffer key={i} object={x}/>
                })
            }
        </div>
        }
        
      </div>
    </section>
    )
}