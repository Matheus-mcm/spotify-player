import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme('');

  return (
    <div className="navbar">
      <h1>Spotify Player</h1>
      <ThemeToggle />
    </div>
  );
}

export default Navbar;