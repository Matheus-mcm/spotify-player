import Navbar from '../../components/Navbar/Navbar';
import Dashboard from '../../components/Dashboard/Dashboard';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <Dashboard />
    </div >
  );
}

export default Home;