import React from 'react';
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme';
import { Camera } from '../../Components/Camera';

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
});

class ExampleScreen extends React.Component {
  componentDidMount() {
    this._fetchUser();
  }

  render() {
    return (
      <View style={[Helpers.fill, Helpers.rowMain]}>
        <Camera onData={this._handleData} />
      </View>
    );
  }

  _handleData(data) {
    this.props.handleData(data);
  }

  _fetchUser() {
    this.props.fetchUser();
  }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
  handleData: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: false,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  handleData: () => dispatch(ExampleActions.fetchUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen);
