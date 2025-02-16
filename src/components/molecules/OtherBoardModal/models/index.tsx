"use client";

export const getOtherBoard = () => {
  const board = JSON.parse(localStorage.getItem("board") || "[]");
  return board;
};

export const handleMoveOtherBoard = (
  boardId: string,
  todoId: string,
  targetBoardId: string
) => {
  const todo = JSON.parse(localStorage.getItem("todo") || "[]");

  let movedTodo: TodoItem | null = null;

  const updatedTodos = todo.map((todoBoard: TodoBoard) => {
    if (todoBoard.boardId === boardId) {
      const filteredItems = todoBoard.items.filter((todo: TodoItem) => {
        if (todo.id === todoId) {
          movedTodo = { ...todo };
          return false;
        }
        return true;
      });

      return { ...todoBoard, items: filteredItems };
    }
    return todoBoard;
  });

  const finalTodos = updatedTodos.map((todoBoard: TodoBoard) => {
    if (todoBoard.boardId === targetBoardId && movedTodo) {
      return {
        ...todoBoard,
        items: [...todoBoard.items, movedTodo],
      };
    }
    return todoBoard;
  });

  localStorage.setItem("todo", JSON.stringify(finalTodos));

  location.reload();
};
