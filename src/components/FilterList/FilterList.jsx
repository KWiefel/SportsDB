import { useContext, useEffect, useState } from "react";
import { AllLeagueContext, FilterInputContext } from "./../Context/Context";
import { Link } from "react-router-dom";

const FilterList = () => {

    // get context
    const { allLeagueData } = useContext(AllLeagueContext);
    const { userInput, setUserInput } = useContext(FilterInputContext);

    console.log(userInput);
  
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
                console.log(results);
        }, [userInput])

    return (
        <>
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
        </> 
    );
}

export default FilterList;