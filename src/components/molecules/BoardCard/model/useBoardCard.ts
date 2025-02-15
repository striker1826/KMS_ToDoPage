import { useState } from "react";
import { Board } from "@/constant/board";
import dayjs from "dayjs";

const useBoardCard = (
  title: string,
  duration: { startDate: string; endDate: string },
  priority: string
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
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
    const currentBoard = JSON.parse(localStorage.getItem("board") || "[]");
    const removedBoard = currentBoard.filter((board: Board) => board.id !== id);

    localStorage.setItem("board", JSON.stringify(removedBoard));
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

    const currentBoard = JSON.parse(localStorage.getItem("board") || "[]");
    const isExistTitle = currentBoard?.some(
      (board: Board) => board.title === title
    );

    if (isExistTitle) {
      alert("이미 등록되어 있는 보드 제목입니다.");
      return;
    }

    handleUpdateBoard(id);
  };

  const handleUpdateBoard = (id: string) => {
    const currentBoard = JSON.parse(localStorage.getItem("board") || "[]");
    const updatedBoard = currentBoard.map((board: Board) =>
      board.id === id
        ? {
            ...board,
            title: updatedTitle,
            duration: {
              startDate: updatedDuration.startDate,
              endDate: updatedDuration.endDate,
            },
            priority: updatedPriority,
          }
        : board
    );

    localStorage.setItem("board", JSON.stringify(updatedBoard));
    setIsEditing(false);
  };

  return {
    isEditing,
    updatedTitle,
    updatedDuration,
    updatedPriority,
    setUpdatedTitle,
    setUpdatedPriority,
    setIsEditing,
    onClickStartDate,
    onClickEndDate,
    handleRemoveBoard,
    onClickUpdateBoard,
  };
};

export default useBoardCard;
