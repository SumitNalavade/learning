import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Game from "./Game";
import Controller from "./Controller";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game">
          <Route path=":gameId" element={<Game />} />
        </Route>
        <Route path="controller" element={<Controller />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;