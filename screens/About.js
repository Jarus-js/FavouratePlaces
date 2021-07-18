import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import mapStyle from '../styles/MapStyle';

//Components
import HeaderBar from '../components/HeaderBar';
import IconButton from '../components/IcontButton';
import Ratings from '../components/Ratings';

const About = ({navigation, route}) => {
  //console.log('Route', route);
  const [choosenPlace, setChoosenPlace] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [allowDragging, setAllowDragging] = useState(true);

  const _draggedValue = useRef(new Animated.Value(0)).current;
  let _panel = useRef(null);
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    const {selectedPlace} = route.params;
    //console.log('aboutSelectedPlace', selectedPlace);
    setChoosenPlace(selectedPlace);

    //Listener that will disable panel dragging whenever mapView is shown
    _draggedValue.addListener(valueObj => {
      //panel open
      if (valueObj.value > windowHeight) {
        setAllowDragging(false);
      }
    });
    return () => {
      _draggedValue.removeAllListeners();
    };
  }, []);
  //console.log('AboutchoosenPlace', choosenPlace);
  console.log('selectedHotel', selectedHotel);
  const image = choosenPlace ? choosenPlace.image : null;
  return (
    <>
      <ImageBackground
        source={image}
        style={{width: '100%', height: '100%', position: 'absolute'}}>
        <HeaderBar
          title=""
          leftOnPressed={() => navigation.goBack()}
          right={false}
        />
        {/*Name & rating*/}
        <View
          style={{
            backgroundColor: '#ced2cb',
            position: 'absolute',
            bottom: 50,
            right: 0,
            left: 0,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>
              {choosenPlace?.name}
            </Text>
          </View>
          {/*Description*/}
          <Text style={{marginTop: 10, color: '#fff', fontSize: 16}}>
            {choosenPlace?.description}
          </Text>
        </View>
        {/*Map*/}
        <SlidingUpPanel
          ref={c => {
            _panel = c;
          }}
          allowDragging={allowDragging}
          animatedValue={_draggedValue}
          draggableRange={{top: windowHeight + 120, bottom: 120}} //Boundary limits for draggable area.
          showBackdrop={false}
          snappingPoints={[windowHeight + 120]}
          height={windowHeight + 120}
          friction={0.7} //Height of panel. Typically this should equal to the top value of draggablerange
          onBottomReached={() => setAllowDragging(true)}>
          <View style={{flex: 1, backgroundColor: 'transparent'}}>
            {/*Panel Header*/}
            <View
              style={{
                backgroundColor: 'transparent',
                height: 120,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 32,
              }}>
              <Ionicons name="chevron-up" size={30} color="#fff" />
              <Text style={{color: '#fff', fontWeight: 'bold'}}>SWIPE UP</Text>
            </View>
            {/*Panel Detail*/}
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MapView
                style={{width: '100%', height: '100%'}}
                provider={PROVIDER_GOOGLE}
                initialRegion={choosenPlace?.mapInitialRegion}
                customMapStyle={mapStyle}>
                {choosenPlace?.hotels.map((hotel, index) => (
                  <Marker
                    key={index}
                    coordinate={hotel.latlng}
                    identifier={hotel.id}
                    onPress={() => {
                      setSelectedHotel(hotel);
                    }}>
                    <Ionicons
                      name={
                        selectedHotel?.id == hotel.id
                          ? 'location'
                          : 'location-outline'
                      }
                      size={30}
                      color="#fff"
                    />
                  </Marker>
                ))}
              </MapView>
              {/*Header*/}
              <HeaderBar
                title={selectedHotel?.name}
                leftOnPressed={() => _panel.hide()}
                right={false}
                containerStyle={{
                  position: 'absolute',
                  top: 35,
                }}
              />
              {/*Footer i.e Hotel Details*/}
              {selectedHotel && (
                <View
                  style={{position: 'absolute', bottom: 30, left: 0, right: 0}}>
                  <Text style={{color: '#fff', fontSize: 16}}>
                    {selectedHotel?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'gray',
                      borderRadius: 15,
                      margin: 5,
                      padding: 5,
                    }}>
                    <Image
                      source={selectedHotel?.image}
                      resizeMode="cover"
                      style={{height: 120, width: 90, borderRadius: 15}}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#fff'}}>{selectedHotel?.name}</Text>
                      <Ratings
                        containerStyle={{marginTop: 5}}
                        rate={selectedHotel?.rate}
                      />
                      <View style={{marginTop: 10}}>
                        <Text style={{color: '#fff', fontSize: 20}}>
                          {`Rs ${selectedHotel?.price} /Night`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </SlidingUpPanel>
      </ImageBackground>
    </>
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

export default About;
