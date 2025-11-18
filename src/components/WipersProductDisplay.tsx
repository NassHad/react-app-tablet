import React from 'react';
import type { Vehicle } from '../types';
import type { WipersPosition, WipersData } from '../types/wipers';

interface WipersProductDisplayProps {
  wipersData: WipersData;
  position: WipersPosition | null;
  vehicle: Vehicle;
}

export const WipersProductDisplay: React.FC<WipersProductDisplayProps> = ({
  wipersData,
  position,
  vehicle
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Essuie-glace {position?.name}
            </h3>
            <p className="text-sm text-gray-600">
              {vehicle.brand} {vehicle.model} • {position?.ref}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Compatible
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Informations du produit
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Type d'essuie-glace:</span>
                  <span className="text-sm text-gray-900">{wipersData.wiperType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Position:</span>
                  <span className="text-sm text-gray-900">{wipersData.position}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Catégorie:</span>
                  <span className="text-sm text-gray-900 capitalize">{wipersData.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Direction:</span>
                  <span className="text-sm text-gray-900">{wipersData.direction}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Années de construction:</span>
                  <span className="text-sm text-gray-900">
                    {wipersData.constructionYearStart} - {wipersData.constructionYearEnd}
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Informations du véhicule
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Marque:</span>
                  <span className="text-sm text-gray-900">{wipersData.brand.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Modèle:</span>
                  <span className="text-sm text-gray-900">{wipersData.model.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Image and Actions */}
          <div className="space-y-6">
            {/* Product Image Placeholder */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-sm text-gray-500">Image du produit</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Voir les détails
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Ajouter au panier
              </button>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-900 mb-2">
                ℹ️ Information importante
              </h5>
              <p className="text-sm text-blue-800">
                Cet essuie-glace est compatible avec votre véhicule selon les spécifications Valeo.
                Vérifiez toujours la compatibilité avant l'achat.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Spécifications techniques
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Marque</h5>
              <p className="text-sm text-gray-600">Valeo</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Type</h5>
              <p className="text-sm text-gray-600">{wipersData.wiperType}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Direction</h5>
              <p className="text-sm text-gray-600">{wipersData.direction}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
