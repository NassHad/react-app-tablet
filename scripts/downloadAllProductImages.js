import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import Database from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_BASE_URL = 'http://localhost:1338';
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'assets', 'img', 'products');
const DB_PATH = path.join(__dirname, '..', 'public', 'assets', 'databases', 'react-app-db.db');

console.log('🖼️ Downloading all product images from Strapi...\n');

// Create images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log('📁 Created images directory:', IMAGES_DIR);
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${STRAPI_BASE_URL}${url}`;
    const protocol = fullUrl.startsWith('https:') ? https : http;
    
    console.log(`📥 Downloading: ${filename} from ${fullUrl}`);
    
    protocol.get(fullUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP error! status: ${response.statusCode}`));
        return;
      }
      
      const filePath = path.join(IMAGES_DIR, filename);
      const fileStream = fs.createWriteStream(filePath);
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${filename} (${response.headers['content-length']} bytes)`);
        resolve(true);
      });
      
      fileStream.on('error', (err) => {
        console.error(`❌ File write error for ${filename}:`, err.message);
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      console.error(`❌ Network error for ${filename}:`, err.message);
      reject(err);
    });
  });
}

function extractFilenameFromUrl(url) {
  // Extract filename from URL like /uploads/904600_OSRAM_ORIGINAL_P21_W_4062172396325_1_d26195cca1.jpg
  const parts = url.split('/');
  return parts[parts.length - 1];
}

async function downloadAllImages() {
  try {
    const downloadedImages = new Set();
    let totalImages = 0;
    let downloadedCount = 0;
    let failedCount = 0;

    const database = new Database.Database(DB_PATH);

    // Download battery images
    console.log('🔋 Downloading battery images...');
    
    database.all('SELECT img, brandImg FROM battery_data', async (err, batteryData) => {
      if (err) {
        console.error('❌ Error querying battery_data:', err.message);
        return;
      }

      for (const data of batteryData) {
        if (data.img) {
          try {
            const imgData = JSON.parse(data.img);
            if (imgData.url && !downloadedImages.has(imgData.url)) {
              downloadedImages.add(imgData.url);
              totalImages++;
              const filename = `battery_${extractFilenameFromUrl(imgData.url)}`;
              try {
                await downloadImage(imgData.url, filename);
                downloadedCount++;
              } catch (error) {
                console.error(`❌ Failed to download ${filename}:`, error.message);
                failedCount++;
              }
            }
          } catch (error) {
            console.warn('⚠️ Error parsing battery img:', error.message);
          }
        }

        if (data.brandImg) {
          try {
            const brandImgData = JSON.parse(data.brandImg);
            if (brandImgData.url && !downloadedImages.has(brandImgData.url)) {
              downloadedImages.add(brandImgData.url);
              totalImages++;
              const filename = `brand_${extractFilenameFromUrl(brandImgData.url)}`;
              try {
                await downloadImage(brandImgData.url, filename);
                downloadedCount++;
              } catch (error) {
                console.error(`❌ Failed to download ${filename}:`, error.message);
                failedCount++;
              }
            }
          } catch (error) {
            console.warn('⚠️ Error parsing battery brandImg:', error.message);
          }
        }
      }

      // Download light images
      console.log('\n💡 Downloading light images...');
      
      database.all('SELECT img, brandImg FROM light_data', async (err, lightData) => {
        if (err) {
          console.error('❌ Error querying light_data:', err.message);
          return;
        }

        for (const data of lightData) {
          if (data.img) {
            try {
              const imgData = JSON.parse(data.img);
              if (imgData.url && !downloadedImages.has(imgData.url)) {
                downloadedImages.add(imgData.url);
                totalImages++;
                const filename = `light_${extractFilenameFromUrl(imgData.url)}`;
                try {
                  await downloadImage(imgData.url, filename);
                  downloadedCount++;
                } catch (error) {
                  console.error(`❌ Failed to download ${filename}:`, error.message);
                  failedCount++;
                }
              }
            } catch (error) {
              console.warn('⚠️ Error parsing light img:', error.message);
            }
          }

          if (data.brandImg) {
            try {
              const brandImgData = JSON.parse(data.brandImg);
              if (brandImgData.url && !downloadedImages.has(brandImgData.url)) {
                downloadedImages.add(brandImgData.url);
                totalImages++;
                const filename = `brand_${extractFilenameFromUrl(brandImgData.url)}`;
                try {
                  await downloadImage(brandImgData.url, filename);
                  downloadedCount++;
                } catch (error) {
                  console.error(`❌ Failed to download ${filename}:`, error.message);
                  failedCount++;
                }
              }
            } catch (error) {
              console.warn('⚠️ Error parsing light brandImg:', error.message);
            }
          }
        }

        console.log(`\n🎉 Image download completed!`);
        console.log(`📊 Downloaded ${downloadedCount}/${totalImages} images`);
        console.log(`❌ Failed: ${failedCount} images`);
        console.log(`📁 Images saved to: ${IMAGES_DIR}`);
        
        database.close();
      });
    });

  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
}

downloadAllImages();
