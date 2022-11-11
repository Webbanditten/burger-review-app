import {Navio} from 'rn-navio';

import {Main} from './main';
import {Playground} from './playground';
import {Settings} from './settings';
import {Example} from './_screen-sample';

import {useAppearance} from '../utils/hooks';
import {screenDefaultOptions, tabDefaultOptions, getTabBarIcon} from '../utils/designSystem';
import RestaurantsScreen from './restaurants/Restaurants.screen';

// NAVIO
export const navio = Navio.build({
  screens: {
    RestaurantsScreen,
    Settings,
    Example,
    Playground: {
      component: Playground,
      options: () => ({
        title: 'Playground',
      }),
    },
  },
  stacks: {
    RestaurantsStack: ['RestaurantsScreen', 'Example'],
    ExampleStack: ['Example'],
  },
  tabs: {
    RestaurantsTab: {
      stack: 'RestaurantsStack',
      options: {
        title: 'Restaurants',
        tabBarIcon: getTabBarIcon('MainTab'),
      },
    },
    SettingsTab: {
      stack: ['Settings'],
      options: () => ({
        title: 'Settings',
        tabBarIcon: getTabBarIcon('SettingsTab'),
      }),
    },
  },
  modals: {
    ExampleModal: 'ExampleStack',
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
