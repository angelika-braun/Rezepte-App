import { useContext } from "react";
import DarkModeButton from "./DarkModeButton"
import { APIContext } from "../APIContext";
import CategorySearch from "./CategorySearch";

const Header = () => {
      const { handleDarkMode } = useContext(APIContext);

  return (
  <header>
      <DarkModeButton handleDarkMode={handleDarkMode} />
      <CategorySearch />
 </header>    
  )
}

export default Header
