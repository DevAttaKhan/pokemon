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
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonsQuery } = pokemonApi;
