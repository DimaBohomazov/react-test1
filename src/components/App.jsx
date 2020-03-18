import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../utils/api";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: 'popularity.desc',
      total_pages: 1,
      page: 1
    };
    console.log('constructor')
  };

  componentDidMount() {
    this.getMovies()
  };

  componentDidUpdate(prevProps,prevState){
    if(prevState.sort_by !== this.state.sort_by ){
      console.log('call api');
      this.getMovies()
    }
    if(prevState.page !== this.state.page){
      this.getMovies()
    }

  };

  getMovies = () => {
    fetch(
        `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
            this.state.sort_by
        }&page=${
          this.state.page
        }`
    )
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          this.setState({
            movies: data.results,
            total_pages: data.total_pages
          })
        });
};

  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  };

  updatePage = value => {
    this.setState({
      page: value
    })
  };

  updateTotalPages = value => {
    this.setState({
      total_pages: value
    })
    console.log("this", this.total_pages)
  };


  addMovieToWillWatch = movie => {
    // this.state.moviesWillWatch.push(movie);
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie]; // ES6 push method
    // updateMoviesWillWatch.push(movie);
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });

    console.log("moviesWillWatch", this.state.moviesWillWatch);
    console.log(this.state.moviesWillWatch.map(item => {
      return item.title
    }))
    // console.log(updateMoviesWillWatch);
    // console.log('---------------------------------------------------')
  };

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id;
    });
    this.setState({
          moviesWillWatch: updateMoviesWillWatch
        }
    )
  };

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });
    this.setState({
          movies: updateMovies
        }
    )
  };



  render() {
    console.log('render', this.state.sort_by);
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
                      sort_by = {this.state.sort_by}
                      updateSortBy = {this.updateSortBy}
                      updateTotalPages = {this.updateTotalPages}
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
              { this.state.movies.map( movie => {
                return (
                <div className="col-6 mb-4" key={movie.id}>
                   <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch = {this.addMovieToWillWatch}
                      removeMovieFromWillWatch = {this.removeMovieFromWillWatch}
                  />
                </div>
                )
              })}
              </div>
              <div className=''>
                <Pagination
                    page = {this.state.page}
                    updatePage = {this.updatePage}
                    total_pages = {this.state.total_pages}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="willWatch">
                <h4>Will watch: {this.state.moviesWillWatch.length}</h4>
                <div >
                    {this.state.moviesWillWatch.map(item =>
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
}
/*
function App() {
  return <div>{ moviesData[0].title }</div>;
}
*/

export default App;