/*
 *
 * Modal reducer
 *
 */
import produce from 'immer';
import { CLOSE_MODAL, HIDE_LOADER, SHOW_LOADER, SHOW_MODAL } from './constants';

export const initialState = {
  items: [],
  loader: false,
  loaderTitle: null,
};

/* eslint-disable default-case, no-param-reassign */
const modalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_MODAL:
        draft.items.push({
          key: Array(15)
            .fill(null)
            .map(() =>
              Math.random()
                .toString(36)
                .substr(2),
            )
            .join(''),
          title: action.title,
          text: action.text,
          modal: action.modal,
          onClose: action.onClose,
        });
        break;
      case CLOSE_MODAL:
        // eslint-disable-next-line no-case-declarations
        const index = draft.items.findIndex(
          item => item.key === action.modal.key,
        );
        if (index !== -1) {
          draft.items.splice(index, 1);
        }
        break;
      case SHOW_LOADER:
        draft.loader = true;
        draft.loaderTitle = action.title;
        break;
      case HIDE_LOADER:
        draft.loader = false;
        break;
    }
  });

export default modalReducer;
