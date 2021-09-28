import { useCallback } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

import { ChartType, ChartTypeItem } from '../estimatesTypes';

interface Props {
  data: ChartTypeItem[];
  value: string;
  onChange: (event: ChartType) => void;
}

export function ChartTypeSelect({ data, value, onChange }: Props) {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value as ChartType);
    },
    [onChange]
  );

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="chart-type-select">Chart type</InputLabel>
      <Select
        native
        label="Chart type"
        fullWidth
        inputProps={{
          name: 'chart-type-select',
          id: 'chart-type-select',
        }}
        value={value}
        onChange={handleChange}
      >
        {data.map((chartType) => (
          <option key={chartType.value} value={chartType.value}>
            {chartType.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
