import LeagueList from "../components/LeagueList/LeagueList";
import Hero from "../components/_Essentials/Hero/Hero";
import data from "../assets/data/data.json";
import FilterBar from "../components/_Essentials/Filterbar/Filterbar";
import './Home.scss';


const Home = () => {

  return (
    <>
    <Hero />
    <FilterBar/>
    <main>
      <LeagueList />
    </main>
    </>
  );
};

export default Home;
