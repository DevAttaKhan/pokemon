import React, { useState, useEffect, useRef } from "react";
import FilterIcon from "../Assets/icons/FilterIcon";

const SelectDropDown = ({ list }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("list");
  const selectRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!selectRef.current.contains(e.target)) {
        setSelectOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });
  const handleClick = () => {
    setSelectOpen(!selectOpen);
  };

  const handleSelect = (cat) => {
    setSelectValue(cat);
    setSelectOpen(false);
  };

  const toggleMenu = selectOpen ? "show" : "";

  return (
    <div className="relative" ref={selectRef}>
      <button className="flex items-center space-x-1" onClick={handleClick}>
        <span className="text-cyan-300">
          <FilterIcon />
        </span>
        <span>Generations</span>
      </button>
      <div className={selectOpen ? "block" : "hidden"}>
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 absolute">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"></div>
        </div>
      </div>
    </div>
  );
};

export default SelectDropDown;
