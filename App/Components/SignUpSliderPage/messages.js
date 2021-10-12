/*
 * SignUpSliderPage Messages
 *
 * This contains all the text for the SignUpSliderPage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SignUpSliderPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Payments simplified',
  },
  lead: {
    id: `${scope}.lead`,
    defaultMessage:
      'Earn cash rewards and product discounts when you use Artery Pay.',
  },
  button: {
    id: `${scope}.button`,
    defaultMessage: 'Get Started',
  },
});
