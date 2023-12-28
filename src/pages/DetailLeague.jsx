import React, { useContext, useEffect, useState } from "react";
import { AllLeagueContext } from "../components/Context/Context";
import { Link, useParams } from "react-router-dom";
import loadingAnimation from "/sportdb_loading.gif"

import Soccer from "/Soccer.jpg"
import './DetailLeague.scss'

const DetailLeague = () => {
  const { allLeagueData } = useContext(AllLeagueContext);
  const [allTeams, setAllTeams] = useState([]);
  const [sports, setSports] = useState("");

  const { id } = useParams();

  useEffect(() => {
    // Filtere die Teams entsprechend der Liga-ID
    const filteredTeams = allLeagueData.filter((team) => team.idLeague === id);
    setAllTeams(filteredTeams);
  }, [allLeagueData, id]);

  return ( allTeams.length > 0 ? (
    <main>
      <section className="detail_league_header">
        <div className="background_container">
        <img src={`/${allTeams[0]?.strSport}.jpg`} alt="" />
        </div>
        <h2>{allTeams[0]?.strLeague} <span>{allTeams[0]?.strSport}</span></h2>
      </section>
      <section className="detail_league_main">
        {allTeams.length > 0 ? (
          <ul>
            {allTeams.map((team, index) => (
              <Link key={index} to={`/detail-team/${team.idTeam}`} className="scale-hover"><li key={team.idTeam}><span>{team.strTeam}</span> {team.strStadiumLocation}</li></Link>
            ))}
          </ul>
        ) : (
          <p>Keine Teams gefunden.</p>
        )}
      </section>
    </main>
  ): <div className="loading_animation_container">
    <img src={loadingAnimation} alt="" />
    </div>
  );
};

export default DetailLeague;
