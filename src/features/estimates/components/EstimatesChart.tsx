import { useMemo } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Box, Typography } from '@material-ui/core';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Skeleton } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import { scaleTime } from 'd3-scale';
import { ArgumentScale } from '@devexpress/dx-react-chart';

import { estimatesChartHeight } from '../constants';
import { ChartType, EstimateChartData } from '../estimatesTypes';

interface Props {
  data: EstimateChartData[];
  error?: FetchBaseQueryError | SerializedError;
  isEmpty: boolean;
  chartType: ChartType;
}

function LoadingSkeleton() {
  return (
    <Skeleton
      animation="wave"
      variant="rect"
      width="100%"
      height={estimatesChartHeight}
    />
  );
}

function ErrorMessage() {
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
      <Typography variant="h6" component="div">
        An error occurred while loading chart data. Please try again later.
      </Typography>
    </Box>
  );
}

export function EstimatesChart({ data, error, isEmpty, chartType }: Props) {
  const chartData = useMemo(() => {
    return data.map(({ estimatedAt, carbonG }) => ({
      x: new Date(estimatedAt),
      y: carbonG,
    }));
  }, [data]);

  const theme = useTheme();

  if (isEmpty) return <LoadingSkeleton />;

  if (error) return <ErrorMessage />;

  return (
    <Chart data={chartData} height={estimatesChartHeight}>
      <ArgumentScale factory={scaleTime} />
      <ArgumentAxis />
      <ValueAxis />

      {chartType === ChartType.LINE && (
        <LineSeries
          valueField="y"
          argumentField="x"
          color={theme.palette.info.main}
        />
      )}
      {chartType === ChartType.BAR && (
        <BarSeries
          valueField="y"
          argumentField="x"
          color={theme.palette.info.main}
        />
      )}
    </Chart>
  );
}
