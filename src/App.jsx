import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DetailLeague from "./pages/DetailLeague";
import DetailTeam from "./pages/DetailTeam";
import Fetch from "./components/Fetch/Fetch";
import {
  AllLeagueContext,
  FetchCompleteContext,
  FilterInputContext,
  SearchStatusContext
} from "./components/Context/Context";
import { useState } from "react";
import Navbar from "./components/_Essentials/Navbar/Navbar";
import FilterList from "./components/FilterList/FilterList";

function App() {
  // state for data context
  const [allLeagueData, setAllLeagueData] = useState([]);
  console.log("App.jsx", allLeagueData);

  // states for search functions
  const [userInput, setUserInput] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);
  console.log("userInput in App.jsx", userInput);

  // state for checking initial fetch status
  const [fetchStatus, setFetchStatus] = useState(false);
  console.log("fetchStatus", fetchStatus);

  return (
    <div >
    
    <AllLeagueContext.Provider value={{ allLeagueData, setAllLeagueData }}>
      <FilterInputContext.Provider value={{userInput, setUserInput}}>
        <FetchCompleteContext.Provider value={{fetchStatus, setFetchStatus}}>
        <SearchStatusContext.Provider value={{searchStatus, setSearchStatus}}>
          <Fetch/>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={ <FilterList/> } />
            <Route path="/detail-league/:id" element={<DetailLeague />} />
            <Route path="/detail-team/:id" element={<DetailTeam />} />
          </Routes>
        </SearchStatusContext.Provider>
        </FetchCompleteContext.Provider>
      </FilterInputContext.Provider>
    </AllLeagueContext.Provider>

    </div>
  );
}

export default App;
