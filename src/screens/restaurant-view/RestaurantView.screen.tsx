import React, {useEffect} from 'react';
// import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';
import {Card, FloatingButton, Image, Text, View} from 'react-native-ui-lib';
import {NavioScreen} from 'rn-navio';
import {RestaurantListItem} from '../../components/restaurant-list-item';
import {services, useServices} from '../../services';
import {useAppearance} from '../../utils/hooks';
import Restaurant from '../../utils/types/data/Restaurant';
import {ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import {getNavigationTheme} from '../../utils/designSystem';
import {hexToRgb} from '../../utils/help';
import { Rating } from 'react-native-ratings';
import Reviews from '../../utils/types/data/Review';
import Review from '../../utils/types/data/Review';

interface RestaurantViewScreenProps {
  children?: React.ReactNode;
  route?: {
    params: {
      restaurant: Restaurant;
    };
  };
}

const RestaurantViewScreen: NavioScreen = observer((props: RestaurantViewScreenProps) => {
  const restaurant = props.route?.params.restaurant as Restaurant;
  
  useAppearance();
  const theme = getNavigationTheme();
  const titleColor = hexToRgb(theme.colors.primary);
  const {t, api} = useServices();
  const {navio} = useServices();
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [loading, setLoading] = React.useState(false);

  const reviews = () => {
    let _reviews: Review[] = [];
    restaurant.reviews.forEach((review) => { _reviews.push(review) });
    return _reviews;
  }

  return (
    <View flex bg-bgColor>
      <View>
        <Image source={restaurant?.image} style={{width: '100%', height: 200}} />
        <View
          padding-s2
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: `rgba(${titleColor?.r},${titleColor?.g},${titleColor?.b},0.8)`,
          }}
        >
          <Text margin-s1 style={{color: "#000"}}>
            {restaurant.address}
          </Text>
        </View>
      </View>
      <FlashList
      ListHeaderComponent={<Text>Reviews</Text>}
      contentInsetAdjustmentBehavior="automatic"
        data={reviews()}
        renderItem={({item}) => <Card  margin-s2 style={{backgroundColor: theme.colors.primary}} marginB-s4 >
          <Card.Section imageSource={item.image} imageStyle={{height: 120}}/>
          <Text text14 style={{color: "#000"}}>Something here</Text>
       <Rating imageSize={24} readonly startingValue={item.qualityRating} ratingCount={5} tintColor={theme.colors.primary} ratingColor={"#000"} ratingBackgroundColor={"#fff"}  type="custom"   />
        
      </Card>}
        estimatedItemSize={2}
      />
      <FloatingButton  visible={1}  button={{label: 'Approve', onPress: () => console.log('approved')}}/>
    </View>
  );
});

RestaurantViewScreen.options = props => ({
  title: (props?.route?.params as {restaurant: Restaurant}).restaurant.name,
  animation: 'slide_from_right',
});

export default RestaurantViewScreen;
