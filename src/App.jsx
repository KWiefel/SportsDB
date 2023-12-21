import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import DetailLeague from "./pages/DetailLeague";
import DetailTeam from "./pages/DetailTeam";
import Fetch from "./components/Fetch/Fetch";
import {
  AllLeagueContext,
  FilterInputContext,
  SearchStatusContext
} from "./components/Context/Context";
import { useState } from "react";
import Navbar from "./components/_Essentials/Navbar/Navbar";
import FilterList from "./components/FilterList/FilterList";
import { DarkModeProvider } from "./components/Context/DarkModeContext";

function App() {
  // state for data context
  const [allLeagueData, setAllLeagueData] = useState([]);
  console.log("App.jsx", allLeagueData);

  // states for search functions
  const [userInput, setUserInput] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  console.log("userInput in App.jsx", userInput);

  return (
    <div >
    <DarkModeProvider>
    <AllLeagueContext.Provider value={{ allLeagueData, setAllLeagueData }}>
      <FilterInputContext.Provider value={{userInput, setUserInput}}>
        <SearchStatusContext.Provider value={{searchStatus, setSearchStatus}}>
          <Fetch/>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={ <FilterList/> } />
            <Route path="/detail-league/:id" element={<DetailLeague />} />
            <Route path="/detail-team/:idTeam" element={<DetailTeam />} />
          </Routes>
        </SearchStatusContext.Provider>
      </FilterInputContext.Provider>
    </AllLeagueContext.Provider>
    </DarkModeProvider>      

    </div>
  );
}

export default App;
