import {runInAction} from 'mobx';
import {stores} from '../../stores';
import Restaurant from '../../utils/types/data/Restaurant';
import Review from '../../utils/types/data/Review';

export class BurgerApi {
  data: Restaurant[] = [];
  fakeDelay = 1000;
  constructor() {
    this.data = [
      {
        id: '1',
        name: 'Gastropub',
        description: 'Bla bla bla',
        image: require('./images/1618737655_421-2753-billund-gastropub.jpeg'),
        longitude: 9.1158,
        latitude: 55.73013,
        address: 'Address 1',
        reviews: [
          {
            id: '1',
            username: 'John',
            review: 'Bla bla bla',
            image: require('./images/reviews/1618737966_244-2753-billund-gastropub.jpg'),
            qualityRating: 4,
            serviceRating: 2,
            priceRating: 3,
          },
          {
            id: '2',
            username: 'John',
            review: 'Bla bla bla',
            image: require('./images/reviews/double-up-gastroburger.jpg'),
            qualityRating: 3,
            serviceRating: 5,
            priceRating: 4,
          },
        ],
      },
      {
        id: '2',
        name: 'Steakhouse',
        description: 'Bla bla bla',
        image: require('./images/photo0jpg.jpeg'),
        longitude: 9.11329,
        latitude: 55.73188,
        address: 'Address 1',
        reviews: [
          {
            id: '1',
            username: 'John',
            review: 'Bla bla bla',
            image: require('./images/reviews/4371021.jpg'),
            qualityRating: 1,
            serviceRating: 4,
            priceRating: 2,
          },
        ],
      },
    ];
  }
  getRestaurants = async (): Promise<Restaurant[]> => {
    const data: Promise<Restaurant[]> = new Promise(resolve =>
      setTimeout(() => resolve(this.data), this.fakeDelay),
    );
    stores.restaurants.set('restaurants', await data);
    return await data;
  };

  addReview = async (restaurantId: string, review: Review): Promise<Review> => {
    const newData = [...stores.restaurants.restaurants];

    newData.forEach((restaurant: Restaurant) => {
      if (restaurant.id === restaurantId) {
        runInAction(() => {
          restaurant.reviews.push(review);
        });
      }
    });

    const data: Promise<Review> = new Promise(resolve =>
      setTimeout(() => resolve(review), this.fakeDelay),
    );
    return await data;
  };
}
