"use client";

import { Board } from "@/constant/board";
import { getOtherBoard, handleMoveOtherBoard } from "./models";
import { useParams } from "next/navigation";

interface OtherBoardModalProps {
  active: boolean;
  todoId: string;
  closeEvent: () => void;
}

const OtherBoardModal = ({
  active,
  todoId,
  closeEvent,
}: OtherBoardModalProps) => {
  const params = useParams();
  const boardId = params.boardId as string;

  const boards = getOtherBoard();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center ${
        !active && "hidden"
      }`}
    >
      <div className="bg-[white] w-full py-4 px-2 max-w-lg">
        {boards.map((board: Board) => (
          <div
            key={board.id}
            className="border border-gray-300 shadow-sm bg-white p-4 rounded-lg flex justify-between items-center gap-4"
          >
            <div>
              <h3 className="font-bold">{board.title}</h3>
              <p className="text-sm text-gray-600">
                {board.duration.startDate} ~ {board.duration.endDate}
              </p>
              <p className="text-sm text-gray-600">
                우선순위: {board.priority}
              </p>
            </div>
            <button
              onClick={() => handleMoveOtherBoard(boardId, todoId, board.id)}
              className="bg-blue-500 max-h-[40px] text-white px-4 py-2 text-sm font-semibold rounded-md transition-all hover:bg-blue-600"
            >
              옮기기
            </button>
          </div>
        ))}
        <div className="w-full flex justify-end mt-[15px] px-4">
          <button
            onClick={closeEvent}
            className="bg-gray-500 min-w-[80px] text-white px-4 py-2 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherBoardModal;
