import React, { useState } from 'react';
import { View } from 'react-native';
import Button from '../../components/base/Button';
import Divider from '../../components/base/Divider';
import IconButton from '../../components/base/IconButton';
import Text from '../../components/base/Text';
import TextInput from '../../components/base/TextInput';
import Container from '../../components/common/Container';
import styles from './index.styles';

const Home = () => {
  const [text, setText] = useState<string>('');

  return (
    <Container>
      <Text style={styles.title}>Home</Text>
      <Button title="Button" />
      <View style={styles.row}>
        <Text fontSize={17}>IconButton Round: </Text>
        <IconButton round size={30} noBg={false} name="account" />
        <Text fontSize={17}> Square: </Text>
        <IconButton size={30} noBg={false} name="account" />
        <Divider />
      </View>

      <TextInput value={text} onChangeText={setText} />
    </Container>
  );
};

export default Home;
