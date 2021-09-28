import { useCallback } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

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
      <InputLabel id="chart-type">Chart Type</InputLabel>
      <Select
        labelId="chart-type"
        id="chart-type-select"
        label="Chart Type"
        fullWidth
        value={value}
        onChange={handleChange}
      >
        {data.map((chartType) => (
          <MenuItem key={chartType.value} value={chartType.value}>
            {chartType.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
