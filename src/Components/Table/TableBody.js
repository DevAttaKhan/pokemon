import React from "react";
import "./TableBody.scss";

const TableBody = ({ columns, data }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return item[column.path];
  };

  return (
    <tbody>
      {data.map((item, i) => (
        <tr key={i}>
          {columns.map((column, i) => (
            <td key={column.path}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}

      {/* {list.map((el, i) => (
        <TableRow
          key={i}
          sNo={i + 1}
          name={el.name}
          department={el.department}
          img={el.src}
          amount={el.amount}
          balence={el.balence}
          dueDate={el.dueDate}
        />
      ))} */}
    </tbody>
  );
};

export default TableBody;
