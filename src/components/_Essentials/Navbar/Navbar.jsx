import { useContext, useEffect, useState } from "react";
import { FilterInputContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    
    const navigate = useNavigate();
    
    // get global keyword state setter
    const { setUserInput } = useContext(FilterInputContext);

    // set global keyword state to user input
    const handleSearchInput = (event) =>
    {
        setUserInput(event.target.value.trim().toLowerCase());
        navigate('/detail-league');
    }

    return ( 
        <nav>
            <img src="" alt="" />
            <input onChange={handleSearchInput} type="text" placeholder="Search by team, stadium or competition"/>
        </nav>
     );
}
 
export default Navbar;