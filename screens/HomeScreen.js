import React, {useState} from 'react';
// import {Node} from 'react';
import {
  View,
  StyleSheet,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import sampleDesigns from '../data/sampleDesigns';

const HomeScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  //Design Items
  //Rendering sample designs based on these keys
  //Sample design in data-> sampleDesigns.js
  const [items, setItems] = useState([
    {key: 1},
    {key: 2},
    {key: 3},
    {key: 4},
    {key: 5},
  ]);

  //On pressing on a design
  const onPressHandler = key => {
    navigation.navigate('Design', {design: key});
  };

  const onRefresh = () => {};

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6E3CBC']}
          />
        }
        numColumns={2}
        data={items}
        keyExtractor={item => item.key.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              onPressHandler(item.key);
            }}
            style={styles.textView}>
            <View style={styles.textView}>
              <Image
                source={sampleDesigns[item.key - 1]}
                style={styles.sampleDesign}></Image>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.footer} activeOpacity={0.9}>
        <Text style={styles.footerText}>Copyrights @ InstaSell 2021</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    color: '#000000',
    fontSize: 30,
  },
  textView: {
    backgroundColor: '#ECECEC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'column',
    backgroundColor: '#6E3CBC',
    marginBottom: 5,
  },
  sampleDesign: {
    height: 130,
    width: 130,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#6E3CBC',
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
  },
});

export default HomeScreen;

//Color Palette
//#6E3CBC
//#7267CB
//#98BAE7
//#B8E4F0
