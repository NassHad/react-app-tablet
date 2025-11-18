const fs = require('fs');
const path = require('path');

/**
 * Script to debug PDF content and understand its structure
 */

async function debugPDFContent(pdfPath) {
  try {
    const pdfParse = require('pdf-parse');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    console.log('🔍 PDF Debug Information:');
    console.log(`📄 Total pages: ${data.numpages}`);
    console.log(`📝 Total characters: ${data.text.length}`);
    console.log(`📊 Text density: ${data.text.length / data.numpages} chars/page`);
    
    // Save raw text for analysis
    const rawTextPath = path.join(__dirname, 'ILV-FULMEN-ENDURANCE_raw_text.txt');
    fs.writeFileSync(rawTextPath, data.text, 'utf8');
    console.log(`💾 Raw text saved to: ${rawTextPath}`);
    
    // Show first 1000 characters
    console.log('\n📖 First 1000 characters of PDF text:');
    console.log('=' .repeat(50));
    console.log(data.text.substring(0, 1000));
    console.log('=' .repeat(50));
    
    // Look for patterns
    const lines = data.text.split('\n');
    console.log(`\n📋 Total lines: ${lines.length}`);
    
    // Look for lines that might contain battery data
    const potentialDataLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 20 && 
             trimmed.includes(';') && 
             (trimmed.includes('Diesel') || trimmed.includes('Petrole') || trimmed.includes('Essence'));
    });
    
    console.log(`\n🔍 Found ${potentialDataLines.length} potential data lines:`);
    potentialDataLines.slice(0, 10).forEach((line, index) => {
      console.log(`${index + 1}. ${line}`);
    });
    
    // Look for specific patterns
    const brandPatterns = lines.filter(line => 
      line.includes('ALFA ROMEO') || 
      line.includes('AUDI') || 
      line.includes('BMW') || 
      line.includes('VOLVO')
    );
    
    console.log(`\n🏷️ Found ${brandPatterns.length} lines with brand names:`);
    brandPatterns.slice(0, 5).forEach((line, index) => {
      console.log(`${index + 1}. ${line}`);
    });
    
    return data.text;
    
  } catch (error) {
    console.error('Error debugging PDF:', error);
    return null;
  }
}

// Main function
async function main() {
  const pdfPath = process.argv[2] || 'scripts/ILV FULMEN ENDURANCE.pdf';
  
  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF file not found: ${pdfPath}`);
    return;
  }
  
  console.log(`🔍 Debugging PDF: ${pdfPath}`);
  await debugPDFContent(pdfPath);
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}
