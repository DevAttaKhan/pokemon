import React from "react";
import TableBody from "./TableBody";

const Table = ({ columns, data }) => {
  return (
    <table className="table">
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
