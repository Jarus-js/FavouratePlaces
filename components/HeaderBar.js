import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderBar = ({leftOnPressed, title, right, containerStyle}) => {
  return (
    <View style={{flexDirection: 'row', ...containerStyle}}>
      {/*Back*/}
      <View>
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={leftOnPressed}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      {/*Title*/}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{title}</Text>
      </View>
      {/* Right Icon */}
      <View>
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: right ? 'black' : null,
          }}>
          {right && <Ionicons name="settings" size={30} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;
