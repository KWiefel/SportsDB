import LeagueList from "../components/LeagueList/LeagueList";
import Hero from "../components/_Essentials/Hero/Hero";
import './Home.scss';

const Home = () => {
  return (
    <>
    <Hero />
    <main>
      <LeagueList />
    </main>
    </>
  );
};

export default Home;
