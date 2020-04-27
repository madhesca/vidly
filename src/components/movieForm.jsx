import React from "react";
import { Route, Link } from "react-router-dom";

function MovieForm({ match, history }) {
  return (
    <div>
      <h1>Movie Form - {match.params.id} </h1>
      <button
        onClick={() => history.replace("/movies")}
        className="btn btn-primary"
      >
        Save
      </button>
    </div>
  );
}

export default MovieForm;
