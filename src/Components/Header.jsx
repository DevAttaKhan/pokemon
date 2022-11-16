import React from "react";
import { Link } from "react-router-dom";

import StarIcon from "../Assets/icons/StarIcon";
import logo from "../Assets/media/pokemon-logo.svg";
import CompareIcon from "../Assets/icons/CompareIcon";

const Header = () => {
  return (
    <div className="relative bg-white border-b-2 ">
      <div className="mx-auto container px-4 sm:px-6">
        <div className="flex items-center justify-between  py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
            </Link>
          </div>

          <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link
              to="compare"
              className="ml-8 text-indigo-700 bg-amber-300 ijustify-center rounded-md  px-4 py-2 text-base font-medium shadow-sm flex items-center space-x-2  "
            >
              <span className="">
                <CompareIcon />
              </span>
              <span>Compare</span>
            </Link>
            <Link
              to="favorites"
              className="ml-8 ijustify-center rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm flex items-center space-x-2 hover:bg-indigo-700"
            >
              <span className="text-amber-300">
                <StarIcon />
              </span>
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
