import { Link } from "react-router-dom";
import data from "../../assets/data/data.json";
import './LeagueList.scss'

const LeagueList = () => {
   // Sortiere die Daten alphabetisch nach dem Attribut strLeague
    const sortedData = [...data].sort((a, b) => a.strLeague.localeCompare(b.strLeague));

    // Gruppiere die sortierten Daten nach dem Anfangsbuchstaben
    const groupedData = sortedData.reduce((acc, league) => {
        const firstLetter = league.strLeague.charAt(0).toUpperCase();
        acc[firstLetter] = [...(acc[firstLetter] || []), league];
        return acc;
    }, {});

    return (
        <section>
            {Object.entries(groupedData).map(([letter, leagues]) => (
            <div key={letter}>
                <h3>{letter}</h3>
                <ul>
                {leagues.map(league => (
                    <li key={league.idLeague}>
                    <Link to={`/detail-league/${league.idLeague}`}><strong>{league.strLeague}</strong> <span>{league.strSport}</span></Link>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </section>
    );
};

export default LeagueList;