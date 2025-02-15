"use client";

import BlueBtn from "@/components/atoms/BlueBtn";
import BoardModal from "@/components/molecules/BoardModal";
import BoardList from "@/components/organisms/BoardList";
import { Board } from "@/constant/board";
import { useEffect, useState } from "react";

const HomeTemplate = () => {
  const [visibleBoardModal, setVisibleBoardModal] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);

  // 로컬 스토리지에서 보드 목록 불러오기
  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("board") || "[]");
    setBoards(storedBoards);
  }, []);

  return (
    <>
      <div className={`p-6 bg-gray-100 flex flex-col items-center`}>
        <h1 className="text-3xl font-bold mb-4">Kanban To-Do List</h1>
        <BlueBtn
          onClick={() => setVisibleBoardModal(true)}
          text="칸반보드 생성"
        />
      </div>

      <div className="mt-6 w-full">
        {boards.length === 0 ? (
          <p className=" w-full text-center text-gray-600">보드가 없습니다.</p>
        ) : (
          <BoardList boards={boards} />
        )}
      </div>

      <BoardModal
        active={visibleBoardModal}
        closeEvent={() => setVisibleBoardModal(false)}
      />
    </>
  );
};

export default HomeTemplate;
