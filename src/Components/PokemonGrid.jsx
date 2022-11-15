import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import ReactPaginate from "react-paginate";
import {
  useGetPokemonsQuery,
  useGetPokemonGenerationByNameQuery,
} from "../Services/pokemon";
import CheveronLeftIcon from "../Assets/icons/CheveronLeftIcon";
import ChevronRightIcon from "../Assets/icons/ChevronRightIcon";
import Loader from "./Loader/Loader";
import { ReactComponent as ErrorMessage } from "../Assets/media/somethi-went-wrong.svg";
import { useSelector } from "react-redux";
const PokemonGrid = () => {
  const state = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isSuccess } = useGetPokemonsQuery(page);
  const { data: gen } = useGetPokemonGenerationByNameQuery();
  console.log(gen);
  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const offset = 20 * selectedPage;
    setPage(offset);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-3">
        {isLoading && <Loader />}
        {error && <ErrorMessage />}

        {isSuccess &&
          data.results.map((el) => (
            <PokemonCard key={el.name} name={el.name} />
          ))}
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
          pageCount={data?.count || 1}
          previousLabel={<CheveronLeftIcon />}
          activeLinkClassName="text-white bg-indigo-700"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default PokemonGrid;
