import { Link } from "react-router-dom";
import data from "../../assets/data/data.json";
import './LeagueList.scss'
import { useContext, useEffect, useState } from "react";

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

    // component state
    const [results, setResults] = useState([]);

    // filter data by user input
    useEffect(() => {
        const searchResults = [...allLeagueData].filter((team) => {
            if (team.strTeam.toLowerCase().includes(userInput)) {
                return team;
            } else if (team.strLeague.toLowerCase().includes(userInput)){
                return team;
            } else if(team.strSport.includes(userInput[0])) {
                return team;
            } else if(team.strCountry.includes(userInput[1])) {
                return team;
            } 
                
        })
                setResults(searchResults);
        }, [userInput])


    // ==================================================================

    return ( searchStatus ? (<>
        <p>ICH BIN DIE FILTER LIST</p>
        <Link to="/"> BACK HOME</Link>
        {results.map((league) => (
                <>
                <h2>{league.strTeam}</h2>
                <p>{league.strLeague}</p>
                <p>{league.strSport}</p>
                {/* <h2>{league.strLeague}</h2> */}
                </>
            )
        )}
        </> ) : (
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