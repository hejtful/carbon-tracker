import { Backdrop, CircularProgress } from '@material-ui/core';

export function LoadingOverlay() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
