import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useAppearance} from '../../utils/hooks';

export const ListHeader = (props: { title: string }) => {
  useAppearance();

  return (
    <View padding-s2 bg-bgColor>
      <Text text50M textColor>
        {props.title.toUpperCase()}
      </Text>
    </View>
  );
};

