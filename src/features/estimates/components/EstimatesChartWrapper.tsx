import React from 'react';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { EstimatesSubtitle } from './';

interface Props {
  subtitle: string;
}

export const EstimatesChartWrapper: React.FC<Props> = ({
  children,
  subtitle,
}) => {
  const theme = useTheme();

  return (
    <>
      <EstimatesSubtitle>{subtitle}</EstimatesSubtitle>
      <Box style={{ overflowX: 'auto', paddingBottom: theme.spacing(1) }}>
        <Box style={{ minWidth: theme.breakpoints.values.sm }}>{children}</Box>
      </Box>
    </>
  );
};
