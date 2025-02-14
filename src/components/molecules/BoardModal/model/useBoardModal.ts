import { useState } from "react";
import dayjs from "dayjs";
import {
  INITIAL_BOARD_DURATION,
  INITIAL_BOARD_PRIORITY,
} from "@/constant/boardModal";

const useBoardModal = (closeEvent: () => void) => {
  const [title, setTitle] = useState("");
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
    if (!title || !duration.startDate || !duration.endDate || !priority) {
      alert("보드 정보를 모두 채워주세요!");
      return;
    }
    handleSaveBoard();
  };

  const handleSaveBoard = () => {
    const existingBoards = JSON.parse(localStorage.getItem("board") || "[]");

    const newBoard = { title, duration, priority };
    const updatedBoards = [...existingBoards, newBoard];

    localStorage.setItem("board", JSON.stringify(updatedBoards));
    resetBoardState();
    closeEvent();
  };

  const closeBoardModal = () => {
    resetBoardState();
    closeEvent();
  };

  const resetBoardState = () => {
    setTitle("");
    setDuration(INITIAL_BOARD_DURATION);
    setPriority(INITIAL_BOARD_PRIORITY);
  };

  return {
    title,
    duration,
    priority,
    setTitle,
    onClickStartDate,
    onClickEndDate,
    setPriority,
    submitBoard,
    closeBoardModal,
  };
};

export default useBoardModal;
