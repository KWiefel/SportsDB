import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DetailLeague from "./pages/DetailLeague";
import DetailTeam from "./pages/DetailTeam";
import Fetch from "./components/Fetch/Fetch";
import {
  AllLeagueContext,
  FilterInputContext,
} from "./components/Context/Context";
import { useState } from "react";
import Navbar from "./components/_Essentials/Navbar/Navbar";
import FilterList from "./components/FilterList/FilterList";

function App() {
  // state for data context
  const [allLeagueData, setAllLeagueData] = useState([]);

  // state for filter keyword context
  const [userInput, setUserInput] = useState("");
  console.log(userInput);

  return (
    <>
    <AllLeagueContext.Provider value={{ allLeagueData, setAllLeagueData }}>
      <FilterInputContext.Provider value={{userInput, setUserInput}}>
      <Fetch/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={ <FilterList/> } />
        <Route path="/detail-league" element={<DetailLeague />} />
        <Route path="/detail-team/:id" element={<DetailTeam />} />
      </Routes>
      </FilterInputContext.Provider>
    </AllLeagueContext.Provider>
    </>
  );
}

export default App;
