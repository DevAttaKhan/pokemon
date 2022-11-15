import React from "react";

const RenderRow = ({ row }) => {
  const [key, value] = row;
  return (
    <div className="flex justify-between gap-x-11 py-3 border-b">
      <span className="text-right flex-1 ">{key}</span>
      <span className=" flex-1">{value}</span>
    </div>
  );
};

const RenderRowWithCapsules = ({ row }) => {
  const [key, value] = row;
  return (
    <div className="flex flex-col items-center gap-y-6 py-3 border-b">
      <span className="text-right flex-1 ">{key}</span>
      <div className="flex justify-between items-center   gap-x-3 flex-wrap width-full">
        {value.map((el, i) => (
          <span
            key={i}
            className="px-3 shadow py-1 rounded-xl mb-3 bg-indigo-700  text-white"
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  );
};

const PokemonRenderDetails = ({ img, ...details }) => {
  if (Object.keys(details).length === 0) {
    return (
      <div className="rounded-lg shadow w-96 p-4 bg-white capitalize font-medium  ">
        <h2>No Pokemon Selected</h2>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg shadow w-96 p-4 bg-white capitalize font-medium  ">
        <div className="">
          <img
            src={img}
            alt=""
            className="block mx-auto w-32 shadow-lg rounded-full"
          />
        </div>
        <div className="detail flex-col flex gap-y-2">
          {Object.entries(details || {}).map((obj, i) =>
            Array.isArray(obj[1]) ? (
              <RenderRowWithCapsules key={i} row={obj} />
            ) : (
              <RenderRow key={i} row={obj} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonRenderDetails;
