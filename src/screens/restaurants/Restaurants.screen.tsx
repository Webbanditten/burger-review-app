import React, {useMemo} from 'react';
import {Image} from 'react-native';
// import FastImage from 'react-native-fast-image';
import {Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';
import {useAppearance} from '../../utils/hooks';
import Restaurant from '../../utils/types/data/Restaurant';
import {ListHeader} from '../../components/list-header';
import {RestaurantListItem} from '../../components/restaurant-list-item';
import {NavioScreen} from 'rn-navio';
import {services, useServices} from '../../services';
import {Rating} from 'react-native-ratings';
import { themeColors } from 'react-native-ui-lib/src/style/colorsPalette';
import { getNavigationTheme } from '../../utils/designSystem';

const RestaurantsScreen: NavioScreen = observer(() => {
  useAppearance();
  const { t } = useServices();

  const data: Restaurant[] = [
    {
      id: '1',
      name: 'Restaurant 1',
      description: 'Restaurant 1 description',
      image: 'https://picsum.photos/200?image=1',
      longitude: 0,
      latitude: 0,
      address: 'Address 1',
    }
  ];

  return (
    <View flex bg-bgColor>
      <FlashList
        contentInsetAdjustmentBehavior="always"
        data={data}
        renderItem={({item}) => <RestaurantListItem {...item} />}
        ListHeaderComponent={<ListHeader title={t.do('restaurants.list.title')} />}
        estimatedItemSize={1}
      />
    </View>
  );
});

RestaurantsScreen.options = () => ({
  title: services.t.do('restaurants.title'),
});

export default RestaurantsScreen;
