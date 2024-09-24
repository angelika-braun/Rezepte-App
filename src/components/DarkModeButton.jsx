import { useState } from "react";
import "./DarkModeButton.css"

const DarkModeButton = () => {
      const [darkMode, setDarkMode] = useState(false);

      const handleDarkMode = () => {
            const body = document.querySelector('body');

            if (!darkMode) {
                  body.classList.add('dark-mode')
                  setDarkMode(true)
            }else {
                  body.classList.remove('dark-mode');
                  setDarkMode(false);
            }
          };
     
return (
      <label htmlFor="switch" className="switch" >
            <input id="switch" type="checkbox" onClick={handleDarkMode} />
            <span className="slider"></span>
            <span className="decoration"></span>
      </label>
)
}
export default DarkModeButton;