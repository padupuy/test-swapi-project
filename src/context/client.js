import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

function mapDataList(dataList = [], type = '') {
  return dataList.map(dataUrl => {
    const dataId = dataUrl.split('/')[5];
    return {
      __typename: `${type}Wrapper`,
      id: dataId,
      metadata: {
        __typename: type,
        id: dataId
      }
    };
  });
}

const restLink = new RestLink({
  uri: window.app.REACT_APP_API_ENDPOINT,

  typePatcher: {
    CharacterList: data => {
      if (data.results != null) {
        data.results = data.results.map(character => ({
          ...character,
          __typename: 'Character',
          id: character.url.split('/')[5],
          vehicles: mapDataList(character.vehicles, 'Vehicle')
        }));
      }
      return data;
    },
    Character: data => {
      const characterId = data.id ? data.id : data.url.split('/')[5];

      data = {
        ...data,
        __typename: 'Character',
        id: characterId,
        vehicles: mapDataList(data.vehicles, 'Vehicle')
      };
      return data;
    },
    VehicleList: data => {
      if (data.results != null) {
        data.results = data.results.map(vehicle => ({
          ...vehicle,
          __typename: 'Vehicle',
          id: vehicle.url.split('/')[5],
          pilots: mapDataList(vehicle.pilots, 'Character')
        }));
      }
      return data;
    },
    Vehicle: data => {
      const vehicleId = data.id ? data.id : data.url.split('/')[5];

      data = {
        ...data,
        __typename: 'Vehicle',
        id: vehicleId,
        pilots: mapDataList(data.pilots, 'Character')
      };
      return data;
    }
  }
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache({
    //unique identifier to be used when normalizing the data in the store
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'Character':
        case 'Vehicle':
          return `${object.__typename}:${
            object.id ? object.id : object.url.split('/')[5]
          }`;
        default:
          return defaultDataIdFromObject(object); // fall back to default handling
      }
    },
    //A map of functions to redirect a query to another entry in the cache before a request takes place.
    //This is useful if you have a list of items and want to use the data from the list query on a detail page where you're querying an individual item.
    cacheRedirects: {
      Query: {
        character: (_, args, { getCacheKey }) => {
          return getCacheKey({
            __typename: 'Character',
            id: args.id
          });
        },
        vehicle: (_, args, { getCacheKey }) => {
          return getCacheKey({
            __typename: 'Vehicle',
            id: args.id
          });
        }
      }
    }
  })
});

export default client;
