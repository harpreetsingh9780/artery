/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';

function Img({ name, height = null, width = null }) {
  return <Text>IMG: {name}</Text>;
  // return <Image source={require(`Assets/Images/${name}.png`)} style={{ width, height }} />;
}

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Img;
