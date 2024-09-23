import { useState } from 'react';
import { APIContext } from './APIContext'
import './App.css'
import Home from './components/Home'



function App() {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [image, setImage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);


  return (
    <APIContext.Provider value={{API_URL, showDetails, setShowDetails, image, setImage, darkMode, setDarkMode, recipes, setRecipes, error, setError}}>
    <Home />
    </APIContext.Provider>  )
}

export default App
