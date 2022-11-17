import React, {useEffect} from 'react';
// import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';
import {
  Button,
  Dialog,
  FloatingButton,
  Incubator,
  PanningProvider,
  Text,
  TextField,
  View,
  Image,
} from 'react-native-ui-lib';
import {NavioScreen} from 'rn-navio';
import {services, useServices} from '../../services';
import {useAppearance} from '../../utils/hooks';
import Restaurant from '../../utils/types/data/Restaurant';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {getNavigationTheme} from '../../utils/designSystem';
import {guidGenerator, hexToRgb} from '../../utils/help';
import Review from '../../utils/types/data/Review';
import {RestaurantReviewListItem} from '../../components/restaurant-review-list-item';
import {Rating} from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';

interface RestaurantViewScreenProps {
  children?: React.ReactNode;
  route?: {
    params: {
      restaurant: Restaurant;
    };
  };
}

const RestaurantReviewsScreen: NavioScreen = observer((props: RestaurantViewScreenProps) => {
  useAppearance();
  const theme = getNavigationTheme();
  const {t, api} = useServices();
  const [showAddReview, setShowAddReview] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const restaurant = props.route?.params.restaurant as Restaurant;
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const _reviews: Review[] = [];
    restaurant.reviews.forEach(review => {
      _reviews.push(review);
    });
    setReviews(_reviews);
  }, [restaurant]);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    } else {
      console.log('You did not select any image.');
    }
  };

  const submitReview = async () => {
    setLoading(true);
    const _review = await api.burgerApi.addReview(restaurant.id, {
      image: selectedImage,
      review: review,
      priceRating: 0,
      qualityRating: rating,
      serviceRating: 0,
      username: 'Patrick',
      id: guidGenerator(),
    });

    setReviews([...reviews, _review]);
    setSelectedImage('');
    setReview('');
    setRating(0);
    setShowAddReview(false);
    setLoading(false);
  };

  const styles = StyleSheet.create({
    addReviewButton: {
      backgroundColor: theme.colors.primary,
      bottom: 20,
      position: 'absolute',
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
  });

  return (
    <View flex bg-bgColor>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        data={reviews}
        renderItem={({item}) => <RestaurantReviewListItem {...item} />}
        estimatedItemSize={2}
      />
      <Dialog
        containerStyle={{}}
        overlayBackgroundColor={theme.colors.background}
        visible={showAddReview}
        onDismiss={() => setShowAddReview(false)}
        panDirection={PanningProvider.Directions.DOWN}
        ignoreBackgroundPress={true}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>
            <View margin-20>
              <Text $textDefault>{t.do('restaurants.reviews.dialog.header')}</Text>
            </View>
            <View height={2} bg-grey70 />
            {selectedImage !== '' && (
              <Image
                marginT-16
                style={{width: '100%', height: 200, borderRadius: 16}}
                source={{uri: selectedImage}}
              />
            )}
            <Button
              marginT-16
              onPress={pickImageAsync}
              label={t.do('restaurants.reviews.dialog.image')}
              style={{backgroundColor: theme.colors.primary}}
            />
            <Text text70 marginT-16>
              {t.do('restaurants.reviews.dialog.rating')}
            </Text>
            <Rating
              style={{marginTop: 16, marginBottom: 16}}
              imageSize={40}
              startingValue={0}
              ratingCount={5}
              tintColor={theme.colors.background}
              ratingColor={theme.colors.primary}
              ratingBackgroundColor={'#fff'}
              type="custom"
              onSwipeRating={rating => setRating(rating)}
              onFinishRating={(_rating: number) => setRating(_rating)}
            />
            <TextField
              text70
              containerStyle={{marginBottom: 16}}
              style={{color: theme.colors.text}}
              floatingPlaceholder
              placeholder={t.do('restaurants.reviews.dialog.review')}
              onChangeText={(text: string) => setReview(text)}
              multiline
              migrate
            />

            <View margin-20 right>
              <Button
                text60
                label={t.do('restaurants.reviews.dialog.submit')}
                link
                linkColor={theme.colors.primary}
                onPress={submitReview}
              />
            </View>
          </ScrollView>
        )}
      </Dialog>

      <FloatingButton
        visible={true}
        button={{
          style: styles.addReviewButton,
          label: t.do('restaurants.reviews.add'),
          onPress: () => setShowAddReview(true),
        }}
      />
    </View>
  );
});

RestaurantReviewsScreen.options = props => ({
  title:
    (props?.route?.params as {restaurant: Restaurant}).restaurant.name +
    services.t.do('restaurants.reviews.title'),
  animation: 'slide_from_right',
});

export default RestaurantReviewsScreen;
