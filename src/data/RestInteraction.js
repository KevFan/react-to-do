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

export function login(username, password, props) {
  const data = new URLSearchParams();

  data.append("username", username);
  data.append("password", password);

  fetch('/api/authenticate', {
    method: 'POST',
    body: data
  }).then(response => {
    response.headers.forEach(function(value, name) {
      if (name === "authorization") {
        localStorage.setItem("token", value);
        props.history.push("/todo");
      }
    });
  }).catch(err =>
      console.log(err)
  );
}

export function signUp(username, password, props) {
  fetch('/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password: password})
  }).then(response => {
        if (response.ok) {
          props.history.push("/")
        } else {
          console.log(response);
        }
      }
  ).catch(err =>
      console.log(err)
  );
}