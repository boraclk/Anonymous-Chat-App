import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { Input, Divider, ListItem } from 'react-native-elements';
import BackIcon from 'react-native-vector-icons/FontAwesome5';
import SendIcon from 'react-native-vector-icons/FontAwesome';
import { images, colors, fonts } from 'res';
import { Actions } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react';
import firebase from 'react-native-firebase';



@inject('authStore')
@observer
class Chat extends Component {
  state = {
    textMessage: '',
    prevMessages: [],
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({
      title: this.props.roomName,
    });
  }

  componentDidMount() {
    const { authStore } = this.props;
    this.setState({
      prevMessages: this.props.message
    });
  }

  goBack = async () => {
    const { authStore } = this.props;
    await authStore.loadRoomsDatabase();
    Actions.onlineUsers();
  };

  sendMessage = () => {
    const ref = firebase.firestore().collection('messages');
    ref.doc(this.props.roomName).update({
      textMessage: firebase.firestore.FieldValue.arrayUnion(this.state.textMessage),
    });
    ref.doc(this.props.roomName).onSnapshot(async snapshot => {
      const data = {
        ...snapshot.data(),
      };
      this.setState({ prevMessages: data.textMessage });
    });
    this.setState({ textMessage: null });
  };

  render() {
    return (
      <ImageBackground source={images.chattingImage} style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
            <BackIcon
              name={'arrow-left'}
              color={colors.white}
              size={20}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>{this.props.roomName}</Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollResponderScrollToEnd({ animated: true });
            }}>
            {
              this.state.prevMessages.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item}
                    containerStyle={i % 2 ? styles.leftMessage : styles.rightMessage}
                    titleStyle={styles.messageText}
                    bottomDivider
                  />
                )
              )
            }
          </ScrollView>
        </KeyboardAvoidingView>
        <Divider style={{ backgroundColor: 'gray' }}/>
        <View style={styles.inputArea}>
          <Input
            placeholder="Type Message.."
            containerStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            value={this.state.textMessage}
            onChangeText={(textMessage) => this.setState({ textMessage })}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={this.sendMessage}
          >
            <SendIcon
              name="send"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 57,
    backgroundColor: colors.brightSkyBlue60,
  },
  headerTitleText: {
    color: colors.white,
    fontFamily: fonts.avenirMedium,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  leftMessage: {
    borderRadius: 20,
    width: 175,
    marginVertical: 7,
    marginLeft: 15,
  },
  backButton: {
    marginLeft: 20,
  },
  rightMessage: {
    borderRadius: 20,
    width: 175,
    marginVertical: 7,
    marginRight: 15,
    marginLeft: 'auto',

  },
  messageText: {
    fontFamily: fonts.avenirMedium,
    fontSize: 17,
  },
  inputArea: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputStyle: {
    width: 300,
    backgroundColor: 'white',
  },
  sendButton: {
    flex: 1,
    backgroundColor: colors.brightSkyBlue60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
