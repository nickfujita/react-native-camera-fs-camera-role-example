import React, {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import CameraView from './src/Camera';

class CameraDemo extends React.Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute = {{
          title: "camera",
          component: CameraView
        }}
        navigationBarHidden = {true}
      />
    );
  }
};

var styles = StyleSheet.create({
  container:{
    flex: 1
  },
});

AppRegistry.registerComponent('cameraDemo', () => CameraDemo);
