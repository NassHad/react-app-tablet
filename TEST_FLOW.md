# Flow Test Instructions

## Test the New Flow (Vehicle First)

### Step 1: Vehicle Type Selection
1. Start the application
2. Select "Voiture" (car)
3. Should navigate to vehicle selection

### Step 2: Vehicle Selection
1. Select a brand (e.g., "Renault")
2. Select a model (e.g., "Clio")
3. Select a motorisation (e.g., "1.0 TCE")
4. Enter a date (e.g., "2020-01-01")
5. Click "Continuer"
6. Should navigate to category selection

### Step 3: Category Selection
1. Select a category (e.g., "Balais d'essuie-glace")
2. Should check availability and navigate accordingly:
   - If available: Go to questions or products
   - If not available: Show "no products available" page

## Test Scenarios

### Scenario 1: Normal Flow
- Vehicle: Car (Renault Clio 1.0 TCE 2020)
- Category: Balais d'essuie-glace
- Expected: Go to questions

### Scenario 2: No Products Available
- Vehicle: Motorcycle (any)
- Category: Batteries
- Expected: Show "no products available" page

### Scenario 3: Direct to Products
- Vehicle: Car (any)
- Category: Batteries
- Expected: Go directly to products

## Debug Information

If you see the error "category is undefined", it means:
1. The category is not being set in userSelection state
2. The navigation is happening before the category is selected
3. Check the console for more details

## Expected Console Output

When working correctly, you should see:
- Navigation logs showing the flow direction
- No "category is undefined" errors
- Proper state updates in userSelection