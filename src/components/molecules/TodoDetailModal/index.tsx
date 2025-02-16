interface TodoDetailModalProps {
  active: boolean;
  title: string;
  description: string;
  closeEvent: () => void;
}

const TodoDetailModal = ({
  active,
  title,
  description,
  closeEvent,
}: TodoDetailModalProps) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        !active && "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 overflow-y-auto h-[400px] mt-[30px]">
          {description}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={closeEvent}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailModal;
