import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

//Define type of todo response
type TodoResponse = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};
//Url to fetch the todos
const url = "https://jsonplaceholder.typicode.com/todos";

//function to fetch todos
const fetchTodos = async () => {
  const response = await fetch(url);
  if (response.status != 200) {
    throw new Error("Something went wrong.");
  }
  return response.json();
};
// function to delete
const deleteTodo = (id: number): Promise<void> => {
  return fetch(`${url}/${id}`, { method: "DELETE" }).then(() => undefined);
};

// main app component
const App = () => {
  const queryClient = useQueryClient(); //query client from react query
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<TodoResponse[]>({ queryKey: ["todo"], queryFn: fetchTodos });

  //use mutation to delete a todo
  const deleteItem = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const deleteTodoItem = (id: number) => {
    deleteItem.mutate(id);
  };

  if (isLoading) {
    return <Typography> Loading...</Typography>;
  }

  if (error) {
    return <Typography> Error: {error?.message} </Typography>;
  }
  console.log(todos);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {todos?.map((todo) => (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 245,
            minHeight: 145,
            mb: 4,
            mt: 3,
            borderRadius: 3,
            borderColor: "black",
            borderStyle: "solid",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {todo.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => deleteTodoItem(todo.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default App;
