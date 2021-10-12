/**
 *
 * Container
 *
 */

import { View } from 'react-native';
import styled, { css } from 'styled-components';

const Container = styled(View)`
  padding: 0 2rem;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  ${props =>
    props.relative &&
    css`
      position: relative;
    `}
`;

export const FluidContainer = styled(View)`
  padding: 0 2rem;
  width: 100%;
  margin: 0 auto;
`;

export default Container;
