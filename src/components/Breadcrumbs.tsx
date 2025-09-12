import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { UserSelection } from '../types';
import { FLOW_CONFIG } from '../config/flowConfig';

interface BreadcrumbsProps {
  userSelection: UserSelection | null;
}

const Breadcrumbs = ({ userSelection: _userSelection }: BreadcrumbsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the breadcrumb structure based on the current path and flow configuration
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { name: 'Accueil', path: '/vehicle-type', active: false }
    ];

    if (FLOW_CONFIG.SELECT_VEHICLE_FIRST) {
      // New flow: Vehicle Type → Vehicle → Category → Questions/Products
      switch (location.pathname) {
        case '/vehicle-type':
          breadcrumbs[0].active = true;
          break;
        
        case '/vehicle':
          breadcrumbs.push({ name: 'Véhicule', path: '/vehicle', active: true });
          break;
        
        case '/category':
          breadcrumbs.push(
            { name: 'Véhicule', path: '/vehicle', active: false },
            { name: 'Catégorie', path: '/category', active: true }
          );
          break;
        
        case '/questions':
          breadcrumbs.push(
            { name: 'Véhicule', path: '/vehicle', active: false },
            { name: 'Catégorie', path: '/category', active: false },
            { name: 'Questions', path: '/questions', active: true }
          );
          break;
        
        case '/products':
          breadcrumbs.push(
            { name: 'Véhicule', path: '/vehicle', active: false },
            { name: 'Catégorie', path: '/category', active: false },
            { name: 'Produits', path: '/products', active: true }
          );
          break;
        
        case '/no-products-available':
          breadcrumbs.push(
            { name: 'Véhicule', path: '/vehicle', active: false },
            { name: 'Catégorie', path: '/category', active: false },
            { name: 'Aucun produit', path: '/no-products-available', active: true }
          );
          break;
        
        default:
          if (location.pathname.startsWith('/product-details/')) {
            breadcrumbs.push(
              { name: 'Véhicule', path: '/vehicle', active: false },
              { name: 'Catégorie', path: '/category', active: false },
              { name: 'Questions', path: '/questions', active: false },
              { name: 'Produits', path: '/products', active: false },
              { name: 'Détails', path: location.pathname, active: true }
            );
          }
          break;
      }
    } else {
      // Original flow: Vehicle Type → Category → Vehicle → Questions/Products
      switch (location.pathname) {
        case '/vehicle-type':
          breadcrumbs[0].active = true;
          break;
        
        case '/category':
          breadcrumbs.push({ name: 'Catégorie', path: '/category', active: true });
          break;
        
        case '/vehicle':
          breadcrumbs.push(
            { name: 'Catégorie', path: '/category', active: false },
            { name: 'Véhicule', path: '/vehicle', active: true }
          );
          break;
        
        case '/questions':
          breadcrumbs.push(
            { name: 'Catégorie', path: '/category', active: false },
            { name: 'Véhicule', path: '/vehicle', active: false },
            { name: 'Questions', path: '/questions', active: true }
          );
          break;
        
        case '/products':
          breadcrumbs.push(
            { name: 'Catégorie', path: '/category', active: false },
            { name: 'Véhicule', path: '/vehicle', active: false },
            { name: 'Produits', path: '/products', active: true }
          );
          break;
        
        case '/no-products-available':
          breadcrumbs.push(
            { name: 'Catégorie', path: '/category', active: false },
            { name: 'Véhicule', path: '/vehicle', active: false },
            { name: 'Aucun produit', path: '/no-products-available', active: true }
          );
          break;
        
        default:
          if (location.pathname.startsWith('/product-details/')) {
            breadcrumbs.push(
              { name: 'Catégorie', path: '/category', active: false },
              { name: 'Véhicule', path: '/vehicle', active: false },
              { name: 'Questions', path: '/questions', active: false },
              { name: 'Produits', path: '/products', active: false },
              { name: 'Détails', path: location.pathname, active: true }
            );
          }
          break;
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleBreadcrumbClick = (path: string) => {
    // Don't navigate if it's the current active breadcrumb
    if (path === location.pathname) return;
    
    // For product details, go back to products list
    if (location.pathname.startsWith('/product-details/') && path === '/products') {
      navigate('/products');
      return;
    }
    
    navigate(path);
  };

  // Don't show breadcrumbs on the home page
  if (location.pathname === '/vehicle-type') {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.path} className="flex items-center">
            {/* Breadcrumb Link */}
            <motion.button
              onClick={() => handleBreadcrumbClick(breadcrumb.path)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                breadcrumb.active
                  ? 'bg-blue-100 text-blue-700 cursor-default'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
              }`}
              disabled={breadcrumb.active}
              whileTap={breadcrumb.active ? {} : { scale: 0.95 }}
              whileHover={breadcrumb.active ? {} : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-lg">{breadcrumb.name}</span>
            </motion.button>
            
            {/* Separator */}
            {index < breadcrumbs.length - 1 && (
              <div className="mx-2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs; 