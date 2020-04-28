import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
      searchQuery,
      selectedGenre,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

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
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>

            {totalCount === 0 ? (
              <h2>There are NO Movies</h2>
            ) : (
              <h2>There are {totalCount} movies</h2>
            )}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
