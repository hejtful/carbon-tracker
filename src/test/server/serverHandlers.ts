import { rest } from 'msw';
import { mockEstimatesResponse } from '../mocks/estimates/estimatesResponse';
import { mockAddEstimateResponse } from '../mocks/estimates/addEstimateResponse';

const handlers = [
  rest.get('https://www.carboninterface.com/api/v1/auth', (_, res, ctx) =>
    res(ctx.json({}))
  ),
  rest.get('https://www.carboninterface.com/api/v1/estimates', (_, res, ctx) =>
    res(ctx.json(mockEstimatesResponse))
  ),
  rest.post('https://www.carboninterface.com/api/v1/estimates', (_, res, ctx) =>
    res(ctx.json(mockAddEstimateResponse))
  ),
];

export { handlers };
