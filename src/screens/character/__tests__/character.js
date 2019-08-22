import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import wait from 'waait';
import CharacterScreen, { GET_CHARACTER_QUERY } from '../index';
import { buildCharacter } from '../../../../test/generate';

async function renderCharacterScreen({ id, mocks = [] }) {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[`/characters/${id}`]}>
        <CharacterScreen match={{ params: { id } }} />
      </MemoryRouter>
    </MockedProvider>
  );

  return {
    ...utils
  };
}

test('renders all the character information', async () => {
  const generatedCharacter = buildCharacter();
  const mocks = [
    {
      request: {
        query: GET_CHARACTER_QUERY,
        variables: {
          id: generatedCharacter.id
        }
      },
      result: {
        data: {
          character: generatedCharacter
        }
      }
    }
  ];
  const { getByText } = await renderCharacterScreen({
    id: generatedCharacter.id,
    mocks
  });

  //Wait for final state
  //@see https://www.apollographql.com/docs/react/recipes/testing/#testing-final-state
  await wait(0);

  getByText(generatedCharacter.name);
  getByText(generatedCharacter.hair_color);
  getByText(generatedCharacter.skin_color);
  getByText(generatedCharacter.eye_color);
  getByText(generatedCharacter.height);
  getByText(generatedCharacter.mass);
  getByText(generatedCharacter.birth_year);

  getByText(generatedCharacter.vehicles[0].metadata.name);
  getByText(generatedCharacter.vehicles[1].metadata.name);
});
