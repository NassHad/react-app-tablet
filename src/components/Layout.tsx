import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { UserSelection } from '../types';
import UserChoicesSummary from './UserChoicesSummary';
import HelpModal from './HelpModal';
import AnimatedLayout from './AnimatedLayout';
import Breadcrumbs from './Breadcrumbs';
import CategoryNavigation from './CategoryNavigation';
import { FLOW_CONFIG } from '../config/flowConfig';
import { getVehicleTypeDisplayName } from '../utils';
import backToHp from '../assets/img/icons/back-to-hp.svg';

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
    navigate('/');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  const showBackButton = location.pathname !== '/' && location.pathname !== '/vehicle-type';
  const showHelpButton = location.pathname === '/vehicle';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border border-[#989898] px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Home and Back */}
          <div className="flex items-center space-x-3 w-1/2">
            {/* Home Logo */}
            <motion.button
              onClick={handleHomeClick}
              className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Accueil"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={backToHp} alt="Back to Home" className="w-15 h-15 border-" />
            </motion.button>

            {/* Back Arrow */}
            {showBackButton && (
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
            )}
          </div>

          {/* Center - Dynamic Content */}
          <div className="flex-1 flex justify-left items-left w-1/2">
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
              <h1 className="text-5xl font-extrabold text-black text-center ml-[-40%]">Bienvenue dans l'expérience.</h1>
            )}
            
            {/* Title for Vehicle Page */}
            {location.pathname === '/vehicle' && (
              <h1 className="text-5xl text-[#1290AD] ml-[-40%]">J'identifie ma <span className="font-bold">{userSelection?.vehicleType ? getVehicleTypeDisplayName(userSelection.vehicleType) : ''}</span></h1>
            )}

            {location.pathname === '/category' && (
              <h1 className="text-5xl text-[#1290AD] ml-[-27%]">Que recherchez-vous ?</h1>
            )}
            
            {/* Category Navigation */}
            {userSelection && (userSelection.category || location.pathname === '/questions' || location.pathname === '/products' || location.pathname.startsWith('/product-details/')) && (
              <CategoryNavigation 
                selectedCategory={userSelection.category} 
                updateUserSelection={updateUserSelection}
                userSelection={userSelection}
              />
            )}
          </div>


          {/* Right side - Help button */}
          {showHelpButton && (
            <motion.button
              onClick={() => setShowHelpModal(true)}
              className="cursor-pointer py-2 px-4 mr-4 text-orange-500 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg flex items-center space-x-1"
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
      </nav>



      {/* Breadcrumbs - Hidden for now */}
      {/* <Breadcrumbs userSelection={userSelection} /> */}

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar - User Choices Summary */}
        {userSelection && (userSelection.vehicleType || userSelection.category || userSelection.vehicle) && (
          <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${showChoices ? 'w-80' : 'w-12'}`}>
            {/* Toggle Button */}
            <div className="p-2 border-b border-gray-200">
              <motion.button
                onClick={() => setShowChoices(!showChoices)}
                className="cursor-pointer w-full p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                title={showChoices ? "Masquer les choix" : "Afficher les choix"}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {showChoices ? (
                  <>
                    <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    <span className="text-sm text-gray-600">Masquer</span>
                  </>
                ) : (
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </motion.button>
            </div>
            
            {/* Choices Summary */}
            {showChoices && (
              <div className="p-4">
                <UserChoicesSummary userSelection={userSelection} />
              </div>
            )}
          </div>
        )}

              {/* Main Content */}
      <main className="flex-1 bg-waves-hp">
        <AnimatedLayout>
          {children}
        </AnimatedLayout>
      </main>
    </div>
    
    {/* Footer */}
    <footer className="bg-white border-t border-gray-200 px-6 py-2 fixed bottom-0 w-full">
      <div className="flex justify-end">
        <span className="text-sm text-gray-400">GTI SODIFAC</span>
      </div>
    </footer>
    
    {/* Help Modal */}
    <HelpModal 
      isOpen={showHelpModal} 
      onClose={() => setShowHelpModal(false)} 
    />
  </div>
);
};

export default Layout; 