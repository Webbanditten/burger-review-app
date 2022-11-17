import {Navio} from 'rn-navio';
import {Settings} from './settings';

import {useAppearance} from '../utils/hooks';
import {screenDefaultOptions, tabDefaultOptions, getTabBarIcon} from '../utils/designSystem';
import RestaurantsScreen from './restaurants/Restaurants.screen';
import {services} from '../services';
import RestaurantViewScreen from './restaurant-view/RestaurantView.screen';
import RestaurantReviewsScreen from './restaurant-reviews/RestaurantReviews.screen';
import RestaurantDetailsModal from './restaurant-details/RestaurantDetails.modal';

// NAVIO
export const navio = Navio.build({
  screens: {
    RestaurantsScreen,
    RestaurantViewScreen,
    RestaurantReviewsScreen,
    Settings,
    RestaurantDetailsModal,
  },
  stacks: {
    RestaurantsStack: ['RestaurantsScreen', 'RestaurantViewScreen', 'RestaurantReviewsScreen'],
    ModalStack: ['RestaurantDetailsModal'],
  },
  tabs: {
    RestaurantsTab: {
      stack: 'RestaurantsStack',
      options: {
        title: services.t.do('restaurants.title'),
        tabBarIcon: getTabBarIcon('MainTab'),
      },
    },
    SettingsTab: {
      stack: ['Settings'],
      options: () => ({
        title: services.t.do('settings.title'),
        tabBarIcon: getTabBarIcon('SettingsTab'),
      }),
    },
  },
  modals: {
    RestaurantDetails: 'ModalStack',
  },
  root: 'Tabs',
  hooks: [useAppearance],
  options: {
    stack: screenDefaultOptions,
    tab: tabDefaultOptions,
  },
});

export const getNavio = () => navio;
export const AppRoot = navio.Root;
