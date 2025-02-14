"use client";

interface BlueBtnProps {
  text: string;
  onClick: () => void;
}

const BlueBtn = ({ text, onClick }: BlueBtnProps) => {
  return (
    <button
      onClick={onClick}
      className="mb-4 bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 active:scale-95"
    >
      {text}
    </button>
  );
};

export default BlueBtn;
