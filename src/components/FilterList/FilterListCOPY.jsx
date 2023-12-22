import { Link, useNavigate } from "react-router-dom";
import data from "../../assets/data/data.json";
import { useContext, useEffect, useState } from "react";

import noResultsScreen from "/no_results2.gif"

// ======================== filterList merge =============================
import { AllLeagueContext, FilterInputContext, SearchStatusContext, SelectedValueContext } from "../Context/Context";
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
    const { selectedOptions, setSelectedOptions } = useContext(SelectedValueContext);

    // component state
    const [results, setResults] = useState([]);

    // filter data by user input
    useEffect(() => {
        const searchResults = [...allLeagueData].filter((team) => {
            if (userInput.flat().length === 1) {
                const keyword = userInput.join().trim().toLowerCase()
                if (team.strTeam.toLowerCase().includes(keyword)) {
                    return team;
                } else if (team.strStadium.toLowerCase().includes(keyword)){
                    return team;
                }
                else if(team.strCountry.includes(userInput.flat()) || team.strSport.includes(userInput.flat()))
                {
                    return team;
                }
            } 
            else if (userInput.length === 2 && userInput[0].length >= 1 && userInput[1].length >= 1) { 
            const condition1 = userInput[0].some(value => team.strSport === value);
            const condition2 = userInput[1].some(value => team.strCountry === value);

            if (condition1 && condition2) {
                return team;
            }} 
        }) 
                setResults(searchResults);
                console.log("FILTERED RESULTS: ",searchResults);
        }, [userInput])

        // useEffect(() => {
        // console.log("Results: ", results);

        // // Erstelle ein leeres Objekt, um Teams nach Ländern zu gruppieren
        // const groupedTeams = {};

        // results.forEach((team) => {
        //     const country = team.strCountry;

        //     // Überprüfe, ob es bereits ein Array für das Land gibt, andernfalls erstelle ein neues Array
        //     if (!groupedTeams[country]) {
        //     groupedTeams[country] = [];
        //     }

        //     // Füge das Team dem entsprechenden Array hinzu
        //     groupedTeams[country].push(team);
        // });

        // // Konvertiere das Objekt in ein Array, um es einfacher zu verarbeiten
        // const combinedTeams = Object.values(groupedTeams);

        // console.log(combinedTeams);
        

        // }, []);

    // ==================================================================

    return ( searchStatus ? (
        results.length > 0 ? (
        <section className="results_container">
        <div>
        {/* {selectedOptions.map((title, index) => (
            <ul key={index}>
            <h2 >{title.type === "country" ? title.value : null}</h2>
            {results.map((team, index) => (
                <li>{team.strCountry === title.value ? team.strTeam : null}</li>
            ))}
            </ul>
        ))} */}


        {results.map((team, index) => (
            <ul key={index}>
            {/* <h3>{team.strLeague.charAt(0)}</h3> */}
            <li key={index}>
            <Link to={`/detail-team/${team.idTeam}`}>
                <span>{team.strTeam}</span> <span>{team.strSport}</span></Link>
            </li>
            </ul>
            ))}
                </div>
                </section>
                
        ) : 
        <div className="no_results_found">
            <p>Missed shot... Just because you didn't make that shot doesn't mean you still can't score!
            </p>
        <img src={noResultsScreen} alt="no results" />
        </div>
    )
        : (
        <section className="league_list">
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
