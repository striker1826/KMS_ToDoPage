"use client";

import BoardModal from "@/components/molecules/BoardModal";
import Header from "@/components/molecules/Header";
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
      <Header
        setVisibleBoardModal={setVisibleBoardModal}
        title="보드"
        isBack={false}
        btnText="보드 생성"
      />

      <div className="mt-6 w-full">
        {boards.length === 0 ? <div></div> : <BoardList boards={boards} />}
      </div>

      <BoardModal
        active={visibleBoardModal}
        closeEvent={() => setVisibleBoardModal(false)}
      />
    </>
  );
};

export default HomeTemplate;
