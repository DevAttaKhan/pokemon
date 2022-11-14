import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../Services/pokemon";
import { ReactComponent as ErrorMessage } from "../Assets/media/somethi-went-wrong.svg";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PokemonCard = ({ name }) => {
  const navigate = useNavigate();
  const { data, error, isLoading, isSuccess } = useGetPokemonByNameQuery(name);

  const sendToDetailsPage = () => {};

  return (
    <>
      {isLoading && <Skeleton count={5} />}
      {error && <ErrorMessage />}
      {isSuccess && (
        <div className=" rounded-lg shadow bg-white">
          <div className="flex items-center  justify-between p-5">
            <div>
              <h4 className="text-gray-900 text-xl capitalize">{data.name}</h4>
            </div>
            <div className="rounded-full shadow w-20 h-20">
              <img src={data.sprites.front_default} alt="" />
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center space-x-4 p-2 mx-6 justify-center border-t-2 border-gray-200">
              <span className="text-right w-full ">Type</span>
              <span className="text-left w-full   ">
                {data.types[0].type.name}
              </span>
            </div>
            <div className="flex items-center space-x-4 p-2 mx-6 justify-center border-t-2 border-gray-200">
              <span className="text-right w-full ">Weight</span>
              <span className="text-left w-full  ">{data.weight}Kg</span>
            </div>
            <div className="flex items-center space-x-4 p-2 mx-6 justify-center border-t-2 border-gray-200">
              <span className="text-right w-full ">Height</span>
              <span className="text-left w-full  ">{data.height}Cm</span>
            </div>
          </div>
          <div className="flex justify-center border-t-2">
            <button
              onClick={() => navigate(`/details/${name}`, { state: data })}
              className="p-5 text-center flex-1 border-r hover:bg-amber-300"
            >
              Details
            </button>
            <button
              onClick={sendToDetailsPage}
              className="p-5 text-center flex-1  hover:bg-amber-300"
            >
              Add to Favorite
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
