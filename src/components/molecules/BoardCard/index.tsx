import useBoardCard from "@/components/molecules/BoardCard/model/useBoardCard";

interface BoardCardProps {
  id: string;
  title: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  priority: string;
}

const BoardCard = ({ id, title, duration, priority }: BoardCardProps) => {
  const {
    isEditing,
    updatedTitle,
    updatedDuration,
    updatedPriority,
    setUpdatedTitle,
    setUpdatedPriority,
    setIsEditing,
    onClickStartDate,
    onClickEndDate,
    onClickUpdateBoard,
    handleRemoveBoard,
  } = useBoardCard(title, duration, priority);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="date"
              value={updatedDuration.startDate}
              onChange={onClickStartDate}
              className="border p-2 mb-2"
            />
            <input
              type="date"
              value={updatedDuration.endDate}
              onChange={onClickEndDate}
              className="border p-2 mb-2"
            />
            <select
              value={updatedPriority}
              onChange={(e) => setUpdatedPriority(e.target.value)}
              className="border p-2 mb-2"
            >
              <option value="낮음">낮음</option>
              <option value="보통">보통</option>
              <option value="높음">높음</option>
            </select>
          </div>
        ) : (
          <div>
            <h3 className="font-bold">{updatedTitle}</h3>
            <p className="text-sm text-gray-600">
              {updatedDuration.startDate} ~ {updatedDuration.endDate}
            </p>
            <p className="text-sm text-gray-600">우선순위: {updatedPriority}</p>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
  );
};

export default BoardCard;
