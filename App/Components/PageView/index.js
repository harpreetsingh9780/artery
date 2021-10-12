import React from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    minHeight: 250,
  },
  container: {
    flex: 1,
  },
  containerPadding: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export function PageView({ header, footer, refreshControl, children }) {
  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" translucant={false} />
      <SafeAreaView style={styles.pageWrapper}>
        <LinearGradient style={[styles.pageWrapper]} colors={[Colors.white, Colors.gray]}>
          {header}
          <ScrollView style={styles.scrollView} refreshControl={refreshControl}>
            <View style={[styles.container, styles.containerPadding]}>{children}</View>
          </ScrollView>
          {footer}
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

PageView.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  refreshControl: PropTypes.node,
};

PageView.defaultProps = {
  header: null,
  footer: null,
};

export function PageViewFull({ header, footer, children }) {
  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" translucant={false} />
      <SafeAreaView style={styles.pageWrapper}>
        {header}
        <View style={styles.container}>{children}</View>
        {footer}
      </SafeAreaView>
    </>
  );
}

PageViewFull.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

PageViewFull.defaultProps = {
  header: null,
  footer: null,
};
