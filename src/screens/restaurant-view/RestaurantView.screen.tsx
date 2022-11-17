import React from 'react';
import {observer} from 'mobx-react';
import {Image, View} from 'react-native-ui-lib';
import {NavioScreen} from 'rn-navio';
import {useServices} from '../../services';
import {useAppearance} from '../../utils/hooks';
import Restaurant from '../../utils/types/data/Restaurant';
import {Dimensions, StyleSheet} from 'react-native';
import {getNavigationTheme} from '../../utils/designSystem';
import {Rating} from 'react-native-ratings';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {RestaurantSubMenu} from '../../components/restaurant-sub-menu';

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
  const {t} = useServices();
  const {navio} = useServices();

  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      flex: 1,
    },
  });

  const coordinates = {
    longitude: restaurant.longitude,
    latitude: restaurant.latitude,
  };

  const calculatedRating = () => {
    let total = 0;
    restaurant.reviews.forEach(review => {
      total += review.qualityRating;
    });
    return total / restaurant.reviews.length;
  };

  return (
    <View flex bg-bgColor>
      <View>
        <Image source={restaurant?.image} style={{width: '100%', height: 200}} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            borderBottomLeftRadius: 10,
            backgroundColor: theme.colors.primary,
            height: 32,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          <Rating
            imageSize={28}
            readonly
            startingValue={calculatedRating()}
            ratingCount={5}
            tintColor={theme.colors.primary}
            ratingColor={'#000'}
            ratingBackgroundColor={'#fff'}
            type="custom"
          />
        </View>
      </View>

      <RestaurantSubMenu
        menu={[
          {
            label: t.do('restaurants.menu.details'),
            onPress: () => null,
          },
          {
            label: t.do('restaurants.menu.reviews'),
            onPress: () => navio.push('RestaurantReviewsScreen', {restaurant: restaurant}),
          },
        ]}
      />
      <MapView
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        <Marker key="0" coordinate={coordinates} title={restaurant.name} />
      </MapView>
    </View>
  );
});

RestaurantViewScreen.options = props => ({
  title: (props?.route?.params as {restaurant: Restaurant}).restaurant.name,
  animation: 'slide_from_right',
});

export default RestaurantViewScreen;
