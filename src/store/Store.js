import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
  todos: [],
  showAddTodoDialog: false,
};

const actions = {
  setTodos: (store, todos) => {
    store.setState({ todos: todos });
  },
  setTodoDialog: (store, open) => {
    store.setState({ showAddTodoDialog: open });
  },
};

export const useGlobal = useGlobalHook(React, initialState, actions);