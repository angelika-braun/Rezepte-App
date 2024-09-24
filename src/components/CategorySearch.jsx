import { useEffect, useState } from "react";
import "./CategorySearch.css"

const CategorySearch = () => {
      const [error, setError] = useState(null);
      const [categories, setCategories] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [filteredCategories, setFilteredCategories] = useState([]);
      const [meals, setMeals] = useState([]); // Zustand für die Rezepte
      const [selectedCategory, setSelectedCategory] = useState(''); // Ausgewählte Kategorie
    
       
        useEffect(() => {
          fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((response) => response.json())
            .then((data) => {
              setCategories(data.categories);
              setFilteredCategories(data.categories);
            })
            .catch((error) => {
              console.error('Fehler beim Abrufen der Kategorien:', error);
            });
        }, []);
      
        // Funktion zum Filtern der Kategorien basierend auf dem Suchbegriff
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
              setMeals(data.meals); 
            })
            .catch((error) => {
              console.error('Fehler beim Abrufen der Rezepte:', error);
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
              placeholder="Suche nach Kategorien..." 
              className="search-input"
            />
            <ul className="category-list">
              {filteredCategories.map((category) => (
                <li 
                  key={category.idCategory} 
                  onClick={() => fetchMealsByCategory(category.strCategory)} 
                  style={{ cursor: 'pointer', color: selectedCategory === category.strCategory ? 'green' : 'black' }} // Markiere ausgewählte Kategorie
                >
                  {category.strCategory}
                </li>
              ))}
            </ul>
      
            {meals.length > 0 && (
              <div className="meals-list">
                <h2>Rezepte in der Kategorie: {selectedCategory}</h2>
                <ul>
                  {meals.map((meal) => (
                    <li key={meal.idMeal}>
                      <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
                      <p>{meal.strMeal}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      };
      
      export default CategorySearch;
      