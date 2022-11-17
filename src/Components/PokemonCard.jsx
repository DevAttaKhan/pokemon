import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../Services/pokemon";
import ErrorMessage from "../Assets/media/somethi-went-wrong.svg";
import { toKilograms, toCentimeters } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PokemonCard = ({ name, setIsRemoved }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { data, error, isLoading, isSuccess } = useGetPokemonByNameQuery(name);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const parsedFavs = JSON.parse(favorites);
      setIsFavorite(parsedFavs.fav.includes(name));
    }
  }, [name]);

  const addFavoriteToLocalStorate = () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const parsedFavs = JSON.parse(favorites);
      if (parsedFavs.fav.includes(name)) return;
      parsedFavs.fav = [...parsedFavs.fav, name];
      setIsFavorite(parsedFavs.fav.includes(name));
      localStorage.setItem("favorites", JSON.stringify(parsedFavs));
    } else {
      setIsFavorite(true);
      localStorage.setItem("favorites", JSON.stringify({ fav: [name] }));
    }
  };

  const removeFavoriesFromLoacalStorage = () => {
    const favorites = localStorage.getItem("favorites");
    const parsedFavs = JSON.parse(favorites);
    parsedFavs.fav = parsedFavs.fav.filter((el) => el !== name);
    setIsFavorite(parsedFavs.fav.includes(name));
    localStorage.setItem("favorites", JSON.stringify(parsedFavs));
    setIsRemoved(name);
  };

  const handleAddRemoveFavorites = () => {
    if (!isFavorite) {
      addFavoriteToLocalStorate();
    } else {
      removeFavoriesFromLoacalStorage();
    }
  };

  return (
    <>
      {isLoading && <Skeleton count={25} />}
      {error && (
        <div className=" rounded-lg shadow bg-white">
          <img src={ErrorMessage} alt="error" className="w-full h-full" />
        </div>
      )}
      {isSuccess && (
        <div className=" overflow-hidden rounded-lg shadow bg-white font-medium">
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
              <span className="text-left w-full  ">
                {toKilograms(data.weight)} Kg
              </span>
            </div>
            <div className="flex items-center space-x-4 p-2 mx-6 justify-center border-t-2 border-gray-200">
              <span className="text-right w-full ">Height</span>
              <span className="text-left w-full  ">
                {toCentimeters(data.height)} Cm
              </span>
            </div>
          </div>
          <div className="flex justify-center border-t-2">
            <button
              onClick={() => navigate(`/details/${name}`, { state: data })}
              className="px-2 py-5 text-center flex-1 border-r hover:bg-amber-300"
            >
              Details
            </button>

            <button
              onClick={handleAddRemoveFavorites}
              className={`px-2 py-5 text-center flex-1 hover:bg-amber-300 ${
                isFavorite ? "bg-amber-300" : ""
              }`}
            >
              {isFavorite ? "Remove From Favorites" : "Add to Favorite"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
