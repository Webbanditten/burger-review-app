import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Rating} from 'react-native-ratings';
import {Card, Text, View} from 'react-native-ui-lib';
import {useServices} from '../../services';
import {getNavigationTheme} from '../../utils/designSystem';
import {useAppearance} from '../../utils/hooks';
import Review from '../../utils/types/data/Review';

export const RestaurantReviewListItem = (props: Review) => {
  const theme = getNavigationTheme();
  const {t} = useServices();
  useAppearance();
  let image: ImageSourcePropType = props.image as ImageSourcePropType;
  if (props.image && typeof props.image === 'string' && props.image.startsWith('file')) {
    image = {uri: props.image};
  }
  return (
    <Card margin-8 style={{backgroundColor: theme.colors.primary}} marginB-8>
      <Card.Section imageSource={image} imageStyle={{height: 120}} />
      <View flex row padding-8 paddingB-0>
        <Text text14 flex style={{color: '#000'}}>
          {props.review}
        </Text>

        <Rating
          imageSize={24}
          readonly
          startingValue={props.qualityRating}
          ratingCount={5}
          tintColor={theme.colors.primary}
          ratingColor={'#000'}
          ratingBackgroundColor={'#fff'}
          type="custom"
        />
      </View>
      <View
        style={{
          paddingBottom: 8,
          paddingRight: 16,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <Text style={{color: '#000'}} flex text14>
          {props.username}
        </Text>
      </View>
    </Card>
  );
};
