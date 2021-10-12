import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageView } from '../../Components/PageView';
import NavigationService from '../../Services/NavigationService';
import Header from '../Header';
import H1 from '../../Components/H1';
import Images from '../../Theme/Images';
import { Accordion } from '../../Components/Accordion';
import { Text } from '../../Components/Text';
import { Colors } from '../../Theme';

function SignUpIdExampleScreen({ back }) {
  return (
    <PageView header={<Header title="ID Examples" onGoBack={() => back()} />}>
      <H1 icon={Images.IDIcon} text="What ID Can I Use?" />
      <Accordion title="State-issued driver's license" open>
        <Text color={Colors.dark}>
          In addition to verifying driving privileges, drivers' licenses are
          used to purchase automobile insurance or during a police traffic
          stop and serve as the primary form of identity for American adults.
          They are widely used by both government entities and private
          businesses to verify identity or age, such as in entering secure
          government facilities, boarding a commercial airliner, business
          transactions, or in the purchase of age-restricted items such as
          alcoholic beverages or cigarettes.
        </Text>
      </Accordion>
      <Accordion title="State-issued ID card">
        <Text color={Colors.dark}>
          A driver's license is issued by each state's DMV, which is required
          to drive. Each state's DMV can also issue a state identification
          card. It does not contain any endorsements to operate vehicles and
          can be used as official identification where asked for or needed. In
          addition to verifying driving privileges, drivers' licenses are used
          to purchase automobile insurance or during a police traffic stop and
          serve as the primary form of identity for American adults. They are
          widely used by both government entities and private businesses to
          verify identity or age, such as in entering secure government
          facilities, boarding a commercial airliner, business transactions,
          or in the purchase of age-restricted items such as alcoholic
          beverages or cigarettes.{' '}
        </Text>
      </Accordion>
    </PageView>
  );
}

SignUpIdExampleScreen.propTypes = {
  back: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  back: () => NavigationService.back(),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpIdExampleScreen);
