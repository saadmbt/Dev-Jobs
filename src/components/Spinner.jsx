import MoonLoader from 'react-spinners/MoonLoader'
export default function  Spinner(props){
    return (
        <MoonLoader
            color="#6366f1"
            loading={props.loading}
            cssOverride={{display:'block', margin:'100px auto'}}
            size={150}
        />
    )
}