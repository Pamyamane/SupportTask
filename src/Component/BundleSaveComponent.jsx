import React, { useState, useMemo } from 'react';
import { 
  Select, MenuItem, FormControl, InputLabel, Button, Radio, 
  RadioGroup, FormControlLabel, Typography, Card, CardContent, 
  Alert, Box
} from '@mui/material';

const BundleSaveComponent = () => {
  const [selectedBundle, setSelectedBundle] = useState('2Pair');
  const [selectedOptions, setSelectedOptions] = useState({
    '1Pair': { quantity: 1, color: '', size: '' },
    '2Pair': { quantity: 2, color: '', size: '' },
    '3Pair': { quantity: 3, color: '', size: '' }
  });

  const bundleDetails = [
    { 
      key: '1Pair',
      title: '1 Pair', 
      basePrice: 156.00, 
      discount: 50,
      colors: ['Black', 'White', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    { 
      key: '2Pair',
      title: '2 Pair', 
      basePrice: 345.00, 
      discount: 40,
      colors: ['Black', 'White', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    { 
      key: '3Pair',
      title: '3 Pair', 
      basePrice: 564.00, 
      discount: 60,
      colors: ['Black', 'White', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  const OptionChange = (bundleKey, field, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [bundleKey]: {
        ...prev[bundleKey],
        [field]: value
      }
    }));
  };

  // Dynamic price calculation with discounts
  const bundleCalculations = useMemo(() => {
    return bundleDetails.map(bundle => {
      const options = selectedOptions[bundle.key];
      const isComplete = options.color && options.size;
      
      return {
        ...bundle,
        finalPrice: isComplete ? bundle.basePrice : 0,
        isConfigured: isComplete
      };
    });
  }, [selectedOptions]);

  // Total price calculation
  const totalPrice = useMemo(() => {
    return bundleCalculations
      .filter(bundle => bundle.key === selectedBundle)
      .reduce((total, bundle) => bundle.finalPrice, 0);
  }, [bundleCalculations, selectedBundle]);

  // Check if all required options are selected
  const isAddToCartDisabled = useMemo(() => {
    return !selectedOptions[selectedBundle].color || 
           !selectedOptions[selectedBundle].size;
  }, [selectedOptions, selectedBundle]);

  return (
    <Card 
      sx={{ 
        maxWidth: 450, 
        mx: 'auto', 
        boxShadow: 3, 
        borderRadius: 2, 
        overflow: 'hidden' 
      }}
    >
      <Typography 
        variant="h6" 
        align="center" 
        sx={{ 
          bgcolor: 'teal', 
          color: 'white', 
          py: 2, 
          fontWeight: 'bold' 
        }}
      >
        Bundle & Save
      </Typography>
      
      <RadioGroup 
        value={selectedBundle} 
        onChange={(e) => setSelectedBundle(e.target.value)}
      >
        {bundleDetails.map((bundle) => (
          <CardContent 
            key={bundle.key} 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              py: 2,
              transition: 'all 0.3s ease', 
              backgroundColor: selectedBundle === bundle.key ? '#f0f0f0' : 'transparent',
              '&:hover': { 
                backgroundColor: '#f5f5f5' 
              }
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <FormControlLabel 
                value={bundle.key} 
                control={<Radio />} 
                label={
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 2 }}>
                      {bundle.title}
                    </Typography>
                    <Typography 
                      component="span" 
                      sx={{ 
                        bgcolor: 'teal', 
                        color: 'white', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      {bundle.discount}% OFF
                    </Typography>
                  </Box>
                }
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                ${bundle.basePrice.toFixed(2)}
              </Typography>
            </Box>
            
            {selectedBundle === bundle.key && (
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Color</InputLabel>
                  <Select
                    value={selectedOptions[bundle.key].color}
                    onChange={(e) => OptionChange(bundle.key, 'color', e.target.value)}
                    fullWidth
                  >
                    {bundle.colors.map((color) => (
                      <MenuItem key={color} value={color}>{color}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={selectedOptions[bundle.key].size}
                    onChange={(e) => OptionChange(bundle.key, 'size', e.target.value)}
                    fullWidth
                  >
                    {bundle.sizes.map((size) => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </CardContent>
        ))}
      </RadioGroup>

      {/* Dynamic Shipping Alert */}
      <Box sx={{ p: 2 }}>
        {isAddToCartDisabled ? (
          <Alert severity="warning">
            Please select color and size to complete your bundle
          </Alert>
        ) : (
          <Alert severity="success">
            Free 2 Day Shipping Available
          </Alert>
        )}
      </Box>

      <CardContent 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'grey.100', 
          py: 2 
        }}
      >
        <Typography variant="subtitle1">Total Price</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          ${totalPrice.toFixed(2)}
        </Typography>
      </CardContent>
      
      <Button 
        fullWidth 
        variant="contained" 
        color="primary" 
        disabled={isAddToCartDisabled}
        sx={{ 
          py: 2, 
          bgcolor: 'teal', 
          '&:hover': { bgcolor: 'darkcyan' },
          '&.Mui-disabled': {
            backgroundColor: 'grey.300',
            color: 'grey.500'
          }
        }}
      >
        {isAddToCartDisabled ? 'Complete Bundle Selection' : '+ Add to Car    t'}
      </Button>  
      
    </Card>
  );
};

export default BundleSaveComponent;