'use strict';
import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import Review from './Review';

class CameraView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref = {(cam) => {this.camera = cam;}}
          style = {styles.preview}
          aspect = {Camera.constants.Aspect.Fill}
          captureTarget = {Camera.constants.CaptureTarget.disk}
        >
          <Text style={styles.review} onPress={this.reviewPictures.bind(this)}>[REVIEW]</Text>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {

        var photoList = this.state ? this.state.photos : [];

        photoList.push(data);
        this.setState({
          photos: photoList
        });

        console.log(this.state);
      })
      .catch(err => console.error(err));
  }

  reviewPictures() {
    this.props.navigator.push({
      component: Review,
      passProps: {
        photos: this.state.photos
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  review: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
});

export default CameraView;