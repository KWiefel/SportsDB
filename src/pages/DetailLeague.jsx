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
    <main>
      <section className="detail_league_header">
        <img src="https://source.unsplash.com/random/300×300" alt="" />
      </section>
      <section className="detail_league_main">
        {allTeams.length > 0 ? (
          <ul>
            {allTeams.map((team) => (
              <Link to={`/detail-team/${team.idTeam}`} className="scale-hover"><li key={team.idTeam}><span>{team.strTeam}</span> {team.strStadiumLocation}</li></Link>
            ))}
          </ul>
        ) : (
          <p>Keine Teams gefunden.</p>
        )}
      </section>
    </main>
  );
};

export default DetailLeague;
