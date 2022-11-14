import MainLayout from "./Layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<h1>helsdfsdflo</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
