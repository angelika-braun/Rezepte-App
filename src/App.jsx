import { useState } from 'react';
import { APIContext } from './APIContext'
import './App.css'
import Home from './components/Home'
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CategorySearch from './components/CategorySearch';

function App() {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/';
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

 

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/categories' element={<CategorySearch />} />
    </Routes>
    <APIContext.Provider value={{API_URL, showDetails, setShowDetails, image, setImage, recipes, setRecipes, error, setError }}>
     

    <Header />
    <Home  />
    </APIContext.Provider> 
    </>
 )
}

export default App
