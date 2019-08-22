import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import wait from 'waait';
import CharactersScreen from '../index';
import { GET_CHARACTERS_QUERY } from '../CharacterList';
import { buildCharacterList } from '../../../../test/generate';

async function renderCharactersScreen({ mocks = [] }) {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[`/characters`]}>
        <CharactersScreen location={{ search: '', pathname: '/characters' }} />
      </MemoryRouter>
    </MockedProvider>
  );

  return {
    ...utils
  };
}

test('renders all the character items', async () => {
  const generatedCharacterList = buildCharacterList();
  const mocks = [
    {
      request: {
        query: GET_CHARACTERS_QUERY,
        variables: {
          page: 1
        }
      },
      result: {
        data: {
          characters: generatedCharacterList
        }
      }
    }
  ];
  const { getByText } = await renderCharactersScreen({
    mocks
  });

  //Wait for final state
  //@see https://www.apollographql.com/docs/react/recipes/testing/#testing-final-state
  await wait(0);

  getByText('Characters');

  await generatedCharacterList.results.forEach(async vehicle => {
    await getByText(vehicle.name);
  });

  getByText(/Next page ❯/i);
});
