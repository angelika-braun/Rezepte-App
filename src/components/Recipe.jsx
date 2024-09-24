import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Recipe() {
      const { id } = useParams();
      const [error, setError] = useState(null)
      const [recipe, setRecipe] = useState([])

    
      useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then(response => response.json())
          .then(data => setRecipe(data.meals[0]))
          .catch(error => {
            setError(`Error: ${error.message}`);
          })

      }, [id]);
    
      if (!recipe) {
            return <div style={{ color: "red" }}>{error}</div>;
}    
      return (
        <div className="recipe-detail">
          <h1>{recipe.strMeal}</h1>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
          <div className="recipe-details">
            <p><strong>Kategorie:</strong> {recipe.strCategory}</p>
            <p><strong>Region:</strong> {recipe.strArea}</p>
            <p><strong>Anleitung:</strong> {recipe.strInstructions}</p>
            <a href={recipe.strYoutube} target="_blank">Video ansehen</a>
            <h3>Zutaten:</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                return ingredient ? (
                  <li key={i}>{measure} {ingredient}</li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      )
}