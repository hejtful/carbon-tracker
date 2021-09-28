import { Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import {
  LoadingOverlay,
  EstimatesTitle,
  AddEstimateForm,
  EstimatesOverview,
} from './components/';
import { estimatesTitle } from './constants';
import { useAuthenticateQuery } from './estimatesApi';

export function Estimates() {
  const { isLoading: isAuthenticating } = useAuthenticateQuery(null);

  const theme = useTheme();

  if (isAuthenticating) return <LoadingOverlay />;

  return (
    <Container style={{ paddingBottom: theme.spacing(2) }}>
      <EstimatesTitle>{estimatesTitle}</EstimatesTitle>
      <EstimatesOverview />
      <AddEstimateForm />
    </Container>
  );
}
