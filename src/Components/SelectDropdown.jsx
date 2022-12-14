import React, { useState, useEffect, useRef } from "react";
import FilterIcon from "../Assets/icons/FilterIcon";

const SelectDropDown = ({ list, selectedValue, setSelectedValue, status }) => {
  const [selectOpen, setSelectOpen] = useState(false);

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
    setSelectedValue(cat);
    setSelectOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      <button
        className="flex items-center space-x-1 px-4 py-2 shadow rounded-lg text-base font-medium bg-amber-400 text-gray-700 hover:bg-amber-300"
        onClick={handleClick}
      >
        <span className="text-indigo-700">
          <FilterIcon />
        </span>
        <span>{selectedValue ? selectedValue : "Select generation"}</span>
      </button>
      <div className={selectOpen ? "block" : "hidden"}>
        <div className="overflow-hidden w-44 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 absolute">
          {status &&
            list.map((el) => (
              <div
                key={el}
                onClick={() => handleSelect(el)}
                className="bg-white p-5 hover:bg-gray-200 cursor-pointer"
              >
                {el}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SelectDropDown;
