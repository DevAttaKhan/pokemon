import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import DetailsPage from "./Pages/DetailsPage";
import ComparePokemonPage from "./Pages/ComparePokemonPage";
import FavoritesPokemonPage from "./Pages/FavoritesPokemonPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route exact path="/" element={<Home />} />
        <Route path="/compare" element={<ComparePokemonPage />} />
        <Route path="/favorites" element={<FavoritesPokemonPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
