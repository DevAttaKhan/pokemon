import React from "react";
import { useLocation } from "react-router-dom";
import { useGetPokemonBySpeciesQuery } from "../Services/pokemon";
import RenderValues from "../Components/RenderValues";
import { toKilograms, toCentimeters } from "../utils";
const DetailsPage = () => {
  const { state } = useLocation();
  const { data, error, isSuccess } = useGetPokemonBySpeciesQuery(state.name);
  console.log(state);
  console.log(data);
  return (
    <>
      <div className="banner h-64 bg-amber-300 grid place-content-center">
        <h1 className="text-gxl text-gray-900 uppercase">{state.name}</h1>
      </div>

      <div className="details container mx-auto flex flex-col items-center py-11">
        <div className="pokemon-image-section w-2/5 p-4 h-64">
          <img
            src={state.sprites.front_default}
            alt=""
            className="h-full mx-auto"
          />
        </div>
        <div className="pokemon-info-section w-3/5 p-4">
          <table className="table-auto">
            <tbody>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">type</td>
                <td className="p-2 flex space-x-2">
                  <RenderValues
                    values={state.types}
                    path="type"
                    styles=" bg-green-500 text-white rounded-full"
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">type</td>
                <td className="p-2 flex space-x-2">
                  {isSuccess && data.generation.name}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">Egg Groups</td>
                <td className="p-2 flex space-x-2">
                  {isSuccess && (
                    <RenderValues
                      values={data?.egg_groups}
                      path="/"
                      styles=" bg-green-500 text-white rounded-full"
                    />
                  )}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">Colors</td>
                <td className="p-2 flex space-x-2">
                  {isSuccess && data.color.name}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">Colors</td>
                <td className="p-2 flex space-x-2">
                  {isSuccess && data.growth_rate.name}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">Habitate</td>
                <td className="p-2 flex space-x-2">
                  {isSuccess && data.habitat.name}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">Shape</td>
                <td className="p-2 flex space-x-2">
                  {isSuccess && data.shape.name}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">Weight</td>
                <td className="p-2 flex space-x-2">
                  {toKilograms(state.weight)} Kg
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">height</td>
                <td className="p-2 flex space-x-2">
                  {toCentimeters(state.height)} cm
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">Abitlities</td>
                <td className="p-2 flex space-x-2">
                  <RenderValues values={state.abilities} path="ability" />
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="p-2 text-right">moves</td>
                <td className="p-2 flex  space-x-2">
                  <div className="width-4 flex flex-wrap space-x-3">
                    <RenderValues
                      values={state.moves}
                      path="move"
                      styles=" bg-green-500 text-white rounded-full mb-2"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
