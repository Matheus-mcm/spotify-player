import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import "./Login.css";

function Login() {
  const { signIn } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const clientId = e.target["client-id"].value;
    signIn({ name, clientId });
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
