import { useState } from "react";
import { useDragAndDropTodoCard } from "@/hooks/useDragAndDropTodo";
import useTodoCard from "./model/useTodoCard";
import TodoDetailModal from "../TodoDetailModal";
import OtherBoardModal from "../OtherBoardModal";

interface BoardCardProps {
  id: string;
  title: string;
  description: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  priority: string;
}

const TodoCard = ({
  id,
  title,
  description,
  duration,
  priority,
}: BoardCardProps) => {
  const [activeTodoDetail, setActiveTodoDetail] = useState(false);
  const [activeBoardModal, setActiveBoardModal] = useState(false);

  const {
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
    onClickUpdateBoard,
    handleRemoveBoard,
  } = useTodoCard(title, description, duration, priority);

  const {
    onDragStart,
    onDragDrop,
    onDrag,
    onDragOver,
    onDragEnd,
    draggedItem,
    position,
  } = useDragAndDropTodoCard();

  return (
    <>
      {draggedItem === id && (
        <div
          className="absolute w-60 p-4 rounded-lg shadow-lg bg-white opacity-50 pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <h3 className="font-bold">{updatedTitle}</h3>
          <p className="text-sm text-gray-600">
            {updatedDuration.startDate} ~ {updatedDuration.endDate}
          </p>
          <p className="text-sm text-gray-600">우선순위: {updatedPriority}</p>
        </div>
      )}

      <div
        draggable
        onDragStart={(e) => onDragStart(e, id)}
        onDrag={onDrag}
        onDrop={(e) => onDragDrop(e, id)}
        onDragOver={(e) => onDragOver(e, id)}
        onDragEnd={onDragEnd}
        className={`flex justify-between items-center bg-white p-4 rounded-lg shadow-sm transition-all cursor-grab ${
          draggedItem === id ? "opacity-50" : ""
        }`}
      >
        <div>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="border p-2 mb-2 w-full"
              />
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="border p-2 mb-2 w-full"
                rows={3}
              />
              <input
                type="date"
                value={updatedDuration.startDate}
                onChange={onClickStartDate}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="date"
                value={updatedDuration.endDate}
                onChange={onClickEndDate}
                className="border p-2 mb-2 w-full"
              />
              <select
                value={updatedPriority}
                onChange={(e) => setUpdatedPriority(e.target.value)}
                className="border p-2 mb-2 w-full"
              >
                <option value="낮음">낮음</option>
                <option value="보통">보통</option>
                <option value="높음">높음</option>
              </select>
            </div>
          ) : (
            <div>
              <h3 className="font-bold">{updatedTitle}</h3>
              {updatedDescription.length > 10
                ? updatedDescription.substring(0, 10) + "..."
                : updatedDescription}
              <p className="text-sm text-gray-600">
                {updatedDuration.startDate} ~ {updatedDuration.endDate}
              </p>
              <p className="text-sm text-gray-600">
                우선순위: {updatedPriority}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={() => setActiveBoardModal(true)}
          >
            다른 보드로 이동
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTodoDetail(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              보기
            </button>

            <button
              onClick={() => handleRemoveBoard(id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              삭제
            </button>
            {isEditing ? (
              <button
                onClick={(e) => onClickUpdateBoard(e, id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                저장
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                수정
              </button>
            )}
          </div>
        </div>
      </div>

      <TodoDetailModal
        active={activeTodoDetail}
        title={title}
        description={description}
        closeEvent={() => setActiveTodoDetail(false)}
      />
      <OtherBoardModal
        active={activeBoardModal}
        todoId={id}
        closeEvent={() => setActiveBoardModal(false)}
      />
    </>
  );
};

export default TodoCard;
