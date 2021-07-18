import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Svg, {Path} from 'react-native-svg';

//Screens
import Home from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contact';

const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        //headerTitle: () => {},
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="About" component={About} />
      <HomeStack.Screen name="Contact" component={Contact} />
    </HomeStack.Navigator>
  );
};

/*
const AboutStack = createStackNavigator();
const ContactStack = createStackNavigator();
const AboutScreen = ({navigation}) => {
  return (
    <AboutStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AboutStack.Screen name="About" component={Home} />
    </AboutStack.Navigator>
  );
};

const ContactScreen = ({navigation}) => {
  return (
    <ContactStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ContactStack.Screen name="Contact" component={Home} />
    </ContactStack.Navigator>
  );
};

*/

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  //if particular tabBarButton is selected we return svg else touchableOpacity
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            top: -10,
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: '#fff',
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const TabBarNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Contact') {
          iconName = focused ? 'call' : 'call-outline';
        } else {
          iconName = focused
            ? 'information-circle'
            : 'information-circle-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={24} color="#252525" />;
      },
    })}
    tabBarOptions={{
      showLabel: false,
      style: {
        //for making tab bar transparent
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 0,
      },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="About"
      component={HomeScreen}
      options={{
        tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Contact"
      component={HomeScreen}
      options={{
        tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabBarNavigator} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
