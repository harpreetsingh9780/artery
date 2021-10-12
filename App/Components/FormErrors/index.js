/**
 *
 * FormErrors
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 16,
  },
  item: {
    color: Colors.error,
  },
});

/**
 * @return {null}
 */
function FormErrors({ error }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!error) return;
    if (typeof error === 'string') {
      setList([error]);
    } else if (error.message === 'Network Error') {
      setList(['Network error, please try again later.']);
    } else if (error.response) {
      if (error.response.data.errors) {
        const errors = error.response.data.errors.map((e) => `${e.field} ${e.defaultMessage}`);
        setList(errors);
      } else if (error.response.data.error) {
        setList([error.response.data.error]);
      } else {
        // eslint-disable-next-line no-console
        console.error('Not handled form error:', error);
      }
    } else {
      setList([error.message]);
    }
  }, [error, setList]);

  if (!list) {
    return null;
  }

  return (
    <View style={styles.container}>
      {list.map((item) => (
        <Text key={item} style={styles.item}>
          {item}
        </Text>
      ))}
    </View>
  );
}

FormErrors.propTypes = {
  error: PropTypes.any,
};

export default memo(FormErrors);
