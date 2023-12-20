import { useContext, useEffect, useState } from "react";
import data from "./../../assets/data/data.json";
import { AllLeagueContext, FetchCompleteContext } from "../Context/Context";

const Fetch = () => {
    const { allLeagueData, setAllLeagueData } = useContext(AllLeagueContext);
    const [fetchedData, setFetchedData] = useState([]);

    const { fetchStatus, setFetchStatus } = useContext(FetchCompleteContext);

    console.log("FetchComponent:", allLeagueData);

    // fetch all league data
    useEffect(() => {
        const allPromises = data.map((league) => {
            const leagueName = league.strLeague;
            return fetch(`https://thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueName}`)
                .then(response => response.json())
                .then(data => data.teams)
                .catch(error => console.log(error));
        });

        // wait for all data 
        Promise.all(allPromises)
            .then(allData => {
                setFetchedData(allData.flat());
            });
    }, []);

    // update global data state to fetched data
    useEffect(() => {
        setAllLeagueData(fetchedData.filter((league) => league));
        setTimeout(() => {
            setFetchStatus(true);
        }, 6000);
    }, [fetchedData, setAllLeagueData]);

    

};

export default Fetch;