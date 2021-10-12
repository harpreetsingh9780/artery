/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../Services/NavigationService';
import { getSelectedTokenId, getTokenListSelector } from '../../Stores/Config/Selectors';
import {
  getLinkedBanksSelector,
  getPreloadAccountLoadingSelector,
  getSelectedBankIdSelector,
} from '../../Stores/Banks/Selectors';
import { createStructuredSelector } from 'reselect';
import { SearchRecipientInput } from '../../Components/SearchRecipientInput';
import { useUserSearch } from '../../Hooks/useUserSearch';
import { Recipient } from '../../Components/Recipient';
import { UserItemSkeletonPlaceholder } from '../../Components/Skeleton';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

function SearchRecipient({ selected, onSelected }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const { loading, users } = useUserSearch(phoneNumber);

  useEffect(() => {
    // Unselect user if it's not in the list anymore.
    if (selected) {
      if (!users.length) {
        onSelected(null);
      } else if (users.findIndex((item) => item.id === selected?.id) === -1) {
        onSelected(null);
      }
    }
  }, [users]);

  return (
    <>
      <SearchRecipientInput
        value={phoneNumber}
        onValueChange={(value) => setPhoneNumber(value)}
        loading={loading}
      />
      <ScrollView style={styles.container}>
        {loading && !users.length && (
          <>
            <UserItemSkeletonPlaceholder />
            <UserItemSkeletonPlaceholder />
            <UserItemSkeletonPlaceholder />
          </>
        )}
        {users.map((item) => (
          <Recipient
            key={item.id}
            item={item}
            active={selected?.id === item.id}
            onPress={(value) => onSelected(value)}
          />
        ))}
      </ScrollView>
    </>
  );
}

SearchRecipient.propTypes = {
  selected: PropTypes.object,
  onSelected: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tokenList: getTokenListSelector,
  accountList: getLinkedBanksSelector,
  defaultToken: getSelectedTokenId,
  defaultAccount: getSelectedBankIdSelector,
  loading: getPreloadAccountLoadingSelector,
});

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.navigateToHome(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SearchRecipient);
