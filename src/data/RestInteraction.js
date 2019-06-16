import {
  INVALID_USERNAME_PASSWORD,
  LOGIN_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_INVALID,
  SIGN_UP_USER_NAME_TAKEN
} from "../constants/Messages";
import {HOME} from "../constants/RouterRoutes";

export function findAllTodo(globalActions) {
  fetch('/api/v1/todo', {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': localStorage.getItem("token"),
    }
  }).then(response =>
      response.json()
  ).then(data => globalActions.setTodos(data));
}

export function searchTodo(searchString, globalActions) {
  if (searchString) {
    fetch('/api/v1/todo/search/' + searchString, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': localStorage.getItem("token"),
      }
    }).then(response =>
        response.json()
    ).then(data => globalActions.setTodos(data))
  } else {
    findAllTodo(globalActions)
  }
}

export function deleteTodo(id, globalActions) {
  fetch('/api/v1/todo/' + id, {
    method: 'DELETE',
    withCredentials: true,
    headers: {
      'Authorization': localStorage.getItem("token"),
    }
  }).then(response =>
      findAllTodo(globalActions)
  )
}

export function addTodo(todoString, globalActions) {
  fetch('/api/v1/todo', {
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
    },
    body: JSON.stringify({contents: todoString})
  }).then(response => {
    console.log(response);
    findAllTodo(globalActions)
  })
}

export function updateTodo(id, todoString, globalActions) {
  fetch('/api/v1/todo/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token"),
    },
    body: JSON.stringify({contents: todoString})
  }).then(response => {
    findAllTodo(globalActions)
  })
}

export function login(username, password, props, globalActions) {
  const data = new URLSearchParams();

  data.append("username", username);
  data.append("password", password);

  fetch('/api/v1/authenticate', {
    method: 'POST',
    body: data
  }).then(response => {
    if (response.ok) {
      response.headers.forEach(function (value, name) {
        if (name === "authorization") {
          localStorage.setItem("token", value);
          props.history.push(HOME);
        }
      });
    } else if (response.status === 401) {
      globalActions.showSnackMessage(INVALID_USERNAME_PASSWORD);
    } else {
      globalActions.showSnackMessage(LOGIN_FAILURE);
    }
  }).catch(err => {
        console.log(err);
      }
  );
}

export function signUp(username, password, props, globalActions) {
  if (username && password) {
    fetch('/api/v1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    }).then(response => {
          if (response.ok) {
            login(username, password, props, globalActions)
          } else if (response.status === 400) {
            globalActions.showSnackMessage(SIGN_UP_USER_NAME_TAKEN)
          } else {
            globalActions.showSnackMessage(SIGN_UP_FAILURE)
          }
        }
    ).catch(err =>
        console.log(err)
    );
  } else {
    globalActions.showSnackMessage(SIGN_UP_INVALID)
  }
}