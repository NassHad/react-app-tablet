import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_BASE_URL = 'http://localhost:1338';
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'assets', 'img', 'products');

console.log('🖼️ Downloading images from Strapi...\n');

// Create images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log('📁 Created images directory:', IMAGES_DIR);
}

async function downloadImage(url, filename) {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.buffer();
    const filePath = path.join(IMAGES_DIR, filename);
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ Downloaded: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to download ${filename}:`, error.message);
    return false;
  }
}

async function downloadAllImages() {
  try {
    // Download battery images
    console.log('🔋 Downloading battery images...');
    const batteryImages = [
      { url: '/uploads/908000_FULMEN_F1_ENDURANCE_BD_8198337b62.jpg', filename: 'battery_908000_FULMEN_F1_ENDURANCE_BD_8198337b62.jpg' },
      { url: '/uploads/908010_FULMEN_F3_ENDURANCE_9b43e9f2f8.jpg', filename: 'battery_908010_FULMEN_F3_ENDURANCE_9b43e9f2f8.jpg' },
      { url: '/uploads/LOGO_FULMEN_2813d901ed.jpeg', filename: 'logo_FULMEN_2813d901ed.jpeg' },
      { url: '/uploads/LOGO_OSRAM_123353271e.png', filename: 'logo_OSRAM_123353271e.png' }
    ];

    for (const image of batteryImages) {
      await downloadImage(image.url, image.filename);
    }

    // Download light images
    console.log('\n💡 Downloading light images...');
    const lightImages = [
      { url: '/uploads/904600_OSRAM_ORIGINAL_P21_W_4062172396325_1_d26195cca1.jpg', filename: 'light_904600_OSRAM_ORIGINAL_P21_W_4062172396325_1_d26195cca1.jpg' },
      { url: '/uploads/904610_OSRAM_ORIGINAL_PY_21_W_4062172396349_1_985871e939.jpg', filename: 'light_904610_OSRAM_ORIGINAL_PY_21_W_4062172396349_1_985871e939.jpg' },
      { url: '/uploads/904620_OSRAM_ORIGINAL_P21_5_W_4062172396448_1_b8e722b97c.jpg', filename: 'light_904620_OSRAM_ORIGINAL_P21_5_W_4062172396448_1_b8e722b97c.jpg' }
    ];

    for (const image of lightImages) {
      await downloadImage(image.url, image.filename);
    }

    console.log('\n🎉 Image download completed!');
    console.log(`📁 Images saved to: ${IMAGES_DIR}`);

  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
}

downloadAllImages();
