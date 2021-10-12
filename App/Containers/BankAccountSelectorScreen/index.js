import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import NavigationService from '../../Services/NavigationService';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import { Footer } from '../../Components/Footer';
import { Button } from '../../Components/Button';
import {
  getLinkedBanksSelector,
  getPreloadAccountErrorSelector,
  getPreloadAccountLoadingSelector,
  getSelectedBankIdSelector,
} from '../../Stores/Banks/Selectors';
import { createStructuredSelector } from 'reselect';
import { BanksActions } from '../../Stores/Banks/Actions';
import { BankAccount } from '../../Components/BankAccount';

function BankAccountSelectorScreen(props) {
  return (
    <PageView
      header={<AuthHeader title="Choose an Account" onGoBack={props.onGoBack} />}
      footer={
        <Footer>
          <Button text="Continue" intent="primary" onPress={props.onGoBack} />
        </Footer>
      }
    >
      <H1 text="Choose an Account" icon={Images.linkBankAccountIcon} />
      <Lead text="You'll use this account to make purchases from your favorite merchants." />
      {props.accountList.map((item) => (
        <BankAccount
          key={item.referenceId}
          item={item}
          onPress={() => props.setSelectedBank(item.referenceId)}
          active={props.defaultAccount === item.referenceId}
        />
      ))}
    </PageView>
  );
}

BankAccountSelectorScreen.propTypes = {
  onGoBack: PropTypes.func,
  accountList: PropTypes.array,
  defaultAccount: PropTypes.string,
  setSelectedBank: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  accountList: getLinkedBanksSelector,
  defaultAccount: getSelectedBankIdSelector,
  loading: getPreloadAccountLoadingSelector,
  error: getPreloadAccountErrorSelector,
});

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.back(),
  setSelectedBank: (bankId) => dispatch(BanksActions.selectBank(bankId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(BankAccountSelectorScreen);
