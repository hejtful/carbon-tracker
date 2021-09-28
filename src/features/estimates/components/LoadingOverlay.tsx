import { Backdrop, CircularProgress } from '@material-ui/core';

export function LoadingOverlay() {
  return (
    <Backdrop open={true} data-testid="loading-overlay">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
