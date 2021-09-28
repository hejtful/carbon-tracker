import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export const EstimatesSubtitle: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h5"
      component="h3"
      align="center"
      style={{ marginBottom: theme.spacing(1) }}
    >
      {children}
    </Typography>
  );
};
