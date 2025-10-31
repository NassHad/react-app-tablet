import type { Vehicle, ProductCategory } from '../../types';
import filterCabin from '../../assets/img/categories/filters/cabin-filter.svg';
import filterAir from '../../assets/img/categories/filters/air-filter.svg';
import filterGazole from '../../assets/img/categories/filters/gazole-filter.svg';
import filterOil from '../../assets/img/categories/filters/oil-filter.svg';

interface FiltrationQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const FiltrationQuestions = ({ vehicle, onAnswersComplete }: FiltrationQuestionsProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-20 text-center text-gray-filters-category leading-15"><span className='text-blue-filters-category'>Sélectionnez le type de filtrations,</span><br/> pour voir les produits compatibles avec votre {vehicle.brand} {vehicle.model}</h1>
      <div className="flex flex-row flex-wrap justify-center min-w-2xl max-w-[95%]">
          <img onClick={() => onAnswersComplete({ filterType: 'cabin' })} src={filterCabin} alt="Filtre habitacle" className="min-w-48 w-1/4 cursor-pointer" />
          <img onClick={() => onAnswersComplete({ filterType: 'air' })} src={filterAir} alt="Filtre à air" className="min-w-48 w-1/4 cursor-pointer" />
          <img onClick={() => onAnswersComplete({ filterType: 'gazole' })} src={filterGazole} alt="Filtre à carburant" className="min-w-48 w-1/4 cursor-pointer" />
          <img onClick={() => onAnswersComplete({ filterType: 'oil' })} src={filterOil} alt="Filtre à huile" className="min-w-48 w-1/4 cursor-pointer" />
      </div>
    </div>
  );
};

export default FiltrationQuestions; 