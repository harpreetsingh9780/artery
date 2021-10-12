/**
 *
 * Header
 *
 */

import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Img from '../../Components/Img';
import Container from '../../Components/Container';
import KeylineFull from '../../Components/KeylineFull';
// import { closeSidebar, openSidebar } from '../App/actions';
// import { makeSelectSidebarOpen } from '../App/selectors';

const Wrapper = styled(View)`
  background-color: #fff;
`;

const Content = styled(View)`
  padding: 1.6rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Text)`
  text-align: center;
  color: #1c7ac3;
  font-size: 1.4rem;
  line-height: 2.4rem;
  height: 2.4rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 2rem;
  font-family: 'SF Compact Rounded', sans-serif;
  font-weight: 500;
  transition: opacity 0.5s;
  will-change: opacity;
  ${Wrapper} [open] & {
    opacity: 0;
  }
`;

const HeaderLeft = styled(View)`
  flex-grow: 0;
  flex-shrink: 0;
`;

const HeaderRight = styled(View)`
  flex-grow: 0;
  flex-shrink: 0;
  transition: opacity 0.5s;
  will-change: opacity;
  ${Wrapper} [open] & {
    opacity: 0;
  }
`;

const BackLink = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  float: left;
  flex-grow: 0;
  flex-shrink: 0;
  height: 2.4rem;
  width: 2.4rem;
  &:focus {
    outline: none;
  }
`;

const BackButton = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  float: left;
  flex-grow: 0;
  flex-shrink: 0;
  height: 2.4rem;
  width: 2.4rem;
  &:focus {
    outline: none;
  }
`;

export function Header({
  title,
  onGoBack = null,
  goBackTo = null,
  onToggleMenu = false,
  hideKeyLine = false,
  headerRight = null,
  sidebarOpen,
  onOpenSidebar,
  onCloseSidebar,
}) {
  return (
    <>
      {/*<Helmet>*/}
      {/*  <title>{title || 'Artery Pay'}</title>*/}
      {/*  /!* <meta name="description" content="Description of Header" /> *!/*/}
      {/*</Helmet>*/}
      <Wrapper>
        <Container>
          <Content open={sidebarOpen}>
            {goBackTo && (
              <HeaderLeft>
                <BackLink to={goBackTo}>
                  <Img name="icons/Back_Arrow_Icon" />
                </BackLink>
              </HeaderLeft>
            )}
            {onGoBack && (
              <HeaderLeft>
                <BackButton type="button" onClick={onGoBack}>
                  <Img name="icons/Back_Arrow_Icon" />
                </BackButton>
              </HeaderLeft>
            )}
            {onToggleMenu && !sidebarOpen && (
              <HeaderLeft>
                <BackButton type="button" onClick={onOpenSidebar}>
                  <Img name="icons/Hamburger_Menu_Icon" />
                </BackButton>
              </HeaderLeft>
            )}
            {onToggleMenu && sidebarOpen && (
              <HeaderLeft>
                <BackButton type="button" onClick={onCloseSidebar}>
                  <Img name="icons/Close_Icon" />
                </BackButton>
              </HeaderLeft>
            )}
            <Title>{title || 'Artery Pay'}</Title>
            {headerRight && <HeaderRight>{headerRight}</HeaderRight>}
          </Content>
        </Container>
      </Wrapper>
      {!hideKeyLine && (
        <Container>
          <KeylineFull />
        </Container>
      )}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  goBackTo: PropTypes.string,
  onGoBack: PropTypes.func,
  onToggleMenu: PropTypes.bool,
  hideKeyLine: PropTypes.bool,
  headerRight: PropTypes.object,
  sidebarOpen: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  onCloseSidebar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // sidebarOpen: makeSelectSidebarOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOpenSidebar: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch(openSidebar());
    },
    onCloseSidebar: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch(closeSidebar());
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Header);
