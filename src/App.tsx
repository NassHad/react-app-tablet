import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import DatabaseDebugger from './components/DatabaseDebugger';
import StrapiStatus from './components/StrapiStatus';
// import FlowDemo from './components/FlowDemo';
import { SimpleVehicleProvider } from './contexts/SimpleVehicleContext';

function App() {
  return (
    <SimpleVehicleProvider>
      <Router>
        <AppRouter />
        {/* <DatabaseDebugger />
        <StrapiStatus /> */}
        {/* <FlowDemo /> */}
      </Router>
    </SimpleVehicleProvider>
  );
}

export default App;
