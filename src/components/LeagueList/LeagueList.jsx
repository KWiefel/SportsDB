import { Link, useNavigate } from "react-router-dom";
import data from "../../assets/data/data.json";
import './LeagueList.scss'
import { useContext, useEffect, useState } from "react";

import noResultsScreen from "/no_results2.gif"

// ======================== filterList merge =============================
import { AllLeagueContext, FilterInputContext, SearchStatusContext, SelectedValueContext } from "./../Context/Context";
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

    console.log("GROUP DATA", groupedData);
    // ======================== filterList merge ========================

    // get context
    const { allLeagueData } = useContext(AllLeagueContext);
    const { searchStatus, setSearchStatus } = useContext(SearchStatusContext);
    const { selectedOptions, setSelectedOptions } = useContext(SelectedValueContext);

    // component state
    const [results, setResults] = useState([]);
    console.log("XXXXX", results);

    // filter data by user input
    useEffect(() => {
    const searchResults = [...sortedData].filter((league) => {
        if (selectedOptions.flat().length <  2) {
                if (league.strCountry.includes(selectedOptions.flat())){
                return league
                }else if (league.strSport.includes(selectedOptions.flat())){
                    return league
                }
            
            }
            else if (selectedOptions.length === 2 && selectedOptions[0].length >= 1 && selectedOptions[1].length >= 1)
            {
            const condition1 = selectedOptions[0].some(value => league.strSport === value);
            const condition2 = selectedOptions[1].some(value => league.strCountry === value);
            if (condition1 && condition2) {
                return league;
            }} 
    });

    // Apply the grouping function to searchResults
    const groupedSearchResults = searchResults.reduce((acc, league) => {
        const firstLetter = league.strLeague.charAt(0).toUpperCase();
        acc[firstLetter] = [...(acc[firstLetter] || []), league];
        return acc;
    }, {});

    setResults(groupedSearchResults);
    setSearchStatus(true);
    console.log("FILTERED RESULTS: ", groupedSearchResults);
}, [selectedOptions]);


    // ==================================================================

    return ( searchStatus ? (
        <section className="league_list">
            {Object.entries(results).map(([letter, leagues]) => (
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
    ) : (
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