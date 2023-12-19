import { useContext, useEffect, useState } from "react";
import { AllLeagueContext, FilterInputContext } from "./../Context/Context";

const FilterList = () => {

    // get context
    const { allLeagueData } = useContext(AllLeagueContext);
    const { userInput } = useContext(FilterInputContext);
  
    // component state
    const [allLeagues, setAllLeagues] = useState([]);
    const [results, setResults] = useState([]);
    console.log("FilterList", allLeagues);

    // create new array with all team objects
    useEffect(() => {
        allLeagueData.forEach((leagues) => {
            leagues.forEach((team) => {
                    setAllLeagues(prevLeagues => [...prevLeagues, team]);
                })
            })
    }, [allLeagueData])

    // filter data by user input
    useEffect(() => {
        const searchResults = [...allLeagues].filter((team) => {
            if (team.strTeam.toLowerCase().includes(userInput)) {
                console.log("detail-filter:", team.strTeam);
                return team.strTeam;
            } else if (team.strLeague.toLowerCase().includes(userInput)){
                console.log("detail-filter:", team.strLeague, team.strSport);
                return team.strLeague;
            }
                })
                console.log("useEffect", searchResults);
                setResults(searchResults);
        }, [userInput])

    return (
        <>
        <p>ICH BIN DIE FILTER LIST</p>
        {results.map((league) => (
                <>
                <h2>{league.strTeam}</h2>
                {/* <h2>{league.strLeague}</h2> */}
                </>
            )
        )}
        </> 
    );
}

export default FilterList;