///Simple movie-filter using  https://www.themoviedb.org/movie as reference.
///Progress bar style and html are not mine. They were taken from: https://www.cssscript.com/circular-progress-bar-plain-html-css/.
///This app has just eduacational purposes.


// import logo from './logo.svg';
import './App.css';
import './css-circular-prog-bar.css'
import {useEffect, useState} from "react";  

// IMPORT LIBS
import axios from 'axios';


// IMPORT COMPONENTS
import MoviesViewer from './Components/MoviesViewer'
import GenresViewer from './Components/GenresViewer'
import MenuViewer from './Components/MenuViewer'

import * as Utils from './Utils'

function App() {
// Data
const [moviesData, setMoviesData]=useState([])

// Pagination
const [page, setPage]=useState(1)
const [total_pages, setTotalPages]= useState(null)


// Fetching
const [isFetching, setIsFetching] = useState(false)
const [isInfiniteScrollActive, setInfiniteScrollActive]= useState(false)
const [customGenres, setCustomGenres]=useState([])


const APIQuery=(req)=>{
  axios.get(req.url)
  .then(response=>{
    setTotalPages(response.data.total_pages)

    //Add new feched data to collection
    if(req.type!=Utils.FilterCommand){
      setMoviesData([...moviesData,response.data])
    }else{
      setMoviesData([response.data])
    }

  }).catch(error=>{
    console.log(error)
  })
}


const ScrollingEvent=()=>{
  const OFFSET=5
  const {
    scrollTop,
    scrollHeight,
    clientHeight
    } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - OFFSET){
    setIsFetching(true)
  }
  
}

const GetMoreMovies=()=>{

  let nextPage=page+1
  setPage(nextPage)
  setInfiniteScrollActive(true)

    if(nextPage < total_pages){
    let req={
      url: Utils.MOVIES_URL 
          + `&language=en-US&page=${nextPage}`
          +`&with_genres=${customGenres}`, 
      type: Utils.GetMoviesCommand,
    }
        APIQuery(req)

    }

setIsFetching(false)
}

const FilterMovies=()=>{
  setInfiniteScrollActive(false)
  setPage(1)

  let req={
    url: Utils.MOVIES_URL 
      + `&language=en-US&page=${1}`
      +`&with_genres=${customGenres}`,
    type:Utils.FilterCommand}
    
  APIQuery(req)

setIsFetching(false)

}

const GetUserPrefsCallBack=(array)=>{
  setCustomGenres(array)
  }

//Fetching data
useEffect(()=>{

  let req ={
    url:Utils.MOVIES_URL+ `&language=en-US&page=${page}`,
    type: Utils.GetMoviesCommand
  }

  APIQuery(req)
 
},[])

useEffect(() => {
  if (isFetching){
    if(page!=1){
      GetMoreMovies();
    }
  }
},[isFetching])


useEffect(()=>{
  if(isInfiniteScrollActive){
    window.addEventListener('scroll',ScrollingEvent, {passive: true})
  }else{
    window.removeEventListener('scroll',ScrollingEvent)
  }
  ]
},[isInfiniteScrollActive])



 return (
  <div id="APP" className="container" >

        <div id="menu" className="row">
         <MenuViewer/>
        </div>

        <div id="viewer" className="row" style={{ margin:"10px"}}>
          <div className="col-3">
            <GenresViewer UserPrefs={GetUserPrefsCallBack} url={Utils.GENRES_URL}/>
            <div className="d-grid gap-2 Clear">
              <button 
              onClick={()=>FilterMovies()}
              className="btn btn-primary" 
              type="button">Filter</button>
            </div>
          </div>

          <div className="col-9">
            <div className="container">
              <MoviesViewer data={moviesData}/>
              <div className="d-grid gap-2 Clear">
                <button 
                disabled={isInfiniteScrollActive}
                onClick={()=>GetMoreMovies()}
                className="btn btn-primary"
                type="button">Load more</button>

              </div>
            </div>
          </div>


       </div>

          
    </div>
    );
}

export default App;
