import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { List, Card, Loader } from 'components';

const PAGE_OFFSET = 10;

export const GET_CHARACTERS_QUERY = gql`
  query charactersQuery($page: Int!) {
    characters(page: $page)
      @rest(
        type: "CharacterList"
        method: "GET"
        path: "people/?page={args.page}"
      ) {
      count
      next
      previous
      results @type(name: "Character") {
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
`;

export default function CharacterList({ page, pathname }) {
  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    variables: {
      page: page
    },
    fetchPolicy: 'cache-first'
  });

  const renderItem = React.useCallback(
    character => {
      return (
        <Card
          key={character.name}
          link={`${pathname}/${character.url.split('/')[5]}`}
          title={character.name}
          subTitle={character.birth_year}
        />
      );
    },
    [pathname]
  );

  if (error) {
    return <p>Error :(</p>;
  }

  const { characters = {} } = data;

  if (loading && !characters) {
    return <Loader />;
  }

  const { results, count = 0, previous, next } = characters;
  const numberOfPages = count ? Math.round(count / PAGE_OFFSET) : '-';
  const title = `${count} Characters`;
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
