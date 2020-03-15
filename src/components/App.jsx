import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../utils/api";
import MovieTabs from "./MovieTabs";


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: 'revenue.desc'
    };
    console.log('constructor')
  }

  componentDidMount() {
    console.log('didMount')

    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then((response) => {
      console.log('then');
      return response.json()
    }).then((data)=>{
      console.log('data', data);
      this.setState({
        movies: data.results
      })
    });
    console.log('after fetch')
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  };


  addMovieToWillWatch = movie => {
    // this.state.moviesWillWatch.push(movie);

    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie]; // ES6 push method
    // updateMoviesWillWatch.push(movie);
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
    console.log(this.state.moviesWillWatch);
    console.log(updateMoviesWillWatch);
    console.log('---------------------------------------------------')
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

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id;
    });
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
        }
    )
  };

  render() {
    console.log('render');
    return(
        <div className="container">
          <div className="row">
            <div className="col-9">
              <div className="row mb-4">
                <div className="col-12">
                  <MovieTabs
                      sort_by = {this.state.sort_by}
                      updateSortBy = {this.updateSortBy}
                  />
                </div>
              </div>
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
            </div>
            <div className="col-3">
              <p>Will watch: {this.state.moviesWillWatch.length}</p>
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