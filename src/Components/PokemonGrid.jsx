import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import ReactPaginate from "react-paginate";
import {
  useGetPokemonsQuery,
  useGetPokemonGenerationByNameQuery,
  useGetPokemonGenerationsQuery,
} from "../Services/pokemon";
import CheveronLeftIcon from "../Assets/icons/CheveronLeftIcon";
import ChevronRightIcon from "../Assets/icons/ChevronRightIcon";
import Loader from "./Loader/Loader";
import { ReactComponent as ErrorMessage } from "../Assets/media/somethi-went-wrong.svg";
import SelectDropdown from "./SelectDropdown";

const PokemonGrid = () => {
  const [generation, setGeneration] = useState(null);
  const [fetchedRecsByGeneration, setFetchedRecsByGeneration] = useState([]);
  const [fPges, setFPges] = useState([]);
  const [fCount, setFCount] = useState(1);
  const [page, setPage] = useState(1);
  const [currenPage, setCurrentPage] = useState(1);

  const { data: genList, isSuccess: genSuccess } =
    useGetPokemonGenerationsQuery();

  const { data, error, isLoading, isSuccess, isFetching } = (
    generation ? useGetPokemonGenerationByNameQuery : useGetPokemonsQuery
  )(generation ? generation : page);
  const path = generation ? "pokemon_species" : "results";

  useEffect(() => {
    if (!isFetching && path === "pokemon_species") {
      setFCount(Math.ceil(data[path].length / 20));
      setFetchedRecsByGeneration(data[path]);
    }
  }, [generation, data, isFetching, path]);

  useEffect(() => {
    const limit = 20;
    const startIdex = (page - 1) * limit;
    setFPges(fetchedRecsByGeneration.slice(startIdex, page * limit));
  }, [fetchedRecsByGeneration, page]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const limit = 20;

    if (generation) {
      setPage(selectedPage);
    } else {
      const offset = limit * selectedPage;
      setPage(offset);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-3">
        <div className="flex justify-between col-span-full">
          <h3 className="text-lg text-gray-700">Filters</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setGeneration(null)}
              className="ml-8 rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm  hover:bg-indigo-700"
            >
              Clear Filter
            </button>
            <SelectDropdown
              list={genList}
              status={genSuccess}
              selectedValue={generation}
              setSelectedValue={setGeneration}
            />
          </div>
        </div>
        {isLoading && !isFetching && <Loader />}
        {error && <ErrorMessage />}

        {isSuccess &&
          !isFetching &&
          !generation &&
          data[path].map((el) => <PokemonCard key={el.name} name={el.name} />)}
        {isSuccess &&
          !isFetching &&
          generation &&
          fPges.map((el) => <PokemonCard key={el.name} name={el.name} />)}
      </div>

      <div className="text-center mt-9 mb-8">
        <ReactPaginate
          containerClassName="isolate inline-flex -space-x-px  shadow-sm "
          pageLinkClassName="relative inline-flex items-center  border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          nextClassName="relative rounded-tr-lg rounded-br-lg inline-flex items-center  border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          previousClassName="relative rounded-tl-lg rounded-bl-lg inline-flex items-center  border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          breakClassName="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          breakLabel="..."
          nextLabel={<ChevronRightIcon />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(data?.count / 20) || fCount || 1}
          previousLabel={<CheveronLeftIcon />}
          activeLinkClassName="text-white bg-indigo-700"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default PokemonGrid;
