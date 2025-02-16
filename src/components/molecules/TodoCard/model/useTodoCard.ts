import { useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

const useTodoCard = (
  title: string,
  description: string,
  duration: { startDate: string; endDate: string },
  priority: string
) => {
  const params = useParams();
  const boardId = params?.boardId;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedDuration, setUpdatedDuration] = useState(duration);
  const [updatedPriority, setUpdatedPriority] = useState(priority);

  const onClickStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;

    const isPastDateAtCurrent = dayjs(date).isBefore(
      dayjs().startOf("day"),
      "date"
    );

    const isPastDateAtEndDate = updatedDuration.endDate
      ? dayjs(date).isAfter(updatedDuration.endDate, "date")
      : false;

    if (isPastDateAtCurrent) {
      alert("지난 날짜를 시작 날짜로 생성할 수 없습니다.");
      return;
    }

    if (isPastDateAtEndDate) {
      alert("시작 날짜는 종료 날짜 이후일 수 없습니다.");
      return;
    }

    handleDuration("startDate", date);
  };

  const onClickEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const isPastDateAtStartDate = dayjs(date).isBefore(
      updatedDuration.startDate,
      "date"
    );

    if (isPastDateAtStartDate) {
      alert("종료 날짜를 확인해주세요.");
      return;
    }

    handleDuration("endDate", date);
  };

  const handleDuration = (key: "startDate" | "endDate", date: string) => {
    setUpdatedDuration((prev) => {
      return {
        ...prev,
        [key]: date,
      };
    });
  };

  const handleRemoveBoard = (id: string) => {
    const currentTodo = JSON.parse(localStorage.getItem("todo") || "[]");

    const getTodoByBoardId = currentTodo.find(
      (todo: Todo) => todo.boardId === boardId
    );

    const removedTodoItems = getTodoByBoardId.items.filter(
      (item: Todo) => item.id !== id
    );

    const removedTodo = currentTodo.map((todo: Todo) => {
      if (todo.boardId === boardId) {
        return {
          ...todo,
          ["items"]: [...removedTodoItems],
        };
      }
      return todo;
    });

    localStorage.setItem("todo", JSON.stringify(removedTodo));
    window.location.reload();
  };

  const onClickUpdateBoard = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    if (!title || !duration.startDate || !duration.endDate || !priority) {
      alert("보드 정보를 모두 채워주세요!");
      return;
    }

    handleUpdateBoard(id);
  };

  const handleUpdateBoard = (id: string) => {
    const currentTodo: TodoBoard[] = JSON.parse(
      localStorage.getItem("todo") || "[]"
    );

    const updatedBoards: TodoBoard[] = currentTodo.map((board) =>
      board.boardId === boardId
        ? {
            ...board,
            items: board.items.map((todo) =>
              todo.id === id
                ? {
                    ...todo,
                    title: updatedTitle,
                    description: updatedDescription,
                    duration: {
                      startDate: updatedDuration.startDate,
                      endDate: updatedDuration.endDate,
                    },
                    priority: updatedPriority,
                  }
                : todo
            ),
          }
        : board
    );

    localStorage.setItem("todo", JSON.stringify(updatedBoards));
    location.reload();
  };

  return {
    isEditing,
    updatedTitle,
    updatedDescription,
    updatedDuration,
    updatedPriority,
    setUpdatedTitle,
    setUpdatedDescription,
    setUpdatedPriority,
    setIsEditing,
    onClickStartDate,
    onClickEndDate,
    handleRemoveBoard,
    onClickUpdateBoard,
  };
};

export default useTodoCard;
