import React, {useState, useEffect} from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../utils/api";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";

const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const getMovies = (sortBy, page) => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
        sortBy
      }&page=${
        page
      }`
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMovies(data.results)
        setTotalPages(data.total_pages)
      });
  };
  const removeMovie = movie => {
    const updateMovies = movies.filter(item => item.id !== movie.id)
    setMovies(updateMovies)
  };
  const updateTotalPages = value => {
    setTotalPages(value)
  };
  return {
    movies,
    totalPages,
    getMovies,
    removeMovie,
    updateTotalPages
  }
}

const useMoviesWillWatch = () => {
  const [moviesWillWatch, setMoviesWillWatch] = useState([])
  const addMovieToWillWatch = movie => {
    // this.state.moviesWillWatch.push(movie);
    const updateMoviesWillWatch = [...moviesWillWatch, movie]; // ES6 push method
    // updateMoviesWillWatch.push(movie);
    setMoviesWillWatch(updateMoviesWillWatch)
  };

  const removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = moviesWillWatch.filter(item => item.id !== movie.id)
    setMoviesWillWatch(updateMoviesWillWatch)
  };
  return {
    moviesWillWatch,
    addMovieToWillWatch,
    removeMovieFromWillWatch
  }
}

const App = () => {
  const {movies, totalPages, getMovies, removeMovie, updateTotalPages} = useMovies()
  const {moviesWillWatch, addMovieToWillWatch, removeMovieFromWillWatch} = useMoviesWillWatch()
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    getMovies(sortBy, page)
  }, [sortBy, page])


  const updateSortBy = value => {
    setSortBy(value)
  };

  const updatePage = value => {
    setPage(value)
  };

  return(
      <div className="container">
        <h1>
          Movies master
        </h1>
        <p>All movies in one place.</p>
        <div className="row">
          <div className="col-9">
            <div className="row mt-2">
              <div className="col-12">
                <MovieTabs
                    sort_by = {sortBy}
                    updateSortBy = {updateSortBy}
                    updateTotalPages = {updateTotalPages}
                />
              </div>
            </div>
            {/*<div className='mt-3'>
              <Pagination
                  page = {this.state.page}
                  updatePage = {this.updatePage}
                  total_pages = {this.state.total_pages}
              />
            </div>*/}
            <div className="row">
            { movies.map( movie => {
              return (
              <div className="col-6 mb-4" key={movie.id}>
                 <MovieItem
                    movie={movie}
                    removeMovie={removeMovie}
                    addMovieToWillWatch = {addMovieToWillWatch}
                    removeMovieFromWillWatch = {removeMovieFromWillWatch}
                />
              </div>
              )
            })}
            </div>
            <div className=''>
              <Pagination
                  page = {page}
                  updatePage = {updatePage}
                  total_pages = {totalPages}
              />
            </div>
          </div>
          <div className="col-3">
            <div className="willWatch">
              <h4>Will watch: {moviesWillWatch.length}</h4>
              <div >
                  {moviesWillWatch.map(item =>
                    <div
                        key={item.id} title={item.overview} className='moviesWillWatch'
                          >
                      {item.title}
                    </div>)
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
/*
function App() {
  return <div>{ moviesData[0].title }</div>;
}
*/

export default App;