import { useState } from "react";
import dayjs from "dayjs";
import {
  INITIAL_BOARD_DURATION,
  INITIAL_BOARD_PRIORITY,
} from "@/constant/boardModal";
import { useParams } from "next/navigation";

const useTodoModal = (closeEvent: () => void) => {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // 추가된 상태
  const [duration, setDuration] = useState(INITIAL_BOARD_DURATION);
  const [priority, setPriority] = useState(INITIAL_BOARD_PRIORITY);

  const onClickStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;

    const isPastDateAtCurrent = dayjs(date).isBefore(
      dayjs().startOf("day"),
      "date"
    );

    const isPastDateAtEndDate = duration.endDate
      ? dayjs(date).isAfter(duration.endDate, "date")
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
      duration.startDate,
      "date"
    );

    if (isPastDateAtStartDate) {
      alert("종료 날짜를 확인해주세요.");
      return;
    }

    handleDuration("endDate", date);
  };

  const handleDuration = (key: "startDate" | "endDate", date: string) => {
    setDuration((prev) => {
      return {
        ...prev,
        [key]: date,
      };
    });
  };

  const submitBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !duration.startDate ||
      !duration.endDate ||
      !priority
    ) {
      alert("보드 정보를 모두 채워주세요!");
      return;
    }

    const currentTodo = JSON.parse(localStorage.getItem("todo") || "[]");
    const getTodos = currentTodo?.find(
      (todo: Todo) => todo.boardId === params?.boardId
    );

    handleSaveBoard();
  };

  const handleSaveBoard = () => {
    const existingBoards = JSON.parse(localStorage.getItem("todo") || "[]");

    const id = Math.random().toString(36).substr(2, 11);
    const newTodo = {
      id,
      title,
      description,
      duration,
      priority,
    };

    const updatedBoards = existingBoards.some(
      (board: any) => board.boardId === params?.boardId
    )
      ? existingBoards.map((board: any) => {
          if (board.boardId === params?.boardId) {
            return {
              ...board,
              items: [...board.items, newTodo],
            };
          }
          return board;
        })
      : [
          ...existingBoards,
          {
            boardId: params?.boardId,
            items: [newTodo],
          },
        ];

    localStorage.setItem("todo", JSON.stringify(updatedBoards));
    resetBoardState();
    closeEvent();
    window.location.reload();
  };

  const closeBoardModal = () => {
    resetBoardState();
    closeEvent();
  };

  const resetBoardState = () => {
    setTitle("");
    setDescription(""); // description 초기화
    setDuration(INITIAL_BOARD_DURATION);
    setPriority(INITIAL_BOARD_PRIORITY);
  };

  return {
    title,
    description, // description 반환
    duration,
    priority,
    setTitle,
    setDescription, // setDescription 반환
    onClickStartDate,
    onClickEndDate,
    setPriority,
    submitBoard,
    closeBoardModal,
  };
};

export default useTodoModal;
