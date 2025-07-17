import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import type { UserSelection } from '../types';
import UserChoicesSummary from './UserChoicesSummary';

interface LayoutProps {
  children: React.ReactNode;
  userSelection: UserSelection | null;
}

const Layout = ({ children, userSelection }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showChoices, setShowChoices] = useState(true);

  const handleHomeClick = () => {
    navigate('/vehicle-type');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  const showBackButton = location.pathname !== '/vehicle-type';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Home and Back */}
          <div className="flex items-center space-x-3">
            {/* Home Logo */}
            <button
              onClick={handleHomeClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Accueil"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>

            {/* Back Arrow */}
            {showBackButton && (
              <button
                onClick={handleBackClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Retour"
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
              </button>
            )}
          </div>

          {/* Center - Search Input */}
          <div className="flex-1 max-w-md mx-4">
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

          {/* Right side - Empty for balance */}
          <div className="w-12"></div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar - User Choices Summary */}
        {userSelection && (userSelection.vehicleType || userSelection.category || userSelection.vehicle) && (
          <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${showChoices ? 'w-80' : 'w-12'}`}>
            {/* Toggle Button */}
            <div className="p-2 border-b border-gray-200">
              <button
                onClick={() => setShowChoices(!showChoices)}
                className="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                title={showChoices ? "Masquer les choix" : "Afficher les choix"}
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
              </button>
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
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 