import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
  todos: [],
  showCustomModal: false,
  customModalBody: "",
  customModalTitle: ""
};

const actions = {
  setTodos: (store, todos) => {
    store.setState({ todos: todos });
  },
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
};

export const useGlobal = useGlobalHook(React, initialState, actions);