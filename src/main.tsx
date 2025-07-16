import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { databaseService } from './db/database';
import { Capacitor } from '@capacitor/core';

async function main() {
  try {
    console.log('Starting app initialization...');
    
    // Only initialize database on Android platform
    if (Capacitor.getPlatform() === 'android') {
      await databaseService.initialize();
      console.log('Database initialized successfully');
    } else {
      console.log('Web environment - skipping database initialization');
    }
    
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
