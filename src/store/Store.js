import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
  todos: [],
  showAddTodoDialog: false,
  showCustomModal: false,
  customModalBody: "",
  customModalTitle: ""
};

const actions = {
  setTodos: (store, todos) => {
    store.setState({ todos: todos });
  },
  setTodoDialog: (store, open) => {
    store.setState({ showAddTodoDialog: open });
  },
  setCustomModal: (store, open) => {
    store.setState({ showCustomModal: open });
  },
  setCustomModalBody: (store, body) => {
    store.setState({ customModalBody: body });
  },
  setCustomModalTitle: (store, title) => {
    store.setState({ customModalTitle: title });
  },
};

export const useGlobal = useGlobalHook(React, initialState, actions);