import { useContext, useEffect, useState } from "react";
import { AllLeagueContext, FilterInputContext } from "./../Context/Context";
import { Link } from "react-router-dom";

const FilterList = () => {

    // get context
    const { allLeagueData } = useContext(AllLeagueContext);
    const { userInput, setUserInput } = useContext(FilterInputContext);
  
    // component state
    const [results, setResults] = useState([]);

    // filter data by user input
    useEffect(() => {
        const searchResults = [...allLeagueData].filter((team) => {
            if (team.strTeam.toLowerCase().includes(userInput)) {
                return team.strTeam;
            } else if (team.strLeague.toLowerCase().includes(userInput)){
                return team.strLeague;
            }
                })
                console.log("useEffect", searchResults);
                setResults(searchResults);
        }, [userInput])

    return (
        <>
        <p>ICH BIN DIE FILTER LIST</p>
        <Link to="/"> BACK HOME</Link>
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