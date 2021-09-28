import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export const EstimatesCard: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Card style={{ marginBottom: theme.spacing(2) }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
