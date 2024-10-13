import { useState } from "react";
import { APIContext } from "./APIContext";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CategorySearch from "./components/CategorySearch";
import CategoryMealDetails from "./components/CategoryMealDetails";
import ContactUs from "./components/ContactUs";

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
          <Route path="meal/:id" element={<CategoryMealDetails />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
        
      </Routes>
    </APIContext.Provider>
  );
}

export default App;
