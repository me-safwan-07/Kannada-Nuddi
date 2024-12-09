import './App.css';
import GoToTop from './components/common/GoTop';
import Header from './components/common/Header';
import Routers from './Routes';

function App() {
  return (
    <div className="min-w-80 ">
      {/* Main content with routes */}
      <main>
        <Routers />
      </main>
        <GoToTop />
    </div>
  );
}

export default App;
