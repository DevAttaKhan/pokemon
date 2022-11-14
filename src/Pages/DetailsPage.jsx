import React from "react";
import { useLocation } from "react-router-dom";
const DetailsPage = () => {
  const loacation = useLocation();
  console.log(loacation);
  return <div>DetailsPage</div>;
};

export default DetailsPage;
