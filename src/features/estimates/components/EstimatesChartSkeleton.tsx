import { Skeleton } from '@material-ui/lab';

import { estimatesChartHeight } from '../constants';

export function EstimatesChartSkeleton() {
  return (
    <Skeleton
      animation="wave"
      variant="rect"
      width="100%"
      height={estimatesChartHeight}
    />
  );
}
