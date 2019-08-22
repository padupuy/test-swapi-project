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

export const GET_CHARACTER_QUERY = gql`
  query characterQuery($id: Int!) {
    character(id: $id)
      @rest(type: "Character", method: "GET", path: "people/{args.id}") {
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
        id @export(as: "id")
        metadata @rest(path: "vehicles/{exportVariables.id}", type: "Vehicle") {
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
  }
`;

export default function Page({ match }) {
  const { id } = match.params;

  const { loading, error, data } = useQuery(GET_CHARACTER_QUERY, {
    variables: {
      id: id
    },
    fetchPolicy: 'cache-first'
  });

  const renderVehicle = React.useCallback(vehicle => {
    return (
      <Card
        key={vehicle.id}
        link={`/vehicles/${vehicle.id}`}
        title={vehicle.metadata.name}
        subTitle={`${vehicle.metadata.vehicle_class} / ${vehicle.metadata.model}`}
      ></Card>
    );
  }, []);

  if (error) {
    return <p>Error :(</p>;
  }

  const { character = {} } = data;

  if (!loading && !character) {
    return <Redirect to={'/characters'} />;
  }

  const {
    name = '-',
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    vehicles
  } = character;

  return (
    <PageLayout>
      <Hero></Hero>
      <ContentLayout title={name} loading={loading}>
        <DetailSection
          title="Description"
          items={[
            {
              label: 'Hair color',
              value: hair_color
            },
            {
              label: 'Skin color',
              value: skin_color
            },
            {
              label: 'Eye Color',
              value: eye_color
            }
          ]}
        />

        <DetailSection
          highlight
          items={[
            {
              label: 'Height',
              value: height
            },
            {
              label: 'Mass',
              value: mass
            },
            {
              label: 'Birth year',
              value: birth_year
            }
          ]}
        />

        {vehicles && vehicles.length > 0 && (
          <React.Fragment>
            <DetailSectionTitle>Vehicles</DetailSectionTitle>
            <Grid>{vehicles.map(renderVehicle)}</Grid>
          </React.Fragment>
        )}
      </ContentLayout>
    </PageLayout>
  );
}
