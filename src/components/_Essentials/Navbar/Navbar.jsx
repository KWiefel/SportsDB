import { useContext, useEffect, useState } from "react";
import { FilterInputContext, SearchStatusContext } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import logo from '/union.svg'
import frame from '/frame.png'
import "./Navbar.scss"
import { useDarkmode } from "../../Context/DarkModeContext";
import DarkMode from "../../../assets/svg/DarkMode";
const Navbar = () => {
    
    const navigate = useNavigate();
    
    // get global keyword state setter
    const { userInput, setUserInput } = useContext(FilterInputContext);
    const { searchStatus, setSearchStatus } = useContext(SearchStatusContext); 

    // set global keyword state to user input
    const handleSearchInput = (event) =>
    {
        setUserInput(event.target.value);
        navigate('/');
        setSearchStatus(true);
    }

    	//=======DarkMode=================
	const { isDarkMode, setIsDarkMode } = useDarkmode(false);
	const body = document.body;
	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (!isDarkMode) {
			body.classList.remove("lightMode");
			body.classList.add("darkMode");
		} else {
			body.classList.remove("darkMode");
			body.classList.add("lightMode");
		}
	};
	useEffect(() => {}, [isDarkMode]);

    const handleLogoClick = () => {
        setSearchStatus(false);
        setUserInput("");
    }

    return ( 
        <nav className="navbar_container">
            <Link to="/" className="logo">
                <img onClick={handleLogoClick} src={logo} alt="Sports.DB" />
                <p onClick={handleLogoClick} >SPORTS.DB</p>
            </Link>
            <div>
            <button
			className='darkModeButton'
			onClick={toggleDarkMode}>
            <DarkMode/>
			</button>
            </div>
            <div className="searchbar">
                <input
                value={userInput} onChange={handleSearchInput} type="text" placeholder="Search for team, stadium or competition"/>
                <img src={frame} alt="" />
            </div>
        </nav>
    );
}

export default Navbar;