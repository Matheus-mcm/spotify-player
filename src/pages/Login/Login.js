import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import "./Login.css";

function Login() {
  const { signIn } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const clientId = localStorage.getItem("client_id");
      const codeVerifier = localStorage.getItem("code_verifier");

      const redirectUri = window.location.origin + "/";

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });

      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      })
        .then(res => res.json())
        .then(data => {
          signIn(data.access_token);
          window.history.replaceState({}, document.title, "/");
        })
        .catch(err => {
          console.error("Erro ao obter token:", err);
        });
    }
  }, []);

  function generateCodeVerifier(length = 128) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let verifier = '';
    for (let i = 0; i < length; i++) {
      verifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return verifier;
  }

  async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const clientId = e.target["client-id"].value;
    const redirectUri = window.location.origin + "/";
    const scopes = [
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-read-email",
      "user-read-private"
    ];

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem("code_verifier", codeVerifier);
    localStorage.setItem("client_id", clientId);

    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${scopes.join("%20")}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}` +
      `&show_dialog=true`;

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
