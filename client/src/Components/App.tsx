import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { fetchTodosAsync } from "../Utils/AppController";

import MainContainer from "./MainContainer";

const App: React.FC = () => {

  //Fetch todos from server
  const { isLoading, error, data: todos = [] } = useQuery("todos", fetchTodosAsync);

  return (
    <MainContainer todos={todos} />
  )
};

export default App;
