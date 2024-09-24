import { NavLink } from "react-router-dom";

export default function Navbar() {
      return (
        <nav className="navbar">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/category">Food-Category-Search</NavLink> 
          <NavLink to="/contact">Kontakt</NavLink>
        </nav>
      );
    }
