import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "../Assets/icons/StarIcon";
import logo from "../Assets/media/pokemon-logo.svg";
import SelectDropDown from "../Components/SelectDropdown";

const Header = () => {
  return (
    <div className="relative bg-white border-b-2 ">
      <div className="mx-auto container px-4 sm:px-6">
        <div className="flex items-center justify-between  py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative p-2 overflow-hidden mx-auto flex rounded-lg  border-2 border-gray-300 items-center text-gray-600">
              <input
                className="  bg-white border-none  pr-16 text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />

              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </div>
            <SelectDropDown />
          </div>

          <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link
              to="favorites"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm flex items-center space-x-2 hover:bg-indigo-700"
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
