import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import DatabaseDebugger from './components/DatabaseDebugger';
import StrapiStatus from './components/StrapiStatus';

function App() {
  return (
    <Router>
      <AppRouter />
      <DatabaseDebugger />
      <StrapiStatus />
    </Router>
  );
}

export default App;
