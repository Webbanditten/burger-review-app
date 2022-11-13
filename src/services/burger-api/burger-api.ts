// import {stores} from '../../stores';

import Restaurant from '../../utils/types/data/Restaurant';

const data: Restaurant[] = [
  {
    id: '1',
    name: 'Gastropub',
    description: 'Bla bla bla',
    image: require('./images/1618737655_421-2753-billund-gastropub.jpeg'),
    longitude: 0,
    latitude: 0,
    address: 'Address 1',
  },
  {
    id: '2',
    name: 'Steakhouse',
    description: 'Bla bla bla',
    image: require('./images/photo0jpg.jpeg'),
    longitude: 0,
    latitude: 0,
    address: 'Address 1',
  }
];

const fakeDelay = 1000;

export class BurgerApi {
  getRestaurants = async (): Promise<Restaurant[]> => {
    return new Promise(resolve => 
      setTimeout(() => resolve(data), fakeDelay)
    );
  };
}
