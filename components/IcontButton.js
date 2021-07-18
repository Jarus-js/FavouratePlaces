import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconButton = ({iconName, onPress, label, customStyle, labelStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        ...customStyle,
      }}>
      <Text
        style={{color: 'blue', fontSize: 24, marginRight: 10, ...labelStyle}}>
        {label}
      </Text>
      <Ionicons name={iconName} size={30} color="blue" />
    </TouchableOpacity>
  );
};

export default IconButton;
