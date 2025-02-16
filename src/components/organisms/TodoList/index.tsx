import TodoCard from "@/components/molecules/TodoCard";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="space-y-4">
      {todos?.map((todo: Todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          description={todo.description}
          title={todo.title}
          duration={todo.duration}
          priority={todo.priority}
        />
      ))}
    </div>
  );
};

export default TodoList;
