import dayjs from 'dayjs';
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
  tagTypes: ['Estimates'],
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
          estimatedAt: dayjs(data.attributes.estimated_at).format(
            'DD/MM/YY HH:mm:ss'
          ),
          carbonG: data.attributes.carbon_g,
          country: data.attributes.country,
        })),
      providesTags: (result) => {
        if (!result) return [{ type: 'Estimates', id: 'LIST' }];
        return [
          ...result.map(({ id }) => ({ type: 'Estimates', id } as const)),
          { type: 'Estimates', id: 'LIST' },
        ];
      },
    }),

    addEstimate: builder.mutation<EstimateResponse, AddEstimatePayload>({
      query(body) {
        return {
          url: `estimates`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Estimates', id: 'LIST' }],
    }),
  }),
});

export const {
  useAuthenticateQuery,
  useGetEstimatesQuery,
  useAddEstimateMutation,
} = estimatesApi;
