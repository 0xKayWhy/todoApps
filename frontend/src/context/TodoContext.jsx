import { createContext, useReducer, useState } from "react";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      if (action.sorting === "oldToNew") {
        const sortTodo = action.payload.sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
        return { todo: sortTodo };
      }
      return { todo: action.payload };
    case "CREATE_TODO":
      if (action.sorting === "oldToNew") {
        return { todo: [...state.todo, action.payload] };
      }
      return { todo: [action.payload, ...state.todo] };
    case "EDIT_TODO":
      const updatesData = state.todo.filter(
        (td) => td._id !== action.payload._id
      );
      if (action.sorting === "oldToNew") {
        return { todo: [...updatesData, action.payload] };
      }
      return { todo: [action.payload, ...updatesData] };
    case "DELETE_TODO":
      return { todo: state.todo.filter((t) => t._id !== action.payload._id) };
    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todo: [],
  });
  const [sorting, setSorting] = useState("newToOld");

  return (
    <TodoContext.Provider value={{ ...state, dispatch, sorting, setSorting }}>
      {children}
    </TodoContext.Provider>
  );
};
