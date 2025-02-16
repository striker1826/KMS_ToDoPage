"use client";

import Header from "@/components/molecules/Header";
import TodoModal from "@/components/molecules/TodoModal";
import TodoList from "@/components/organisms/TodoList";
import { Board } from "@/constant/board";
import { useEffect, useState } from "react";

interface BoardDetailTemplate {
  boardId: string;
}

const BoardDetailTemplate = ({ boardId }: BoardDetailTemplate) => {
  const [visibleBoardModal, setVisibleBoardModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [board, setBoard] = useState<Board>();

  // 로컬 스토리지에서 보드 목록 불러오기
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todo") || "[]");
    const board = JSON.parse(localStorage.getItem("board") || "[]");
    const currentBoard = board.find((board: Board) => board.id === boardId);
    setBoard(currentBoard);

    const getTodos = storedTodos?.find(
      (todo: Todo) => todo.boardId === boardId
    );
    setTodos(getTodos?.items);
  }, []);

  return (
    <>
      <Header
        title="To-Do 할 일"
        isBack
        btnText="할 일 생성"
        setVisibleBoardModal={setVisibleBoardModal}
      />
      <div className="w-full text-center text-[22px] font-[700] text-[gray] mt-[20px]">
        <h2>{board?.title}</h2>
      </div>

      <div className="mt-6 w-full">
        {todos?.length === 0 ? <div></div> : <TodoList todos={todos} />}
      </div>

      <TodoModal
        active={visibleBoardModal}
        closeEvent={() => setVisibleBoardModal(false)}
      />
    </>
  );
};

export default BoardDetailTemplate;
