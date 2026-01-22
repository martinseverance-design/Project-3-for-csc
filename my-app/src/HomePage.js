import React from "react";
import { Link } from "react-router-dom";

function Home(props){
    return(
        <ul>
            {props.list.map((data) =>
            <li>
                <Link to = {"/location/"+data.SiteID}>{data.Site}</Link>
            </li>
            )}
        </ul>
    );
}

export default Home;