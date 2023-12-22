import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import DetailLeague from "./pages/DetailLeague";
import DetailTeam from "./pages/DetailTeam";
import Fetch from "./components/Fetch/Fetch";
import {
  AllLeagueContext,
  FilterInputContext,
  SearchStatusContext,
  SelectedValueContext
} from "./components/Context/Context";
import { useEffect, useState } from "react";
import Navbar from "./components/_Essentials/Navbar/Navbar";
import FilterList from "./components/FilterList/FilterList";
import { DarkModeProvider } from "./components/Context/DarkModeContext";
import BtnUp from "./components/_Essentials/BtnUp/BtnUp";

function App() {
  // state for data context
  const [allLeagueData, setAllLeagueData] = useState([]);
  console.log("App.jsx", allLeagueData);

  // states for search functions
  const [userInput, setUserInput] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);
  const [ selectedOptions, setSelectedOptions] = useState([]);


  return (
    <div >
    <DarkModeProvider>
    <AllLeagueContext.Provider value={{ allLeagueData, setAllLeagueData }}>
      <FilterInputContext.Provider value={{userInput, setUserInput}}>
        <SearchStatusContext.Provider value={{searchStatus, setSearchStatus}}>
          <SelectedValueContext.Provider value={{ selectedOptions, setSelectedOptions }}>
          <Fetch/>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={ <FilterList/> } />
            <Route path="/detail-league/:id" element={<DetailLeague />} />
            <Route path="/detail-team/:idTeam" element={<DetailTeam />} />
          </Routes>
          </SelectedValueContext.Provider>
          <BtnUp/>
        </SearchStatusContext.Provider>
      </FilterInputContext.Provider>
    </AllLeagueContext.Provider>
    </DarkModeProvider>      

    </div>
  );
}

export default App;
