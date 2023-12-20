import { useContext, useEffect, useState } from "react";
import { FilterInputContext } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import logo from '/union.svg'
import frame from '/frame.png'
import "./Navbar.scss"
import { useDarkmode } from "../../Context/DarkModeContext";
const Navbar = () => {
    
    const navigate = useNavigate();
    
    // get global keyword state setter
    const { userInput, setUserInput } = useContext(FilterInputContext);

    // set global keyword state to user input
    const handleSearchInput = (event) =>
    {
        setUserInput([event.target.value.trim().toLowerCase()]);
        navigate('/results');
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

    return ( 
        <nav className="navbar_container">
            <Link to="/" className="logo">
                <img src={logo} alt="Sports.DB" />
                <p>SPORTS.DB</p>
            </Link>
            <div>
            <button
			className='darkModeButton'
			onClick={toggleDarkMode}>
            ModeToggle
			</button>
            </div>
            <div className="searchbar">
                <input onChange={handleSearchInput} type="text" placeholder="Search for team, stadium or competition"/>
                <img src={frame} alt="" />
            </div>
        </nav>
    );
}

export default Navbar;