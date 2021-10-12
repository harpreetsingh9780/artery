import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export function FillToAspectRatio(props) {
  const [state, setState] = React.useState({
    layoutInfo: null,
  });

  const handleLayout = ({ nativeEvent: { layout } }) => {
    const { width, height } = layout;
    setState({
      layoutInfo: { width, height },
    });
  };

  const getRatio = () => {
    const { ratio } = props;
    const [ratioWidth, ratioHeight] = ratio.split(':').map((x) => Number(x));
    return ratioHeight / ratioWidth;
  };

  const { layoutInfo } = state;
  if (!layoutInfo) {
    return <View key="pre-info" onLayout={handleLayout} style={styles.containerStyle} />;
  }

  const { height, width } = layoutInfo;
  let wrapperWidth;
  let wrapperHeight;
  // return <Text>lol: before </Text>
  const ratio = getRatio();
  if (ratio * height < width) {
    wrapperHeight = width / ratio;
    wrapperWidth = width;
  } else {
    wrapperWidth = ratio * height;
    wrapperHeight = height;
  }
  const wrapperPaddingX = (width - wrapperWidth) / 2;
  const wrapperPaddingY = (height - wrapperHeight) / 2;

  return (
    <View onLayout={handleLayout} style={styles.containerStyle}>
      <View
        style={{
          width: wrapperWidth,
          height: wrapperHeight,
          marginLeft: wrapperPaddingX,
          marginTop: wrapperPaddingY,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}

FillToAspectRatio.defaultProps = {
  ratio: '4:3',
};

FillToAspectRatio.propTypes = {
  ratio: PropTypes.string,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
});
