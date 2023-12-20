import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FilterInputContext } from "../../Context/Context";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import data from "../../../assets/data/data.json";
import './Filterbar.scss';

const FilterBar = () => {
    const navigate = useNavigate();
    const { setUserInput } = useContext(FilterInputContext);

    const [sportOptions, setSportOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedValues, setSelectedValues] = useState(["", ""]);
    const [selectedSportOption, setSelectedSportOption] = useState(null);
    const [selectedCountryOption, setSelectedCountryOption] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamsData = data;

                const uniqueSports = [...new Set(teamsData.map((team) => team.strSport))];
                const sportDropdownOptions = uniqueSports.map((sport) => ({
                    value: sport,
                    label: sport
                }));
                setSportOptions(sportDropdownOptions);


                const excludedLeagues = ["WTCC", "WRC", "MotoGP", "NASCAR", "NBA", "UK", "CFL", "NFL", "BTCC", "Formula", "NHL", "IndyCar"];

                const countryEntries = teamsData.filter(team => {
                    return team.strLeague &&
                    team.strLeague !== "_No League" &&
                    !excludedLeagues.some(excludedLeague => team.strLeague.includes(excludedLeague)) &&
                    !team.strLeague.match(/[0-9]/);
                });
                const uniqueCountries = [...new Set(countryEntries.map((team) => team.strLeague.split(' ')[0]))];
                const countryDropdownOptions = uniqueCountries.map((country) => ({
                    value: country,
                    label: country
                }));
                setCountryOptions(countryDropdownOptions);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSportDropdownChange = (value) => {
        setSelectedValues([value, selectedValues[1]]);
        setSelectedSportOption(value);
        setSportDropdownPlaceholder("Select a sport");
    };

    const setSportDropdownPlaceholder = (text) => {
        const sportDropdown = document.getElementById("sportDropdown");
        if (sportDropdown) {
            sportDropdown.querySelector(".react-dropdown-select-input").placeholder = text;
        }
    };

    const handleCountryDropdownChange = (value) => {
        setSelectedValues([selectedValues[0], value]);
        setSelectedCountryOption(value);
    };

    const handleDropdownClose = (closedBySelection, dropdownId) => {
        if (!closedBySelection) {
            if (dropdownId === "sportDropdown") {
                setSelectedValues(["", selectedValues[1]]);
                setSelectedSportOption(null);
            } else if (dropdownId === "countryDropdown") {
                setSelectedValues([selectedValues[0], ""]);
                setSelectedCountryOption(null);
            }
        }
    };

    useEffect(() => {
        console.log("Saved Values:", selectedValues);

        const userInputArray = [selectedValues[0], selectedValues[1]];
        setUserInput(userInputArray);

        // navigate("/");
    }, [selectedValues, setUserInput, navigate]);

    const renderSelectedOptions = () => {
        return (
            <div>
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
            setSelectedValues(["", selectedValues[1]]);
            setSelectedSportOption(null);
            setSportDropdownPlaceholder("Select a sport");
        } else if (filterType === "country") {
            setSelectedValues([selectedValues[0], ""]);
            setSelectedCountryOption(null);
        }
    };

    return (
        <div className="dropDownWrapper">
            <div className="renderFilter">
                {renderSelectedOptions()}
            </div>
            <Dropdown
                id="sportDropdown"
                arrowClosed={<span className="arrow-closed" />}
                isClearable
                onClose={(closedBySelection) => handleDropdownClose(closedBySelection, "sportDropdown")}
                onOpen={() => console.log('open!')}
                placeholder="Select a sport"
                options={sportOptions}
                onChange={(value) => handleSportDropdownChange(value.value)}
            />
            <Dropdown
                id="countryDropdown"
                arrowClosed={<span className="arrow-closed" />}
                isClearable
                onClose={(closedBySelection) => handleDropdownClose(closedBySelection, "countryDropdown")}
                onOpen={() => console.log('open!')}
                placeholder="Select a country"
                options={countryOptions}
                onChange={(value) => handleCountryDropdownChange(value.value)}
            />
        </div>
    );
};

export default FilterBar;
