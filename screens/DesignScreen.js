import React, {useState, useRef} from 'react';
// import {Node} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  PermissionsAndroid,
  useWindowDimensions,
} from 'react-native';

import ViewShot, {captureRef} from 'react-native-view-shot';
import CameraRoll, {saveImageWithTag} from '@react-native-community/cameraroll';
import backgroundData from '../data/backgroundData';
import Share from 'react-native-share';

const DesignScreen = ({route}) => {
  //State variables for the entered data
  const [enteredLogo, setEnteredLogo] = useState('');
  const [enteredHeading, setEnteredHeading] = useState('');
  const [enteredSubHeading, setEnteredSubHeading] = useState('');

  //Height and width to set the image to full width of the screen.
  const {height, width} = useWindowDimensions();
  const key = route.params.design;

  //For viewshot
  const cardRef = useRef();

  //Destructuring template data from the background data
  //Find it in data->backgroundData.js
  const {
    background,
    logoFont,
    logoAlign,
    logoColor,
    logoSize,
    headingFont,
    headingColor,
    headingSize,
    headingText,
    subHeadingSize,
    subHeadingFont,
    subHeadingText,
    subHeadingPadding,
  } = backgroundData[key - 1];

  //Checking for the save permission
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  //Saving the image after checking for permission
  const savePicture = async tag => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(tag);
    ToastAndroid.showWithGravityAndOffset(
      'Saved',
      1000,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
  };

  //Capturing the screenshot using view shot library
  const captureView = async () => {
    try {
      const result = await captureRef(cardRef, {
        result: 'tmpfile',
        quality: 1,
        format: 'png',
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Save Image Handler
  const saveImageHandler = async () => {
    ToastAndroid.showWithGravityAndOffset(
      'Saving to Gallery..',
      1000,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
    const result = await captureView();
    savePicture(result);
  };

  //Share Image Handler
  const shareImageHandler = async () => {
    const result = await captureView();
    //Sharing the image with headling as message
    try {
      await Share.open({
        message: enteredHeading,
        url: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Passing the destructured data into respective fields
  return (
    <>
      <ScrollView>
        <ViewShot ref={cardRef} style={styles({}).imageView}>
          <ImageBackground
            source={background}
            style={styles({}).designImage}
            resizeMethod="scale">
            <View
              style={{
                width: '100%',
                height: width,
              }}>
              <TextInput
                style={styles({logoFont, logoAlign, logoColor, logoSize}).logo}
                placeholder="InstaSell"
                multiline
                onChangeText={value => setEnteredLogo(value)}
                caretHidden
              />
              <View style={styles({}).headingView}>
                <TextInput
                  style={
                    styles({headingFont, headingSize, headingColor}).heading
                  }
                  placeholder={headingText}
                  multiline
                  onChangeText={value => setEnteredHeading(value)}
                  caretHidden
                />
                <TextInput
                  style={
                    styles({
                      headingColor,
                      subHeadingSize,
                      subHeadingFont,
                      subHeadingPadding,
                    }).subHeading
                  }
                  placeholder={subHeadingText}
                  multiline
                  onChangeText={value => setEnteredSubHeading(value)}
                  caretHidden
                />
              </View>
            </View>
          </ImageBackground>
        </ViewShot>
      </ScrollView>

      <View style={styles({}).buttonGroup}>
        <TouchableOpacity
          style={styles({}).button}
          activeOpacity={0.8}
          onPress={saveImageHandler}>
          <Text style={styles({}).buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles({}).button}
          activeOpacity={0.8}
          onPress={shareImageHandler}>
          <Text style={styles({}).buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = ({
  logoFont = 'Montserrat-Regular',
  logoColor = '#fff',
  logoSize = '13',
  logoAlign = 'left',
  headingFont,
  headingSize = 25,
  headingColor = '#fff',
  subHeadingSize = 15,
  subHeadingFont = 'Montserrat-Bold',
  subHeadingPadding = 30,
}) =>
  StyleSheet.create({
    imageView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginTop: 100,
    },
    designImage: {
      width: '100%',
    },
    logo: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      textAlign: logoAlign,
      fontFamily: logoFont,
      fontSize: logoSize,
      color: logoColor,
    },

    headingView: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-end',
      alignContent: 'center',
      textAlign: 'center',
      color: '#fff',
    },
    heading: {
      color: headingColor,
      fontSize: headingSize,
      fontFamily: headingFont,
      textAlign: 'center',
      paddingBottom: 0,
      marginBottom: 0,
    },
    subHeading: {
      color: headingColor,
      fontSize: subHeadingSize,
      fontFamily: subHeadingFont,
      textAlign: 'center',
      paddingTop: 0,
      paddingBottom: subHeadingPadding,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
    },
    button: {
      width: '40%',
      backgroundColor: '#6E3CBC',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 15,
    },
  });

export default DesignScreen;

//#6E3CBC
//#7267CB
//#98BAE7
//#B8E4F0
