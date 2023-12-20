import "./DetailTeam.scss";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AllLeagueContext, FetchCompleteContext } from "../components/Context/Context";


const DetailTeam = () => {
  // get context
  const { allLeagueData } = useContext(AllLeagueContext);  
  const { fetchStatus } = useContext(FetchCompleteContext);

  // component state
  const [filteredTeam, setFilteredTeam] = useState([]);
  console.log(filteredTeam);

  // get team id trough dynamic link
  const idParam = useParams();

  console.log(useParams());

  useEffect(() => {
      [...allLeagueData].forEach((team) => {
        if(team.idTeam == "133604")
        {
          console.log(team);
          setFilteredTeam([team])
        }
        })
  }, [fetchStatus])

  return (
    <>
      <h1>TEAM DETAILS</h1>
      <h2>{filteredTeam[0]?.strTeam}</h2>
      <Link to="/"> Back Home</Link>
      
      {/* <header className="detailteam__header">
        <div className="background_img">
          <h1>{team.strTeam}</h1>
          <img src={team.strStadiumThumb} alt="Stadium-Picture" />
          <div className="facts__wrapper">
            <p className="subtitle">{team.strCountry}</p>
            <p className="subtitle_description">Country</p>
            <p className="subtitle">{team.strStadiumLocation}</p>
            <p className="subtitle_description">Location</p>
            <p className="subtitle">{team.intFormedYear}</p>
            <p className="subtitle_description">Established</p>
            <p className="subtitle">{team.strSport}</p>
            <p className="subtitle_description">Sport</p>
          </div>
        </div>
      </header>
      <main className="detailteam__main">
        <section>
          <article className="competitions__wrapper">
            <p className="competitions">Competitions</p>
            <ul className="competitions_list">
              <li>{team.strLeague}</li>
              <li>{team.strLeague2}</li>
              <li>{team.strLeague3}</li>
              <li>{team.strLeague4}</li>
              <li>{team.strLeague5}</li>
              <li>{team.strLeague6}</li>
              <li>{team.strLeague7}</li>
            </ul>
          </article>
          <article className="description__wrapper">
            <span className="description_span">Description</span>
            <p className="description_text">{team.strDescriptionEN}</p>
          </article>
          <div className="logo__wrapper">
            <img src={team.strTeamBadge} alt="" />
          </div>
          <article className="stadium__wrapper">
            <h3>Stadium</h3>
            <div className="stadium_flex">
              <p className="stadium_text">{team.strStadiumDescription}</p>
              <div className="stadium_facts">
                <p className="subtitle">{team.strStadium}</p>
                <p className="subtitle_description">Home</p>
                <p className="subtitle">{team.intStadiumCapacity}</p>
                <p className="subtitle_description">Capacity</p>
              </div>
            </div>
          </article>
        </section>
      </main>
      <footer className="detailteam__footer">
        <a className="link" href={`https://${team.strWebsite}`}>
          <p className="subtitle">Website</p>
        </a>
        <a className="link" href={`https://${team.strFacebook}`}>
          <p className="subtitle">Facebook</p>
        </a>
        <a className="link" href={`https://${team.strTwitter}`}>
          <p className="subtitle">Twitter</p>
        </a>
        <a className="link" href={`https://${team.strInstagram}`}>
          <p className="subtitle">Instagram</p>
        </a>
        <a className="link" href={`https://${team.strYoutube}`}>
          <p className="subtitle">Youtube</p>
        </a>
      </footer> */}

    </>
  );
};

export default DetailTeam;
