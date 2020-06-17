import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, WebView } from 'react-native';
import { ListItem, Overlay, Input } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { colors, fonts } from 'res';

import Icon from 'react-native-vector-icons/MaterialIcons';

@inject('authStore')
@observer
class Rooms extends Component {
  state = {
    roomName: '',
    isVisible: false,
  };
  addRoom = async () => {
    const { authStore } = this.props;
    const { roomName } = this.state;
    authStore.setRoomDatabase(roomName);
    await authStore.loadRoomsDatabase();
    this.setState({ isVisible: false });
  };

  render() {
    const { authStore } = this.props;
    return (
      <View>
        <StatusBar hidden={true}/>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor={colors.brightSkyBlue}
          onBackdropPress={() => this.setState({ isVisible: false })}
          width="auto"
          height="auto"
          overlayStyle={styles.overlayContainer}
        >
          <View style={styles.overlayIn}>
            <Input
              placeholder="Enter the Room Name"
              containerStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainer}
              placeholderTextColor={colors.white}
              value={this.state.roomName}
              onChangeText={(roomName) => this.setState({ roomName })}
            />
            <TouchableOpacity style={styles.overlayButton} onPress={this.addRoom}>
              <Text style={styles.addRoomButtonText}>Add Room</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <View style={styles.header}>
          <Text style={styles.headerTitleText}>Rooms ({authStore.rooms.length})</Text>
          <TouchableOpacity style={styles.addRoomButton} onPress={() => this.setState({ isVisible: true })}>
            <Icon
              name={'library-add'}
              size={20}
              color={colors.white}
            />
            <Text style={styles.addRoomButtonText}>Add Room</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.listDirection}>
          {
            authStore.rooms.map((item, i) => (
                <TouchableOpacity key={i} onPress={() => Actions.chat({
                  message: item.textMessage,
                  roomName: item.name,
                })
                }>
                  <ListItem
                    key={i}
                    title={item.name}
                    subtitle={item.textMessage[item.textMessage.length - 1]}
                    containerStyle={styles.listContainer}
                    titleStyle={styles.listText}
                    subtitleStyle={styles.listMiniText}
                    bottomDivider
                  />
                </TouchableOpacity>
              )
            )
          }
        </ScrollView>
      </View>
    );
  }
}

export default Rooms;
const styles = StyleSheet.create({
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
    marginLeft: 60,
  },
  addRoomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 15,
    width: 150,
    marginLeft: 70,
  },
  addRoomButtonText: {
    color: colors.white,
    fontFamily: fonts.avenirMedium,
    fontSize: 16,
    marginLeft: 5,
  },
  listDirection: {
    marginTop: 10,
  },
  listContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 6,
  },
  listText: {
    marginLeft: 15,
    fontFamily: fonts.avenirMedium,
    fontWeight: 'bold',
  },
  listMiniText: {
    marginTop: 5,
    marginLeft: 15,
    fontFamily: fonts.avenirMedium,
    fontWeight: 'bold',
    color: colors.black50,
  },
  inputStyle: {
    width: 300,
  },
  inputContainer: {
    borderColor: colors.white,
  },
  overlayContainer: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: colors.brightBlue60,
  },
  overlayIn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 15,
    height: 40,
    width: 150,
    marginTop: 20,
  },
});
