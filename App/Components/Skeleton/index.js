import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function UserItemSkeletonPlaceholder() {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={30} height={30} borderRadius={30} />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item width={120} height={10} borderRadius={4} />
            <SkeletonPlaceholder.Item marginTop={6} width={80} height={10} borderRadius={4} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}

export function ListItemSkeletonPlaceholder() {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column">
          <SkeletonPlaceholder.Item width={190} height={10} borderRadius={4} />
          <SkeletonPlaceholder.Item marginTop={6} flexDirection="row">
            <SkeletonPlaceholder.Item width={30} height={10} borderRadius={4} />
            <SkeletonPlaceholder.Item marginLeft={20} width={190} height={10} borderRadius={4} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
});
