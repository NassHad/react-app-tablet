import { useEffect, useState } from 'react';
import type { Vehicle, ProductCategory } from '../../types';
import filtersService from '../../services/filtersService';
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
  const [variants, setVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [loadingVariants, setLoadingVariants] = useState<boolean>(false);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        setLoadingVariants(true);
        const list = await filtersService.getVariants(vehicle.brand.toUpperCase(), vehicle.model);
        const labels = (list || []).map(v => v.variant);
        setVariants(labels);
        setSelectedVariant(labels[0] || '');
      } catch (e) {
        setVariants([]);
        setSelectedVariant('');
      } finally {
        setLoadingVariants(false);
      }
    };
    fetchVariants();
  }, [vehicle.brand, vehicle.model]);

  console.log('variants', variants);
  const submit = (filterType: string) => {
    onAnswersComplete({ filterType, variant: selectedVariant });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-gray-900 mt-12 mb-10 text-center text-gray-filters-category leading-15"><span className='text-blue-filters-category'>Sélectionnez le type de filtrations,</span><br/> pour voir les produits compatibles avec votre {vehicle.brand} {vehicle.model}</h1>

      <div className="w-full max-w-3xl mb-10 px-4">
        <label className="block text-lg font-semibold mb-2 text-gray-800">Variante du véhicule</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white"
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          disabled={loadingVariants || variants.length === 0}
        >
          {variants.length === 0 ? (
            <option value="">Aucune variante disponible</option>
          ) : (
            variants.map(v => (
              <option key={v} value={v}>{v}</option>
            ))
          )}
        </select>
      </div>

      <div className="flex flex-wrap flex-row justify-center min-w-2xl max-w-[95%] gap-4">
          <img onClick={() => submit('cabin')} src={filterCabin} alt="Filtre habitacle" className="min-w-48 w-[24rem] cursor-pointer" />
          <img onClick={() => submit('air')} src={filterAir} alt="Filtre à air" className="min-w-48 w-[24rem] cursor-pointer" />
          <img onClick={() => submit('gazole')} src={filterGazole} alt="Filtre à carburant" className="min-w-48 w-[24rem] cursor-pointer" />
          <img onClick={() => submit('oil')} src={filterOil} alt="Filtre à huile" className="min-w-48 w-[24rem] cursor-pointer" />
      </div>
    </div>
  );
};

export default FiltrationQuestions; 