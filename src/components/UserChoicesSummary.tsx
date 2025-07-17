import type { UserSelection } from '../types';

interface UserChoicesSummaryProps {
  userSelection: UserSelection | null;
}

const UserChoicesSummary = ({ userSelection }: UserChoicesSummaryProps) => {
  if (!userSelection) return null;

  const formatVehicleType = (type: string) => {
    switch (type) {
      case 'car': return 'Voiture';
      case 'truck': return 'Camion';
      case 'motorcycle': return 'Moto';
      default: return type;
    }
  };

  const formatCategoryName = (category: any) => {
    if (!category) return '';
    return category.name || category;
  };

  const formatAnswers = (answers: Record<string, string | string[]> | undefined) => {
    if (!answers || Object.keys(answers).length === 0) return null;
    
    const answerMappings: Record<string, string> = {
      position: 'Position',
      oilType: 'Type d\'huile',
      viscosity: 'Viscosité',
      batteryType: 'Type de batterie',
      capacity: 'Capacité',
      bulbType: 'Type d\'ampoule',
      voltage: 'Tension'
    };

    const valueMappings: Record<string, string> = {
      avant: 'Avant',
      arriere: 'Arrière',
      moteur: 'Huile moteur',
      transmission: 'Huile transmission',
      direction: 'Huile direction',
      plomb: 'Plomb',
      gel: 'Gel',
      agm: 'AGM',
      '5w30': '5W-30',
      '5w40': '5W-40',
      '10w40': '10W-40'
    };
    
    return Object.entries(answers).map(([key, value]) => {
      const formattedKey = answerMappings[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      let formattedValue = Array.isArray(value) ? value.join(', ') : value;
      formattedValue = valueMappings[formattedValue] || formattedValue;
      return { key: formattedKey, value: formattedValue };
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-800 flex items-center">
        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Vos choix
      </h3>
      
      <div className="space-y-2">
        {/* Vehicle Type */}
        {userSelection.vehicleType && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-gray-500 text-xs mb-1">Type de véhicule</div>
            <div className="font-medium text-gray-900 text-sm">{formatVehicleType(userSelection.vehicleType)}</div>
          </div>
        )}

        {/* Category */}
        {userSelection.category && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-gray-500 text-xs mb-1">Catégorie</div>
            <div className="font-medium text-gray-900 text-sm">{formatCategoryName(userSelection.category)}</div>
          </div>
        )}

        {/* Brand */}
        {userSelection.vehicle?.brand && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-gray-500 text-xs mb-1">Marque</div>
            <div className="font-medium text-gray-900 text-sm">{userSelection.vehicle.brand}</div>
          </div>
        )}

        {/* Model */}
        {userSelection.vehicle?.model && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-gray-500 text-xs mb-1">Modèle</div>
            <div className="font-medium text-gray-900 text-sm">{userSelection.vehicle.model}</div>
          </div>
        )}

        {/* Version */}
        {userSelection.vehicle?.version && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-gray-500 text-xs mb-1">Version</div>
            <div className="font-medium text-gray-900 text-sm">{userSelection.vehicle.version}</div>
          </div>
        )}

        {/* Year */}
        {userSelection.vehicle?.year && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-gray-500 text-xs mb-1">Année</div>
            <div className="font-medium text-gray-900 text-sm">{userSelection.vehicle.year}</div>
          </div>
        )}
      </div>

      {/* Answers to Questions */}
      {userSelection.answers && Object.keys(userSelection.answers).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-600">Réponses aux questions:</h4>
          {formatAnswers(userSelection.answers)?.map((answer, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-2">
              <div className="text-gray-500 text-xs mb-1">{answer.key}</div>
              <div className="font-medium text-gray-900 text-sm">{answer.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserChoicesSummary; 