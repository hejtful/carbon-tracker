### Installation

1. Clone the repository
2. Change to the repository directory
3. Create an `.env.local` file and copy the content of `.env.example` into it
4. In `env.local`, replace `CARBON_INTERFACE_API_KEY` with your Carbon Interface API Key
5. Run `yarn` to install dependencies
6. Run `yarn start` to start the dev server

### Scripts

#### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`

Launches the test runner in the interactive watch mode.

#### `yarn build`

Builds the app for production to the `build` folder.

### Tech stack

The app was bootstrapped with `create-react-app` `cra-template-redux-typescript` template, written in TypeScript and React, and Material UI was used as a UI library.

Application state is managed in a Redux store, via Redux Toolkit Query.

After a quick research on chart libraries compatible with Material UI, I decided for "React Chart". In order to be able to use React Chart, I had to use Material UI v4. This didn't seem like a big trade-off, as Material UI v5 was only recently released. A bigger issue are console deprecation errors that both React and Material UI show because of React Chart. Unfortunately, I didn't have time to address them or change the chart library.

The app is fully responsive, with a flexible layout and a chart that can be horizontally scrolled on small screen sizes.

Some improvements I would do from a technical perspective are:

- Add a login page and token refresh functionality.
- Extract more state from components and into the store, via selectors.
- Pull countries list from an API instead of hard-coding them.
- Spend more time thinking about the right chart and scale to use for this app. I decided for a line chart with a time scale, but I'm not satisfied with the result.

### Tests

Only adding this section because I didn't make it in time to test everything I wanted to.

Cache invalidation in Redux Toolkit Query, using tags, gave me problems when writing integration tests, so to save time, I decided to manually update the chart when the form is submitted, instead of refetching previous estimates to validate.

Also when writing integration tests, I had problems with `d3-scale`'s `scaleTime` not accepting Jest date objects. I couldn't fix it quickly, so I decided to mock the chart library.

In the end, I decided to unit test the form validation hook, and add integration tests for the main functionality of the app. Given more time, I would fix all the above mentioned issues, and add component unit tests.

### Notes

I spent about 2 working days working on this challenge. In general, I am happy with how it turned out regarding the user experience, but not so happy with the quality of tests.
