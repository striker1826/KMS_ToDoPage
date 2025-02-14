"use client";

import BlueBtn from "@/components/atoms/BlueBtn";
import BoardModal from "@/components/molecules/BoardModal";
import { useState } from "react";

const HomeTemplate = () => {
  const [visibleBoardModal, setVisibleBoardModal] = useState(false);
  return (
    <>
      <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Kanban To-Do List</h1>
        <BlueBtn
          onClick={() => setVisibleBoardModal(true)}
          text="칸반보드 생성"
        />
      </div>
      <BoardModal
        active={visibleBoardModal}
        closeEvent={() => setVisibleBoardModal(false)}
      />
    </>
  );
};

export default HomeTemplate;
