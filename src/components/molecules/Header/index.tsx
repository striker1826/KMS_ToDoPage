import BlueBtn from "@/components/atoms/BlueBtn";
import { useRouter } from "next/navigation";

const Header = ({
  title,
  btnText,
  isBack,
  setVisibleBoardModal,
}: {
  title: string;
  isBack: boolean;
  btnText: string;
  setVisibleBoardModal: (visible: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <header className="p-6 bg-gray-100 flex items-center justify-between">
      {/* 왼쪽: 뒤로가기 버튼 + 제목 */}
      <div className="flex items-center gap-4">
        {isBack && (
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-all hover:bg-gray-300 hover:text-black"
          >
            뒤로가기
          </button>
        )}
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>

      <BlueBtn onClick={() => setVisibleBoardModal(true)} text={btnText} />
    </header>
  );
};

export default Header;
