import MainLayout from "./Layout/MainLayout";

import DetailsPage from "./Pages/DetailsPage";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ComparePokemonPage from "./Pages/ComparePokemonPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route exact path="/" element={<Home />} />
        <Route path="/compare" element={<ComparePokemonPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
