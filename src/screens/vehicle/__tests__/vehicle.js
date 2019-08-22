import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import wait from 'waait';
import VehicleScreen, { GET_VEHICLE_QUERY } from '../index';
import { buildVehicle } from '../../../../test/generate';

async function renderVehicleScreen({ id, mocks = [] }) {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[`/vehicles/${id}`]}>
        <VehicleScreen match={{ params: { id } }} />
      </MemoryRouter>
    </MockedProvider>
  );

  return {
    ...utils
  };
}

test('renders all the vehicle information', async () => {
  const generatedVehicle = buildVehicle();
  const mocks = [
    {
      request: {
        query: GET_VEHICLE_QUERY,
        variables: {
          id: generatedVehicle.id
        }
      },
      result: {
        data: {
          vehicle: generatedVehicle
        }
      }
    }
  ];
  const { getByText } = await renderVehicleScreen({
    id: generatedVehicle.id,
    mocks
  });

  //Wait for final state
  //@see https://www.apollographql.com/docs/react/recipes/testing/#testing-final-state
  await wait(0);

  getByText(generatedVehicle.name);
  getByText(generatedVehicle.model);
  getByText(generatedVehicle.manufacturer);
  getByText(generatedVehicle.cost_in_credits);
  getByText(generatedVehicle.length);
  getByText(generatedVehicle.max_atmosphering_speed);
  getByText(generatedVehicle.crew);
  getByText(generatedVehicle.passengers);
  getByText(generatedVehicle.cargo_capacity);
  getByText(generatedVehicle.consumables);
  getByText(generatedVehicle.vehicle_class);

  getByText(generatedVehicle.pilots[0].metadata.name);
});
