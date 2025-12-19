import type { ProductCategory } from '../../types';
import standardBattery from '../../assets/img/standard-battery.png';
import efbBattery from '../../assets/img/efb-battery.png';
import agmBattery from '../../assets/img/agm-battery.png';

interface BatteryHelpPageProps {
  category: ProductCategory;
  onClose: () => void;
}

const BatteryHelpPage = ({ category: _category, onClose }: BatteryHelpPageProps) => {
  const batteryTypes = [
    {
      id: 'standard',
      name: 'Standard',
      color: '#93c452',
      image: standardBattery,
      title: 'Endurance (Marque Fulmen)',
      description: [
        {
          text: 'Puissance de démarrage supérieure.',
          highlighted: true,
          color: '#93c452'
        },
        {
          text: 'Recommandée pour les usages intensifs. Cette batterie offre une puissance de démarrage supérieure et une fiabilité renforcée, idéale pour les véhicules avec de nombreux équipements électriques ou électroniques.',
          highlighted: false,
          color: '#6b7280'
        }
      ]
    },
    {
      id: 'efb',
      name: 'EFB',
      color: '#fe6f28',
      image: efbBattery,
      title: 'EFB (Marque Exide)',
      description: [
        {
          text: 'La batterie EFB est idéale pour les voitures équipées avec Start&Stop Standard.',
          highlighted: true,
          color: '#FE6F28',
          highlightWords: ['EFB', 'Start&Stop Standard']
        },
        {
          text: 'Cette batterie EFB s\'adapte à tous les véhicules, avec ou sans système Start&Stop, qui n\'ont pas d\'exigence particulière en matière de cycle de récupération d\'énergie au freinage et d\'autres dispositifs puissants d\'économie de carburant.',
          highlighted: false,
          color: '#FE6F28',
          highlightWords: ['EFB', 'Start&Stop']
        }
      ]
    },
    {
      id: 'agm',
      name: 'AGM',
      color: '#fd171f',
      image: agmBattery,
      title: 'AGM (Marque Exide)',
      description: [
        {
          text: 'La batterie AGM est idéale pour les voitures équipées de système Start&Stop ou de systèmes de récupération d\'énergie au freinage.',
          highlighted: true,
          color: '#FD171F',
          highlightWords: ['AGM', 'Start&Stop']
        },
        {
          text: 'Cette batterie AGM de nouvelle génération prend également en charge certaines applications « roue libre », ainsi que d\'autres fonctions intelligentes d\'économie de carburant.',
          highlighted: false,
          color: '#FD171F',
          highlightWords: ['AGM', 'roue libre', 'fonctions intelligentes']
        }
      ]
    }
  ];

  const renderHighlightedText = (text: string, highlightWords: string[] = [], color: string) => {
    if (!highlightWords || highlightWords.length === 0) {
      return <span style={{ color }}>{text}</span>;
    }

    let result = text;
    highlightWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, `**${word}**`);
    });

    const parts = result.split(/(\*\*.*?\*\*)/);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const word = part.slice(2, -2);
            // Use the base color for highlighted words (they'll be bold and stand out)
            return (
              <span key={index} style={{ color, fontWeight: 'bold' }}>
                {word}
              </span>
            );
          }
          // Use gray color for non-highlighted text to create contrast
          return <span key={index} style={{ color: '#7E7E7E' }}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 min-h-screen overflow-auto bg-waves-batteries">

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-8">

        {/* Battery Types Grid */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center flex-1 ">
          {batteryTypes.map((type) => (
            <div
              key={type.id}
              className="flex flex-col items-center p-8 flex-1 max-w-lg h-fit font-semibold"
            >
              {/* Battery Icon */}
              <div className="mb-6">
                <img
                  src={type.image}
                  alt={`${type.name} battery`}
                  className="w-60 h-42 drop-shadow-lg"
                />
              </div>

              {/* Battery Title */}
              <h2 
                className="text-3xl font-bold mb-6 mt-4"
                style={{ color: type.color }}
              >
                {type.title}
              </h2>

              {/* Battery Description */}
              <div className="space-y-4 text-center">
                                 {type.description.map((desc, index) => (
                   <p key={index} className="text-lg leading-relaxed">
                     {renderHighlightedText(
                       desc.text,
                       (desc as any).highlightWords || [],
                       desc.color
                     )}
                   </p>
                 ))}
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatteryHelpPage;
