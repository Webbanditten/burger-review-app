import { useTheme } from '@react-navigation/native';
import React, { ReactChildren } from 'react';
import { StyleSheet } from 'react-native';
import {Button, Chip, Text, View} from 'react-native-ui-lib';
import { useServices } from '../../services';
import {useAppearance} from '../../utils/hooks';
import { Icon } from '../icon';

type RestaurantSubMenuButtonProps = {
  label: string;
  onPress: () => void;
}
type RestaurantSubMenuProps = {
  menu: RestaurantSubMenuButtonProps[];
};
export const RestaurantSubMenu = (props: RestaurantSubMenuProps) => {
  useAppearance();
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      borderTop:0, 
      borderRadius:0
    },
    text: {
      color: "#000"
    }
  });
  return (
    <View row height={64}>
      {props.menu.map((item, index) => {
        return (
          <Button key={item.label} onPress={item.onPress} flex spread style={styles.button}><Text style={styles.text}>{item.label}</Text></Button>
        );
      })}
    
    </View>
  );
};
