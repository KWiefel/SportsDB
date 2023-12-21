import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FilterInputContext } from "../../Context/Context";
import data from "../../../assets/data/data.json";
import countryList from "../../../assets/data/country.json";
import './Filterbar.scss';
import Select from 'react-dropdown-select';

const FilterBar = () => {
    const navigate = useNavigate();
    const { setUserInput } = useContext(FilterInputContext);

    const [sportOptions, setSportOptions] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [isCountrySelected, setIsCountrySelected] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamsData = data;
                const uniqueSports = [...new Set(teamsData.map((team) => team.strSport))];
                const sportDropdownOptions = uniqueSports.map((sport) => ({ value: sport, label: sport }));
                setSportOptions(sportDropdownOptions);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    const selectedSport = selectedValues.find(filter => filter.type === 'sport');
    const selectedCountry = selectedValues.find(filter => filter.type === 'country');

    setUserInput([
        selectedSport ? selectedSport.value.toLowerCase() : '',
        selectedCountry ? selectedCountry.value.toLowerCase() : ''
    ].filter(Boolean).join(''));
}, [selectedValues, setUserInput]);

    const handleSelectChange = (selectedOption, type) => {
        if (selectedOption && selectedOption.length > 0) {
            const value = selectedOption[0].value;
    
            // Überprüfe, ob das Element bereits ausgewählt wurde
            if (!selectedValues.some(filter => filter.type === type && filter.value === value)) {
                // Füge das neue Element zum bestehenden Array hinzu
                setSelectedValues(prevValues => [...prevValues, { type, value }]);
                setDropdownKey(prevKey => prevKey + 1);
            }
    
            if (type === 'country') {
                setIsCountrySelected(true);
            }
        }
    };

    const handleRemoveFilter = (filterType, filterValue) => {
        const updatedFilters = selectedValues.filter(filter => !(filter.type === filterType && filter.value === filterValue));
        setSelectedValues(updatedFilters);
        setDropdownKey(prevKey => prevKey + 1);
        setIsCountrySelected(false); 
        // Zurücksetzen, wenn ein Land entfernt wird
    };


    const renderSelectedOptions = () => {
        return (
            <div className="filterWrap">
                {selectedValues.map(filter => (
                    <div key={`${filter.type}-${filter.value}`}>
                        {filter.value}{" "}
                        <span
                            style={{ cursor: "pointer", color: "white" }}
                            onClick={() => handleRemoveFilter(filter.type, filter.value)}
                        >
                            x
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    const countryOptions = isCountrySelected
        ? [{ value: 'All Countries', label: 'All Countries' }, ...countryList.map((country, index) => ({ value: country, label: country }))]
        : countryList.map((country, index) => ({ value: country, label: country }));

    return (
        <div className="dropDownWrapper">
            {renderSelectedOptions()}
            <div className="overlay">
                All Countries
            </div>
            <div className="overlay-spo">
                All Sports
            </div>
            <Select
                className="countSelect"
                options={countryOptions}
                values={selectedValues.filter(filter => filter.type === 'country')}
                dropdownHandleRenderer={({ state }) => (
                    <span>{state.dropdown ? '▲' : '▼'}</span>
                )}
                onChange={(values) => handleSelectChange(values, 'country')}
                onClearClick={() => handleRemoveFilter('country', selectedValues.find(filter => filter.type === 'country').value)}
            />
            <Select
                className="sportSelect"
                options={sportOptions}
                values={selectedValues.filter(filter => filter.type === 'sport')}
                dropdownHandleRenderer={({ state }) => (
                    <span>{state.dropdown ? '▲' : '▼'}</span>
                )}
                onChange={(values) => handleSelectChange(values, 'sport')}
            />
        </div>
    );
};

export default FilterBar;
