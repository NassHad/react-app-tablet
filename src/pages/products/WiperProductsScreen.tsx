import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { UserSelection } from '../../types';
import { useWipersData } from '../../hooks/useWipersData';
import type { WipersProduct } from '../../types/wipers';

interface WiperProductsScreenProps {
  userSelection: UserSelection;
}

const WiperProductsScreen = ({ userSelection }: WiperProductsScreenProps) => {
  const navigate = useNavigate();
  
  // Use the wipers data hook to get the filtered products
  const {
    products,
    loadingProducts,
    error
  } = useWipersData();

  // Get the selected position from userSelection answers
  const selectedPosition = userSelection?.answers?.position;
  const positionName = userSelection?.answers?.positionName;

  const handleProductDetails = (productId: string) => {
    navigate(`/product-details/${productId}`);
  };

  if (loadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Chargement des produits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-category mt-12 mb-8 leading-15">
          Balais d'essuie-glace pour {positionName || 'position sélectionnée'}
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          Compatible avec votre <span className='text-blue-wiper-category capitalize-first-letter'>{userSelection?.vehicle?.brand} {userSelection?.vehicle?.model}</span>
        </p>
        
        {/* Vertical scrollable container */}
        <div className="overflow-y-auto max-h-110 pb-8">
          <div className="">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Aucun produit trouvé pour cette position.</p>
              </div>
            ) : (
              products.map((product: WipersProduct) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-6"
                >
                  {/* Product Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-lg text-gray-600">{product.brand.name} - {product.model.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">{product.ref}</p>
                      <p className="text-sm text-gray-500">{product.wiperBrand}</p>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Description:</span> {product.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Années:</span> {product.constructionYearStart} - {product.constructionYearEnd}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Direction:</span> {product.direction}
                      </p>
                    </div>
                  </div>

                  {/* Selected Position Info */}
                  {product.selectedPosition && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">
                        Position: {product.selectedPosition.position}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Référence:</span> {product.selectedPosition.ref}
                        </p>
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Catégorie:</span> {product.selectedPosition.category}
                        </p>
                      </div>
                      {product.selectedPosition.description && (
                        <p className="text-sm text-blue-800 mt-2">
                          <span className="font-medium">Description:</span> {product.selectedPosition.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleProductDetails(product.id)}
                      className="bg-blue-wiper-category text-white px-6 py-2 rounded-lg hover:opacity-80 transition-colors text-lg font-semibold"
                    >
                      Plus d'infos
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 text-gray-500 text-lg leading-2">
          ↑ Faites glisser pour voir plus de produits ↓
        </div>
      </div>
    </div>
  );
};

export default WiperProductsScreen; 