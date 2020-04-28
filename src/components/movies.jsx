import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  deleteHandler = (movie) => {
    let { movies } = this.state;
    movies = movies.filter((m) => m !== movie);
    this.setState({ movies: movies });
  };

  likeHandler = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (item) => {
    this.setState({ selectedGenre: item, currentPage: 1 });
  };

  sortHandler = (sortColumn) => {
    this.setState({ sortColumn });

    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              selectedGenre={this.state.selectedGenre}
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
            />
          </div>

          <div className="col">
            <Link to="/movies/new">
              <button className="btn btn-primary ">New Movie</button>
            </Link>

            {totalCount === 0 ? (
              <h2>There are NO Movies</h2>
            ) : (
              <h2>There are {totalCount} movies</h2>
            )}

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onSort={this.sortHandler}
              onDelete={this.deleteHandler}
              onLike={this.likeHandler}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
