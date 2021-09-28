import {
  Backdrop,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { AddEstimateForm, EstimatesOverview } from './components/';
import { useAuthenticateQuery } from './estimatesApi';

function LoadingOverlay() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export function Estimates() {
  const { isLoading: isAuthenticating } = useAuthenticateQuery(null);

  const theme = useTheme();

  if (isAuthenticating) return <LoadingOverlay />;

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
