import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="home-container">
      <h1>Bem-vindo, {user?.name}!</h1>
      <button onClick={signOut}>
        Sair
      </button>
    </div>
  );
}

export default Home;