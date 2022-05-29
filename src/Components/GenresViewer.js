import {useEffect, useState} from "react";  
import axios from 'axios';

import * as Utils from '../Utils.js'




function GenresViewer(props){
const [userPrefs, setUserPrefs]=useState([])
const [genresData, setGenresData]=useState([])

let genres=genresData.genres


const CatchUserPrefs=(e,id)=>{
if(userPrefs.includes(id,0)){
    if(e.target.checked==false){
        setUserPrefs(Utils.RemoveFromArray(userPrefs, id))
    }
    
}else{
    if(e.target.checked){
        setUserPrefs([...userPrefs,id])
    }
    
}
}

useEffect(()=>{
    props.UserPrefs(userPrefs)
    },[userPrefs])
    

useEffect(()=>{
    axios.get(props.url)
    .then(response=>{
      setGenresData(response.data)
    }).catch(error=>{
      console.log(error)
    })
},[])

    


if(!genres || genres.length == 0){
    return(
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )

}

    return(
        <div>
           {genres.map((genre)=>{
                return( 
                <div  key={genre.id} className=" FilterOption">
                    <input onChange={(e,id)=>CatchUserPrefs(e,genre.id)} type="checkbox"
                        className="btn-check"
                    id={genre.id} 
                        autoComplete="off"/>
                    <label className="btn btn-outline-primary"
                        htmlFor={genre.id} >{genre.name}</label>
                </div>
                )})}
        </div>

    )
}

export default GenresViewer;