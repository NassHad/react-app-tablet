# Breadcrumbs Flow Comparison

## New Flow (Vehicle First) - Current

### Flow Order:
1. **Accueil** → **Véhicule** → **Catégorie** → **Questions/Produits**

### Breadcrumb Examples:

#### Vehicle Selection Page:
```
Accueil > Véhicule
```

#### Category Selection Page:
```
Accueil > Véhicule > Catégorie
```

#### Questions Page:
```
Accueil > Véhicule > Catégorie > Questions
```

#### Products Page:
```
Accueil > Véhicule > Catégorie > Produits
```

#### No Products Available Page:
```
Accueil > Véhicule > Catégorie > Aucun produit
```

## Original Flow (Category First) - Reverted

### Flow Order:
1. **Accueil** → **Catégorie** → **Véhicule** → **Questions/Produits**

### Breadcrumb Examples:

#### Category Selection Page:
```
Accueil > Catégorie
```

#### Vehicle Selection Page:
```
Accueil > Catégorie > Véhicule
```

#### Questions Page:
```
Accueil > Catégorie > Véhicule > Questions
```

#### Products Page:
```
Accueil > Catégorie > Véhicule > Produits
```

#### No Products Available Page:
```
Accueil > Catégorie > Véhicule > Aucun produit
```

## Configuration

The breadcrumbs automatically adapt based on the `FLOW_CONFIG.SELECT_VEHICLE_FIRST` setting:

- `true`: New flow (Vehicle → Category → Questions/Products)
- `false`: Original flow (Category → Vehicle → Questions/Products)

## Features

✅ **Flow-aware**: Automatically adapts to the current flow configuration
✅ **Clickable**: Users can navigate back to any previous step
✅ **Visual feedback**: Active step is highlighted
✅ **Consistent**: Same styling and behavior across all flows
✅ **Easily revertible**: Changes automatically when flow configuration changes