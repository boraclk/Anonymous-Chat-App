import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';

class AuthStore {
  @observable username;
  @observable phone;
  @observable user;
  @observable messages;
  rooms = [];

  constructor() {
    this.username = null;
    this.phone = null;
    this.messages = null;
  }

  @action
  setUsername = username => {
    this.username = username;
  };
  @action
  setPhone = phone => {
    this.phone = phone;
  };
  @action
  setUserDatabase = () => {
    const ref = firebase.firestore().collection('users');
    ref.doc(this.phone).set({
      username: this.username,
    });
  };
  @action
  setRoomDatabase = name => {
    const ref = firebase.firestore().collection('messages');
    ref.doc(name).set({
      name: name,
      textMessage: [],
    });
  };
  @action
  setMessageDatabase = message => {
    const ref = firebase.firestore().collection('messages');
    ref.doc('Room1').update({
      textMessage: firebase.firestore.FieldValue.arrayUnion(message),
    });
  };
  @action
  loadRoomsDatabase = async () => {
    this.rooms = [];
    const querySnapshot = await firebase.firestore().collection('messages').get();
    querySnapshot.forEach((documentSnapshot) => {
      this.rooms.push(documentSnapshot.data());
    });
  };

}

const authStore = new AuthStore();

export default authStore;
export { AuthStore };
