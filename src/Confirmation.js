'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Confirmation extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 15}}>
          {this.props.saved} photos moved to camera roll
          all photos removed from disk
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
  }
});

export default Confirmation;