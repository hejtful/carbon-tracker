import { useMemo, useCallback } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

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
      <InputLabel htmlFor="country-select">Country</InputLabel>
      <Select
        native
        label="Country"
        fullWidth
        inputProps={{
          name: 'country-select',
          id: 'country-select',
        }}
        value={value}
        onChange={handleChange}
      >
        <option aria-label="None" value="" />
        {availableCountries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
