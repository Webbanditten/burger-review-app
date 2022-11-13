import React, { useEffect } from 'react';
// import FastImage from 'react-native-fast-image';
import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react';
import { View } from 'react-native-ui-lib';
import { NavioScreen } from 'rn-navio';
import { RestaurantListItem } from '../../components/restaurant-list-item';
import { services, useServices } from '../../services';
import { useAppearance } from '../../utils/hooks';
import Restaurant from '../../utils/types/data/Restaurant';
import { ActivityIndicator, RefreshControl, ScrollView, Text } from 'react-native';
import { getNavigationTheme } from '../../utils/designSystem';

const RestaurantsScreen: NavioScreen = observer(() => {
  useAppearance();
  const { t, api } = useServices();
  const theme = getNavigationTheme();
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      await getRestaurants()
    }
    fetchRestaurants();
  }, []);

  const getRestaurants = async () => {
    setLoading(true);
    console.log("Wat1")
    await api.burgerApi.getRestaurants().then((restaurants) => { 
      setRestaurants(restaurants); 
      setLoading(false); 
      console.log("Wat2")
    });
  }

  return (
    <View flex bg-bgColor>
      <FlashList
      contentInsetAdjustmentBehavior="automatic"
        data={restaurants}
        renderItem={({item}) => <RestaurantListItem {...item} />}
        estimatedItemSize={2}
        refreshControl={<RefreshControl
          refreshing={loading}
          onRefresh={getRestaurants.bind(this)}
          title={t.do("pullToRefresh")}
          tintColor="#fff"
          titleColor="#fff"
       />}
      />
    </View>
  );
});

RestaurantsScreen.options = () => ({
  title: services.t.do('restaurants.title'),
});

export default RestaurantsScreen;
