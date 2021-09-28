import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export const EstimatesTitle: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      component="h1"
      align="center"
      style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}
    >
      {children}
    </Typography>
  );
};
