import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Card, List, Loader } from 'components';

const PAGE_OFFSET = 10;

export const GET_VEHICLES_QUERY = gql`
  query vehiclesQuery($page: Int!) {
    vehicles(page: $page)
      @rest(
        type: "VehicleList"
        method: "GET"
        path: "vehicles/?page={args.page}"
      ) {
      count
      next
      previous
      results @type(name: "Vehicle") {
        id
        name
        model
        manufacturer
        cost_in_credits
        length
        max_atmosphering_speed
        crew
        passengers
        cargo_capacity
        consumables
        vehicle_class
        url
        pilots {
          id
          metadata {
            id
          }
        }
      }
    }
  }
`;

export default function VehicleList({ page, pathname }) {
  const { loading, error, data } = useQuery(GET_VEHICLES_QUERY, {
    variables: {
      page: page
    },
    fetchPolicy: 'cache-first'
  });

  const renderItem = React.useCallback(
    vehicle => {
      return (
        <Card
          key={vehicle.name}
          link={`${pathname}/${vehicle.url.split('/')[5]}`}
          title={vehicle.name}
          subTitle={`${vehicle.vehicle_class} / ${vehicle.model}`}
        />
      );
    },
    [pathname]
  );

  if (error) {
    return <p>Error :(</p>;
  }

  const { vehicles = {} } = data;

  if (loading && !vehicles) {
    return <Loader />;
  }

  if (!vehicles) {
    return <p>Not found</p>;
  }

  const { results, count = 0, previous, next } = vehicles;
  const numberOfPages = count ? Math.round(count / PAGE_OFFSET) : '-';
  const title = `${count} Vehicles`;
  const previousPageLink = previous && `${pathname}?page=${page - 1}`;
  const nextPageLink = next && `${pathname}?page=${page + 1}`;

  return (
    <List
      data={results}
      renderItem={renderItem}
      loading={loading}
      title={title}
      page={page}
      totalPage={numberOfPages}
      previousPageLink={previousPageLink}
      nextPageLink={nextPageLink}
    />
  );
}
