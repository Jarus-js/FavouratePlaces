import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Contact = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>Contact</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Contact;
