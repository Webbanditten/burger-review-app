import React from 'react';
import {Image, Text, View, ViewProps} from 'react-native-ui-lib';
import {getNavigationTheme} from '../../utils/designSystem';
import { hexToRgb } from '../../utils/help';
import Restaurant from '../../utils/types/data/Restaurant';

export const RestaurantListItem = (props: Restaurant) => {
  const theme = getNavigationTheme();
  const titleColor = hexToRgb(theme.colors.primary);
  return (
    <View
      margin-s2
      bg-bgColor
      style={{
        flexDirection: 'row',
      }}
    >
      <Image
        source={props.image}
        style={{width: '100%', height: 180, borderRadius: 20}}
        resizeMode="cover"
      />
      <View
        padding-s2
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: `rgba(${titleColor?.r},${titleColor?.g},${titleColor?.b},0.8)`,
        }}
      >
        <Text textColor margin-s1 text50R>
          {props.name}
        </Text>
      </View>
    </View>
  );
};
