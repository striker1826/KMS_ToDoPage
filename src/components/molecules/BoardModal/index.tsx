"use client";

import { motion, AnimatePresence } from "framer-motion";
import useBoardModal from "@/components/molecules/BoardModal/model/useBoardModal";

interface BoardModalProps {
  active: boolean;
  closeEvent: () => void;
}

const BoardModal = ({ active = false, closeEvent }: BoardModalProps) => {
  const {
    title,
    duration,
    priority,
    setTitle,
    onClickStartDate,
    onClickEndDate,
    setPriority,
    submitBoard,
    closeBoardModal,
  } = useBoardModal(closeEvent);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex flex-col gap-3 bg-white p-6 rounded-lg w-96"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold">보드 생성</h2>
            <form onSubmit={submitBoard} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="보드 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <div className="flex gap-2 justify-between items-center">
                <input
                  type="date"
                  value={duration.startDate}
                  onChange={onClickStartDate}
                  className="w-full p-2 border rounded"
                />
                ~
                <input
                  type="date"
                  value={duration.endDate}
                  onChange={onClickEndDate}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <h3>우선순위</h3>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>낮음</option>
                  <option>보통</option>
                  <option>높음</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeBoardModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-500 active:scale-95"
                >
                  취소
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 active:scale-95"
                >
                  저장
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoardModal;
