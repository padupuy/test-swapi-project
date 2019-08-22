import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import {
  Card,
  ContentLayout,
  DetailSection,
  DetailSectionTitle,
  Grid,
  Hero,
  PageLayout
} from 'components';

export const GET_VEHICLE_QUERY = gql`
  query vehicleQuery($id: Int!) {
    vehicle(id: $id)
      @rest(type: "Vehicle", method: "GET", path: "vehicles/{args.id}") {
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
        id @export(as: "id")
        metadata @rest(path: "people/{exportVariables.id}", type: "Character") {
          id
          name
          height
          mass
          hair_color
          skin_color
          eye_color
          birth_year
          gender
          url
          vehicles {
            id
            metadata {
              id
            }
          }
        }
      }
    }
  }
`;

export default function Page({ match }) {
  const { id } = match.params;

  const { loading, error, data } = useQuery(GET_VEHICLE_QUERY, {
    variables: {
      id: id
    },
    fetchPolicy: 'cache-first'
  });

  const renderPilot = React.useCallback(pilot => {
    return (
      <Card
        key={pilot.id}
        link={`/characters/${pilot.id}`}
        title={pilot.metadata.name}
        subTitle={pilot.metadata.birth_year}
      ></Card>
    );
  }, []);

  if (error) {
    return <p>Error :(</p>;
  }

  const { vehicle = {} } = data;

  if (!loading && !vehicle) {
    return <Redirect to={'/vehicles'} />;
  }

  const {
    name = '-',
    model,
    manufacturer,
    cost_in_credits,
    length,
    max_atmosphering_speed,
    crew,
    passengers,
    cargo_capacity,
    consumables,
    vehicle_class,
    pilots
  } = vehicle;

  return (
    <PageLayout>
      <Hero></Hero>
      <ContentLayout title={name} loading={loading}>
        <DetailSection
          title={'Description'}
          items={[
            {
              label: 'Model',
              value: model
            },
            {
              label: 'Class',
              value: vehicle_class
            },
            {
              label: 'Manufacturer',
              value: manufacturer
            },
            {
              label: 'Price',
              value: cost_in_credits
            }
          ]}
        />
        <DetailSection
          highlight
          items={[
            {
              label: 'Length',
              value: length
            },
            {
              label: 'Max atmosphering speed',
              value: max_atmosphering_speed
            },
            {
              label: 'Consumables',
              value: consumables
            },
            {
              label: 'Crew',
              value: crew
            },
            {
              label: 'Passengers',
              value: passengers
            },
            {
              label: 'Capacity',
              value: cargo_capacity
            }
          ]}
        />

        {pilots && pilots.length > 0 && (
          <React.Fragment>
            <DetailSectionTitle>Pilots</DetailSectionTitle>
            <Grid>{pilots.map(renderPilot)}</Grid>
          </React.Fragment>
        )}
      </ContentLayout>
    </PageLayout>
  );
}
