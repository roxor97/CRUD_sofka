import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
  useRef,
} from "react";

const HOST_API = "http://localhost:8080/api";
const initialState = {
  list: [],
  item: {},
};
const List = () => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then((res) => res.json())
      .then((list) => {
        dispatch({ type: "update-list", list });
      });
  }, [state.list.length, dispatch]);

  const onDelete = (id) => {
    fetch(`${HOST_API}/${id}/todo`, {
      method: "DELETE",
    }).then(() => {
      dispatch({ type: "delete-item", id });
    });
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Descripción</td>
            <td>¿Esta completado? </td>
          </tr>
        </thead>
        <tbody>
          {state.list.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>{todo.description}</td>
                <td>{todo.isCompleted === true ? "SI":"NO"}</td>
                <td>
                  <button
                    onClick={() => {
                      onDelete(todo.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      onEdit(todo);
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};