'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Switch,
  CameraRoll,
  AlertIOS,
} from 'react-native';

var RNFS = require('react-native-fs');

var Confirmation = require('./Confirmation');

class Review extends Component {

  componentWillMount() {
    this.props.photos.forEach((item) => {
      this.setState({item: false})
    });
  }

  render() {

    let list = this.props.photos.map((item, index) => {
      console.log('creating the list ',index, item);
      return (
        <View key={index} style={{flexDirection: 'row'}}>
          
          <Switch 
            style={{margin: 20}}
            onValueChange={(value) => {
              let newState = {};
              newState[item] = value;
              this.setState(newState)
            }}
            value={this.state[item]}
          />

          <Image
            style={styles.image}
            source={{uri: item, isStatic:true}} />
        </View>
      );
    })

    return (
      <View style={styles.container}>
        <ScrollView 
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollViewContainer}>
          <Text style={{fontSize: 27}}>
            Toggle to save to camera roll:
          </Text>
          {list}
        </ScrollView>
        <Text style={styles.submit} onPress={this.submitPhotos.bind(this)}>[Submit]</Text>
      </View>
    );
  }

  submitPhotos() {

    let saveCounter = 0;

    let navigator = this.props.navigator;

    //submit all the photos to an external API

    this.props.photos.forEach((item) => {
      //save the marked photos to camera roll
      if(this.state[item]) {
        // console.log(item, CameraRoll, CameraRoll.saveImageWithTag);
        CameraRoll.saveImageWithTag(item, () => removePhoto(item));
        saveCounter++;
      }

    });

    //remove all photos from disk
    function removePhoto(photo) {
      RNFS.unlink(photo);
    }


    AlertIOS.alert(`${saveCounter} photos saved to cameraroll`);

  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'column',
    // marginBottom: 40,
  },
  image: {
    margin: 20,
    height: 150,
    width: 150,
  },
  submit: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    // padding: 10,
    margin: 20
  },
});

export default Review;