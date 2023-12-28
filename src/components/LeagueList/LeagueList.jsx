import { Link, useNavigate } from "react-router-dom";
import data from "../../assets/data/data.json";
import './LeagueList.scss'
import { useContext, useEffect, useState } from "react";

import noResultsScreen from "/no_results2.gif"

import { AllLeagueContext, SearchStatusContext, SelectedValueContext } from "./../Context/Context";

const LeagueList = () => {

   // Sortiere die Daten alphabetisch nach dem Attribut strLeague
    const sortedData = [...data].sort((a, b) => a.strLeague.localeCompare(b.strLeague));

    // Gruppiere die sortierten Daten nach dem Anfangsbuchstaben
    const groupedData = sortedData.reduce((acc, league) => {
        const firstLetter = league.strLeague.charAt(0).toUpperCase();
        acc[firstLetter] = [...(acc[firstLetter] || []), league];
        return acc;
    }, {});

    // ======================== filter logic ========================

    // get context
    const { allLeagueData } = useContext(AllLeagueContext);
    const { searchStatus, setSearchStatus } = useContext(SearchStatusContext);
    const { selectedOptions, setSelectedOptions } = useContext(SelectedValueContext);

    console.log("SelectedOptions (Flat): ", selectedOptions.flat());
    console.log("SelectedOptions : ", selectedOptions);

    // component state
    const [results, setResults] = useState([]);

    // filter data by user input
    useEffect(() => {
    const searchResults = [...sortedData].filter((league) => {
        
        if (selectedOptions.length > 0) {
            const countryMatch = selectedOptions[1].some(country => league.strCountry.includes(country))
            const sportsMatch = selectedOptions[0].some(sport => league.strSport === sport)
    
            if (selectedOptions.flat().length > 0)
            {
                if (selectedOptions[0].length === 0 || selectedOptions[1].length === 0) {
                        if (countryMatch || sportsMatch){
                        return league
                        }
        
                } else if (selectedOptions[0].length >= 1 && selectedOptions[1].length >= 1) {
                    if (sportsMatch && countryMatch) {
                        return league;
                    }
                } 
            } else{
                return league
            }
        }
    }, []);

    // Apply the grouping function to searchResults
    const groupedSearchResults = searchResults.reduce((acc, league) => {
        const firstLetter = league.strLeague.charAt(0).toUpperCase();
        acc[firstLetter] = [...(acc[firstLetter] || []), league];
        return acc;
    }, {});

    setResults(groupedSearchResults);
    setSearchStatus(true);
}, [selectedOptions]);


    // ==================================================================

    return ( searchStatus ? (
        <section className="league_list">
            {Object.entries(results).map(([letter, leagues]) => (
            <div className="league_list_item slide_in" key={letter}>
                <h3>{letter}</h3>
                <ul>
                {leagues.map(league => (
                    <li key={league.idLeague}>
                    <Link className="underline-hover slide_in" to={`/detail-league/${league.idLeague}`}><span>{league.strLeague}</span> <span>{league.strSport}</span></Link>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </section>
    ) : (
        <section className="league_list">
            {Object.entries(groupedData).map(([letter, leagues]) => (
            <div key={letter} className="league_list_item slide_in">
                <h3>{letter}</h3>
                <ul className="ul">
                {leagues.map(league => (
                    <li key={league.idLeague}>
                    <Link to={`/detail-league/${league.idLeague}`} className="underline-hover slide_in"><span>{league.strLeague}</span> <span>{league.strSport}</span></Link>
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