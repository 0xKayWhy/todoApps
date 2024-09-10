import { useEffect, useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { TodoDetails } from "../components/TodoDetail";
import { TodoForm } from "../components/TodoForm";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
  const { todo, dispatch,sorting, setSorting } = useTodoContext();
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch("/api/v1/todos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
          dispatch({ type: "SET_TODOS", payload: json, });
      }
      if (!response.ok) {
        setError(response.Message);
      }
    };
    fetchTodo();
  }, [dispatch, user.token, sorting]);

  const completedTodo = todo.filter((td) => td.isCompleted === true);
  const pendingTodo = todo.filter((td) => td.isCompleted === false);

  return (
    <div className="container">
      <div className="container pending__todo">
        <div className="section__title">
          <h2>Pending</h2>
          <select onChange={(e) => setSorting(e.target.value)}>
            <option value="newToOld">New to old</option>
            <option value="oldToNew">Old to new</option>
          </select>
        </div>
        <div className="todos">
          {todo &&
            pendingTodo.map((td) => (
              <TodoDetails key={td._id} todos={td} status={"Pending"} sorting={sorting}/>
            ))}

          <TodoForm sorting={sorting}/>
        </div>
      </div>
      <div className="container completed__todo">
        <h2>Completed</h2>
        <div className="todos">
          {todo &&
            completedTodo.map((td) => (
              <TodoDetails key={td._id} todos={td} status={"Completed"} sorting={sorting}/>
            ))}
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};
