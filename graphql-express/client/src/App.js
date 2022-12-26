import Header from "./components/header";
import Clients from "./components/Clients"
import Projects from "./components/Projects";
import AddClientModal from "./components/AddClientModal";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <AddClientModal />
        <Projects />
        <Clients />
      </div>
    </>
  );
}

export default App;
