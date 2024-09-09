import React, { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [isHidden, setIsHidden] = useState(true)
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return setError("All field is required");
    }
    const response = await fetch("/api/todos/", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.Message);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      dispatch({ type: "CREATE_TODO", payload: json.todo });
      setAddForm(false)
      setIsHidden(true)
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleExit = (e) => {
    if (e.key === "Escape" || e.type === "click"){
        e.preventDefault();
        setTitle("");
        setDescription("");
        setAddForm(false)
        setIsHidden(true)
    }
  }

  const checkOnBlur = (e) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
        setIsHidden(false);
    }
  }

  return (
    <div onKeyDown={handleExit} onBlur={checkOnBlur}>
        {!addForm ? (
      <div className="create__todo" onClick={()=> setAddForm(true)}>
        <i className="bx bx-plus bx-lg" ></i>
      </div>)
        :
      (<div>
        <form className="todo__details" onSubmit={handleSubmit}>
          <div className="todo__title">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoFocus
              required
            />
          </div>
          <div className="todo__description">
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              onKeyDown={handleEnter}
              required
            />
            <i  onClick={handleExit} className='bx bx-x bx-sm delete'></i>
          </div>
          <button hidden={isHidden}>Add</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>)
        }
    </div>
  );
};
