import BoardCard from "@/components/molecules/BoardCard";
import { Board } from "@/constant/board";

interface BoardListProps {
  boards: Board[];
}

const BoardList = ({ boards }: BoardListProps) => {
  return (
    <div className="space-y-4">
      {boards.map((board, index) => (
        <BoardCard
          key={index}
          id={board.id}
          title={board.title}
          duration={board.duration}
          priority={board.priority}
        />
      ))}
    </div>
  );
};

export default BoardList;
