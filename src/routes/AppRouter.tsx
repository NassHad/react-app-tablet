import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from '../pages/HomePage';
import CategoryScreen from '../pages/CategoryScreen';
import VehiclePage from '../pages/VehiclePage';
import QuestionsScreen from '../pages/QuestionsScreen'; 
import ProductsScreen from '../pages/ProductsScreen';
import ProductDetailsScreen from '../pages/ProductDetailsScreen';
import NoProductsAvailableScreen from '../pages/NoProductsAvailableScreen';
import CategorySpecificForm from '../components/CategorySpecificForm';
import VehicleSelectionForm from '../components/VehicleSelectionForm';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import type { UserSelection, VehicleType } from '../types';
import { FLOW_CONFIG } from '../config/flowConfig';

// Define route order for determining direction
const routeOrder = FLOW_CONFIG.SELECT_VEHICLE_FIRST 
  ? ['/', '/vehicle', '/category', '/questions', '/products', '/product-details', '/no-products-available']
  : ['/', '/category', '/vehicle', '/questions', '/products', '/product-details', '/no-products-available'];

const AppRouterContent = () => {
  const [userSelection, setUserSelection] = useState<UserSelection | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
  const [previousPath, setPreviousPath] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  const updateUserSelection = (updates: Partial<UserSelection>) => {
    console.log('updateUserSelection called with:', updates);
    setUserSelection(prev => {
      const newState = prev ? { ...prev, ...updates } : updates as UserSelection;
      console.log('New userSelection state:', newState);
      return newState;
    });
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
    <Routes>
        {/* Route par défaut - Page d'accueil */}
        <Route 
          path="/" 
          element={
            <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
              <PageTransition direction={navigationDirection}>
                <HomePage 
                  onVehicleTypeSelect={(vehicleType: VehicleType) => {
                    updateUserSelection({ vehicleType });
                  }}
                />
              </PageTransition>
            </Layout>
          } 
        />

        {/* Sélection du type de véhicule - Redirect to homepage */}
        <Route 
          path="/vehicle-type" 
          element={<Navigate to="/" replace />} 
        />

        {/* Sélection du véhicule (marque, modèle, date) */}
        <Route 
          path="/vehicle-selection" 
          element={
            userSelection?.vehicleType ? (
              <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                <PageTransition direction={navigationDirection}>
                  <VehicleSelectionForm 
                    vehicleType={userSelection.vehicleType}
                    onComplete={() => {
                      // Navigate to category selection after vehicle is complete
                      navigate('/category');
                    }}
                  />
                </PageTransition>
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

          {FLOW_CONFIG.SELECT_VEHICLE_FIRST ? (
            // New flow: Vehicle first, then category
            <>
              {/* Sélection du véhicule (marque, modèle, version) */}
              <Route 
                path="/vehicle" 
                element={
                  userSelection?.vehicleType ? (
                                    <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                  <PageTransition direction={navigationDirection}>
                    <VehiclePage 
                      vehicleType={userSelection.vehicleType}
                      category={{ id: 0, name: '', slug: '', active: true }}
                      onVehicleSelect={(vehicle) => {
                        updateUserSelection({ vehicle });
                      }}
                    />
                  </PageTransition>
                </Layout>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              {/* Sélection de la catégorie de produit */}
              <Route 
                path="/category" 
                element={
                  userSelection?.vehicle ? (
                                    <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                  <PageTransition direction={navigationDirection}>
                    <CategoryScreen 
                      vehicle={userSelection.vehicle}
                      onCategorySelect={(category) => {
                        updateUserSelection({ category });
                      }}
                    />
                  </PageTransition>
                </Layout>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
            </>
          ) : (
            // Enhanced flow: Vehicle type -> Vehicle details -> Category -> Category-specific
            <>
              {/* Sélection de la catégorie de produit */}
              <Route 
                path="/category" 
                element={
                  userSelection?.vehicleType ? (
                    <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                      <PageTransition direction={navigationDirection}>
                        <CategoryScreen 
                          onCategorySelect={(category) => {
                            updateUserSelection({ category });
                          }}
                        />
                      </PageTransition>
                    </Layout>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              {/* Sélection du véhicule (marque, modèle, version) */}
              <Route 
                path="/vehicle" 
                element={
                  userSelection?.vehicleType && userSelection?.category ? (
                    <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                      <PageTransition direction={navigationDirection}>
                        <VehiclePage 
                          vehicleType={userSelection.vehicleType}
                          category={userSelection.category}
                          onVehicleSelect={(vehicle) => {
                            updateUserSelection({ vehicle });
                          }}
                        />
                      </PageTransition>
                    </Layout>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
            </>
          )}

          {/* Formulaire spécifique à la catégorie */}
          <Route 
            path="/category-specific" 
            element={
              <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                <PageTransition direction={navigationDirection}>
                  <CategorySpecificForm 
                    onComplete={(finalVehicleData) => {
                      // Create final vehicle object
                      const vehicle = {
                        id: Date.now(),
                        type: finalVehicleData.vehicleType!,
                        brand: finalVehicleData.brand,
                        model: finalVehicleData.model,
                        dateCirculation: finalVehicleData.dateCirculation,
                        motorisation: finalVehicleData.motorisation,
                        position: finalVehicleData.position,
                        viscosity: finalVehicleData.viscosity,
                      };
                      
                      updateUserSelection({ vehicle });
                      // Navigate to products
                      navigate('/products');
                    }}
                  />
                </PageTransition>
              </Layout>
            } 
          />

          {/* Questions spécifiques */}
          <Route 
            path="/questions" 
            element={
              (() => {
                const hasRequiredState = userSelection?.vehicle && userSelection?.category;
                if (!hasRequiredState) {
                  console.log('Questions route guard failed:', {
                    hasVehicle: !!userSelection?.vehicle,
                    hasCategory: !!userSelection?.category,
                    userSelection
                  });
                }
                return hasRequiredState && userSelection?.vehicle && userSelection?.category ? (
                  <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                    <PageTransition direction={navigationDirection}>
                      <QuestionsScreen 
                        vehicle={userSelection.vehicle}
                        category={userSelection.category}
                        onAnswersComplete={(answers) => {
                          updateUserSelection({ answers });
                        }}
                      />
                    </PageTransition>
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                );
              })()
            } 
          />

          {/* Liste des produits */}
          <Route 
            path="/products" 
            element={
              (() => {
                const hasAnswers = !!userSelection?.answers;
                const hasBatteryCategory = userSelection?.vehicle && userSelection?.category?.slug === 'battery';
                const hasLightsCategory = userSelection?.vehicle && userSelection?.category?.slug === 'lights';
                const hasOilCategory = userSelection?.vehicle && userSelection?.category?.slug === 'oil';
                const hasFiltrationCategory = userSelection?.vehicle && userSelection?.category?.slug === 'filtration';
                const hasWipersCategory = userSelection?.vehicle && userSelection?.category?.slug === 'beg';
                const hasRequiredState = hasAnswers || hasBatteryCategory || hasLightsCategory || hasOilCategory || hasFiltrationCategory || hasWipersCategory;
                
                if (!hasRequiredState) {
                  console.log('Products route guard failed:', {
                    hasAnswers,
                    hasBatteryCategory,
                    hasLightsCategory,
                    hasOilCategory,
                    hasFiltrationCategory,
                    hasWipersCategory,
                    vehicle: userSelection?.vehicle,
                    category: userSelection?.category,
                    userSelection
                  });
                }
                
                return hasRequiredState ? (
                  <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                    <PageTransition direction={navigationDirection}>
                      <ProductsScreen 
                        userSelection={userSelection}
                      />
                    </PageTransition>
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                );
              })()
            } 
          />

          {/* Détails d'un produit */}
          <Route 
            path="/product-details/:productId" 
            element={
              <Layout userSelection={userSelection} updateUserSelection={updateUserSelection}>
                <PageTransition direction={navigationDirection}>
                  <ProductDetailsScreen 
                    userSelection={userSelection}
                  />
                </PageTransition>
              </Layout>
            } 
          />

          {/* Page "Aucun produit disponible" */}
          <Route 
            path="/no-products-available" 
            element={
              <Layout userSelection={userSelection}>
                <PageTransition direction={navigationDirection}>
                  <NoProductsAvailableScreen 
                    vehicle={location.state?.vehicle}
                    category={location.state?.category}
                  />
                </PageTransition>
              </Layout>
            } 
          />

          {/* Route de fallback */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
  );
};

export default AppRouterContent; 