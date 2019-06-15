import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
  todos: [],
};

const actions = {
  setTodos: (store, todos) => {
    store.setState({ todos: todos });
  },
};

export const useGlobal = useGlobalHook(React, initialState, actions);