import { Link } from "react-router-dom";
import data from "../../assets/data/data.json";
import './LeagueList.scss'
import { useContext, useEffect, useState } from "react";

import noResultsScreen from "/no_results.jpg"

// ======================== filterList merge =============================
import { AllLeagueContext, FilterInputContext, SearchStatusContext } from "./../Context/Context";
// =======================================================================


const LeagueList = () => {

   // Sortiere die Daten alphabetisch nach dem Attribut strLeague
    const sortedData = [...data].sort((a, b) => a.strLeague.localeCompare(b.strLeague));

    // Gruppiere die sortierten Daten nach dem Anfangsbuchstaben
    const groupedData = sortedData.reduce((acc, league) => {
        const firstLetter = league.strLeague.charAt(0).toUpperCase();
        acc[firstLetter] = [...(acc[firstLetter] || []), league];
        return acc;
    }, {});

    // ======================== filterList merge ========================

    // get context
    const { allLeagueData } = useContext(AllLeagueContext);
    const { userInput, setUserInput } = useContext(FilterInputContext);
    const { searchStatus, setSearchStatus } = useContext(SearchStatusContext);

    console.log("RESULTS: ", userInput);

    // component state
    const [results, setResults] = useState([]);

    // filter data by user input
    useEffect(() => {
        // const keyword = userInput[0].trim().toLowerCase()
        const searchResults = [...allLeagueData].filter((team) => {
            if (!userInput.includes(",")) {
                if (team.strTeam.toLowerCase().includes(userInput.toLowerCase().trim())) {
                    return team;
                } else if (team.strStadium.toLowerCase().includes(userInput.toLowerCase().trim())){
                    return team;
                } else if(team.strSport.includes(userInput.slice(0, userInput.indexOf(",")))) {
                    return team;
                } else if(team.strCountry.includes(userInput.slice(userInput.indexOf(",") + 1))) {
                    return team;
                } 
            }else{
                if(team.strSport.includes(userInput.slice(0, userInput.indexOf(","))) && team.strCountry.includes(userInput.slice(userInput.indexOf(",") + 1))) {
                    return team;
                }
            }
        })
                setResults(searchResults);
                console.log("FILTERED RESULTS: ",searchResults);
        }, [userInput])


    // ==================================================================

    return ( searchStatus ? (
        results.length > 0 ? (
        <section className="results_container">
        <div>
        <ul >
        {results.map((team, index) => (
                    <li key={index}>
                    <Link to={`/detail-team/${team.idTeam}`}><span>{team.strTeam}</span> <span>{team.strSport}</span></Link>
                    </li>
            ))}
                </ul>
                </div>
                </section>
                
        ) : 
        <div className="no_results_found">
            <p>Unfortunately, no matches for 
                {!userInput.includes(",") ? (` ${userInput}` ) :(` ${userInput.slice(0, userInput.indexOf(","))} in ${userInput.slice(userInput.indexOf(",") + 1)}`)
                }</p>
        <img src={noResultsScreen} alt="no results" />
        </div>
    )
         : (
        <section>
            {Object.entries(groupedData).map(([letter, leagues]) => (
            <div key={letter}>
                <h3>{letter}</h3>
                <ul>
                {leagues.map(league => (
                    <li key={league.idLeague}>
                    <Link to={`/detail-league/${league.idLeague}`}><span>{league.strLeague}</span> <span>{league.strSport}</span></Link>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </section>
    )
    );
};

export default LeagueList;