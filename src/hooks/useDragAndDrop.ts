import { Board } from "@/constant/board";
import { useState } from "react";

export const useDragAndDrop = () => {
  const [itemsList, setItemsList] = useState([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    const currentItems = JSON.parse(localStorage.getItem("board") || "[]");
    setItemsList(currentItems);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", id);
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onDragDrop = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    const currentItems = JSON.parse(localStorage.getItem("board") || "[]");
    const movingItem = e.dataTransfer.getData("id");

    const draggedItemIdx = currentItems.findIndex(
      (board: Board) => board.id === movingItem
    );
    const targetItemIdx = currentItems.findIndex(
      (board: Board) => board.id === id
    );

    if (draggedItemIdx !== targetItemIdx) {
      [currentItems[draggedItemIdx], currentItems[targetItemIdx]] = [
        currentItems[targetItemIdx],
        currentItems[draggedItemIdx],
      ];
    }

    localStorage.setItem("board", JSON.stringify(currentItems));
  };

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
  };

  const onDragEnd = () => {
    setDraggedItem(null);
    const updatedItemList = JSON.parse(localStorage.getItem("board") || "[]");

    if (JSON.stringify(itemsList) !== JSON.stringify(updatedItemList)) {
      window.location.reload();
    }
  };

  return {
    onDragStart,
    onDrag,
    onDragOver,
    onDragDrop,
    onDragEnd,
    draggedItem,
    position,
  };
};
