import {Navio} from 'rn-navio';

import {Main} from './main';
import {Playground} from './playground';
import {Settings} from './settings';
import {Example} from './_screen-sample';

import {useAppearance} from '../utils/hooks';
import {screenDefaultOptions, tabDefaultOptions, getTabBarIcon} from '../utils/designSystem';
import RestaurantsScreen from './restaurants/Restaurants.screen';
import { services } from '../services';
import RestaurantViewScreen from './restaurant-view/RestaurantView.screen';

// NAVIO
export const navio = Navio.build({
  screens: {
    RestaurantsScreen,
    RestaurantViewScreen,
    Settings
  },
  stacks: {
    RestaurantsStack: ['RestaurantsScreen', 'RestaurantViewScreen']
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
  root: 'Tabs',
  hooks: [useAppearance],
  options: {
    stack: screenDefaultOptions,
    tab: tabDefaultOptions,
  },
});

export const getNavio = () => navio;
export const AppRoot = navio.Root;
