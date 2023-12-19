import "./DetailTeam.scss";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AllLeagueContext } from "../components/Context/Context";


const DetailTeam = () => {
  // get context
  const { allLeagueData } = useContext(AllLeagueContext);  

  // component state
  const [filteredTeam, setFilteredTeam] = useState([]);

  // get team id trough dynamic link
  const idParam = useParams();

  useEffect(() => {
    [...allLeagueData].forEach((team) => {
      if(team.idTeam == "133604")
      {
        console.log(team);
        setFilteredTeam([team])
      }
      })
  }, [])

  return (
    <>
      <h1>TEAM DETAILS</h1>
      <h2>{filteredTeam[0]?.strTeam}</h2>
      <Link to="/"> Back Home</Link>
    </>
  );
};

export default DetailTeam;
