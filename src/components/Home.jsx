// Startseite laut Katharina
import { useState } from "react"
import { useEffect } from "react"

const Home = () => {
const [recipes, setRecipes] = useState([]);
const [error, setError] = useState(null);

      useEffect(() => {
            fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
            .then((response) => {
                  if(response.ok) {
                  return response.json()
                  } else {
                    throw new Error("Die Anfrage war nicht in Ordnung");
                  }
            })
            .then(data => {
            setRecipes(data.meals[0])
            })
            .catch(error => {
                  console.error('Error:', error);
                  setError(`Error: ${error.message}`);     
             });
      }, []);
      if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
          }
  return (
      <div id="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.idMeal} className="recipe">
          <h2>{recipe.strMeal}</h2>
          <p>Category: {recipe.strCategory}</p>
          <p>Area: {recipe.strArea}</p>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p>{recipe.strInstructions}</p>
        </div>
      ))}
    </div>
)}
export default Home
