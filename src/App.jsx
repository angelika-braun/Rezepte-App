import { useState } from "react";
import { APIContext } from "./APIContext";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Recipe from "./components/Recipe";
import Layout from "./components/Layout";
import CategorySearch from "./components/CategorySearch";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <APIContext.Provider
      value={{
        showDetails,
        setShowDetails,
        image,
        setImage,
        recipes,
        setRecipes,
        error,
        setError,
      }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<CategorySearch />} />
          <Route path="/recipe" element={<Recipe />} />
        </Route>
      </Routes>
    </APIContext.Provider>
  );
}

export default App;
