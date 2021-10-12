import { Alert as _Alert } from 'react-native';

function confirm({
  title = 'Are you sure?',
  message = "This action can't be undone.",
  onConfirm = () => {},
  onDismiss = () => {},
}) {
  return _Alert.alert(title, message, [
    { text: 'No', onPress: onDismiss },
    { text: 'Yes', onPress: onConfirm },
  ]);
}

function success({ title = null, message = null, onConfirm = () => {} }) {
  return _Alert.alert(title, message, [{ text: 'Okay', onPress: onConfirm }]);
}

export const Alert = {
  confirm,
  success,
};
