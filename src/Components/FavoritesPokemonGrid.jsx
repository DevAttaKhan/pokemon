import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
const FavoritesPokemonGrid = () => {
  const [favoritesPokemon, setFavoritesPokemon] = useState(null);
  const [isRemoved, setIsRemoved] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      setFavoritesPokemon(favorites.fav);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [isRemoved]);

  return (
    <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-3">
      <div className="block justify-between col-span-full">
        <h3 className="text-lg text-gray-700 font-medium text-center">
          Favorites
        </h3>
      </div>

      {isEmpty && <h2>No favorites here</h2>}

      {!isEmpty &&
        favoritesPokemon?.map((el) => (
          <PokemonCard key={el} name={el} setIsRemoved={setIsRemoved} />
        ))}
    </div>
  );
};

export default FavoritesPokemonGrid;
