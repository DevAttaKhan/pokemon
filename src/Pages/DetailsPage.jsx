import React from "react";
import { useLocation } from "react-router-dom";
const DetailsPage = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="h-64 bg-amber-300 grid place-content-center">
      <h1 className="text-gxl capitalize">{state.name}</h1>
    </div>
  );
};

export default DetailsPage;
