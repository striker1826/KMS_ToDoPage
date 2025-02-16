interface Todo {
  boardId: string;
  id: string;
  title: string;
  description: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  priority: string;
}

type TodoItem = {
  id: string;
  title: string;
  description: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  priority: string;
};

type TodoBoard = {
  boardId: string;
  items: TodoItem[];
};
