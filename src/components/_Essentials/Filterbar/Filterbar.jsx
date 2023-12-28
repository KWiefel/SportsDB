import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FilterInputContext, SearchStatusContext, SelectedValueContext } from "../../Context/Context";
import data from "../../../assets/data/data.json";
import countryList from "../../../assets/data/country.json";
import './Filterbar.scss';
import Select from 'react-dropdown-select';

const FilterBar = () => {

    const { userInput, setUserInput } = useContext(FilterInputContext);
    const { searchStatus, setSearchStatus } = useContext(SearchStatusContext);
    const { selectedOptions, setSelectedOptions } = useContext(SelectedValueContext);

    const [sportOptions, setSportOptions] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [isCountrySelected, setIsCountrySelected] = useState(false);
    
    // get sport option values
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

    // erstelle für alle types ein separates array und update userInput mit beiden arrays
   useEffect(() => {
    const selectedSport = selectedValues.filter(filter => filter.type === 'sport').map(filter => filter.value);
    const selectedCountry = selectedValues.filter(filter => filter.type === 'country').map(filter => filter.value);

    setSelectedOptions([selectedSport, selectedCountry]);
}, [selectedValues, setSelectedOptions]);



    const handleSelectChange = (selectedOption, type) => {
        if (selectedOption && selectedOption.length > 0) {
            const value = selectedOption[0].value;
    
            // Überprüfe, ob das Element bereits ausgewählt wurde
            if (!selectedValues.some(filter => filter.type === type && filter.value === value)) {
                // Füge das neue Element zum bestehenden Array hinzu
                setSelectedValues(prevValues => [...prevValues, { type, value }]);
            }
            if (type === 'country') {
                setIsCountrySelected(true);
            }
        }
        setSearchStatus(true);
    };

    const handleRemoveFilter = (filterType, filterValue) => {
        const updatedFilters = selectedValues.filter(filter => !(filter.type === filterType && filter.value === filterValue));
        setSelectedValues(updatedFilters);
        setIsCountrySelected(false); 
        setSearchStatus(false)
        // Zurücksetzen, wenn ein Land entfernt wird
    };

    // render selected options
    const renderSelectedOptions = () => {
        return (
            <div className="filterWrap">
                {selectedValues.map((filter, index) => (
                    <div key={index} className="renderContainer">
                    <p key={`${filter.type}-${filter.value}`}>
                        {filter.value}{" "}
                        <span
                            onClick={() => handleRemoveFilter(filter.type, filter.value)}
                        >
                            x
                        </span>
                    </p>
                    </div>
                ))}
            </div>
        );
    };


    const countryOptions = isCountrySelected
        ? [{ value: 'All Countries', label: 'All Countries' }, ...countryList.map((country, index) => ({ value: country, label: country }))]
        : countryList.map((country, index) => ({ value: country, label: country }));

    return (
        <>        
        <div className="dropDownWrapper">
            {renderSelectedOptions()}
            <div className="selectContainer">
            <div>
            <Select
                className="countSelect"
                options={countryOptions}
                values={selectedValues.filter(filter => filter.type === 'country')}
                dropdownHandleRenderer={({ state }) => (
                    <span className="dropArrow">{state.dropdown ? '▲' : '▼'}</span>
                )}
                onChange={(values) => handleSelectChange(values, 'country')}
                onClearClick={() => handleRemoveFilter('country', selectedValues.find(filter => filter.type === 'country').value)}
            />
                        <div className="overlay">
                All Countries
            </div>
            </div>
            <div>
            <Select
                className="sportSelect"
                options={sportOptions}
                values={selectedValues.filter(filter => filter.type === 'sport')}
                dropdownHandleRenderer={({ state }) => (
                <span className="dropArrow">{state.dropdown ? '▲' : '▼'}</span>
                )}
                onChange={(values) => handleSelectChange(values, 'sport')}
            />
            <div className="overlay-spo">
                All Sports
            </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default FilterBar;