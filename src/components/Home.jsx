import { useContext, useState } from "react";
import { useEffect } from "react";
import { APIContext } from "../APIContext";
import "../App.css";

const Home = () => {
  const {
    showDetails,
    setShowDetails,
    recipes,
    setRecipes
  } = useContext(APIContext);
  const [error , setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("The request was not correct");
        }
      })
      .then((data) => {
        console.log(data);
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(`Error: ${error.message}`);
      });
  }, []);
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div id="recipe-starter" className="card">
      <h1>A new suggestion for you: </h1>
      {recipes.map((recipe) => (
        <section key={recipe.idMeal} className="content">
          <h2>{recipe.strMeal}</h2>
          <p className="category">Category: {recipe.strCategory}</p>
          <img
            className="recipe-img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />

          <button
            className="readMoreBtn"
            onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide details" : "Show details"}
          </button>
          {showDetails && (
            <div className="details">
              <h3>Ingredients:</h3>
              <ul>
                {Object.keys(recipe)
                  .filter(
                    (key) =>
                      key.startsWith("strIngredient") && recipe[key] !== ""
                  )
                  .map((key, index) => (
                    <li key={index} className="ingredients">
                      {recipe[key]}{" "}
                      {recipe[`strMeasure${index + 1}`]
                        ? `(${recipe[`strMeasure${index + 1}`]})`
                        : ""}
                    </li>
                  ))}
              </ul>
              <h3>Instructions: </h3>
              <ul>
                {recipe.strInstructions.split("\r\n").map((step, index) => {
                  if (step.trim() !== "") {
                    return (
                      <li key={index} className="instructions">
                        {step}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>

              {recipe.strYoutube ? (
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${
                    recipe.strYoutube.split("v=")[1]
                  }`}
                  allowFullScreen
                />
              ) : (
                <p style={{ color: "red", margin: "20px" }}>
                There is no video available
                </p>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
    );
};
export default Home;
