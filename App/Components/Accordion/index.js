/**
 *
 * Accordion
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { ButtonArea } from '../Button/ButtonArea';
import { Text } from '../Text';
import Images from '../../Theme/Images';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 11,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {},
  titleImage: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  contentContainer: {
    paddingVertical: 20,
  },
});

export function Accordion({ title, open, onToggle, ...rest }) {
  const [isOpen, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  const handleToggle = useCallback(() => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  return (
    <View style={styles.container}>
      <ButtonArea onPress={handleToggle}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} weight="medium">{title}</Text>
          {isOpen && <Image style={styles.titleImage} source={Images.openAccordionIcon} />}
          {!isOpen && <Image style={styles.titleImage} source={Images.closeAccordionIcon} />}
        </View>
      </ButtonArea>
      {isOpen && <View style={styles.contentContainer}>{rest.children}</View>}
    </View>
  );
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.node,
};
