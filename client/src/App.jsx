import './App.css';
import Header from './components/common/Header';
import Routers from './Routes';

function App() {
  return (
    <div className="min-w-80 ">
      {/* Main content with routes */}
      <main>
        <Routers />
      </main>
    </div>
  );
}

export default App;
