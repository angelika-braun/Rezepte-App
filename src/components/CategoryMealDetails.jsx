import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryMealDetails = () => {
const { id } = useParams(); 
const [detail, setDetail] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
fetch(
`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
)
.then((response) => {
if (!response.ok) {
throw new Error("Request failed");
}
return response.json();
})
.then((data) => {
console.log(data);
if (data.meals && data.meals.length > 0) {
  setDetail(data.meals[0]);
} else {
  setError("The recipe wasn't found.");
}
})
.catch((error) => {
console.error(error);
setError(error.message);
});
}, [id]);
if (error) {
return <div style={{ color: "red" }}>{error}</div>;
}
if (!detail) {
  return <div>Details are loading...</div>;
}
return (
      <div id="recipe-starter" className="card">
      <section className="content">
        <h2>{detail.strMeal}</h2>
        <p className="category">Category: {detail.strCategory}</p>
        <img
          className="recipe-img"
          src={detail.strMealThumb}
          alt={detail.strMeal}
        />
        <h3>Ingredients:</h3>
        <ul>
          {Object.keys(detail)
            .filter((key) => key.startsWith("strIngredient") && detail[key])
            .map((key, index) => (
              <li key={index} className="ingredients">
                {detail[key]}{" "}
                {detail[`strMeasure${index + 1}`]
                  ? `(${detail[`strMeasure${index + 1}`]})`
                  : ""}
              </li>
            ))}
        </ul>
        <h3>Instructions: </h3>
        <ul>
          {detail.strInstructions
            .split("\r\n")
            .filter((step) => step.trim() !== "")
            .map((step, index) => (
              <li key={index} className="instructions">
                {step}
              </li>
            ))}
        </ul>

        {detail.strYoutube ? (
          <iframe
            width="100%"
            height="300"
            src={`https://www.youtube.com/embed/${detail.strYoutube.split("v=")[1]}`}
            allowFullScreen
          />
        ) : (
          <p style={{ color: "red", margin: "20px" }}>
            There is no video available
          </p>
        )}
      </section>
    </div>
  );
};
export default CategoryMealDetails;
