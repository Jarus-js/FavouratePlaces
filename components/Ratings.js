import React from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Ratings = ({rate, containerStyle}) => {
  const starComponents = [];
  for (var i = 0; i < rate; i++) {
    starComponents.push(
      <Ionicons key={i} name="star" size={15} color="#fff" />,
    );
  }
  return (
    <View style={{flexDirection: 'row', ...containerStyle}}>
      {starComponents}
    </View>
  );
};

export default Ratings;
