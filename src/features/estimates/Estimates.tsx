import { Container, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { AddEstimateForm, EstimatesOverview } from './components/';

export function Estimates() {
  const theme = useTheme();

  return (
    <Container style={{ paddingBottom: theme.spacing(2) }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}
      >
        Carbon Tracker
      </Typography>
      <EstimatesOverview />
      <AddEstimateForm />
    </Container>
  );
}
