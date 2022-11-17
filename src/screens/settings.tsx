import React, {useEffect, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import {Text, View, SegmentedControl, Colors, Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {
  appearances,
  appearancesUI,
  appearanceUIToInternal,
  languages,
  languagesUI,
  languageUIToInternal,
} from '../utils/types/enums';
import {useAppearance} from '../utils/hooks';
import {useStores} from '../stores';
import {services} from '../services';

export const Settings: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {ui} = useStores();

  // State
  const [appearance, setAppearance] = useState(ui.appearance);
  const [language, setLanguage] = useState(ui.language);

  // Computed
  const unsavedChanges = ui.appearance !== appearance || ui.language !== language;

  const appearanceInitialIndex = appearances.findIndex(it => it === appearance);
  const appearanceSegments = appearancesUI.map(it => ({label: it}));

  const languageInitialIndex = languages.findIndex(it => it === language);
  const languageSegments = languagesUI.map(it => ({label: it}));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSave = () => {
    ui.setMany({
      appearance,
      language,
    });
  };
  // Start
  useEffect(() => {
    console.log(unsavedChanges);
    navigation.setOptions({
      headerRight: () => (unsavedChanges ? <Button onPress={handleSave} label="Save" /> : null),
    });
  }, [unsavedChanges, appearance, language, handleSave, navigation]);

  // Methods
  const handleAppearanceIndexChange = (index: number) =>
    setAppearance(appearanceUIToInternal[appearancesUI[index]]);
  const handleLanguageIndexChange = (index: number) =>
    setLanguage(languageUIToInternal[languagesUI[index]]);

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View marginH-16 paddingV-s1>
          <View flex>
            <Text textColor text60R>
              Language
            </Text>
          </View>

          <SegmentedControl
            initialIndex={languageInitialIndex}
            segments={languageSegments}
            backgroundColor={Colors.bgColor}
            activeColor={Colors.primary}
            inactiveColor={Colors.textColor}
            onChangeIndex={handleLanguageIndexChange}
          />
        </View>
      </ScrollView>
    </View>
  );
});
Settings.options = () => ({
  title: services.t.do('settings.title'),
});
