import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//data
import {cities} from '../constants/dummyData';
//custom Button
import CustomButton from '../components/CustomButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cityWidth = windowWidth / 3;
const placesWidth =
  Platform.OS === 'ios' ? windowWidth / 1.25 : windowWidth / 1.2;
const emptyWidth = (windowWidth - placesWidth) / 2;

const Home = ({navigation}) => {
  //State
  const [city, setCity] = useState([{id: -1}, ...cities, {id: -2}]);
  const [place, setPlace] = useState([{id: -1}, ...cities[0].places, {id: -2}]);
  const [placesScrollPosition, setPlacesScrollPosition] = useState(0);
  //console.log('placeArray', place);
  //console.log('placesScrollPosition', placesScrollPosition);

  //Horizontal Scroll
  const cityScrollX = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const placesScrollX = useRef(new Animated.Value(0)).current;

  //Explore Button Handler
  const exploreButtonHandler = () => {
    //Get places current index i.e currently selected page
    const currentPosition = parseInt(placesScrollPosition, 10) + 1;
    //console.log('homeSelectedPlace', place[currentPosition]);
    //Navigate to next screen
    navigation.navigate('About', {
      selectedPlace: place[currentPosition],
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/*Header*/}
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
        }}>
        <View style={{flex: 1}}>
          <Ionicons
            name="menu"
            size={30}
            color="black"
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
        {/* 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16}}>Asia</Text>
        </View>
        */}

        <View>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </View>
      </View>
      {/*Cities*/}
      <ScrollView
        contentContainerStyle={{paddingBottom: Platform.OS === 'ios' ? 40 : 0}}>
        <View>
          <Animated.FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false} //scroll view stops on multiples of the scroll views size
            snapToInterval={cityWidth}
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate="normal"
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: cityScrollX}}}],
              {useNativeDriver: false}, //send everything about the animation to native before starting the animation
            )}
            onMomentumScrollEnd={event => {
              //Calculate Position
              var position = ( //i.e scroll end position
                event.nativeEvent.contentOffset.x / cityWidth
              ).toFixed(0);
              setPlace([{id: -1}, ...cities[position].places, {id: -2}]); //before cities[0].places so only first
            }}
            data={city}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) => {
              const opacity = cityScrollX.interpolate({
                //you may want to think about your Animated.Value as going from 0 to 1
                inputRange: [
                  (index - 2) * cityWidth,
                  (index - 1) * cityWidth,
                  index * cityWidth,
                ],
                outputRange: [0.3, 1, 0.3], //opacity
                extrapolate: 'clamp',
              });
              const imageSize = cityScrollX.interpolate({
                inputRange: [
                  (index - 2) * cityWidth,
                  (index - 1) * cityWidth,
                  index * cityWidth,
                ],
                outputRange: [25, Platform.OS == 'ios' ? 80 : 60, 25], //imageSize
                extrapolate: 'clamp',
              });
              const fontSize = cityScrollX.interpolate({
                inputRange: [
                  (index - 2) * cityWidth,
                  (index - 1) * cityWidth,
                  index * cityWidth,
                ],
                outputRange: [10, 20, 10], //fontSize
                extrapolate: 'clamp',
              });
              //1st & last
              if (index == 0 || index == city.length - 1) {
                return <View style={{width: cityWidth}} />;
              } else {
                return (
                  <Animated.View
                    opacity={opacity}
                    style={{
                      height: 115,
                      width: cityWidth,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Animated.Image
                      source={item.image}
                      resizeMode="contain"
                      style={{width: imageSize, height: imageSize}}
                    />
                    <Animated.Text style={{marginTop: 3, fontSize: fontSize}}>
                      <Text>{item.name}</Text>
                    </Animated.Text>
                  </Animated.View>
                );
              }
            }}
          />
        </View>
        {/*Places*/}
        <View style={{height: Platform.OS == 'ios' ? 500 : 400}}>
          <Animated.FlatList
            data={place}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={{alignItems: 'center'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled //scroll view stops on multiples of the scroll views size
            snapToInterval={placesWidth}
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate="normal"
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: placesScrollX}}}],
              {useNativeDriver: false}, //send everything about the animation to native before starting the animation
            )}
            onMomentumScrollEnd={event => {
              //Calculate Position
              const position = (
                event.nativeEvent.contentOffset.x / placesWidth
              ).toFixed(0);
              setPlacesScrollPosition(position);
            }}
            renderItem={({item, index}) => {
              const opacity = placesScrollX.interpolate({
                inputRange: [
                  (index - 2) * placesWidth,
                  (index - 1) * placesWidth,
                  index * placesWidth,
                ],
                outputRange: [0.3, 1, 0.3], //opacity
                extrapolate: 'clamp',
              });
              let activeHeight = 0;
              if (Platform.OS === 'ios') {
                if (windowHeight > 800) {
                  activeHeight = windowHeight / 2;
                } else {
                  //< 800
                  activeHeight = windowHeight / 1.65;
                }
              } else {
                //Android
                activeHeight = windowHeight / 1.6;
              }
              const height = placesScrollX.interpolate({
                inputRange: [
                  (index - 2) * placesWidth,
                  (index - 1) * placesWidth,
                  index * placesWidth,
                ],
                outputRange: [
                  windowHeight / 2.25,
                  activeHeight,
                  windowHeight / 2.25,
                ],
                extrapolate: 'clamp',
              });
              if (index == 0 || index == place.length - 1) {
                return <View style={{width: emptyWidth}} />;
              } else {
                return (
                  <Animated.View
                    opacity={opacity}
                    style={{
                      width: placesWidth,
                      height: height,
                      alignItems: 'center',
                      borderRadius: 20,
                      padding: 10,
                    }}>
                    <Image
                      source={item.image}
                      resizeMode="cover"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}
                    />

                    <CustomButton
                      label="Explore"
                      customStyle={{
                        position: 'absolute',
                        bottom: 0,
                        width: 150,
                        backgroundColor: '#252525',
                      }}
                      onPress={() => exploreButtonHandler()}
                    />
                  </Animated.View>
                );
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
/* 

onPress={() =>
            navigation.navigate('About', {
              screen: 'About',
              params: {userName: name},
            })


            //Navigate to next screen
   navigation.navigate('About', {
      screen: 'About',
      params: {selectedPlace: place[currentPosition]},
    });
*/
