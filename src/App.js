import MainLayout from "./Layout/MainLayout";

import DetailsPage from "./Pages/DetailsPage";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
