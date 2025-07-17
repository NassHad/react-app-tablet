import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VehicleTypeScreen from '../pages/VehicleTypeScreen';
import CategoryScreen from '../pages/CategoryScreen';
import VehiclePage from '../pages/VehiclePage';
import QuestionsScreen from '../pages/QuestionsScreen'; 
import ProductsScreen from '../pages/ProductsScreen';
import ProductDetailsScreen from '../pages/ProductDetailsScreen';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import type { UserSelection, VehicleType } from '../types';

// Define route order for determining direction
const routeOrder = ['/vehicle-type', '/category', '/vehicle', '/questions', '/products', '/product-details'];

const AppRouterContent = () => {
  const [userSelection, setUserSelection] = useState<UserSelection | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
  const [previousPath, setPreviousPath] = useState<string>('');
  const location = useLocation();

  const updateUserSelection = (updates: Partial<UserSelection>) => {
    setUserSelection(prev => prev ? { ...prev, ...updates } : updates as UserSelection);
  };

  // Track navigation direction
  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = routeOrder.findIndex(route => currentPath.startsWith(route));
    const previousIndex = routeOrder.findIndex(route => previousPath.startsWith(route));
    
    // Determine direction based on route order
    if (previousPath && previousIndex !== -1 && currentIndex !== -1) {
      if (currentIndex > previousIndex) {
        setNavigationDirection('forward');
        console.log(`Navigation: ${previousPath} -> ${currentPath} (FORWARD)`);
      } else if (currentIndex < previousIndex) {
        setNavigationDirection('backward');
        console.log(`Navigation: ${previousPath} -> ${currentPath} (BACKWARD)`);
      }
    } else {
      // Default to forward for initial navigation
      setNavigationDirection('forward');
      console.log(`Initial navigation to ${currentPath} (FORWARD)`);
    }
    
    // Update previous path for next navigation
    setPreviousPath(currentPath);
  }, [location.pathname, previousPath]);

  return (
    <Layout userSelection={userSelection}>
      <Routes>
          {/* Route par défaut - redirige vers la sélection du type de véhicule */}
          <Route 
            path="/" 
            element={<Navigate to="/vehicle-type" replace />} 
          />

          {/* Sélection du type de véhicule */}
          <Route 
            path="/vehicle-type" 
            element={
              <PageTransition direction={navigationDirection}>
                <VehicleTypeScreen 
                  onVehicleTypeSelect={(vehicleType: VehicleType) => {
                    updateUserSelection({ vehicleType });
                  }}
                />
              </PageTransition>
            } 
          />

          {/* Sélection de la catégorie de produit */}
          <Route 
            path="/category" 
            element={
              userSelection?.vehicleType ? (
                <PageTransition direction={navigationDirection}>
                  <CategoryScreen 
                    vehicleType={userSelection.vehicleType}
                    onCategorySelect={(category) => {
                      updateUserSelection({ category });
                    }}
                  />
                </PageTransition>
              ) : (
                <Navigate to="/vehicle-type" replace />
              )
            } 
          />

          {/* Sélection du véhicule (marque, modèle, version) */}
          <Route 
            path="/vehicle" 
            element={
              userSelection?.vehicleType && userSelection?.category ? (
                <PageTransition direction={navigationDirection}>
                  <VehiclePage 
                    vehicleType={userSelection.vehicleType}
                    category={userSelection.category}
                    onVehicleSelect={(vehicle) => {
                      updateUserSelection({ vehicle });
                    }}
                  />
                </PageTransition>
              ) : (
                <Navigate to="/vehicle-type" replace />
              )
            } 
          />

          {/* Questions spécifiques */}
          <Route 
            path="/questions" 
            element={
              userSelection?.vehicle ? (
                <PageTransition direction={navigationDirection}>
                  <QuestionsScreen 
                    vehicle={userSelection.vehicle}
                    category={userSelection.category!}
                    onAnswersComplete={(answers) => {
                      updateUserSelection({ answers });
                    }}
                  />
                </PageTransition>
              ) : (
                <Navigate to="/vehicle-type" replace />
              )
            } 
          />

          {/* Liste des produits */}
          <Route 
            path="/products" 
            element={
              (userSelection?.answers || (userSelection?.vehicle && userSelection?.category?.slug === 'batteries')) ? (
                <PageTransition direction={navigationDirection}>
                  <ProductsScreen 
                    userSelection={userSelection}
                  />
                </PageTransition>
              ) : (
                <Navigate to="/vehicle-type" replace />
              )
            } 
          />

          {/* Détails d'un produit */}
          <Route 
            path="/product-details/:productId" 
            element={
              <PageTransition direction={navigationDirection}>
                <ProductDetailsScreen 
                  userSelection={userSelection}
                />
              </PageTransition>
            } 
          />

          {/* Route de fallback */}
          <Route 
            path="*" 
            element={<Navigate to="/vehicle-type" replace />} 
          />
        </Routes>
      </Layout>
  );
};

export default AppRouterContent; 