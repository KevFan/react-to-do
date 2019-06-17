import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
  showCustomModal: false,
  customModalBody: "",
  customModalTitle: "",
  showSnackBar: false,
  snarkBarMessage: ""
};

const actions = {
  setCustomModalBody: (store, body) => {
    store.setState({ customModalBody: body });
  },
  setCustomModalTitle: (store, title) => {
    store.setState({ customModalTitle: title });
  },
  openDialog: (store) => {
    store.setState({ showCustomModal: true });
  },
  closeDialog: (store) => {
    store.setState({ showCustomModal: false });
  },
  closeSnackBar: (store) => {
    store.setState({ showSnackBar: false });
  },
  showSnackMessage: (store, message) => {
    store.setState({ snarkBarMessage: message, showSnackBar: true});
  }
};

export const useGlobal = useGlobalHook(React, initialState, actions);