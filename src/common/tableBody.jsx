import React, { Component } from "react";
import _ from "lodash";
export class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      //   <tbody>
      //     {movies.map((movie) => (
      //       <tr key={movie._id}>
      //         <th>{movie.title}</th>
      //         <td>{movie.genre.name}</td>
      //         <td>{movie.numberInStock}</td>
      //         <td>{movie.dailyRentalRate}</td>
      //         <td>
      //           <Like onClick={() => onLike(movie)} liked={movie.liked} />
      //         </td>
      //         <td
      //           id={movie._id}
      //           onClick={() => onDelete(movie)}
      //           className="btn btn-danger"
      //         >
      //           Delete
      //         </td>
      //       </tr>
      //     ))}
      //   </tbody>
    );
  }
}

export default TableBody;
