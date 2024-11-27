import { Hero } from '../components/Hero'
import { Cards } from '../components/cards'
import Joblisting from '../components/Joblisting'
import ViewAllJobs from '../components/ViewAllJobs' 
 export default function Homepage(){
    return (<>
        
        <Hero />
        <Cards/>
        <Joblisting isHome={true}/>
        <ViewAllJobs/>

        </>)
 }