import { Link, useNavigate } from "react-router-dom";
import data from "../../assets/data/data.json";
import { useContext, useEffect, useState } from "react";

import noResultsScreen from "/no_results2.gif"
import "./../../components/_Essentials/Hero/Hero"

import { AllLeagueContext, FilterInputContext, SearchStatusContext} from "../Context/Context";
import Hero from "./../../components/_Essentials/Hero/Hero";

const LeagueList = () => {

    // get context
    const { allLeagueData } = useContext(AllLeagueContext);
    const { userInput, setUserInput } = useContext(FilterInputContext);
    const { searchStatus, setSearchStatus } = useContext(SearchStatusContext);
    

    // component state
    const [results, setResults] = useState([]);

    // filter data by user input
    useEffect(() => {
        const searchResults = [...allLeagueData].filter((team) => {
            if (userInput.flat().length === 1) {
                const keyword = userInput.join().trim().toLowerCase()
                if (team.strTeam.toLowerCase().includes(keyword)) {
                    return team;
                }
            } 
        }) 
                setResults(searchResults);
        }, [userInput])

    return (
  <>
  <Hero/>
      {searchStatus ? (
        results.length > 0 ? (
            <>
          <section className="results_container slide_in">
            <div className="league_list_item">
              {results.map((team, index) => (
                <ul key={index}>
                  {/* <h3>{team.strLeague.charAt(0)}</h3> */}
                  <li  key={index}>
                    <Link className="underline-hover_filter_list" to={`/detail-team/${team.idTeam}`}>
                      <span>{team.strTeam}</span> <span>{team.strSport}</span>
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
          </section>
          </>
        ) : (
          <div className="no_results_found slide_in">
            <p>
              Missed shot... Just because you didn't make that shot doesn't mean you still can't score!
            </p>
            <img src={noResultsScreen} alt="no results" />
          </div>
        )
      ) : (
        <p></p>
      )}
    
  </>
);

};

export default LeagueList;
