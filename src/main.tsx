import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { defineCustomElements } from 'jeep-sqlite/loader';
import { databaseService } from './db/database';

// Initialize jeep-sqlite for web platform
defineCustomElements(window);

async function main() {
  try {
    console.log('Starting app initialization...');
    // Initialize database before rendering the app
    await databaseService.initialize();
    console.log('Database initialized successfully');
    
    const root = createRoot(document.getElementById('root')!);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Erreur critique lors de l'initialisation de l'app :", error);
    document.body.innerHTML = "<h1>Erreur de chargement de l'application</h1>";
  }
}

main();
