import { BrowserRouter, Routes, Route } from "react-router-dom";

import Join from "./components/Join";
import Chat from "./components/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Join} />
        <Route path="/chat" Component={Chat} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;