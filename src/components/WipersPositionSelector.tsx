import React from 'react';
import { useClickAnimation } from '../hooks/useClickAnimation';
import type { WipersPosition } from '../types/wipers';

interface WipersPositionSelectorProps {
  positions: WipersPosition[];
  onPositionSelect: (position: WipersPosition) => void;
  selectedPosition: WipersPosition | null;
  iconMap: Record<string, string>;
  loading?: boolean;
}

export const WipersPositionSelector: React.FC<WipersPositionSelectorProps> = ({
  positions,
  onPositionSelect,
  selectedPosition,
  iconMap,
  loading = false
}) => {
  // Animation hook for position selection
  const positionAnimation = useClickAnimation({
    onComplete: () => {
      // Animation completed, position selection is handled by parent
    }
  });

  const handlePositionClick = (position: WipersPosition) => {
    positionAnimation.handleClick();
    onPositionSelect(position);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune position disponible
        </h3>
        <p className="text-gray-500">
          Aucune position d'essuie-glace n'est disponible pour ce véhicule.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {positions.map((position) => {
        const isSelected = selectedPosition?.id === position.id;
        const icon = iconMap[position.slug] || iconMap[position.name.toLowerCase().replace(/\s+/g, '-')] || iconMap['default'];
        
        return (
          <div
            key={position.id}
            className={`
              relative bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-200
              ${isSelected 
                ? 'border-blue-500 shadow-lg transform scale-105' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }
              ${positionAnimation.isAnimating ? 'animate-pulse' : ''}
            `}
            onClick={() => handlePositionClick(position)}
          >
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute top-2 right-2 z-10">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            {/* Position Icon */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {icon ? (
                  <img 
                    src={icon} 
                    alt={position.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to default icon if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center ${icon ? 'hidden' : ''}`}>
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              
              {/* Position Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {position.name}
              </h3>
              
              {/* Position Reference */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Réf:</span> {position.ref}
              </p>
              
              {/* Position Category */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {position.category}
              </div>
              
              {/* Description (if available) */}
              {position.description && (
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {position.description}
                </p>
              )}
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-lg bg-blue-500 bg-opacity-0 hover:bg-opacity-5 transition-all duration-200 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};
