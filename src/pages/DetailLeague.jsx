import { useContext, useEffect, useState } from "react";
import { AllLeagueContext, FilterInputContext } from "../components/Context/Context";

const DetailLeague = () => {

  // get context
  const { allLeagueData } = useContext(AllLeagueContext);
  const { userInput } = useContext(FilterInputContext);
  
  // component state
  const [allLeagues, setAllLeagues] = useState([]);

  // set component state to global state
    useEffect(() => {
        setAllLeagues(allLeagueData);
    } ,[allLeagueData]);

    console.log("detail-league:", allLeagueData);

    // filter data by user input
    useEffect(() => {
      [...allLeagues].forEach((leagues) => {
            leagues.filter((team) => {
                  if (team.strTeam.toLowerCase().includes(userInput)) {
                      console.log("detail-filter:", team.strTeam);
                  }else if (team.strLeague.toLowerCase().includes(userInput)){
                      console.log("detail-filter:", team.strLeague, team.strSport);
                  }
              })
          })
    }, [userInput])

  return <>
          <p>ICH BIN DIE DETAILLEAGUE</p>
        </>
};

export default DetailLeague;
