// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BalanceCard from '../components/BalanceCard';
import OrderForm from '../components/OrderForm';
import PriceChart from '../components/PriceChart';
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState({ total: 10000, available: 8000 });
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    // Simuler des données de prix (remplacer par un appel WebSocket réel)
    const interval = setInterval(() => {
      setPriceData(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        price: 30000 + Math.random() * 1000
      }].slice(-20));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOrderSubmit = async (order) => {
    try {
      await axios.post(
        `http://localhost:8000/${order.type === 'buy' ? 'buy' : 'sell'}`,
        order,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      // Mettre à jour le solde après l'ordre
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <BalanceCard title="Total Balance" value={balance.total} />
        </Grid>
        <Grid item xs={6}>
          <BalanceCard title="Available Balance" value={balance.available} />
        </Grid>
      </Grid>

      <PriceChart data={priceData} />

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <OrderForm type="buy" onSubmit={handleOrderSubmit} />
        </Grid>
        <Grid item xs={6}>
          <OrderForm type="sell" onSubmit={handleOrderSubmit} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;