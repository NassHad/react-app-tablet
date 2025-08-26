import type { Vehicle, ProductCategory } from '../../types';

interface BulbsQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const BulbsQuestions = ({ vehicle, onAnswersComplete }: BulbsQuestionsProps) => {
  const lightingTypes = [
    { id: 'feu_croisement', name: 'Feu de croisement', icon: '💡' },
    { id: 'feu_route', name: 'Feu de route', icon: '💡' },
    { id: 'eclairage_jour', name: 'Éclairage de jour', icon: '☀️' },
    { id: 'feu_position', name: 'Feu de position', icon: '⭐' },
    { id: 'feux_antibrouillard', name: 'Feux antibrouillard', icon: '🌫️' },
    { id: 'clignotant_avant', name: 'Clignotant avant voiture', icon: '⬅️' },
    { id: 'clignotant_arriere', name: 'Clignotant arrière voiture', icon: '➡️' },
    { id: 'feux_arrieres', name: 'Feux arrières', icon: '🔴' },
    { id: 'feux_stop', name: 'Feux de stop', icon: '🛑' },
    { id: 'feux_plaque', name: 'Feux Plaque d\'immatriculation', icon: '📋' },
    { id: 'eclairage_interieur', name: 'Éclairage intérieur', icon: '💡' },
    { id: 'eclairage_coffre', name: 'Éclairage de coffre', icon: '📦' }
  ];

  const handleLightingTypeSelect = (lightingType: string) => {
    onAnswersComplete({ lightingType });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left/Center Area */}
      <div className="flex-1 flex flex-col p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Liste des ampoules compatibles
          </h1>
          <p className="text-2xl text-gray-600">
            pour votre {vehicle.brand} {vehicle.model}
          </p>
        </div>

        {/* Car Illustration */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-96 h-64">
            {/* Car outline */}
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
            >
              {/* Car body */}
              <rect x="50" y="80" width="300" height="80" rx="40" fill="none" stroke="#6B7280" strokeWidth="2"/>
              
              {/* Car roof */}
              <rect x="100" y="40" width="200" height="40" rx="20" fill="none" stroke="#6B7280" strokeWidth="2"/>
              
              {/* Windows */}
              <rect x="110" y="45" width="180" height="30" rx="15" fill="#E5E7EB" stroke="#6B7280" strokeWidth="1"/>
              
              {/* Wheels */}
              <circle cx="120" cy="160" r="20" fill="none" stroke="#6B7280" strokeWidth="3"/>
              <circle cx="280" cy="160" r="20" fill="none" stroke="#6B7280" strokeWidth="3"/>
              
              {/* Front lights - Yellow waves */}
              <g>
                {/* Headlights */}
                <circle cx="80" cy="90" r="8" fill="#FCD34D" opacity="0.8"/>
                <circle cx="320" cy="90" r="8" fill="#FCD34D" opacity="0.8"/>
                
                {/* Fog lights */}
                <circle cx="70" cy="110" r="5" fill="#FCD34D" opacity="0.8"/>
                <circle cx="330" cy="110" r="5" fill="#FCD34D" opacity="0.8"/>
                
                {/* Yellow waves from front lights */}
                <path d="M 70 90 Q 60 80 50 70" stroke="#FCD34D" strokeWidth="3" fill="none" opacity="0.6"/>
                <path d="M 330 90 Q 340 80 350 70" stroke="#FCD34D" strokeWidth="3" fill="none" opacity="0.6"/>
                <path d="M 65 110 Q 55 100 45 90" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 335 110 Q 345 100 355 90" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0.6"/>
              </g>
              
              {/* Turn signals - Orange waves */}
              <g>
                {/* Front turn signals */}
                <circle cx="60" cy="85" r="4" fill="#F97316" opacity="0.8"/>
                <circle cx="340" cy="85" r="4" fill="#F97316" opacity="0.8"/>
                
                {/* Side turn signals */}
                <circle cx="120" cy="70" r="3" fill="#F97316" opacity="0.8"/>
                <circle cx="280" cy="70" r="3" fill="#F97316" opacity="0.8"/>
                
                {/* Orange waves */}
                <path d="M 55 85 Q 45 75 35 65" stroke="#F97316" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 345 85 Q 355 75 365 65" stroke="#F97316" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 115 70 Q 105 60 95 50" stroke="#F97316" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 285 70 Q 295 60 305 50" stroke="#F97316" strokeWidth="2" fill="none" opacity="0.6"/>
              </g>
              
              {/* Rear lights - Red waves */}
              <g>
                {/* Taillights */}
                <circle cx="80" cy="130" r="8" fill="#EF4444" opacity="0.8"/>
                <circle cx="320" cy="130" r="8" fill="#EF4444" opacity="0.8"/>
                
                {/* Center brake light */}
                <circle cx="200" cy="120" r="6" fill="#EF4444" opacity="0.8"/>
                
                {/* Red waves */}
                <path d="M 70 130 Q 60 140 50 150" stroke="#EF4444" strokeWidth="3" fill="none" opacity="0.6"/>
                <path d="M 330 130 Q 340 140 350 150" stroke="#EF4444" strokeWidth="3" fill="none" opacity="0.6"/>
                <path d="M 195 120 Q 185 130 175 140" stroke="#EF4444" strokeWidth="2" fill="none" opacity="0.6"/>
              </g>
            </svg>
          </div>
        </div>

        {/* Help Section */}
        <div className="absolute bottom-8 left-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-gray-700 font-medium mb-2">Besoin d'aide?</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Cliquez ici
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-white shadow-lg">
        {/* Header */}
        <div className="bg-blue-900 text-white p-4 rounded-t-lg flex items-center justify-between">
          <span className="font-medium">Choisissez le type d'ampoule</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Lighting Types List */}
        <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
          {lightingTypes.map((type, index) => (
            <button
              key={type.id}
              onClick={() => handleLightingTypeSelect(type.id)}
              className="w-full p-4 border-b border-orange-200 hover:bg-gray-50 transition-colors flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{type.icon}</span>
                <span className="text-blue-900 font-medium">{type.name}</span>
              </div>
              <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulbsQuestions; 