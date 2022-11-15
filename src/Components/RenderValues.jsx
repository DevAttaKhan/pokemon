import React from "react";

const RenderValues = ({ values, styles, path }) => {
  const classes = "px-3" + styles;
  return values?.map((el) => {
    if (path == "/") {
      return (
        <span key={el.name} className={classes}>
          {el.name}
        </span>
      );
    } else {
      return (
        <span key={el[path].name} className={classes}>
          {el[path].name}
        </span>
      );
    }
  });
};

export default RenderValues;
