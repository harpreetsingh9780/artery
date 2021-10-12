/*
 *
 * Modal actions
 *
 */

import {
  SHOW_MODAL,
  CLOSE_MODAL,
  MODAL_DEFAULT,
  HIDE_LOADER,
  SHOW_LOADER,
  MODAL_CONFIRM,
} from './constants';

export function showModal({ title = 'Note', text, onClose = null }) {
  return {
    type: SHOW_MODAL,
    modal: MODAL_DEFAULT,
    title,
    text,
    onClose,
  };
}

export function confirmModal({
  title = 'Are you sure?',
  text,
  onClose = null,
}) {
  return {
    type: SHOW_MODAL,
    modal: MODAL_CONFIRM,
    title,
    text,
    onClose,
  };
}

export function closeModal(modal) {
  return {
    type: CLOSE_MODAL,
    modal,
  };
}

export function showLoaderModal(title = null) {
  return {
    type: SHOW_LOADER,
    title,
  };
}

export function closeLoaderModal() {
  return {
    type: HIDE_LOADER,
  };
}
