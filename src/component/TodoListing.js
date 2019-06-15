import React, {useEffect, useState} from 'react';

export default function TodoListing() {
  const [todos, setTodos] = useState([]);

  const testGet = () => {
    fetch('/api/v1/todo', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': localStorage.getItem("token"),
      }
    }).then(response =>
      response.json()
    ).then(data => setTodos(data));
  };

  useEffect(() => {
    testGet()
  });

  const todoCards = todos.map(it => {
    return it.content
  });

  return (
      <div>
        {todoCards}
      </div>
  );
}