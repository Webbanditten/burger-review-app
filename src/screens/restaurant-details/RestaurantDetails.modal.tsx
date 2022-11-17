import React, {useEffect} from 'react';
// import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';
import {Button, Card, FloatingButton, Icon, Image, Text, View} from 'react-native-ui-lib';
import {NavioScreen} from 'rn-navio';
import {RestaurantListItem} from '../../components/restaurant-list-item';
import {services, useServices} from '../../services';
import {useAppearance} from '../../utils/hooks';
import Restaurant from '../../utils/types/data/Restaurant';
import {ActivityIndicator, Dimensions, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {getNavigationTheme} from '../../utils/designSystem';
import {hexToRgb} from '../../utils/help';
import {Rating} from 'react-native-ratings';
import Reviews from '../../utils/types/data/Review';
import Review from '../../utils/types/data/Review';
import {RestaurantReviewListItem} from '../../components/restaurant-review-list-item';
import MapView, { MapMarker } from 'react-native-maps';
import { RestaurantSubMenu } from '../../components/restaurant-sub-menu';

interface RestaurantViewScreenProps {
  children?: React.ReactNode;
  route?: {
    params: {
      restaurant: Restaurant;
    };
  };
}

const RestauranDetailsModal: NavioScreen = observer((props: RestaurantViewScreenProps) => {
 

  useAppearance();
  const theme = getNavigationTheme();
  const titleColor = hexToRgb(theme.colors.primary);
  const {t, api} = useServices();
  const {navio} = useServices();
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <View flex bg-bgColor>
      <Text>Wat</Text>
    </View>
  );
});

export default RestauranDetailsModal;
