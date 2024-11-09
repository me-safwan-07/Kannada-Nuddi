import './App.css';
import Header from './components/common/Header';
import Routers from './Routes';

function App() {
  return (
    <div className="App">
      {/* Main content with routes */}
      <main>
        <Routers />
      </main>
    </div>
  );
}

export default App;
