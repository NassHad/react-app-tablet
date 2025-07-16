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
    navigate('/brand');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Catégories</h1>
        <div className="space-x-4 flex flex-row">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className="block w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen; 