import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/Button";
import { useSelector} from "react-redux";
import {cartCountSelector} from "../../Redux/Store/Store"

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const cartCount = useSelector(cartCountSelector)

  useEffect(() => {
    const perferDark = window.matchMedia("(perfer-color-scheme: dark)").matches;
    if(perferDark) {
      setIsDarkTheme(true)
    }
  }, [])

  useEffect(() => {
    if(isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme])

  function handleThemeClick() {
    setIsDarkTheme(!isDarkTheme)
  }
 
  
    return (
      <nav className="navbar">
        <NavLink to="/" className="nav-brand">
          SuperM
        </NavLink>
        <ul>
        <li className="nav-item">
          <Button onClick={handleThemeClick} className="theme-switcher">{isDarkTheme ? "Dark" : "Light"}</Button>
        </li>
          <li className="nav-item">
            <NavLink className={({isActive}) => isActive ? "active" : ""} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive}) => isActive ? "active" : ""} to="/about">
              About us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive}) => isActive ? "active" : ""} to="/products">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
              Cart ({cartCount})
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }