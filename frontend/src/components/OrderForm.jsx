// src/components/OrderForm.jsx
import { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const OrderForm = ({ onSubmit, type }) => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ symbol, quantity: parseFloat(quantity) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            label="Symbol"
            fullWidth
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          >
            <MenuItem value="BTCUSDT">BTC/USDT</MenuItem>
            <MenuItem value="ETHUSDT">ETH/USDT</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color={type === 'buy' ? 'success' : 'error'}
          >
            {type === 'buy' ? 'Buy' : 'Sell'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderForm;