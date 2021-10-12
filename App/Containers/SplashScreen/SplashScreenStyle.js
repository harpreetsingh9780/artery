import { StyleSheet } from 'react-native';
import { Colors } from 'App/Theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  logoOval: {
    height: 240,
    width: 240,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  oval1: {
    height: 200,
    width: 200,
  },
  oval2: {
    height: 160,
    width: 160,
  },
  oval3: {
    height: 120,
    width: 120,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 67,
    height: 47,
    borderWidth: 1,
  },
  name: {
    marginTop: 15,
  },
});
