import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetPokemonBySpeciesQuery } from "../Services/pokemon";
import { toKilograms, toCentimeters } from "../utils";
import PokemonRenderDetails from "../Components/PokemonRenderDetails";
import Loader from "../Components/Loader/Loader";
import errormsg from "../Assets/media/somethi-went-wrong.svg";
const DetailsPage = () => {
  const [pokemonDetails, setPokemoeDetails] = useState();
  const { state } = useLocation();
  const { data, error, isSuccess, isLoading, isFetching } =
    useGetPokemonBySpeciesQuery(state.name);

  useEffect(() => {
    if (!isFetching && data) {
      const pokemonDetailsCopy = {
        img: state.sprites.front_shiny,
        name: state.name,
        types: state.types.map((el) => el.type.name),
        generation: data.generation.name,
        "egg groups": data.egg_groups.map((el) => el.name),
        color: data.color.name,
        "base experience": state.base_experience,
        "growth rate": data.growth_rate.name,
        habitat: data.habitat.name,
        shape: data.shape.name,
        weight: `${toKilograms(state.weight)} Kg`,
        height: `${toCentimeters(state.height)} Cm`,
        abilities: state.abilities.map((el) => el.ability.name),
        moves: state.moves.map((el) => el.move.name),
      };
      setPokemoeDetails(pokemonDetailsCopy);
    }
  }, [data, isFetching, state]);

  return (
    <>
      <div className="details container mx-auto flex flex-col items-center py-11">
        {isLoading && <Loader />}
        {error && <img src={errormsg} />}
        {isSuccess && <PokemonRenderDetails {...pokemonDetails} />}
      </div>
    </>
  );
};

export default DetailsPage;
