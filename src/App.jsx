import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DetailLeague from "./pages/DetailLeague";
import DetailTeam from "./pages/DetailTeam";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-league" element={<DetailLeague />} />
        <Route path="/detail-team/:id" element={<DetailTeam />} />
      </Routes>
    </>
  );
}

export default App;
