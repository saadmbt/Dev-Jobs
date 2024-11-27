import { useState } from "react"
import {FaMapMarker} from 'react-icons/fa'
export function JobOffer(props){
    const[viewFD,setviewFD]=useState(false)
    let description
    if(!viewFD){
        description=props.object.description.substring(0,90)+'....'
    }else(
        description=props.object.description
    )
return (
    <div className="bg-white rounded-xl shadow-md relative">
    <div className="p-4">
      <div className="mb-6">
        <div className="text-gray-600 my-2">{props.object.type}</div>
        <h3 className="text-xl font-bold">{props.object.title}</h3>
      </div>

      <div className="mb-5 cursor-pointer" onClick={()=>setviewFD((prevState)=>!prevState)}>{description}</div>

      <button onClick={()=>setviewFD((prevState)=>!prevState)} className="text-indigo-500 mb-5">{(viewFD)?'Less':'More'}</button>

      <h3 className="text-indigo-500 mb-2">{props.object.salary} / year</h3>

      <div className="border border-gray-100 mb-5"></div>

      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-2"/>
          {props.object.location}
        </div>
        <a
          href={`/Jobs/Job-Info/${props.object.id}`}
          className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
         Read More
        </a>
      </div>
    </div>
    </div>
)
}