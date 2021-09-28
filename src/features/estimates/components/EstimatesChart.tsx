import { useMemo } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { useTheme } from '@material-ui/core/styles';
import { scaleTime } from 'd3-scale';
import { ArgumentScale } from '@devexpress/dx-react-chart';

import { estimatesChartHeight } from '../constants';
import { ChartType, EstimateChartData } from '../estimatesTypes';
import { EstimatesChartSkeleton, EstimatesChartMessage } from './';

interface Props {
  data: EstimateChartData[];
  error?: FetchBaseQueryError | SerializedError;
  isEmpty: boolean;
  chartType: ChartType;
}

export function EstimatesChart({ data, error, isEmpty, chartType }: Props) {
  const chartData = useMemo(() => {
    return data.map(({ estimatedAt, carbonG }) => ({
      x: new Date(estimatedAt),
      y: carbonG,
    }));
  }, [data]);

  const theme = useTheme();

  if (isEmpty) return <EstimatesChartSkeleton />;

  if (error) {
    return (
      <EstimatesChartMessage>
        An error occurred while loading chart data. Please try again later.
      </EstimatesChartMessage>
    );
  }

  return (
    <div data-testid="estimates-chart">
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
    </div>
  );
}
