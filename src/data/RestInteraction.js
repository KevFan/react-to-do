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