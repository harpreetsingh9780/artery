import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageViewFull } from '../../Components/PageView';
import { AuthHeader } from '../AuthHeader';
import NavigationService from '../../Services/NavigationService';
import { Colors } from '../../Theme';
import { BanksActions } from '../../Stores/Banks/Actions';
import { FrogWebView } from '../FrogWebView';
import { Text } from '../../Components/Text';
import { BanksService } from '../../Services/BanksService';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  loader: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

function LinkBankAccountScreen(props) {
  const [isReady, setIsReady] = useState(false);
  const [paymentProcessorId, setPaymentProcessorId] = useState('');

  useEffect(()=>{
    BanksService.getBankAccConfig().then((response) => {
      if(response.useFollowTheFrogClient){
        setPaymentProcessorId(response.paymentProcessorId)
      }else{
        // Client will provide what to do here
      }
      setIsReady(true)
    })
    .catch((e) => {
      console.error(e);
    });
  },[])

  const followFrogApi = (account) => {
    let req = {
      paymentProcessorId: paymentProcessorId,
      accountToken: account.accountId
    }
    BanksService.followFrog(req).then((responce)=>{
      NavigationService.navigateToSuccess({
        header: 'Account Linked',
        title: "You're All Set",
        description:
          "You're ready to make purchases and start earning rewards from your favorite merchants.",
        items: [account.accountNickname, account.accountType + '...' + account.last4Digits],
      });
    }).catch((e) => {
      console.error(e);
    });
  }


  const handleWebviewMessage = ({ type, data }) => {
    try {
      switch (type) {
        case 'onReady':
          // setIsReady(data);
          break;
        case 'onCancel':
          NavigationService.navigateToFailure({
            header: 'Link Bank Account',
            title: 'Account was not linked',
            description: 'Bank account linking was canceled.',
          });
          break;
        case 'onEnrollmentSuccess':
          props.updateLinkedBanks();
          const account = data[1];
          followFrogApi(account)
          break;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PageViewFull header={<AuthHeader title="Link Bank Account" onGoBack={props.onGoBack} />}>
      <View style={styles.container}>
        {
          isReady ? 
          <FrogWebView onEventReceived={handleWebviewMessage} />
          :
          <View style={styles.loader} >
            <Text> Please wait, we are making thing's ready. </Text>
          </View>
          }
      </View>
    </PageViewFull>
  );
}

LinkBankAccountScreen.propTypes = {
  onGoBack: PropTypes.func,
  updateLinkedBanks: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.navigate('HomeScreen'),
  updateLinkedBanks: () => dispatch(BanksActions.linkedBanks()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(LinkBankAccountScreen);
