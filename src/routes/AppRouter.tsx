import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import VehicleTypeScreen from '../pages/VehicleTypeScreen';
import CategoryScreen from '../pages/CategoryScreen';
import BrandScreen from '../pages/BrandScreen';
import ModelScreen from '../pages/ModelScreen';
import QuestionsScreen from '../pages/QuestionsScreen'; 
import ProductsScreen from '../pages/ProductsScreen';
import ProductDetailsScreen from '../pages/ProductDetailsScreen';
import type { UserSelection, VehicleType } from '../types';

const AppRouter = () => {
  const [userSelection, setUserSelection] = useState<UserSelection | null>(null);

  const updateUserSelection = (updates: Partial<UserSelection>) => {
    setUserSelection(prev => prev ? { ...prev, ...updates } : updates as UserSelection);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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

          {/* Sélection de la marque */}
          <Route 
            path="/brand" 
            element={
              userSelection?.vehicleType && userSelection?.category ? (
                <BrandScreen 
                  vehicleType={userSelection.vehicleType}
                  category={userSelection.category}
                  onBrandSelect={(brand) => {
                    // TODO: Récupérer les modèles pour cette marque
                    updateUserSelection({ vehicle: { brand, model: '', type: userSelection.vehicleType!, id: 1 } });
                  }}
                />
              ) : (
                <Navigate to="/vehicle-type" replace />
              )
            } 
          />

          {/* Sélection du modèle */}
          <Route 
            path="/model" 
            element={
              userSelection?.vehicle?.brand ? (
                <ModelScreen 
                  vehicleType={userSelection.vehicleType!}
                  brand={userSelection.vehicle.brand}
                  onModelSelect={(model) => {
                    updateUserSelection({ 
                      vehicle: { 
                        ...userSelection.vehicle!, 
                        model,
                        id: 1 // TODO: Récupérer l'ID réel du véhicule
                      } 
                    });
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
              userSelection?.vehicle?.model ? (
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

          {/* Liste des produits compatibles */}
          <Route 
            path="/products" 
            element={
              userSelection?.answers ? (
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
      </div>
    </Router>
  );
};

export default AppRouter; 