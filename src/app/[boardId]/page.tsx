import BoardDetailTemplate from "@/components/templates/BoardDetailTemplate";

interface BoardDetailPageProps {
  params: Promise<{ boardId: string }>;
}

const BoardDetailPage = async ({ params }: BoardDetailPageProps) => {
  const boardId = (await params).boardId;
  return <BoardDetailTemplate boardId={boardId} />;
};

export default BoardDetailPage;
