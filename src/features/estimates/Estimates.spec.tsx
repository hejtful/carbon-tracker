import { rest } from 'msw';
import { within } from '@testing-library/dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../test/test-utils';
import { server } from '../../test/server';
import { countries, estimatesChartSubtitle } from './constants';
import { ChartType, ElectricityUnit } from './estimatesTypes';
import { Estimates } from './Estimates';
import { mockAddEstimateResponse } from '../../test/mocks/estimates/addEstimateResponse';

// Mock chart library
import '@devexpress/dx-react-chart-material-ui';
import { mockEstimatesResponse } from '../../test/mocks/estimates/estimatesResponse';
jest.mock('@devexpress/dx-react-chart-material-ui', () => ({
  ArgumentAxis: () => null,
  ValueAxis: () => null,
  Chart: ({ data }: any) =>
    data.map((item: any, index: number) => (
      <div key={index} data-testid="estimates-chart-item">
        {item.y}
      </div>
    )),
  LineSeries: () => <div>Chart type: LINE</div>,
  BarSeries: () => <div>Chart type: BAR</div>,
}));

describe('Estimates component', () => {
  it('should display a loader while the user is authenticating', async () => {
    renderWithProviders(<Estimates />);

    await screen.findByTestId('loading-overlay');
  });

  it('should display a skeleton loader while chart data is loading', async () => {
    renderWithProviders(<Estimates />);

    await screen.findByTestId('estimates-chart-skeleton');
  });

  it('should display an error message if chart data fails to load', async () => {
    server.use(
      rest.get(
        'https://www.carboninterface.com/api/v1/estimates',
        (_, res, ctx) => {
          return res.once(ctx.status(500));
        }
      )
    );

    renderWithProviders(<Estimates />);

    await screen.findByTestId('estimates-chart-message');
  });

  it('should display estimates data chart when chart data is loaded', async () => {
    renderWithProviders(<Estimates />);

    await screen.findByTestId('estimates-chart');
  });

  it('should submit a new estimate and display it', async () => {
    renderWithProviders(<Estimates />);

    // Select location
    const locationField = await screen.findByTestId(
      'add-estimate-location-field'
    );
    const locationInput = (await within(locationField).findByLabelText(
      'Location'
    )) as HTMLInputElement;
    locationField.focus();
    userEvent.type(locationInput, countries[0].label);
    userEvent.type(locationInput, '{arrowdown}');
    userEvent.type(locationInput, '{enter}');
    expect(locationInput.value).toBe(countries[0].label);

    // Enter electricity usage
    const usageValue = '40';
    const usageInput = (await screen.findByLabelText(
      'Electricity usage'
    )) as HTMLInputElement;
    userEvent.type(usageInput, usageValue);
    expect(usageInput.value).toBe(usageValue);

    // Select unit
    const unitSelect = (await screen.findByLabelText(
      'Unit'
    )) as HTMLSelectElement;
    userEvent.selectOptions(unitSelect, ElectricityUnit.MWH);
    expect(unitSelect.value).toBe(ElectricityUnit.MWH);

    // Submit the form
    const submitButton = await screen.findByTestId('submit-button');
    userEvent.click(submitButton);

    // Check that the mocked chart item was added
    await screen.findByText(mockAddEstimateResponse.data.attributes.carbon_g);
  });

  it('should apply country filter', async () => {
    renderWithProviders(<Estimates />);

    await screen.findByTestId('estimates-chart');

    // Check that the mocked chart was updated
    const initialChartItems = await screen.findAllByTestId(
      'estimates-chart-item'
    );
    expect(initialChartItems.length).toBe(mockEstimatesResponse.length);

    // Select country
    const countryValue = 'FR';
    const countrySelect = (await screen.findByLabelText(
      'Country'
    )) as HTMLSelectElement;
    userEvent.selectOptions(countrySelect, countryValue);
    expect(countrySelect.value).toBe(countryValue);

    // Check that the mocked chart was updated
    const updatedChartItems = await screen.findAllByTestId(
      'estimates-chart-item'
    );
    const responseItemsWithCountry = mockEstimatesResponse.filter(
      ({ data }) =>
        data.attributes.country.toLowerCase() === countryValue.toLowerCase()
    );
    expect(updatedChartItems.length).toBe(responseItemsWithCountry.length);
  });

  it('should apply chart type selection', async () => {
    renderWithProviders(<Estimates />);

    // Select chart type
    const chartTypeValue = ChartType.BAR;
    const chartTypeSelect = (await screen.findByLabelText(
      'Chart type'
    )) as HTMLSelectElement;
    userEvent.selectOptions(chartTypeSelect, chartTypeValue);
    expect(chartTypeSelect.value).toBe(chartTypeValue);

    // Check that the correct chart subtitle is displayed
    await screen.findByText(
      `${estimatesChartSubtitle} ${chartTypeValue.toLocaleLowerCase()} chart`
    );
  });
});
