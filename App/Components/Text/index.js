import React, { useMemo } from 'react';
import { Text as ReactText } from 'react-native';
import PropTypes from 'prop-types';
import styles from './TextStyle';
import { Colors } from '../../Theme';

export function Text(props) {
  const resolveStyles = useMemo(() => {
    const base = [styles.defaultText];
    const etc = [
      { fontSize: props.size, lineHeight: props.size * 1.5, color: props.color },
      props.style,
    ];
    if (props.type === 'regular') {
      switch (props.weight) {
        case 'regular':
          base.push(styles.regularText);
          break;
        case 'medium':
          base.push(styles.mediumText);
          break;
        case 'bold':
          base.push(styles.boldText);
          break;
      }
    } else if (props.type === 'compact') {
      base.push(styles.compactText);
    }
    return [...base, ...etc];
  }, [props.style, props.size, props.color, props.weight, props.type]);

  return <ReactText style={resolveStyles} numberOfLines={props.numberOfLines}>{props.children}</ReactText>;
}

Text.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,
  size: PropTypes.number,
  type: PropTypes.oneOf(['regular', 'compact']),
  weight: PropTypes.oneOf(['regular', 'medium', 'bold']),
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
};

Text.defaultProps = {
  style: {},
  size: 14,
  type: 'regular',
  weight: 'regular',
  color: Colors.text,
};
