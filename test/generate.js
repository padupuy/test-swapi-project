import faker from 'faker';

export function buildCharacter(overrides) {
  const id = faker.random.uuid();
  return {
    id: id,
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: `https://swapi.co/api/people/${id}/`,
    vehicles: [
      {
        id: '14',
        metadata: {
          id: '14',
          name: 'Snowspeeder',
          model: 't-47 airspeeder',
          manufacturer: 'Incom corporation',
          cost_in_credits: 'unknown',
          length: '4.5',
          max_atmosphering_speed: '650',
          crew: '2',
          passengers: '0',
          cargo_capacity: '10',
          consumables: 'none',
          vehicle_class: 'airspeeder',
          url: `https://swapi.co/api/vehicles/14/`,
          pilots: [
            {
              id: '1',
              metadata: {
                id: '1'
              }
            },
            {
              id: '18',
              metadata: {
                id: '18'
              }
            }
          ]
        }
      },
      {
        id: '30',
        metadata: {
          id: '30',
          name: 'Imperial Speeder Bike',
          model: '74-Z speeder bike',
          manufacturer: 'Aratech Repulsor Company',
          cost_in_credits: '8000',
          length: '3',
          max_atmosphering_speed: '360',
          crew: '1',
          passengers: '1',
          cargo_capacity: '4',
          consumables: '1 day',
          vehicle_class: 'speeder',
          url: 'https://swapi.co/api/vehicles/30/',
          pilots: [
            {
              id: '1',
              metadata: {
                id: '1'
              }
            },
            {
              id: '5',
              metadata: {
                id: '5'
              }
            }
          ]
        }
      }
    ],
    ...overrides
  };
}

export function buildVehicle(overrides) {
  const id = faker.random.uuid();
  return {
    id: id,
    name: 'Snowspeeder',
    model: 't-47 airspeeder',
    manufacturer: 'Incom corporation',
    cost_in_credits: 'unknown',
    length: '4.5',
    max_atmosphering_speed: '650',
    crew: '2',
    passengers: '0',
    cargo_capacity: '10',
    consumables: 'none',
    vehicle_class: 'airspeeder',
    url: `https://swapi.co/api/vehicles/${id}/`,
    pilots: [
      {
        id: '1',
        metadata: {
          id: '1',
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          url: `https://swapi.co/api/people/1/`,
          vehicles: [
            {
              id: '14',
              metadata: {
                id: '14'
              }
            }
          ]
        }
      }
    ],
    ...overrides
  };
}

export function buildVehicleList() {
  return {
    count: 2,
    next: 'https://swapi.co/api/vehicles/?page=2',
    previous: null,
    results: [
      {
        name: 'Snowspeeder',
        model: 't-47 airspeeder',
        manufacturer: 'Incom corporation',
        cost_in_credits: 'unknown',
        length: '4.5',
        max_atmosphering_speed: '650',
        crew: '2',
        passengers: '0',
        cargo_capacity: '10',
        consumables: 'none',
        vehicle_class: 'airspeeder',
        url: 'https://swapi.co/api/vehicles/14/',
        id: 14,
        pilots: [
          {
            id: '1',
            metadata: {
              id: '1'
            }
          },
          {
            id: '18',
            metadata: {
              id: '18'
            }
          }
        ]
      },
      {
        name: 'AT-ST',
        model: 'All Terrain Scout Transport',
        manufacturer:
          'Kuat Drive Yards, Imperial Department of Military Research',
        cost_in_credits: 'unknown',
        length: '2',
        max_atmosphering_speed: '90',
        crew: '2',
        passengers: '0',
        cargo_capacity: '200',
        consumables: 'none',
        vehicle_class: 'walker',
        id: 19,
        url: 'https://swapi.co/api/vehicles/19/',
        pilots: []
      }
    ]
  };
}

export function buildCharacterList() {
  return {
    count: 3,
    next: 'https://swapi.co/api/people/?page=2',
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.co/api/people/1/',
        id: 1,
        vehicles: [
          {
            id: '14',
            metadata: {
              id: '14'
            }
          },
          {
            id: '30',
            metadata: {
              id: '30'
            }
          }
        ]
      },
      {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a',
        url: 'https://swapi.co/api/people/2/',
        id: 2,
        vehicles: []
      },

      {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        hair_color: 'brown',
        skin_color: 'light',
        eye_color: 'brown',
        birth_year: '19BBY',
        gender: 'female',
        url: 'https://swapi.co/api/people/5/',
        id: 5,
        vehicles: []
      }
    ]
  };
}
