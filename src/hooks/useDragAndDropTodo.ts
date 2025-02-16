import { Board } from "@/constant/board";
import { useParams } from "next/navigation";
import { useState } from "react";

export const useDragAndDropTodoCard = () => {
  const params = useParams();
  const boardId = params?.boardId;
  const [itemsList, setItemsList] = useState([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    const currentTodos = JSON.parse(localStorage.getItem("todo") || "[]");
    const currentItems = currentTodos.find(
      (todo: Todo) => todo.boardId === boardId
    );
    setItemsList(currentItems.items);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", id);
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onDragDrop = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    const currentItems = JSON.parse(localStorage.getItem("todo") || "[]");
    const getBoardItems = currentItems.find(
      (todo: Todo) => todo.boardId === boardId
    );
    const todoItems = getBoardItems?.items;
    const movingItem = e.dataTransfer.getData("id");

    const draggedItemIdx = todoItems.findIndex(
      (board: Board) => board.id === movingItem
    );
    const targetItemIdx = todoItems.findIndex(
      (board: Board) => board.id === id
    );

    if (draggedItemIdx !== targetItemIdx) {
      [todoItems[draggedItemIdx], todoItems[targetItemIdx]] = [
        todoItems[targetItemIdx],
        todoItems[draggedItemIdx],
      ];
    }
    const updatedItems = currentItems.map((todo: Todo) => {
      if (todo.boardId === boardId) {
        return {
          ...todo,
          ["items"]: [...todoItems],
        };
      }
      return todo;
    });

    localStorage.setItem("todo", JSON.stringify(updatedItems));
  };

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
  };

  const onDragEnd = () => {
    setDraggedItem(null);
    const updatedTodoList = JSON.parse(localStorage.getItem("todo") || "[]");
    const itemList = updatedTodoList.find(
      (todo: Todo) => todo.boardId === boardId
    );

    if (JSON.stringify(itemsList) !== JSON.stringify(itemList.items)) {
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
