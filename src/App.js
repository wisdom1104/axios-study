import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
  });

  // axios를 통해서 get 요청을 하는 함수를 생성힌다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리한다.
  // 조회 함수
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4000/todos");
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 한다.
  };

  // 추가 함수
  const onSubmitHandler = async () => {
    axios.post("http://localhost:4000/todos", todo);
    setTodos([...todos, todo]);
  };

  //삭제 함수
  const onClickDeleteButtonHandler = (id) => {
    axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
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
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
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
