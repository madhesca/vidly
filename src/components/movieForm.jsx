import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      rate: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.required().label("Genre"),
    numberInStock: Joi.number().min(1).required().label("Number in Stock"),
    rate: Joi.string().required().min(5).max(10).label("Rate"),
  };

  doSubmit = () => {
    //call server
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <label>Genre</label>
          <select
            style={{ marginBottom: "16px" }}
            className="custom-select"
            id="validationCustom04"
            required
          >
            <option value=""></option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Thriller</option>
          </select>
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
