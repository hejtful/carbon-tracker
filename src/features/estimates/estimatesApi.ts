import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  EstimateChartData,
  EstimateResponse,
  AddEstimatePayload,
} from './estimatesTypes';

export const estimatesApi = createApi({
  reducerPath: 'estimatesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.carboninterface.com/api/v1/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_API_KEY}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authenticate: builder.query<null, null>({
      query: () => ({
        url: `auth`,
        method: 'GET',
      }),
    }),

    getEstimates: builder.query<EstimateChartData[], null>({
      query: () => ({
        url: `estimates`,
        method: 'GET',
      }),
      transformResponse: (response: EstimateResponse[]) =>
        response.map(({ data }) => ({
          id: data.id,
          estimatedAt: data.attributes.estimated_at,
          carbonG: data.attributes.carbon_g,
          country: data.attributes.country,
        })),
    }),

    addEstimate: builder.mutation<EstimateResponse, AddEstimatePayload>({
      query: (body) => {
        return {
          url: `estimates`,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            estimatesApi.util.updateQueryData('getEstimates', null, (draft) => {
              draft.push({
                id: data.id,
                estimatedAt: data.attributes.estimated_at,
                carbonG: data.attributes.carbon_g,
                country: data.attributes.country,
              });
            })
          );
        } catch (e) {}
      },
    }),
  }),
});

export const {
  useAuthenticateQuery,
  useGetEstimatesQuery,
  useAddEstimateMutation,
} = estimatesApi;
