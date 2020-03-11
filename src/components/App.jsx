import React from "react";
import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    };
  }

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

  render() {
    return(
        <div className="container">
          <div className="row">
            <div className="col-9">
              <div className="row">
              { this.state.movies.map( movie => {
                return (
                <div className="col-6 mb-4" key={movie.id}>
                   <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch = {this.addMovieToWillWatch}
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