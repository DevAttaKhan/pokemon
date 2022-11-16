import React, { useState, useEffect } from "react";
import { toKilograms, toCentimeters } from "../utils";
import {
  useGetPokemonByNameQuery,
  useGetPokemonBySpeciesQuery,
} from "../Services/pokemon";

import PokemonRenderDetails from "../Components/PokemonRenderDetails";

const ComparePokemonPage = () => {
  const [pokemonQueryLeft, setPokemonQueryLeft] = useState(null);
  const [pokemonQueryRight, setPokemonQueryRight] = useState(null);
  const [pokemonQueryRightSkip, setPokemonQueryRightSkip] = useState(true);
  const [pokemonQueryLeftSkip, setPokemonQueryLeftSkip] = useState(true);

  const [pokemonLeftDetails, setPokemonLeftDetails] = useState([]);
  const [pokemonRightDetails, setPokemonRightDetails] = useState([]);

  const { data: pokemonLeft, isFetching: leftFetching } =
    useGetPokemonByNameQuery(pokemonQueryLeft, {
      skip: pokemonQueryLeftSkip,
    });

  const { data: pokeSpeciesLeft, isFetching: specieLeftFetching } =
    useGetPokemonBySpeciesQuery(pokemonLeftDetails?.name, {
      skip: pokemonLeftDetails.length < 1,
    });

  const { data: pokemonRight, isFetching: rightFetching } =
    useGetPokemonByNameQuery(pokemonQueryRight, {
      skip: pokemonQueryRightSkip,
    });

  const { data: pokeSpeciesRight, isFetching: specieRightFetching } =
    useGetPokemonBySpeciesQuery(pokemonRightDetails?.name, {
      skip: pokemonRightDetails.length < 1,
    });

  const handleSubminLeft = (e) => {
    e.preventDefault();
    setPokemonQueryLeft(e.target[0].value.toLowerCase());
    setPokemonQueryLeftSkip(false);
  };

  const handleSubmitRight = (e) => {
    e.preventDefault();
    setPokemonQueryRight(e.target[0].value.toLowerCase());
    setPokemonQueryRightSkip(false);
  };

  useEffect(() => {
    if (!leftFetching && !specieLeftFetching && pokemonLeft) {
      const pokemonDetailsCopy = {
        img: pokemonLeft?.sprites?.front_shiny,
        name: pokemonLeft?.name,
        types: pokemonLeft?.types.map((el) => el.type.name),
        generation: pokeSpeciesLeft?.generation?.name,
        "egg groups": pokeSpeciesLeft?.egg_groups.map((el) => el.name),
        color: pokeSpeciesLeft?.color?.name,
        "base experience": pokemonLeft?.base_experience,
        "growth rate": pokeSpeciesLeft?.growth_rate?.name,
        habitat: pokeSpeciesLeft?.habitat?.name,
        shape: pokeSpeciesLeft?.shape?.name,
        weight: `${toKilograms(pokemonLeft?.weight)} Kg`,
        height: `${toCentimeters(pokemonLeft?.height)} Cm`,
        abilities: pokemonLeft?.abilities.map((el) => el.ability.name),
        moves: pokemonLeft?.moves.map((el) => el.move.name),
      };
      setPokemonLeftDetails(pokemonDetailsCopy);
    }
  }, [leftFetching, pokemonLeft, specieLeftFetching, pokeSpeciesLeft]);

  useEffect(() => {
    if (!rightFetching && !specieRightFetching && pokemonRight) {
      const pokemonDetailsCopy = {
        img: pokemonRight?.sprites?.front_shiny,
        name: pokemonRight?.name,
        types: pokemonRight?.types.map((el) => el.type.name),
        generation: pokeSpeciesRight?.generation?.name,
        "egg groups": pokeSpeciesRight?.egg_groups.map((el) => el.name),
        color: pokeSpeciesRight?.color?.name,
        "base experience": pokemonRight?.base_experience,
        "growth rate": pokeSpeciesRight?.growth_rate?.name,
        habitat: pokeSpeciesRight?.habitat?.name,
        shape: pokeSpeciesRight?.shape?.name,
        weight: `${toKilograms(pokemonRight?.weight)} Kg`,
        height: `${toCentimeters(pokemonRight?.height)} Cm`,
        abilities: pokemonRight?.abilities.map((el) => el.ability.name),
        moves: pokemonRight?.moves.map((el) => el.move.name),
      };
      setPokemonRightDetails(pokemonDetailsCopy);
    }
  }, [rightFetching, pokemonRight, specieRightFetching, pokeSpeciesRight]);

  return (
    <div className="container  mx-auto">
      <div className="justify-center flex gap-x-10 py-12">
        <div>
          <form onSubmit={handleSubminLeft} className="block mb-4">
            <input
              type="text"
              className="p-2 w-full border-gray-300 border-2 rounded-lg"
              placeholder="Enter Pokemon Name Here"
              name="pokemonLeft"
            />
          </form>
          <PokemonRenderDetails {...pokemonLeftDetails} />
        </div>
        <div>
          <form onSubmit={handleSubmitRight} className="block mb-4">
            <input
              type="text"
              className="p-2 w-full border-gray-300 border-2 rounded-lg"
              placeholder="Enter Pokemon Name Here"
              name="pokemonRight"
            />
          </form>
          <PokemonRenderDetails {...pokemonRightDetails} />
        </div>
      </div>
    </div>
  );
};

export default ComparePokemonPage;
