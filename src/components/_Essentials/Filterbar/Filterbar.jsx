import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FilterInputContext } from "../../Context/Context";
import data from "../../../assets/data/data.json";
import './Filterbar.scss';

const FilterBar = () => {
    const navigate = useNavigate();
    const { userInput, setUserInput } = useContext(FilterInputContext);

    const [sportOptions, setSportOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamsData = data;

                const uniqueSports = [...new Set(teamsData.map((team) => team.strSport))];
                const sportDropdownOptions = uniqueSports.map((sport) => sport);
                setSportOptions(sportDropdownOptions);

                const excludedLeagues = ["WTCC", "WRC", "MotoGP", "NASCAR", "NBA", "UK", "CFL", "NFL", "BTCC", "Formula", "NHL", "IndyCar"];

                const countryEntries = teamsData.filter(team => {
                    return team.strLeague &&
                    team.strLeague !== "_No League" &&
                    !excludedLeagues.some(excludedLeague => team.strLeague.includes(excludedLeague)) &&
                    !team.strLeague.match(/[0-9]/);
                });
                const uniqueCountries = [...new Set(countryEntries.map((team) => team.strLeague.split(' ')[0]))];
                setCountryOptions(uniqueCountries);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSportSelectChange = (event) => {
        const value = event.target.value;
        setUserInput([value, selectedValues[1]]);
        navigate("/results");
    };

    const handleCountrySelectChange = (event) => {
        const value = event.target.value;
        setUserInput([selectedValues[0], value]);
        navigate("/results");
    };

    useEffect(() => {
        console.log("Saved Values:", selectedValues);

        // const userInputArray = [selectedValues[0], selectedValues[1]];
        setUserInput(selectedValues);
    }, [selectedValues, setUserInput, navigate]);

    const renderSelectedOptions = () => {
        return (
            <div className="filterWrap">
                {selectedValues[0] && (
                    <div>
                        {selectedValues[0]}{" "}
                        <span
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleRemoveFilter("sport")}
                        >
                            x
                        </span>
                    </div>
                )}
                {selectedValues[1] && (
                    <div>
                        {selectedValues[1]}{" "}
                        <span
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleRemoveFilter("country")}
                        >
                            x
                        </span>
                    </div>
                )}
            </div>
        );
    };

    const handleRemoveFilter = (filterType) => {
        if (filterType === "sport") {
            setSelectedValues([selectedValues[1]]);
        } else if (filterType === "country") {
            setSelectedValues([selectedValues[0]]);
        }
    };

    return (
        <div className="dropDownWrapper">
            {renderSelectedOptions()}
            <select
                defaultValue={1}
                value={selectedValues[0]}
                onChange={handleSportSelectChange}
                style={{ color: 'white',backgroundColor:'grey' }}
            >
                <option disabled value={1}>All Sports</option>
                {sportOptions.map((sport, index) => (
                    <option key={index} value={sport}>{sport}</option>
                ))}
            </select>
            <select
                defaultValue={1}
                value={selectedValues[1]}
                onChange={handleCountrySelectChange}
                style={{ color: 'white',backgroundColor:'black' }}
            >
                <option disabled value={1}>All Country</option>
                {countryOptions.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;
{/* <div className="dropDownWrapper">
{renderSelectedOptions()}
<Dropdown
id="sportDropdown"
arrowClosed={<span className="arrow-closed" />}
isClearable
onClose={(closedBySelection) => handleDropdownClose(closedBySelection, "sportDropdown")}
onOpen={() => console.log('open!')}
placeholder="All Sports"
options={sportOptions}
onChange={(value) => handleSportDropdownChange(value.value)}
/>
<Dropdown
id="countryDropdown"
arrowClosed={<span className="arrow-closed" />}
isClearable
onClose={(closedBySelection) => handleDropdownClose(closedBySelection, "countryDropdown")}
onOpen={() => console.log('open!')}
placeholder="Allountry"
options={countryOptions}
onChange={(value) => handleCountryDropdownChange(value.value)}
/>
</div> */}