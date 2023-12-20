import LeagueList from "../components/LeagueList/LeagueList";
import Hero from "../components/_Essentials/Hero/Hero";
import data from "../assets/data/data.json";
import FilterBar from "../components/_Essentials/Filterbar/Filterbar";
import './Home.scss';
import { Link } from "react-router-dom";
import { useContext } from "react";

const Home = () => {

  return (
    <>
    <Hero />
    <FilterBar/>
    <main>
      <Link to="/detail-team/:id">LINK DETAIL TEAM</Link>
      <LeagueList />
    </main>
    </>
  );
};

export default Home;
