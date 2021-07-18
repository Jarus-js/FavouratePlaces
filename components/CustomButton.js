import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = ({onPress, label, customStyle, labelStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        ...customStyle,
      }}>
      <Text style={{fontSize: 24, color: '#fff', ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
