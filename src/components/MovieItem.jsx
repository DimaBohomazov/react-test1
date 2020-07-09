import React, {useState} from "react";

const MovieItem = props => {
    const {
        movie,
        removeMovie,
        addMovieToWillWatch,
        removeMovieFromWillWatch} = props;
    const [willWatch, setWillWatch] = useState(false)

    const handleClickDeleteWillWatch = () => {
        setWillWatch(false)
        removeMovieFromWillWatch(movie)
    }
    const handleClickAddWillWatch = () => {
        setWillWatch(true)
        addMovieToWillWatch(movie)
    }
    return (
      <div className="card">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
            movie.poster_path}`}
            alt=""
          />
          <div className="card-body">
              <h6 className="card-title">{movie.title}</h6>
              <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Rating: {movie.vote_average}</p>
                  {willWatch ?  // type boolean (default -- this.state.willWatch === true )
                    (<button
                      type="button"
                      className="btn btn-success"
                      onClick={handleClickDeleteWillWatch}
                    >
                        Remove Will Watch
                    </button>)
                    :
                    (<button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClickAddWillWatch}
                    >
                        Add Will Watch
                    </button>)
                  }

              </div>
              <button onClick={removeMovie.bind(this, props.movie)}>
                  Delete movie
              </button>
          </div>
      </div>
    )
}

export default MovieItem
