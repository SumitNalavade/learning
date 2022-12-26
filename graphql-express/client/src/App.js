import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Project from "./pages/Project";

import Header from "./components/header";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects/:id' element={<Project />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
