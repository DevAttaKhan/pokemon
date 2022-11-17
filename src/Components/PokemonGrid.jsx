import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import PokemonCard from "./PokemonCard";
import {
  useGetPokemonsQuery,
  useGetPokemonGenerationByNameQuery,
  useGetPokemonGenerationsQuery,
} from "../Services/pokemon";
import { ReactComponent as ErrorMessage } from "../Assets/media/somethi-went-wrong.svg";
import SelectDropdown from "./SelectDropdown";

const PokemonGrid = () => {
  const [generation, setGeneration] = useState(null);
  const [initialGenerationRender, setInitialGenerationRender] = useState(true);
  const [isFilterClear, setIsFilterClear] = useState(false);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);

  const { data: genList, isSuccess: genSuccess } =
    useGetPokemonGenerationsQuery();

  // const { data, error, isLoading, isSuccess, isFetching } = (
  //   generation ? useGetPokemonGenerationByNameQuery : useGetPokemonsQuery
  // )(generation ? generation : page);

  const {
    data: generationQueryData,
    error: generationQueryError,
    isLoading: generationQueryLoading,
    isSuccess: generationQuerySuccess,
    isFetching: generationQueryFetching,
  } = useGetPokemonGenerationByNameQuery(generation, {
    skip: !generation,
  });

  const {
    data: pokemonQueryData,
    error: pokemonQueryError,
    isLoading: pokemonQueryLoading,
    isSuccess: pokemonQuerySuccess,
    isFetching: pokemonQueryFetching,
  } = useGetPokemonsQuery(page, {
    skip: !generation && false,
  });

  useEffect(() => {
    setPage(() => 0);
    setInitialGenerationRender(true);
  }, [generation]);

  useEffect(() => {
    if (pokemonQuerySuccess && !pokemonQueryFetching && !generation) {
      !isFilterClear &&
        setList((prev) => [
          ...prev,
          ...pokemonQueryData.results.map((el) => el.name),
        ]);
      isFilterClear && setList(pokemonQueryData.results.map((el) => el.name));
    }
  }, [
    pokemonQueryData,
    pokemonQuerySuccess,
    pokemonQueryFetching,
    generationQuerySuccess,
    generationQueryFetching,
    generation,
    isFilterClear,
    initialGenerationRender,
  ]);

  useEffect(() => {
    if (generationQuerySuccess && !generationQueryFetching && generation) {
      const listSliced = generationQueryData.pokemon_species
        .map((el) => el.name)
        .slice(page, page + 9);
      const more = [...list];
      initialGenerationRender && setList(listSliced);

      if (!initialGenerationRender) {
        setList(more.concat(listSliced));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    generationQueryData,
    generationQuerySuccess,
    generationQueryFetching,
    generation,
    initialGenerationRender,
    page,
  ]);

  const loadMoreHandler = () => {
    setIsFilterClear(false);
    setInitialGenerationRender(false);
    setPage((prev) => (prev += 9));
  };

  const filterHandler = () => {
    setIsFilterClear(true);
    setInitialGenerationRender(true);

    setPage(0);
    setGeneration(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 justify-center gap-4 pt-8 md:grid-cols-3">
        {(pokemonQueryData || generationQueryData) && (
          <div className="flex justify-between col-span-full">
            <h3 className="text-lg text-gray-700">Filters</h3>
            <div className="flex space-x-4">
              {generation && (
                <button
                  onClick={filterHandler}
                  className="ml-8 rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm  hover:bg-indigo-700"
                >
                  Clear Filter
                </button>
              )}
              <SelectDropdown
                list={genList}
                status={genSuccess}
                selectedValue={generation}
                setSelectedValue={setGeneration}
              />
            </div>
          </div>
        )}

        {list?.map((el) => (
          <PokemonCard key={el} name={el} />
        ))}
        {/* {isSuccess &&
          !isFetching &&
          generation &&
          generationPages.map((el) => (
            <PokemonCard key={el.name} name={el.name} />
          ))} */}

        {(pokemonQueryLoading || generationQueryLoading) &&
          (pokemonQueryFetching || generationQueryFetching) && (
            <TailSpin
              height="80"
              width="80"
              color="#4f46e5"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass="justify-center col-span-full"
              visible={true}
            />
          )}
        {pokemonQueryError && !generationQueryError && <ErrorMessage />}
        {!generationQueryError && generationQueryError && <ErrorMessage />}
      </div>

      <div className="text-center mt-9 mb-8">
        {(pokemonQueryData || generationQueryData) && (
          <button
            onClick={loadMoreHandler}
            className="relative py-3 px-5 w-36  rounded-lg font-medium bg-amber-400 hover:bg-amber-400"
          >
            {pokemonQueryFetching || generationQueryFetching ? (
              <TailSpin
                height="25"
                width="25"
                color="#4f46e5"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass="justify-center"
                visible={true}
              />
            ) : (
              "Load More"
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default PokemonGrid;
