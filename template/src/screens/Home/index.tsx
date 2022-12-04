import React, { useState } from 'react';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { View, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../../components/base/Button';
import Divider from '../../components/base/Divider';
import IconButton from '../../components/base/IconButton';
import Text from '../../components/base/Text';
import TextInput from '../../components/base/TextInput';
import Container from '../../components/common/Container';
import styles from './index.styles';
import { devLog } from '../../utils/helpers';
import useTheme from '../../hooks/useTheme';
import showMessage from '../../configs/showMessage';
import ENVIRONMENTS from '../../configs/environments';

const arabic = 'ar';
const english = 'en';
const spanish = 'es';

const Home = () => {
  const [text, setText] = useState<string>('');
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n?.language;

  const changeLanguage = async (newLang: string) => {
    try {
      const langsRTL = [arabic];
      await i18n.changeLanguage(newLang);
      setTimeout(() => {
        if (langsRTL.includes(newLang) && !I18nManager.isRTL) {
          I18nManager.forceRTL(true);
          RNRestart.Restart();
        } else if (I18nManager.isRTL) {
          I18nManager.forceRTL(false);
          RNRestart.Restart();
        }
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      devLog.error(e);
      showMessage({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: e?.message || 'Language Change Failed',
        type: 'danger',
      });
    }
  };

  const toggleSpanish = () =>
    changeLanguage(lang === spanish ? english : spanish);
  const toggleArabic = () => changeLanguage(lang === arabic ? english : arabic);

  return (
    <Container>
      <Text style={styles.title}>Home {'\n\n'}</Text>
      <Text>IconButton:{'\n'}</Text>
      <View style={styles.row}>
        <Text fontSize={17}> {t('round')}: </Text>
        <IconButton round size={30} noBg={false} name="account" />
        <Text fontSize={17}> {t('square')}: </Text>
        <IconButton size={30} noBg={false} name="account" />
        <Divider />
      </View>

      <TextInput value={text} onChangeText={setText} />
      <Button
        onPress={toggleSpanish}
        title={t('changeLangBtn', {
          lang: lang === spanish ? 'English' : 'Spanish ',
        })}
      />
      <Button
        onPress={toggleArabic}
        title={t('changeLangBtn', {
          lang: lang === arabic ? 'English' : 'Arabic ',
        })}
      />

      <Text>{`\n\n${t('greetings.helloUser', { name: 'KASHAN ' })}`}</Text>
      <Text>{t('welcome')}</Text>
      {lang && (
        <Text>
          Language: {i18n?.language} {'\n\n'}
        </Text>
      )}
      <Text style={styles.env}>
        Environment:{' '}
        <Text style={{ color: theme?.colors?.primary }}>
          {ENVIRONMENTS?.ENV}
        </Text>
      </Text>
      <Text>
        {'\n\n'}
        Others Environments:{' '}
        <Text style={{ color: theme?.colors?.primary }}>
          {JSON.stringify(ENVIRONMENTS)}
        </Text>
      </Text>
    </Container>
  );
};

export default Home;
