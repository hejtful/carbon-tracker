import { useMemo, useCallback } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { countries } from '../constants';
import { Country, EstimateChartData } from '../estimatesTypes';

interface Props {
  data?: EstimateChartData[];
  value: string;
  onChange: (event: string) => void;
}

export function EstimatesCountryFilter({ data, value, onChange }: Props) {
  const availableCountries = useMemo(() => {
    if (!data) return [];
    const dataFilteredByCountry = data.map(({ country }) =>
      countries.find(({ code }) => code.toLowerCase() === country.toLowerCase())
    );
    return [...new Set(dataFilteredByCountry)] as Country[];
  }, [data]);

  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        labelId="country-select-label"
        id="country-select"
        label="Country"
        fullWidth
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">All</MenuItem>
        {availableCountries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
