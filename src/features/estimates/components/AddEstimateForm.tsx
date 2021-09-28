import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab/';
import { useTheme } from '@material-ui/core/styles';

import { countries, units } from '../constants';
import { useAddEstimateMutation } from '../estimatesApi';
import { useAddEstimateForm } from '../hooks/useAddEstimateForm';

export function AddEstimateForm() {
  const [addEstimate, { isLoading }] = useAddEstimateMutation();
  const { handleInput, handleSubmit, isFormValid, errors } =
    useAddEstimateForm();

  const theme = useTheme();

  return (
    <Card style={{ marginBottom: theme.spacing(2) }}>
      <CardContent style={{ paddingBottom: theme.spacing(5) }}>
        <Typography
          variant="h5"
          component="h3"
          align="center"
          style={{ marginBottom: theme.spacing(2) }}
        >
          Add an estimate
        </Typography>

        <form onSubmit={handleSubmit(addEstimate)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3} container justifyContent="center">
              <Autocomplete
                fullWidth
                options={countries}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="location"
                    label="Location"
                    inputProps={{
                      ...params.inputProps,
                    }}
                    onBlur={handleInput}
                    onChange={handleInput}
                    error={!!errors['location']}
                    helperText={errors['location'] || null}
                  />
                )}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} container justifyContent="center">
              <TextField
                name="usage"
                label="Electricity usage"
                fullWidth
                type="number"
                inputProps={{
                  min: '0',
                }}
                disabled={isLoading}
                onBlur={handleInput}
                onChange={handleInput}
                error={!!errors['usage']}
                helperText={errors['usage'] || null}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} container justifyContent="center">
              <FormControl fullWidth error={!!errors['unit']}>
                <InputLabel htmlFor="unit-select">Unit</InputLabel>
                <Select
                  native
                  name="unit"
                  id="unit-select"
                  label="Unit"
                  fullWidth
                  disabled={isLoading}
                  inputProps={{
                    name: 'unit',
                    id: 'unit-select',
                  }}
                  onBlur={handleInput}
                  onChange={handleInput}
                >
                  <option aria-label="None" value="" />
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Select>
                {!!errors['unit'] && (
                  <FormHelperText>{errors['unit']}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              container
              justifyContent="center"
              alignItems="flex-start"
            >
              <Button
                style={{ marginTop: theme.spacing(1.25) }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading || !isFormValid()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
