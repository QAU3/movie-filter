export const FilterCommand= "filter"
export const GetMoviesCommand= "get_movies"



export const RemoveFromArray=(arr, id)=>{
    return arr.filter(function(element){ 
        return element != id; 
    });
}



export const API_KEY = "api_key=" + process.env.REACT_APP_MOVIES_API_KEY
export const BASE_URL =  "https://api.themoviedb.org/3"
export const MOVIES_URL =  BASE_URL + '/movie/popular/?' + API_KEY
export const GENRES_URL = BASE_URL + "/genre/movie/list?"+ API_KEY