/**
 *
 * Header
 *
 */

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Text } from '../../Components/Text';
import { Colors } from '../../Theme';
import { getSidebarOpen } from '../../Stores/Config/Selectors';
import Images from '../../Theme/Images';
import { ButtonArea } from '../../Components/Button/ButtonArea';
import NavigationService from '../../Services/NavigationService';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  container: {},
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: Colors.blue,
    fontSize: 14,
    lineHeight: 14,
    paddingTop: 2,
    paddingHorizontal: 2,
    flexGrow: 1,
  },
  rightElem: {
    flexGrow: 0,
    flexShrink: 1,
  },
  leftElem: {
    flexGrow: 0,
    flexShrink: 1,
  },
  sidebarOpen_title: {
    opacity: 0,
  },
  sidebarOpen_rightElem: {
    opacity: 0,
  },
});

function Header({
  title,
  onGoBack = null,
  hasHamburgerMenu = false,
  headerRight = null,
  sidebarOpen,
  toggleSidebar,
}) {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.content}>
            {onGoBack && (
              <View style={styles.leftElem}>
                <ButtonArea onPress={onGoBack}>
                  <View>
                    <Image source={Images.backArrowIcon} />
                  </View>
                </ButtonArea>
              </View>
            )}
            {hasHamburgerMenu && (
              <View style={styles.leftElem}>
                <ButtonArea onPress={toggleSidebar}>
                  <View>
                    {sidebarOpen ? (
                      <Image source={Images.closeIcon} />
                    ) : (
                      <Image source={Images.hamburgerMenuIcon} />
                    )}
                  </View>
                </ButtonArea>
              </View>
            )}
            <Text
              style={[styles.title, sidebarOpen ? styles.sidebarOpen_title : {}]}
              weight="medium"
            >
              {title || 'Artery Pay'}
            </Text>
            {headerRight && (
              <View style={[styles.rightElem, sidebarOpen ? styles.sidebarOpen_rightElem : {}]}>
                {headerRight}
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  onGoBack: PropTypes.func,
  hasHamburgerMenu: PropTypes.bool,
  headerRight: PropTypes.object,
  sidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sidebarOpen: getSidebarOpen,
});

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: () => NavigationService.toggleDrawer(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Header);
