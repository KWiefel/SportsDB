import "./DetailTeam.scss";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  AllLeagueContext,
} from "../components/Context/Context";
import loadingAnimation from "/sportdb_loading.gif"
import { useDarkmode } from "../components/Context/DarkModeContext";

const DetailTeam = () => {
  // get context
  const { allLeagueData } = useContext(AllLeagueContext);


  // component state
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [ dataLoading, setDataLoading ] = useState(false);
  const [ dataAvailable, setDataAvailable ] = useState(false);
  
  // get team id trough dynamic link
  const { idTeam } = useParams();
  

  useEffect(() => {
    if (allLeagueData.length < 840) {
      setDataLoading(!dataLoading);
    } else {
      [...allLeagueData].forEach((team) => {
        if (team.idTeam === idTeam) {
          setFilteredTeam([team]);
        }
        setDataAvailable(true);
    })
    };
  }, [dataLoading, idTeam]);



      	//=======DarkMode=================
  const { isDarkMode, setIsDarkMode } = useDarkmode(false);
	const body = document.div;
	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (!isDarkMode) {
			body.classList.remove("lightMode");
			body.classList.add("darkMode");
		} else {
			body.classList.remove("darkMode");
			body.classList.add("lightMode");
		}
	};
	useEffect(() => {}, [isDarkMode]);

  return ( dataAvailable  ? (
    <>
      {/* <Link to="/"> Back Home</Link> */}
      <div className={`detailteam__wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        <header className="detailteam__header">
          <h1 className="detailteam_title">{filteredTeam[0]?.strTeam}</h1>
          <div className="background_img">
            <div className="img"></div>
            <div className="facts__wrapper">
              <div>
                <p className="subtitle">{filteredTeam[0]?.strCountry}</p>
                <p className="subtitle_description">Country</p>
              </div>
              <div>
                <p className="subtitle">{filteredTeam[0]?.strStadiumLocation}</p>
                <p className="subtitle_description">Location</p>
              </div>
              <div>
                <p className="subtitle">{filteredTeam[0]?.intFormedYear}</p>
                <p className="subtitle_description">Established</p>
              </div>
              <div>
                <p className="subtitle">{filteredTeam[0]?.strSport}</p>
                <p className="subtitle_description">Sport</p>
              </div>
            </div>
            <img src={filteredTeam[0]?.strStadiumThumb} alt="" />
          </div>
        </header>
        <main className="detailteam__main">
          <section>
            <article className="competitions__wrapper">
              <p className="competitions">Competitions</p>
              <ul className="competitions_list">
                <li>{filteredTeam[0]?.strLeague}</li>
                <li>{filteredTeam[0]?.strLeague2}</li>
                <li>{filteredTeam[0]?.strLeague3}</li>
                <li>{filteredTeam[0]?.strLeague4}</li>
                <li>{filteredTeam[0]?.strLeague5}</li>
                <li>{filteredTeam[0]?.strLeague6}</li>
                <li>{filteredTeam[0]?.strLeague7}</li>
              </ul>
            </article>
            <article className="description__wrapper">
              <span className="description_span">Description</span>
              <p className="description_text">
                {filteredTeam[0]?.strDescriptionEN}
              </p>
            </article>
            <div className="logo__wrapper">
              <img src={filteredTeam[0]?.strTeamBadge} alt="" />
            </div>
            <article className="stadium__wrapper">
              <h3 className="stadium_title">Stadium</h3>
              <div className="stadium_flex">
                <p className="stadium_text">
                  {filteredTeam[0]?.strStadiumDescription}
                </p>
                <div className="stadium_facts">
                  <p className="subtitle">{filteredTeam[0]?.strStadium}</p>
                  <p className="subtitle_description">Home</p>
                  <p className="subtitle">
                    {filteredTeam[0]?.intStadiumCapacity}
                  </p>
                  <p className="subtitle_description">Capacity</p>
                </div>
              </div>
            </article>
          </section>
        </main>
        <footer className="detailteam__footer">
          <a className="link" href={`https://${filteredTeam[0]?.strWebsite}`} target="_blank">
            <p className="subtitle">Website</p>
          </a>
          <a className="link" href={`https://${filteredTeam[0]?.strFacebook}`} target="_blank">
            <p className="subtitle">Facebook</p>
          </a>
          <a className="link" href={`https://${filteredTeam[0]?.strTwitter}`} target="_blank">
            <p className="subtitle">Twitter</p>
          </a>
          <a className="link" href={`https://${filteredTeam[0]?.strInstagram}`} target="_blank">
            <p className="subtitle">Instagram</p>
          </a>
          <a className="link" href={`https://${filteredTeam[0]?.strYoutube}`} target="_blank">
            <p className="subtitle">Youtube</p>
          </a>
        </footer>
      </div>
    </>
  ) : <div className="loading_animation_container">
    <img src={loadingAnimation} alt="" />
    </div>
    
  );
};

export default DetailTeam;
