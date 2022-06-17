import {useEffect, useState} from "react";  
import axios from 'axios';

function MovieViewer(props){      
let movies = props.data
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

//Conditional rendering  
if(!movies || movies.length == 0 ){
    return(
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )

}

return(
        <div className="row row-cols-2 row-cols-md-5 g-1">
            {movies.map((obj)=>{
              return(
                obj.results.map((movie)=>{
                    let dateParse=new Date(movie.release_date)
                    .toLocaleString("default",{month:"short", day:"numeric", year:"numeric"})
                        return(
                        <div className="col" key={movie.id} >
                            <div className="card" style={{height:"500px"}}>
                                <img  src={IMAGE_BASE+movie.poster_path}
                                    className="card-img-top MovieImage" alt="..."/>
    
                                
                                
                            
                                <div className="card-body" style={{height:"50px"}}>

                                    <div className={`progress-circle 
                                    ${(movie.vote_average * 10)>50 ?
                                    ("over50 p" + (movie.vote_average * 10))  : 
                                    ("p" + (movie.vote_average * 10))}`
                                    }>
                                        <span>  {(movie.vote_average  * 10) + "%" }</span>
                                        <div className="left-half-clipper">
                                            <div className="first50-bar"></div>
                                            <div className="value-bar"></div>
                                        </div>
                                        
                                    </div>

                                    <div className="MovieInfo">

                                        <h5 className="card-title" >
                                            <b>{movie.title}</b>
                                        </h5>
                                        <p className="card-text">{dateParse}</p>
        
                                    </div>    

                                
                                </div>
                            </div>
                        </div>
                        )
                  })
              )
            })}
        </div>
    );
}

export default MovieViewer;