import './App.css';
import GoToTop from './components/common/GoTop';
import Header from './components/common/Header';
import Routers from './Routes';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-w-80 ">
      {/* Main content with routes */}
      <main>
        <Routers />
      </main>
        <GoToTop />
      <Analytics />
    </div>
  );
}

export default App;
