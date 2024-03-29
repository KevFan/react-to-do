import {
  ADDED_TODO,
  DELETED_TODO,
  GENERAL_FAILURE,
  INVALID_USERNAME_PASSWORD, LOGGED_OUT, NO_TODOS_FOUND,
  SIGN_UP_INVALID,
  SIGN_UP_USER_NAME_TAKEN,
  SIGN_UP_WRONG_PASSWORD,
  UPDATED_TODO
} from "../constants/Messages";
import {HOME, LOGIN} from "../constants/RouterRoutes";

const apiUrl = process.env.NODE_ENV === 'production' ? 'https://cors-anywhere.herokuapp.com/https://spring-todo-backend-server.herokuapp.com' : 'http://localhost:8080';

export function findAllTodo(setTodosToState, globalActions, props) {
  fetch(apiUrl + '/api/v1/todo', {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem("token"),
    }
  }).then(response => {
        checkForServerFailure(response, globalActions);
        return response.json()
      }
  ).then(data => {
    if (checkForAuthenticated(data, globalActions, props)) {
      setTodosToState(data);
      if (data.length === 0) {
        globalActions.showSnackMessage(NO_TODOS_FOUND);
      }
    }
  });
}

export function searchTodo(searchString, setTodos, globalActions, props) {
  if (searchString) {
    fetch(apiUrl + '/api/v1/todo/search/' + searchString, {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem("token"),
      }
    }).then(response => {
          checkForServerFailure(response, globalActions);
          return response.json()
        }
    ).then(data => {
      if (checkForAuthenticated(data, globalActions, props)) {
        setTodos(data);
      }
    });
  } else {
    findAllTodo(setTodos, globalActions);
  }
}

export function deleteTodo(id, deleteTodoInState, globalActions, props) {
  fetch(apiUrl + '/api/v1/todo/' + id, {
    method: 'DELETE',
    headers: {
      'Authorization': localStorage.getItem("token"),
    }
  }).then(response => {
    checkForServerFailure(response, globalActions);
    if (checkForAuthenticated(response, globalActions, props)) {
      deleteTodoInState(id);
      globalActions.showSnackMessage(DELETED_TODO);
    }
  })
}

export function addTodo(todoString, addNewTodoToState, globalActions, props) {
  fetch(apiUrl + '/api/v1/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
    },
    body: JSON.stringify({contents: todoString})
  }).then(response => {
    checkForServerFailure(response, globalActions);
    return response.json();
  }).then(data => {
    if (checkForAuthenticated(data, globalActions, props)) {
      addNewTodoToState(data);
      globalActions.showSnackMessage(ADDED_TODO);
    }
  })
}

export function updateTodo(id, todoString, updateTodoInState, globalActions, props) {
  fetch(apiUrl + '/api/v1/todo/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
    },
    body: JSON.stringify({contents: todoString})
  }).then(response => {
    checkForServerFailure(response, globalActions);
    return response.json();
  }).then(data => {
    if (checkForAuthenticated(data, globalActions, props)) {
      updateTodoInState(data);
      globalActions.showSnackMessage(UPDATED_TODO);
    }
  })
}

export function login(username, password, props, globalActions) {
  const data = new URLSearchParams();

  data.append("username", username);
  data.append("password", password);

  fetch(apiUrl + '/api/v1/authenticate', {
    method: 'POST',
    body: data
  }).then(response => {
    checkForServerFailure(response, globalActions);
    if (response.ok) {
      response.headers.forEach(function (value, name) {
        if (name === "authorization") {
          localStorage.setItem("token", value);
          props.history.push(HOME);
        }
      });
    } else if (response.status === 401) {
      globalActions.showSnackMessage(INVALID_USERNAME_PASSWORD);
    }
  }).catch(err => {
        console.log(err);
      }
  );
}

export function signUp(username, password, confirmPassword, props, globalActions) {
  if (!(username && password)) {
    return globalActions.showSnackMessage(SIGN_UP_INVALID);
  }
  if (password !== confirmPassword) {
    return globalActions.showSnackMessage(SIGN_UP_WRONG_PASSWORD);
  }
  fetch(apiUrl + '/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password: password})
  }).then(response => {
        checkForServerFailure(response, globalActions);
        if (response.ok) {
          login(username, password, props, globalActions);
        } else if (response.status === 400) {
          globalActions.showSnackMessage(SIGN_UP_USER_NAME_TAKEN);
        }
      }
  ).catch(err =>
      console.log(err)
  );
}

function checkForServerFailure(response, globalActions) {
  if (response.status === 500) {
    return globalActions.showSnackMessage(GENERAL_FAILURE);
  }
}

function checkForAuthenticated(response, globalActions, props) {
  const authenticated = (response.status !== 403);
  if (!authenticated) {
    props.history.push(LOGIN);
    globalActions.showSnackMessage(LOGGED_OUT);
  }

  return authenticated;
}