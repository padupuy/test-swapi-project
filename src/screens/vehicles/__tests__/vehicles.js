import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import wait from 'waait';
import VehiclesScreen from '../index';
import { GET_VEHICLES_QUERY } from '../VehicleList';
import { buildVehicleList } from '../../../../test/generate';

async function renderVehiclesScreen({ mocks = [] }) {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[`/vehicles`]}>
        <VehiclesScreen location={{ search: '', pathname: '/vehicles' }} />
      </MemoryRouter>
    </MockedProvider>
  );

  return {
    ...utils
  };
}

test('renders all the vehicle items', async () => {
  const generatedVehicleList = buildVehicleList();
  const mocks = [
    {
      request: {
        query: GET_VEHICLES_QUERY,
        variables: {
          page: 1
        }
      },
      result: {
        data: {
          vehicles: generatedVehicleList
        }
      }
    }
  ];
  const { getByText } = await renderVehiclesScreen({
    mocks
  });

  //Wait for final state
  //@see https://www.apollographql.com/docs/react/recipes/testing/#testing-final-state
  await wait(0);

  getByText('Vehicles');

  await generatedVehicleList.results.forEach(async vehicle => {
    await getByText(vehicle.name);
  });

  getByText(/Next page ❯/i);
});
