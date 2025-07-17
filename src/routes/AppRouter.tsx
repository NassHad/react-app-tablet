import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import VehicleTypeScreen from '../pages/VehicleTypeScreen';
import CategoryScreen from '../pages/CategoryScreen';
import VehiclePage from '../pages/VehiclePage';
import QuestionsScreen from '../pages/QuestionsScreen'; 
import ProductsScreen from '../pages/ProductsScreen';
import ProductDetailsScreen from '../pages/ProductDetailsScreen';
import Layout from '../components/Layout';
import type { UserSelection, VehicleType } from '../types';

const AppRouter = () => {
  const [userSelection, setUserSelection] = useState<UserSelection | null>(null);

  const updateUserSelection = (updates: Partial<UserSelection>) => {
    setUserSelection(prev => prev ? { ...prev, ...updates } : updates as UserSelection);
  };

  return (
    <Router>
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
              <VehicleTypeScreen 
                onVehicleTypeSelect={(vehicleType: VehicleType) => {
                  updateUserSelection({ vehicleType });
                }}
              />
            } 
          />

          {/* Sélection de la catégorie de produit */}
          <Route 
            path="/category" 
            element={
              userSelection?.vehicleType ? (
                <CategoryScreen 
                  vehicleType={userSelection.vehicleType}
                  onCategorySelect={(category) => {
                    updateUserSelection({ category });
                  }}
                />
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
                <VehiclePage 
                  vehicleType={userSelection.vehicleType}
                  category={userSelection.category}
                  onVehicleSelect={(vehicle) => {
                    updateUserSelection({ vehicle });
                  }}
                />
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
                <QuestionsScreen 
                  vehicle={userSelection.vehicle}
                  category={userSelection.category!}
                  onAnswersComplete={(answers) => {
                    updateUserSelection({ answers });
                  }}
                />
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
                <ProductsScreen 
                  userSelection={userSelection}
                />
              ) : (
                <Navigate to="/vehicle-type" replace />
              )
            } 
          />

          {/* Détails d'un produit */}
          <Route 
            path="/product-details/:productId" 
            element={
              <ProductDetailsScreen 
                userSelection={userSelection}
              />
            } 
          />

          {/* Route de fallback */}
          <Route 
            path="*" 
            element={<Navigate to="/vehicle-type" replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter; 