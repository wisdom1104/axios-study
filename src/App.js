import React, { useEffect, useState } from "react";
// import axios from "axios";
// const REACT_APP_SEVER_KEY = "http://localhost:4000";
import api from "./axios/api";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
  });

  const [targetId, setTargetId] = useState("");
  const [editTodo, setEditTodo] = useState("");

  // axios를 통해서 get 요청을 하는 함수를 생성힌다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리한다.
  // 조회 함수
  const fetchTodos = async () => {
    const { data } = await api.get("/todos");
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 한다.
  };

  // 추가 함수
  const onSubmitHandler = async () => {
    api.post("/todos", todo);
    // setTodos([...todos, todo]);
    fetchTodos();
    setTodo({ ...todo, title: "" });
  };

  //삭제 함수
  const onClickDeleteButtonHandler = async (id) => {
    api.delete(`/todos/${id}`);
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  //수정 함수
  const onClickEditButtonHandler = async () => {
    api.patch(`/todos/${targetId}`, {
      title: editTodo,
    });
    setTodos(
      todos.map((item) => {
        if (item.id == targetId) {
          return { ...item, title: editTodo };
        } else {
          return item;
        }
      })
    );
    setTargetId("");
    setEditTodo("");
  };

  // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용한다.
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행한다.
    fetchTodos();
  }, []);

  return (
    <>
      {/* Input영역 */}
      <form
        onSubmit={(e) => {
          // submit했을 때 브라우저의 새로고침을 방지한다.
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="수정하고싶은 Todo ID"
            value={targetId}
            onChange={(e) => {
              setTargetId(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정값 입력"
            value={editTodo}
            onChange={(e) => {
              setEditTodo(e.target.value);
            }}
          />
          <button
            // type='button' 을 추가해야 form의 영향에서 벗어남
            type="button"
            onClick={() => onClickEditButtonHandler()}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          value={todo.title}
          onChange={(e) => {
            setTodo({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      {/* 데이터 영역 */}
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            {todo.id} : {todo.title}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
