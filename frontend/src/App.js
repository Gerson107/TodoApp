import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);
  const [popuActitve, setPopuActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, [todos]);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };
  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/completed/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.completed = data.completed;
        }
        return todo;
      })
    );
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    console.log(data);
  };

  return (
    <div className="App">
      <h1>Welcome</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.map((todo) => (
          <>
            <div className="date">{new Date(todo.date).toUTCString()}</div>
            <div
              className={"todo " + (todo.completed ? "is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"> </div>
              <div className="text">{todo.task}</div>
            </div>
          </>
        ))}
      </div>
      <div className="addPopup" onClick={() => setPopuActive(true)}>
        +
      </div>
      {popuActitve ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopuActive(false)}>
            x
          </div>
          <div className="content">
            <h4>Add Task</h4>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="buttom" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
