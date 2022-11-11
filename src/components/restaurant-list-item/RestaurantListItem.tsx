import React from 'react';
import {Image, Text, View, ViewProps} from 'react-native-ui-lib';
import {getNavigationTheme} from '../../utils/designSystem';
import Restaurant from '../../utils/types/data/Restaurant';

export const RestaurantListItem = (props: Restaurant) => {
  const theme = getNavigationTheme();
  return (
    <View
      margin-s2
      bg-bgColor
      style={{
        borderRadius: 20,
        borderColor: theme.colors.border,
        borderWidth: 1,
        flexDirection: 'row',
      }}
    >
      <Image
        source={{uri: props.image}}
        style={{width: 120, height: 120, borderRadius: 20}}
        resizeMode="contain"
      />
      <View padding-s2>
        <Text style={{}} textColor text50R>
          {props.name}
        </Text>

        <Text textColor text70R>
          {props.description}
        </Text>
      </View>
    </View>
  );
};
