import React from 'react';
import { Image, View, SafeAreaView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './SplashScreenStyle';
import { Helpers } from 'App/Theme';
import Images from '../../Theme/Images';
import { Text } from '../../Components/Text';
import Colors from '../../Theme/Colors';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <>
        <StatusBar
          backgroundColor={Colors.transparent}
          barStyle="dark-content"
          translucent={true}
        />
        <SafeAreaView style={styles.container}>
          <LinearGradient
            style={[Helpers.fillCenter, styles.container]}
            colors={['#3CB2E3', '#1C7AC3']}
          >
            <View style={[styles.logoOval]}>
              <View style={[styles.logoOval, styles.oval1]}>
                <View style={[styles.logoOval, styles.oval2]}>
                  <View style={[styles.logoOval, styles.oval3]}>
                    <Image style={styles.logo} source={Images.logo} />
                  </View>
                </View>
              </View>
            </View>
            <Text color={Colors.white} size={36} weight={'bold'} style={styles.name}>
              Artery Pay
            </Text>
            <Text color={Colors.white} weight={'medium'}>
              Pay | Send | Receive
            </Text>
          </LinearGradient>
        </SafeAreaView>
      </>
    );
  }
}
