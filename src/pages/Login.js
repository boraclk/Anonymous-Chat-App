import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { images, colors, fonts } from 'res';
import { Actions } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react';

@inject('authStore')
@observer
class Login extends Component {

  login = () => {
    Actions.onlineUsers();
  };

  render() {
    return (
      <ImageBackground style={styles.backgroundImage} source={images.loginImage}>
        <Image source={images.loginLogo} style={styles.logoStyle} resizeMode={'stretch'}/>
        <View style={styles.welcomeTextDirection}>
          <Text style={styles.welcomeText}>Welcome The</Text>
          <Text style={styles.welcomeText}>Anonymous Chat</Text>
        </View>
        <StatusBar hidden={true}/>
        <View>
          <Button
            containerStyle={styles.loginButtonContainer}
            buttonStyle={{ borderRadius: 50, backgroundColor: colors.black50 }}
            titleStyle={styles.buttonText}
            title="ENTER"
            onPress={this.login}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default Login;
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: fonts.AnthemofNarasi,
    fontSize: 27,
  },
  welcomeTextDirection: {
    marginTop: 30,
    alignItems: 'center',
  },
  loginButtonContainer: {
    width: 300,
    marginTop: 50,
    backgroundColor: colors.black50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3,
  },
  logoStyle: {
    width: 200,
    height: 175,
    marginTop: 100,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
  },
});
