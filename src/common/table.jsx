import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

function Table({ columns, sortColumn, onSort, data }) {
  return (
    <table className="table table-striped">
      <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
