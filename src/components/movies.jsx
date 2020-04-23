import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleClick = (movie) => {
    let { movies } = this.state;
    movies = movies.filter((m) => m !== movie);
    this.setState({ movies: movies });
  };
  render() {
    const { movies } = this.state;
    return (
      <div>
        {movies.length === 0 ? (
          <h2>There are NO Movies</h2>
        ) : (
          <h2>There are {movies.length} movies</h2>
        )}

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td
                  id={movie._id}
                  onClick={() => this.handleClick(movie)}
                  className="btn btn-danger"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
