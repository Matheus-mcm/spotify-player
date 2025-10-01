import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import "./Login.css";

function Login() {
  const { signIn } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const token = params.get("access_token");
      if (token) {
        localStorage.setItem("spotify_token", token);
        window.history.replaceState({}, document.title, "/home"); // limpa a URL
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const clientId = e.target["client-id"].value;

    const redirectUri = window.location.origin + "/home";
    const scopes = [
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-read-email",
      "user-read-private"
    ];

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  };

  return (
    <div className={`login-container theme-${theme}`}>
      <ThemeToggle />
      <form className="form" onSubmit={handleLogin}>
        <span className="input-span">
          <label htmlFor="name" className="label">Nome</label>
          <input type="text" name="name" id="name" required />
        </span>
        <span className="input-span">
          <label htmlFor="client-id" className="label">Client ID</label>
          <input type="text" name="client-id" id="client-id" required />
        </span>
        <input className="submit" type="submit" value="Entrar" />
      </form>
    </div>
  );
}

export default Login;
