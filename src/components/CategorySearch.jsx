import { useEffect, useState } from "react";
import "./CategorySearch.css"
import { useNavigate } from "react-router-dom";

const CategorySearch = () => {
      const [error, setError] = useState(null);
      const [categories, setCategories] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [filteredCategories, setFilteredCategories] = useState([]);
      const [meals, setMeals] = useState([]); 
      const [selectedCategory, setSelectedCategory] = useState(''); 
      
      const navigate = useNavigate();

      const handleShowRecipe = (mealId) => {
        console.log("Navigating to meal ID:", mealId); 
        navigate(`/meal/${mealId}`);
      };      
       
        useEffect(() => {
          fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((response) => response.json())
            .then((data) => {
              setCategories(data.categories);
              setFilteredCategories(data.categories);
            })
            .catch((error) => {
              console.error('Error when fetching the categories ', error);
            });
        }, []);
      
        const handleSearch = (e) => {
          const value = e.target.value.toLowerCase();
          setSearchTerm(value);
          const filtered = categories.filter(category => 
            category.strCategory.toLowerCase().includes(value)
          );
          setFilteredCategories(filtered);
        };
          const fetchMealsByCategory = (category) => {
          setSelectedCategory(category);
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setMeals(data.meals); 
            })
            .catch((error) => {
              console.error('Request error:', error);
              setError(`Error: ${error.message}`);
            });
        };

        if (error) {
          return <div style={{ color: "red" }}>{error}</div>;
        }
      
        return (
          <div className="search-component">
            <input 
              type="text" 
              value={searchTerm} 
              onChange={handleSearch} 
              placeholder="Search for categories..." 
              className="search-input"
            />
            <ul className="category-list">
              {filteredCategories.map((category) => (
                <li 
                  key={category.idCategory} 
                  onClick={() => fetchMealsByCategory(category.strCategory)} 
                  style={{ cursor: 'pointer', color: selectedCategory === category.strCategory ? 'green' : 'black' }} 
                >
                  {category.strCategory}
                </li>
              ))}
            </ul>
      
            {meals.length > 0 && (
              <div className="meals-list">
                <h2>Recipes in the category: {selectedCategory}</h2>
                <ul>
                  {meals.map((meal) => (
                    <li key={meal.idMeal}>
                      <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
                      <p>{meal.strMeal}</p>
                      <button className="detailButton" onClick={() => handleShowRecipe(meal.idMeal)}>Show recipe</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      };
      
      export default CategorySearch;
      