import React, { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const TodoForm = ({sorting}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [addForm, setAddForm] = useState(false);// show a new form
  const [isHidden, setIsHidden] = useState(true)
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();


  //add new todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return setError("All field is required");
    }
    const response = await fetch("/api/v1/todos/", {
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
      dispatch({ type: "CREATE_TODO", payload: json.todo, sorting });
      setAddForm(false)
      setIsHidden(true)
    }
  };

  //allow user to hit enter and submit
  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  //when user hit enter, return to empty state and do not submit
  const handleExit = (e) => {
    if (e.key === "Escape" || e.type === "click"){
        e.preventDefault();
        setTitle("");
        setDescription("");
        setAddForm(false)
        setIsHidden(true)
    }
  }

  //check if onBlur is still within children and display add button if user still
  //want to add when out of focus
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
              maxLength={15}
            />
          </div>
          <div className="todo__description">
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              onKeyDown={handleEnter}
              required
              maxLength={70}
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
