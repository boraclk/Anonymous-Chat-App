import React from 'react';
import { StyleSheet } from 'react-native';
import { Lightbox, Router, Scene, Tabs } from 'react-native-router-flux';
import { TabIcon } from '~/components/navigation';
import { LoginScreen, ChatScreen, UsersScreen } from '~/pages';
import { colors, fonts } from 'res';
import { AlertLightBox } from '~/components/modals';
import * as stores from '~/store';
import { Provider } from 'mobx-react';
import CustomAlert from '~/components/modals/CustomAlert';


export default class App extends React.Component {
  async componentDidMount(): void {
    await stores.authStore.loadRoomsDatabase();
  }


  render() {
    return (
      <Provider {...stores}>
        <Router
          navigationBarStyle={styles.navigationBar}
          sceneStyle={styles.scene}
          tabBarStyle={styles.tabBar}
          titleStyle={styles.title}
          tintColor={colors.white}
          headerTintColor={colors.white}>
          <Lightbox key="lightbox" hideNavBar>
            <Scene key="root">
              <Scene key={'login'} component={LoginScreen} hideNavBar/>
              <Scene key={'onlineUsers'} component={UsersScreen} hideNavBar/>
              <Scene key={'chat'} component={ChatScreen} hideNavBar

              />
              <Tabs icon={TabIcon} showLabel={false} hideNavBar={false}>
                <Scene key={'onlineUsers'} component={UsersScreen} hideNavBar/>
              </Tabs>
              <Scene key="alert" headerLayoutPreset="center" component={AlertLightBox}/>
              <Scene key="customAlert" headerLayoutPreset="center" component={CustomAlert}/>
            </Scene>
          </Lightbox>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scene: { backgroundColor: colors.background },
  tabBar: { backgroundColor: colors.lightGray },
  navigationBar: {
    backgroundColor: colors.brightSkyBlue60,
  },
  chatTitleStyle: {
    color: colors.white,
    fontFamily: fonts.avenirMedium,
  },
});
