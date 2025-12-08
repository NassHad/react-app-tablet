import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { UserSelection } from '../types';
import UserChoicesSummary from './UserChoicesSummary';
import HelpModal from './HelpModal';
import AnimatedLayout from './AnimatedLayout';
// import Breadcrumbs from './Breadcrumbs';
import CategoryNavigation from './CategoryNavigation';
// import SyncButton from './SyncButton';
import { DataModeToggle } from './DataModeToggle';
import { MockVehicleSelector } from './MockVehicleSelector';
import { FLOW_CONFIG } from '../config/flowConfig';
import { getVehicleTypeDisplayName } from '../utils';
import { useInactivityReset } from '../hooks/useInactivityReset';
import motoFooter from '../assets/img/layout/moto-footer.png';
import carFooter from '../assets/img/layout/car-footer.png';

interface LayoutProps {
  children: React.ReactNode;
  userSelection: UserSelection | null;
  updateUserSelection?: (updates: Partial<UserSelection>) => void;
}

const Layout = ({ children, userSelection, updateUserSelection }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showChoices, setShowChoices] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleHomeClick = () => {
    // Reset all user selection data when going back to homepage
    if (updateUserSelection) {
      updateUserSelection({
        vehicleType: undefined,
        vehicle: undefined,
        category: undefined,
        answers: undefined
      });
    }
    navigate('/');
  };

  // Set up automatic reset after 2 minutes of inactivity
  // Show timer after 5 seconds of inactivity
  // Only enable when not on homepage to avoid unnecessary resets
  const { remainingTime, showTimer } = useInactivityReset({
    timeout: 120000, // 2 minutes
    showTimerAfter: 5000, // Show timer after 5 seconds of inactivity
    onInactivityTimeout: handleHomeClick,
    enabled: location.pathname !== '/', // Disable on homepage
  });

  // const handleBackClick = () => {
  //   navigate(-1);
  // };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Requête de recherche:', searchQuery);
  };

  // const showBackButton = location.pathname !== '/' && location.pathname !== '/vehicle-type';
  const showHelpButton = location.pathname === '/vehicle';

  // Function to get category-specific background class
  const getCategoryBackground = () => {
    if (!userSelection?.category) {
      return 'bg-waves-hp'; // Default background when no category is selected
    }

    const categorySlug = userSelection.category.slug;
    const backgroundMap: Record<string, string> = {
      'batteries': 'bg-waves-batteries',
      'lights': 'bg-waves-lights', 
      'wipers': 'bg-waves-wipers',
      'oil': 'bg-waves-oil',
      'filters': 'bg-waves-filters',

    };

    return backgroundMap[categorySlug] || 'bg-waves-hp';
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${getCategoryBackground()}`}>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border border-[#989898] px-4 py-3 tablet-nav">
        <div className="flex items-center justify-between">
          {/* Left side - Home and Back */}
          <div className="flex items-center space-x-3">
            {/* Home Logo */}
            <motion.button
              onClick={handleHomeClick}
              className="cursor-pointer py-2 px-4 rounded-lg transition-colors text-[#1290AD] font-bold text-xl border-r-4 border-black pr-8"
              title="Accueil"
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Accueil
            </motion.button>

            {/* Back Arrow */}
            {/* {showBackButton && (
              <motion.button
                onClick={handleBackClick}
                className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Retour"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  className="w-10 h-10 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>
            )} */}
          </div>

          {/* Center - Dynamic Content */}
          <div className="flex-1 flex">
            {/* Search Input */}
            {FLOW_CONFIG.SHOW_SEARCH_INPUT && location.pathname === '/' && (
              <div className="max-w-md mx-4">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher un produit..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
            )}
            
            {/* Title for Home Page */}
            {location.pathname === '/' && !FLOW_CONFIG.SHOW_SEARCH_INPUT && (
              <h1 className="text-6xl font-extrabold text-black text-center tablet-nav-title py-6 w-full">Bienvenue dans l'expérience.</h1>
            )}
            
            {/* Title for Vehicle Page */}
            {location.pathname === '/vehicle' && (
              <h1 className="text-5xl text-[#1290AD] text-center tablet-nav-title py-6 w-full">J'identifie ma <span className="font-bold">{userSelection?.vehicleType ? getVehicleTypeDisplayName(userSelection.vehicleType) : ''}</span></h1>
            )}

            {/* Title for Vehicle Selection Page */}
            {location.pathname === '/vehicle-selection' && (
              <h1 className="text-5xl text-[#1290AD] text-center tablet-nav-title py-6 w-full">J'identifie ma <span className="font-bold">{userSelection?.vehicleType ? getVehicleTypeDisplayName(userSelection.vehicleType) : ''}</span></h1>
            )}

            
            {/* Category Navigation */}
            {userSelection && (userSelection.category || location.pathname === '/questions' || location.pathname === '/products' || location.pathname.startsWith('/product-details/')) && location.pathname !== '/category' && location.pathname !== '/vehicle-selection' && location.pathname !== '/vehicle' && (
              <CategoryNavigation 
                selectedCategory={userSelection.category} 
                updateUserSelection={updateUserSelection}
                userSelection={userSelection}
              />
            )}
          </div>


          {/* Right side - Sync button and Help button */}
          <div className="flex items-center space-x-3">

            {/* Sync Button - Hidden for now */}
            {/* <SyncButton
              className="mr-2"
              onSyncComplete={(result) => {
                if (result.success) {
                  console.log('✅ Sync completed successfully');
                } else {
                  console.error('❌ Sync failed:', result.message);
                }
              }}
            /> */}

            {/* Help button */}
            {showHelpButton && (
              <motion.button
                onClick={() => setShowHelpModal(true)}
                className="cursor-pointer py-2 px-4 text-orange-500 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg flex items-center space-x-1"
                title="Besoin d'aide ?"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Besoin d'aide ?</span>
              </motion.button>
            )}
          </div>
        </div>
      </nav>



      {/* Breadcrumbs - Hidden for now */}
      {/* <Breadcrumbs userSelection={userSelection} /> */}

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Main Content */}
      <main className="flex-1">
        <AnimatedLayout>
          {children}
        </AnimatedLayout> 
      </main>
    </div>
    
    {/* Footer */}
    <footer className="flex flex-row pr-4 align-center gap-4">
      <div className="flex flex-col w-full ">
        <div className='flex flex-row border-b-2 border-[#1590AD] justify-around'>
          {/* Show moto image only if vehicle type is motorcycle */}
          {userSelection?.vehicleType === 'motorcycle' && (
            <img src={motoFooter} alt="Moto-Footer" className='ml-36' />
          )}
          {/* Show car image only if vehicle type is car */}
          {userSelection?.vehicleType === 'car' && (
            <img src={carFooter} alt="car-Footer" />
          )}
          {/* Show both images if no vehicle type is selected */}
          {!userSelection?.vehicleType && (
            <>
              <img src={motoFooter} alt="Moto-Footer" className='ml-36' />
              <img src={carFooter} alt="car-Footer" />
            </>
          )}
        </div>
        <div className='h-2'></div>
      </div>
      <div className='w-fit min-w-fit text-right mt-16'>
        <span className="text-sm text-gray-400">GTI SODIFAC</span>
      </div>
    </footer>
    
    {/* Help Modal */}
    <HelpModal 
      isOpen={showHelpModal} 
      onClose={() => setShowHelpModal(false)} 
    />

    {/* Development Tools */}
    {/* <DataModeToggle /> */}
    {/* <MockVehicleSelector /> */}
  </div>
  );
};

export default Layout; 