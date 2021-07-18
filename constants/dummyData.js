export const cities = [
  //countries
  {
    id: 1,
    name: 'Kathmandu',
    image: require('../assests/images/k.jpg'),
    places: [
      {
        id: 1,
        name: 'Swayambhu',
        description:
          'Buddhists Religious Stupa where idols of lord Gautam Buddha and other gods are placed',
        image: require('../assests/images/swayambhu.png'),
        mapInitialRegion: {
          latitude: 27.7192103,
          longitude: 85.2955242,
          latitudeDelta: 0.0053,
          longitudeDelta: 0.0044,
        },
        hotels: [
          {
            id: '1', //Invalid prop `identifier` of type `number` supplied to `MapMarker`, expected `string`
            name: 'Kathmandu Valley View',
            image: require('../assests/images/hotel.png'),
            price: 1000,
            rate: 5,
            latlng: {
              latitude: 27.7192103,
              longitude: 85.2955242,
            },
          },
        ],
      },
      {
        id: 2,
        name: 'Pashupati',
        description: `One of the most sacred Hindu temples of Nepal 
        Pashupatinath Temple is located on both banks of Bagmati River on the eastern outskirts of Kathmandu.`,
        image: require('../assests/images/pashupati.jpeg'),
        mapInitialRegion: {
          latitude: 27.7192103,
          longitude: 85.2955242,
          latitudeDelta: 0.0053,
          longitudeDelta: 0.0044,
        },
        hotels: [
          {
            id: '2',
            name: 'Hotel Valley View',
            image: require('../assests/images/hotel.png'),
            price: 1000,
            rate: 4,
            latlng: {
              latitude: 27.7192103,
              longitude: 85.2955242,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Pokhara',
    image: require('../assests/images/P.png'),
    places: [
      {
        id: 1,
        name: 'David Fall',
        description: 'Tourist destination located at heart of pokhara',
        image: require('../assests/images/davidFall.png'),
        mapInitialRegion: {
          latitude: 28.2669,
          longitude: 83.9685,
          latitudeDelta: 0.0053,
          longitudeDelta: 0.0044,
        },
        hotels: [
          {
            id: '1',
            name: 'Pokhara Valley View',
            image: require('../assests/images/hotel.png'),
            price: 1000,
            rate: 3,
            latlng: {
              latitude: 28.2669,
              longitude: 83.9685,
            },
          },
        ],
      },
      {
        id: 2,
        name: 'Fewa Lake',
        description: 'Tourist destination located at heart of pokhara',
        image: require('../assests/images/fewaLake.jpg'),
        mapInitialRegion: {
          latitude: 28.2669,
          longitude: 83.9685,
          latitudeDelta: 0.0053,
          longitudeDelta: 0.0044,
        },
        hotels: [
          {
            id: '1',
            name: 'Fewa Valley View',
            image: require('../assests/images/hotel.png'),
            price: 1000,
            rate: 6,
            latlng: {
              latitude: 28.2669,
              longitude: 83.9685,
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Butwal',
    image: require('../assests/images/B.png'),
    places: [
      {
        id: 1,
        name: 'Butwal',
        description:
          'Buddhists Religious Stupa where idols of lord Gautam Buddha and other gods are placed',
        image: require('../assests/images/Butwal.jpg'),
        mapInitialRegion: {
          latitude: 27.7192103,
          longitude: 85.2955242,
          latitudeDelta: 0.0053,
          longitudeDelta: 0.0044,
        },
        hotels: [
          {
            id: '3',
            name: 'Butwal Valley View',
            image: require('../assests/images/hotel.png'),
            price: 1000,
            rate: 7,
            latlng: {
              latitude: 27.7192103,
              longitude: 85.2955242,
            },
          },
        ],
      },
    ],
  },
];
