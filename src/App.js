import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user ? <Home /> : <Login />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider >
  );
}

export default App;
