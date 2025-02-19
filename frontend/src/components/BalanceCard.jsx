// src/components/BalanceCard.jsx
import { Card, CardContent, Typography } from '@mui/material';

const BalanceCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary">{title}</Typography>
      <Typography variant="h5">${value}</Typography>
    </CardContent>
  </Card>
);

export default BalanceCard;