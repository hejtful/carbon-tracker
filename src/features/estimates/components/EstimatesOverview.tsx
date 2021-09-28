import { useState, useMemo } from 'react';
import { Card, CardContent, Grid, Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { chartTypes } from '../constants';
import { useGetEstimatesQuery } from '../estimatesApi';
import { EstimatesCountryFilter, ChartTypeSelect, EstimatesChart } from './';
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

  const theme = useTheme();

  return (
    <Card style={{ marginBottom: theme.spacing(2) }}>
      <CardContent style={{ paddingBottom: theme.spacing(2) }}>
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
            <Typography
              variant="h5"
              component="h3"
              align="center"
              style={{ marginBottom: theme.spacing(1) }}
            >
              Carbon usage estimates
            </Typography>
            <Box style={{ overflowX: 'auto', paddingBottom: theme.spacing(1) }}>
              <Box style={{ minWidth: theme.breakpoints.values.sm }}>
                <EstimatesChart
                  data={filteredData}
                  error={error}
                  isEmpty={!data?.length && isLoading}
                  chartType={chartType}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
