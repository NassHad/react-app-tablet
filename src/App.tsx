import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import DatabaseDebugger from './components/DatabaseDebugger';

function App() {
  return (
    <Router>
      <AppRouter />
      <DatabaseDebugger />
    </Router>
  );
}

export default App;
