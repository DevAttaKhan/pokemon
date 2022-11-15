import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),

  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: (page) => {
        return page > 1 ? `pokemon/?offset=${page}&limit=20` : "pokemon/";
      },
    }),
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonBySpecies: builder.query({
      query: (name) => `pokemon-species/${name}`,
    }),
    getPokemonGenerations: builder.query({
      query: () => "generation/",
      transformResponse: (response) => response.results.map((el) => el.name),
    }),
    getPokemonGenerationByName: builder.query({
      query: (name) => `generation/${name}`,
      transformResponse: (response) => response.pokemon_species,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useGetPokemonBySpeciesQuery,
  useGetPokemonGenerationsQuery,
  useGetPokemonGenerationByNameQuery,
} = pokemonApi;
