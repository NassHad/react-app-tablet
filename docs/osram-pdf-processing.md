# OSRAM PDF Processing Workflow

This document explains how to process the OSRAM light bulb guide PDF and import the data into your Strapi backend.

## Overview

The workflow consists of 4 main steps:
1. **Extract text** from the OSRAM PDF
2. **Process and structure** the extracted data
3. **Create Strapi content types** for bulb data
4. **Import data** into Strapi

## Prerequisites

- Python 3.x with PyPDF2 or pdfplumber
- Node.js with ES modules support
- Strapi backend running on `http://localhost:1338`
- OSRAM PDF file: `GUIDE AMPOULES OSRAM.pdf`

## Step 1: Extract Text from PDF

Run the Python extraction script:

```bash
cd scripts
python extract_osram_pdf.py
```

This will:
- Extract text from `GUIDE AMPOULES OSRAM.pdf`
- Save the extracted text to `OSRAM_EXTRACTED_TEXT.txt`
- Show a preview of the extracted content

### Installation Requirements

If you don't have the required Python packages:

```bash
pip install PyPDF2
# or
pip install pdfplumber
```

## Step 2: Process and Structure Data

Run the JavaScript processing script:

```bash
node process_osram_data.js
```

This will:
- Read the extracted text from `OSRAM_EXTRACTED_TEXT.txt`
- Parse and structure the bulb data
- Create `osram_bulbs_processed.json` (structured data)
- Create `osram_bulbs_processed.csv` (CSV format)
- Show statistics and preview of processed data

### Data Structure

The processed data includes:
- **Brand**: Vehicle brand (AUDI, BMW, etc.)
- **Model**: Vehicle model name
- **Year**: Vehicle year (if available)
- **BulbType**: Bulb type code (H1, H7, W5W, etc.)
- **Position**: Bulb position (Headlight, Fog Light, Signal Light)
- **PartNumber**: OSRAM part number (if available)

## Step 3: Create Strapi Content Types

Before importing data, you need to create the content types in Strapi. Use the provided schema:

```bash
# Copy the schema to your Strapi project
cp osram_strapi_schema.json ../Strapi/api/
```

### Content Types Created:

1. **bulb-brand** - Vehicle brands
2. **bulb-type** - Bulb types (H1, H7, W5W, etc.)
3. **bulb-compatibility** - Vehicle-bulb compatibility data

## Step 4: Import Data to Strapi

Run the import script:

```bash
node import_osram_to_strapi.js
```

This will:
- Read the processed data from `osram_bulbs_processed.json`
- Create brands in Strapi
- Create bulb types in Strapi
- Create compatibility records
- Show progress and statistics

### Import Process:

1. **Create Brands**: Creates unique vehicle brands
2. **Create Bulb Types**: Creates bulb type definitions
3. **Create Compatibilities**: Links vehicles to compatible bulbs
4. **Error Handling**: Skips duplicates and handles errors gracefully

## Expected Results

After successful import, you should have:

- **Brands**: All unique vehicle brands from the PDF
- **Bulb Types**: All unique bulb types (H1, H7, W5W, etc.)
- **Compatibilities**: Vehicle-bulb compatibility relationships

## API Endpoints

Once imported, the data will be available at:

- `GET /api/bulb-brands` - List all vehicle brands
- `GET /api/bulb-types` - List all bulb types
- `GET /api/bulb-compatibilities` - List all compatibilities

## Troubleshooting

### Common Issues:

1. **PDF extraction fails**:
   - Check if PyPDF2 or pdfplumber is installed
   - Verify the PDF file exists and is readable

2. **Processing fails**:
   - Check if the extracted text file exists
   - Verify the text format matches expected patterns

3. **Strapi import fails**:
   - Ensure Strapi is running on `http://localhost:1338`
   - Check if content types are created
   - Verify API endpoints are accessible

### Debug Mode:

Add logging to see detailed processing:

```javascript
// In process_osram_data.js
console.log('Debug: Processing line:', line);
```

## Data Quality

The processing script includes:

- **Deduplication**: Removes duplicate entries
- **Data Cleaning**: Standardizes brand names and bulb types
- **Error Handling**: Skips malformed entries
- **Validation**: Ensures required fields are present

## Customization

### Adding New Bulb Types:

Edit `process_osram_data.js` and add patterns to `BULB_PATTERNS`:

```javascript
const BULB_PATTERNS = {
  // Add new patterns here
  NEW_TYPE: /NEW_TYPE/gi,
};
```

### Adding New Brands:

Edit `process_osram_data.js` and add patterns to `BRAND_PATTERNS`:

```javascript
const BRAND_PATTERNS = [
  // Add new brand patterns here
  /NEW_BRAND/gi,
];
```

## Integration with Vehicle Selection

Once imported, you can integrate the bulb data with your vehicle selection system:

1. **Query by vehicle**: Find compatible bulbs for a specific vehicle
2. **Query by bulb type**: Find vehicles compatible with a specific bulb
3. **Filter by position**: Get bulbs for specific positions (headlight, fog, etc.)

## Next Steps

1. **Test the import** with a small subset of data
2. **Verify data quality** in Strapi admin panel
3. **Integrate with frontend** for bulb selection
4. **Add search functionality** for bulb compatibility
5. **Create bulb recommendation system** based on vehicle selection

## File Structure

```
scripts/
├── extract_osram_pdf.py          # PDF text extraction
├── process_osram_data.js         # Data processing
├── import_osram_to_strapi.js     # Strapi import
├── osram_strapi_schema.json      # Strapi content types
├── OSRAM_EXTRACTED_TEXT.txt      # Extracted text (generated)
├── osram_bulbs_processed.json    # Processed data (generated)
└── osram_bulbs_processed.csv     # CSV data (generated)
```
