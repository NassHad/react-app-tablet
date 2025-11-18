import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWipersData } from '../../hooks/useWipersData';
import { useClickAnimation } from '../../hooks/useClickAnimation';
import { WipersPositionSelectorNew } from '../../components/WipersPositionSelectorNew';
import LoadingSpinner from '../../components/LoadingSpinner';
import HelpModal from '../../components/HelpModal';
import type { Vehicle, ProductCategory } from '../../types';
import type { WipersProduct } from '../../types/wipers';

// Import wipers position icons - using existing icons and fallbacks
import begIcon from '../../assets/img/categories/beg.png';
import carIcon from '../../assets/img/car.png';

interface WipersQuestionsProps {
  vehicle: Vehicle;
  category: ProductCategory;
  onAnswersComplete: (answers: Record<string, string | string[]>) => void;
}

const WipersQuestions = ({ vehicle, category, onAnswersComplete }: WipersQuestionsProps) => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  
  // Use the wipers data hook
  const {
    loadingProducts,
    error,
    fetchProductsBySlugsAndPosition,
    clearError
  } = useWipersData();

  // Get the model slug from vehicle data
  const getModelSlugFromVehicle = (vehicle: Vehicle): string => {
    // Convert model name to slug format
    const modelSlug = vehicle.model.toLowerCase().replace(/\s+/g, '-');
    console.log(`🔍 WipersQuestions Debug:`, { 
      vehicle: `${vehicle.brand} ${vehicle.model}`, 
      modelSlug,
      originalModel: vehicle.model 
    });
    return modelSlug;
  };

  const handlePositionSelect = async (position: string) => {
    console.log('🎯 Wiper position selected:', position);
    setSelectedPosition(position);
    
    try {
      // Get model slug from vehicle data
      const modelSlug = getModelSlugFromVehicle(vehicle);
      const brandSlug = vehicle.brandSlug || vehicle.brand.toLowerCase().replace(/\s+/g, '-');
      console.log('🔍 Current data mode:', localStorage.getItem('dataMode'));
      console.log('🔍 About to fetch products for:', { brandSlug, modelSlug, position });
      
      // Fetch products using the slugs and position API
      await fetchProductsBySlugsAndPosition(brandSlug, modelSlug, position);
      
      // Complete the answers
      const answers = {
        position: position,
        positionName: getPositionDisplayName(position),
        modelSlug: modelSlug,
        brandSlug: brandSlug
      };
      
      onAnswersComplete(answers);
      
      // Navigate to products page
      navigate('/products');
    } catch (error) {
      console.error('Error selecting wiper position:', error);
    }
  };

  const getPositionDisplayName = (position: string): string => {
    switch (position) {
      case 'driver':
        return 'Conducteur';
      case 'passenger':
        return 'Passager';
      case 'back':
        return 'Arrière';
      default:
        return position;
    }
  };

  const handleHelpToggle = () => {
    setShowHelp(!showHelp);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loadingProducts) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={clearError}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-5xl font-semibold text-green-wiper-category mb-8 leading-15 text-center">
          Veuillez indiquer l'emplacement <br/>de l'essuie-glace souhaité
        </h2>
        {/* Position Selector */}
        {/* <WipersPositionSelectorNew
          onPositionSelect={handlePositionSelect}
          selectedPosition={selectedPosition}
          loading={loadingProducts}
        /> */}
        <svg className="w-[50%] h-[100%] mx-auto" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1200" height="800" viewBox="0 0 1200 800">
          <g id="Catégorie_BEG" data-name="Catégorie BEG" clip-path="url(#clip-Catégorie_BEG)">
            <g id="PAGE_FOND" data-name="PAGE FOND">
              <g id="Voiture" transform="translate(300 240)" style={{mixBlendMode: 'multiply', isolation: 'isolate'}}>
                <g id="Groupe_14" data-name="Groupe 14" transform="translate(-231.146 -80.887)">
                  <path id="Tracé_54" data-name="Tracé 54" d="M53.244,44.664c-26.183,16.6-34.15,35.775-44.775,63.8s-10.625,100.5,0,128.529S27.061,284.2,53.244,300.8s49.52,32.639,71.148,32.639H692.983a376.381,376.381,0,0,0,88.658-10.582l21.111-5.118c30.547-6.861,53.5-30.67,59.132-59.942l.007.04c.063-.336.124-.682.185-1.041q.365-2.044.619-4.119c3.295-24.523,5.062-79.947,5.062-79.947s-1.767-55.423-5.062-79.947q-.251-2.075-.619-4.117c-.061-.359-.122-.708-.185-1.043l-.007.042C856.252,58.4,833.3,34.586,802.751,27.723L781.64,22.607a376.379,376.379,0,0,0-88.658-10.582H124.392C102.764,12.025,79.428,28.068,53.244,44.664Z" transform="translate(-0.5 12.511)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_14" data-name="Tracé 14" d="M4.7,66.41l21.978-19.2c-10.625,30.852-11.005,87.074-11.005,87.074" transform="translate(4.432 51.347)" fill="none" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_15" data-name="Tracé 15" d="M125.212,19.032l1.139,6.412s94.771,26.762,159.088,30.667S432.289,58.9,467.581,50.535c29.765-7.055,44.4-13.521,47.648-18.892,1.463-2.414-.741-5.48-3.6-5.663-18.8-1.213-90.5-5.744-131.136-6.949C333.442,17.637,130.241,19.032,125.212,19.032Z" transform="translate(145.817 19.721)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_16" data-name="Tracé 16" d="M288.205,21.191H146.688l1.423,10.036s30.736,8.364,84.428,15.984c20.991,2.98,45.395,3.913,73.464,4.626Z" transform="translate(171.014 21.858)" fill="#93c452" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_17" data-name="Tracé 17" d="M331.456,24c-41.253-1.692-82.8-2.412-108.191-2.714l7.393,30.786,1.78.04c46.857,1.1,81.106-2.2,105.574-6.721Z" transform="translate(260.858 21.97)" fill="#93c452" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_18" data-name="Tracé 18" d="M282.546,42.522c25.872-5.384,39.351-11.967,44.593-15.013a1.038,1.038,0,0,0-.465-1.935c-15.8-1.167-33.066-2.112-50.55-2.876Z" transform="translate(322.874 23.559)" fill="#93c452" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_19" data-name="Tracé 19" d="M15.9,77.658l52.486-50.5a2.369,2.369,0,0,0,.732-1.71V21.115a.892.892,0,0,0-1.265-.8C60.847,23.493,26.718,40.7,13.9,79.4Z" transform="translate(15.218 21.776)" fill="none" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_20" data-name="Tracé 20" d="M8.309,73.891S32.7,38.672,61.825,23.57" transform="translate(8.662 25.544)" fill="none" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_21" data-name="Tracé 21" d="M39.306,33.474s39.56-12.842,98.754-15.064S351.373,13.4,439.094,14.516s194.025.385,251.364,6.412c28.635,3.01,57.661,7.029,57.661,7.029" transform="translate(45.029 15.036)" fill="none" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_22" data-name="Tracé 22" d="M403.029,66.633,415.343,69.3s-7.4-25.649-28.839-43.491c0,0-13.281-3.717-22.389-5.576,0,0,15.558,8.364,25.614,21.559C399.161,54.166,400.752,59.2,403.029,66.633Z" transform="translate(426.109 21.774)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_23" data-name="Tracé 23" d="M14.818,79.385S97.351,30.691,254.731,18.7" transform="translate(16.298 20.049)" fill="none" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_24" data-name="Tracé 24" d="M16.651,79.55S63.893,50.518,180.007,48.027C180.007,48.027,76.985,56.689,16.651,79.55Z" transform="translate(18.449 52.403)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_25" data-name="Tracé 25" d="M345,37.779s33.772.743,84.05,10.593" transform="translate(403.679 41.03)" fill="#fff" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <line id="Ligne_3" data-name="Ligne 3" x2="17.858" y2="2.316" transform="translate(844.057 100.862)" fill="none" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_26" data-name="Tracé 26" d="M266.1,42.986s68.61-6.06,104.279-9.019,37.567-6.3,81.584-.543,61.99,7.26,61.99,7.26" transform="translate(309.615 32.667)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_27" data-name="Tracé 27" d="M302.228,21.915s35.268,1.377,77.389,6.8S462.34,39.889,462.34,39.889" transform="translate(353.501 23.675)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_28" data-name="Tracé 28" d="M5.96,103.678S12.673,90.05,23.211,82.506c0,0,71.441-42.948,243.051-60.791" transform="translate(5.906 23.45)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_29" data-name="Tracé 29" d="M4.7,155.979l21.978,19.2C16.058,144.33,15.678,88.108,15.678,88.108" transform="translate(4.432 96.749)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_30" data-name="Tracé 30" d="M125.212,178.32l1.139-6.412s94.771-26.762,159.088-30.667,146.851-2.787,182.142,5.576c29.765,7.055,44.4,13.523,47.648,18.894,1.463,2.414-.741,5.478-3.6,5.661-18.8,1.214-90.5,5.746-131.136,6.949C333.442,179.715,130.241,178.32,125.212,178.32Z" transform="translate(145.817 153.412)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_31" data-name="Tracé 31" d="M288.205,171.275H146.688l1.423-10.036s30.736-8.364,84.428-15.984c20.991-2.98,45.395-3.913,73.464-4.626Z" transform="translate(171.014 156.16)" fill="#93c452" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_32" data-name="Tracé 32" d="M331.456,168.672c-41.253,1.692-82.8,2.412-108.191,2.714l7.393-30.786,1.78-.04c46.857-1.1,81.106,2.2,105.574,6.721Z" transform="translate(260.858 155.838)" fill="#93c452" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_33" data-name="Tracé 33" d="M282.546,144.207c25.872,5.384,39.351,11.967,44.593,15.013a1.038,1.038,0,0,1-.465,1.935c-15.8,1.169-33.066,2.112-50.55,2.876Z" transform="translate(322.874 160.198)" fill="#93c452" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_34" data-name="Tracé 34" d="M15.9,129.935l52.486,50.5a2.369,2.369,0,0,1,.732,1.71v4.334a.892.892,0,0,1-1.265.8c-7-3.178-41.133-20.384-53.953-59.09Z" transform="translate(15.218 141.115)" fill="none" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_35" data-name="Tracé 35" d="M8.309,129.009S32.7,164.227,61.825,179.33" transform="translate(8.662 142.041)" fill="none" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_36" data-name="Tracé 36" d="M39.306,153s39.56,12.842,98.754,15.064,213.313,5.009,301.034,3.894,194.025-.385,251.364-6.412c28.635-3.01,57.231-6.6,57.231-6.6" transform="translate(45.029 168.971)" fill="none" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_37" data-name="Tracé 37" d="M403.617,135.578l11.726-2.64s-7.4,25.649-28.839,43.491c0,0-13.281,3.717-22.389,5.576,0,0,15.558-8.362,25.614-21.559C399.161,148.07,401.34,143.012,403.617,135.578Z" transform="translate(426.109 146.476)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_38" data-name="Tracé 38" d="M14.818,129.009S97.351,177.7,254.731,189.691" transform="translate(16.298 142.041)" fill="#fff" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_39" data-name="Tracé 39" d="M16.651,113.382S63.893,142.414,180.007,144.9C180.007,144.9,76.985,136.242,16.651,113.382Z" transform="translate(18.449 125.15)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_40" data-name="Tracé 40" d="M513.469,257.373c-76.272-4.418-151.955-5.057-189.853-2.847S175.862,285.27,157.079,289.414s-28.743,1.379-46.388-39.491-16.508-91.958-16.508-91.958S93.046,106.876,110.691,66s27.6-43.631,46.388-39.489S285.722,59.192,323.617,61.4s113.58,1.533,189.853-2.885" transform="translate(109.396 27.278)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_41" data-name="Tracé 41" d="M304.512,144.607c0,25.213-2.656,64.662-17.834,99.346,0,0,80.446,11.069,126.74,7.012,0,0,26.184-35.236,26.184-106.358S413.418,38.249,413.418,38.249c-46.295-4.057-126.74,7.012-126.74,7.012C301.856,79.945,304.512,119.394,304.512,144.607Z" transform="translate(335.256 40.635)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_42" data-name="Tracé 42" d="M429.588,141.648c0,58.838-18.525,92.654-23.754,101.024-37.276,2.708-95.282-3.777-115.472-6.269,12.742-32.864,15.521-69.271,15.521-94.754s-2.777-61.89-15.521-94.754c20.19-2.49,78.2-8.975,115.472-6.269C411.052,48.974,429.588,82.8,429.588,141.648Z" transform="translate(339.578 43.594)" fill="#93c452" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_43" data-name="Tracé 43" d="M345,144.055s33.772-.743,84.05-10.593" transform="translate(403.679 147.622)" fill="#fff" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_44" data-name="Tracé 44" d="M387.687,231.621s9.675-39.2,9.675-94.17-9.675-94.172-9.675-94.172" transform="translate(453.765 47.793)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <line id="Ligne_4" data-name="Ligne 4" y1="2.316" x2="17.858" transform="translate(844.057 267.307)" fill="none" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_45" data-name="Tracé 45" d="M264.49,139.6s70.219,6.168,105.888,9.127,37.567,6.3,81.584.543,61.99-7.257,61.99-7.257" transform="translate(309.615 155.127)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_46" data-name="Tracé 46" d="M302.228,163.833s35.268-1.377,77.389-6.8,82.722-11.179,82.722-11.179" transform="translate(353.501 161.063)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_47" data-name="Tracé 47" d="M148.551,289.022s-48.09-22.887-48.09-131.681,48.09-131.681,48.09-131.681" transform="translate(116.778 27.902)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_48" data-name="Tracé 48" d="M3.827,185.425c6.565,9.471,4.818-9.193,2.825-31.218a332.709,332.709,0,0,1,0-63c1.993-22.026,3.74-40.69-2.825-31.218" transform="translate(3.402 62.537)" fill="none" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_49" data-name="Tracé 49" d="M5.96,116s6.713,13.627,17.251,21.172c0,0,71.441,42.948,243.051,60.791" transform="translate(5.906 127.356)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_50" data-name="Tracé 50" d="M144.507,29.5c-8.254,1.932-17.645,20.513-27.889,46.637s-11.005,57.562-11.005,76.994.758,50.869,11.005,76.994,19.635,44.7,27.889,46.637,103.877-20.972,103.877-20.972-14.8-41.118-14.8-102.659,14.8-102.659,14.8-102.659S152.761,27.569,144.507,29.5Z" transform="translate(122.822 32.109)" fill="#93c452"/>
                  <path id="Tracé_51" data-name="Tracé 51" d="M183.445,248.113s-35.865-101.814,0-209.806" transform="translate(195.438 42.18)" fill="#fff" stroke="#8b8b8b" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_52" data-name="Tracé 52" d="M132.783,45.665h19.353l2.284-9.4a3.058,3.058,0,0,1,2.988-2.314h.871a2.614,2.614,0,0,0,2.454-1.678l11.5-30.722A.781.781,0,0,0,171.488.5h-4.6A16.817,16.817,0,0,0,152,9.367Z" transform="translate(154.7 -0.5)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                  <path id="Tracé_53" data-name="Tracé 53" d="M134.117,154.5H153.47l2.284,9.4a3.058,3.058,0,0,0,2.988,2.314h.871a2.614,2.614,0,0,1,2.454,1.678l11.5,30.722a.781.781,0,0,1-.745,1.047h-4.605a16.816,16.816,0,0,1-14.887-8.867Z" transform="translate(156.265 170.82)" fill="#fff" stroke="#8b8b8b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                </g>
              </g>
              <g id="Passager" transform="translate(300 0)">
                 <a href="#" onClick={(e) => { e.preventDefault(); handlePositionSelect('passenger'); }}><text id="_Passager" data-name=" Passager" transform="translate(101 42)" fill="#547d92" font-size="40" font-family="Poppins-Bold, Poppins" font-weight="700"><tspan x="-100.66" y="0" xmlSpace="preserve"> Passager</tspan></text></a>
                <g id="Groupe_17" data-name="Groupe 17" transform="translate(131.547 37.848) rotate(108)">
                  <path id="Tracé_55" data-name="Tracé 55" d="M0,37.246V0L34.483,18.623Z" transform="translate(200.532 0)" fill="#547d92" stroke="#547d92" stroke-width="2"/>
                  <path id="Tracé_56" data-name="Tracé 56" d="M181.575,0H3.058C1.369,0,0,.8,0,1.778S1.369,3.556,3.058,3.556H181.575c1.689,0,3.058-.8,3.058-1.778S183.263,0,181.575,0" transform="translate(21.041 16.845)" fill="#547d92" stroke="#547d92" stroke-width="2"/>
                </g>
              </g>
              <g id="Conducteur" transform="translate(150 420)">
                 <a href="#" onClick={(e) => { e.preventDefault(); handlePositionSelect('driver'); }}><text id="Conducteur-2" data-name="Conducteur" transform="translate(123 257.011)" fill="#547d92" font-size="40" font-family="Poppins-Bold, Poppins" font-weight="700"><tspan x="-123.1" y="0">Conducteur</tspan></text></a>
                <g id="Groupe_18" data-name="Groupe 18" transform="matrix(0.309, -0.951, 0.951, 0.309, 104, 203.501)">
                  <path id="Tracé_55-2" data-name="Tracé 55" d="M0,37.246V0L34.483,18.623Z" transform="translate(179.491 0)" fill="#547d92" stroke="#547d92" stroke-width="1"/>
                  <path id="Tracé_56-2" data-name="Tracé 56" d="M181.575,0H3.058C1.369,0,0,.8,0,1.778S1.369,3.555,3.058,3.555H181.575c1.689,0,3.058-.8,3.058-1.778S183.263,0,181.575,0" transform="translate(0 16.845)" fill="#547d92" stroke="#547d92" stroke-width="2"/>
                </g>
              </g>
              <g id="Arrière" transform="translate(820 310)">
                 <a href="#" onClick={(e) => { e.preventDefault(); handlePositionSelect('back'); }}><text id="Arrière-2" data-name="Arrière" transform="translate(314.259 42)" fill="#547d92" font-size="40" font-family="Poppins-Bold, Poppins" font-weight="700"><tspan x="-70.96" y="0">Arrière</tspan></text></a>
                <g id="Groupe_19" data-name="Groupe 19" transform="translate(213.974 46.246) rotate(-180)">
                  <path id="Tracé_55-3" data-name="Tracé 55" d="M0,37.246V0L34.483,18.623Z" transform="translate(179.491 0)" fill="#547d92"/>
                  <path id="Tracé_56-3" data-name="Tracé 56" d="M181.575,0H3.058C1.369,0,0,.8,0,1.778S1.369,3.555,3.058,3.555H181.575c1.689,0,3.058-.8,3.058-1.778S183.263,0,181.575,0" transform="translate(0 16.845)" fill="#547d92" stroke="#547d92" stroke-width="2"/>
                </g>
              </g>
            </g>
          </g>
        </svg>

      </div>
      {/* Help Modal */}
      {showHelp && (
        <HelpModal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
};

export default WipersQuestions;