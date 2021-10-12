import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import LoginScreen from 'App/Containers/LoginScreen';
import HomeScreen from '../Containers/HomeScreen';
import SidebarScreen from '../Containers/SidebarScreen';
import PreloadAccountScreen from '../Containers/PreloadAccountScreen';
import AccountScreen from '../Containers/AccountScreen';
import ActivityScreen from '../Containers/ActivityScreen';
import ActivityReceiptScreen from '../Containers/ActivityReceiptScreen';
import InviteAFriendScreen from '../Containers/InviteAFriendScreen';
import RequestMoneyScreen from '../Containers/RequestMoneyScreen';
import RequestMoneyAmountScreen from '../Containers/RequestMoneyAmountScreen';
import ActionSuccessScreen from '../Containers/ActionSuccessScreen';
import LinkBankAccountScreen from '../Containers/LinkBankAccountScreen';
import ActionFailureScreen from '../Containers/ActionFailureScreen';
import SignUpWelcomeScreen from '../Containers/SignUpWelcomeScreen';
import SignUpEmailFormScreen from '../Containers/SignUpEmailFormScreen';
import SignUpVerifyPhoneFormScreen from '../Containers/SignUpVerifyPhoneFormScreen';
import SignUpPasswordFormScreen from '../Containers/SignUpPasswordFormScreen';
import SignUpDetailsFormScreen from '../Containers/SignUpDetailsFormScreen';
import SignUpInitialScreen from '../Containers/SignUpInitialScreen';
import SignUpIdExampleScreen from '../Containers/SignUpIdExampleScreen';
import ScanMyScreen from '../Containers/ScanMyScreen';
import SendMoneyScreen from '../Containers/SendMoneyScreen';
import SendMoneyAmountScreen from '../Containers/SendMoneyAmountScreen';
import SendMoneyToMerchantScreen from '../Containers/SendMoneyToMerchantScreen';
import BankAccountSelectorScreen from '../Containers/BankAccountSelectorScreen';
import PayBillsScreen from '../Containers/PayBillsScreen';

const createDrawerScreen = (screen) =>
  createDrawerNavigator(
    {
      Screen: screen,
    },
    {
      initialRouteName: 'Screen',
      headerMode: 'none',
      contentComponent: SidebarScreen,
    }
  );

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    HomeScreen: createDrawerScreen(HomeScreen),
    AccountScreen: createDrawerScreen(AccountScreen),
    ActivityScreen: createDrawerScreen(ActivityScreen),
    ActivityReceiptScreen: ActivityReceiptScreen,
    PreloadAccountScreen: createDrawerScreen(PreloadAccountScreen),
    InviteAFriendScreen: createDrawerScreen(InviteAFriendScreen),
    RequestMoneyScreen: createDrawerScreen(RequestMoneyScreen),
    RequestMoneyAmountScreen: RequestMoneyAmountScreen,

    ActionSuccessScreen: createDrawerScreen(ActionSuccessScreen),
    ActionFailureScreen: createDrawerScreen(ActionFailureScreen),

    LinkBankAccountScreen: createDrawerScreen(LinkBankAccountScreen),

    SendMoneyScreen: createDrawerScreen(SendMoneyScreen),
    SendMoneyAmountScreen: SendMoneyAmountScreen,
    SendMoneyToMerchantScreen: SendMoneyToMerchantScreen,
    ScanMeScreen: createDrawerScreen(ScanMyScreen),
    PayBillsScreen: createDrawerScreen(PayBillsScreen),

    // SendAGiftScreen: HomeScreen,
    BankAccountSelectorScreen: BankAccountSelectorScreen,

    // Auth screens
    LoginScreen: LoginScreen,
    SignUpInitialScreen: SignUpInitialScreen,
    SignUpEmailFormScreen: SignUpEmailFormScreen,
    SignUpVerifyPhoneFormScreen: SignUpVerifyPhoneFormScreen,
    SignUpDetailsFormScreen: SignUpDetailsFormScreen,
    SignUpPasswordFormScreen: SignUpPasswordFormScreen,
    SignUpWelcomeScreen: createDrawerScreen(SignUpWelcomeScreen),

    SignUpIdExampleScreen: SignUpIdExampleScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
);

export default createAppContainer(StackNavigator);
