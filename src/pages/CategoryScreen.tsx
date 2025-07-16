import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { VehicleType, ProductCategory } from '../types';
import { databaseService } from '../db/database';

interface CategoryScreenProps {
  vehicleType: VehicleType;
  onCategorySelect: (category: ProductCategory) => void;
}

const CategoryScreen = ({ onCategorySelect }: CategoryScreenProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log("CategoryScreen - Loading categories");
        const categoriesData = await databaseService.getProductCategories();
        console.log("Categories loaded:", categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategorySelect = (category: ProductCategory) => {
    console.log('Category selected:', category);
    onCategorySelect(category);
    navigate('/vehicle');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-20">Catégories</h1>
        <div className="flex flex-row space-x-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className="block w-64 h-48 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-6xl mb-4">
                {category.icon === 'wiper' && '🌧️'}
                {category.icon === 'battery' && '🔋'}
                {category.icon === 'oil' && '🛢️'}
                {category.icon === 'bulb' && '💡'}
                {!category.icon && '📦'}
              </div>
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen; 