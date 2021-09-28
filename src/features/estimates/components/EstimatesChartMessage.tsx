import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { estimatesChartHeight } from '../constants';

export const EstimatesChartMessage: React.FC = ({ children }) => {
  return (
    <Box
      style={{
        alignItems: 'center',
        display: 'flex',
        height: estimatesChartHeight,
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="h6"
        component="div"
        data-testid="estimates-chart-message"
      >
        {children}
      </Typography>
    </Box>
  );
};
