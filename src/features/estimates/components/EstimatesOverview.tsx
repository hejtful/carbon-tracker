import { useState, useMemo } from 'react';
import { Grid } from '@material-ui/core';

import { chartTypes, estimatesChartSubtitle } from '../constants';
import { useGetEstimatesQuery } from '../estimatesApi';
import {
  EstimatesCountryFilter,
  ChartTypeSelect,
  EstimatesCard,
  EstimatesChartWrapper,
  EstimatesChart,
} from './';
import { ChartType } from '../estimatesTypes';

export function EstimatesOverview() {
  const [filterCountry, setFilterCountry] = useState('');
  const [chartType, setChartType] = useState<ChartType>(ChartType.LINE);
  const { data, error, isLoading } = useGetEstimatesQuery(null);
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!filterCountry) return data;
    return data.filter(
      ({ country }) => country.toLowerCase() === filterCountry.toLowerCase()
    );
  }, [data, filterCountry]);

  return (
    <EstimatesCard>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <EstimatesCountryFilter
            data={data}
            value={filterCountry}
            onChange={setFilterCountry}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <ChartTypeSelect
            data={chartTypes}
            value={chartType}
            onChange={setChartType}
          />
        </Grid>

        <Grid item xs={12}>
          <EstimatesChartWrapper subtitle={estimatesChartSubtitle}>
            <EstimatesChart
              data={filteredData}
              error={error}
              isEmpty={!data?.length && isLoading}
              chartType={chartType}
            />
          </EstimatesChartWrapper>
        </Grid>
      </Grid>
    </EstimatesCard>
  );
}
