import React, { useContext, useEffect, useState } from "react";
import { AllLeagueContext } from "../components/Context/Context";
import { Link, useParams } from "react-router-dom";
import './DetailLeague.scss'

const DetailLeague = () => {
  const { allLeagueData } = useContext(AllLeagueContext);
  const [allTeams, setAllTeams] = useState([]);

  console.log(allTeams);

  const { id } = useParams();

  useEffect(() => {
    // Filtere die Teams entsprechend der Liga-ID
    const filteredTeams = allLeagueData.filter((team) => team.idLeague === id);
    setAllTeams(filteredTeams);
  }, [allLeagueData, id]);

  return (
    <>
      <section>
        <img src="https://source.unsplash.com/random/300×300" alt="" />
        <h2>DetailLeague</h2>
      </section>
      <section>
        {allTeams.length > 0 ? (
          <ul>
            {allTeams.map((team) => (
              <Link to={`/detail-team/${team.idTeam}`}><li key={team.idTeam}><span>{team.strTeam}</span> {team.strStadiumLocation}</li></Link>
            ))}
          </ul>
        ) : (
          <p>Keine Teams gefunden.</p>
        )}
      </section>
    </>
  );
};

export default DetailLeague;
