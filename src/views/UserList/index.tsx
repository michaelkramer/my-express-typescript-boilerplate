import React, { useContext, useReducer, useEffect, useRef } from "react";
import { Button, Typography, Input } from "antd";
//import PropTypes from "prop-types";
import Style from "../theme/Style";

const Context = React.createContext({});

function useEffectOnce(cb) {
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      cb();
      didRun.current = true;
    }
  });
}

function userReducer(state, action) {
  switch (action.type) {
    case "reset": {
      return action.payload;
    }
    case "add":
      return [
        ...state,
        { id: Date.now(), text: Date.now().toString(), completed: false },
      ];
    case "delete":
      return state.filter((item) => item.id !== action.payload);
    case "completed": {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
    }
    default:
      return [...state];
  }
}

const UserList = () => {
  const [state, dispatch] = useReducer(userReducer, []);

  useEffectOnce(() => {
    const raw = localStorage.getItem("data");
    dispatch({ type: "reset", payload: raw ? JSON.parse(raw) : [] });
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={dispatch}>
      <div>
        <Typography.Text>Todo</Typography.Text>
        <Button onClick={() => dispatch({ type: "add" })}>New</Button>
        {state.map((item) => (
          <UserItem {...item} key={item.id} />
        ))}
      </div>
    </Context.Provider>
  );
};

function UserItem({ id, text, completed }) {
  const dispatch = useContext(Context);
  return (
    <div>
      <Input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch({ type: "completed", payload: id })}
      />
      <Input type="text" defaultValue={text} />
      <Button onClick={() => dispatch({ type: "delete", payload: id })}>
        Del
      </Button>
    </div>
  );
}

const styles = (_theme) => ({
  layout: {
    color: "white",
  },
  container: {
    color: "#f00",
  },
});
export default Style(styles)(UserList);
