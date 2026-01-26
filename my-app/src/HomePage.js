import React from "react";
import { Link } from "react-router-dom";

function Home(props){

    let rngOne = Math.floor(Math.random() * (props.list.length + 1))
    let tempArr = props.list
    console.log(tempArr)

    return(
        <section id = "home" style = {{backgroundImage: tempArr[rngOne]?.Image
        ?`url(/${tempArr[rngOne].Image})`
        :"none"
    }
    
    }>
            <img id = "twofifty" src = "/twofiftybanner.png" alt = "250 years Boyle County"/>
            <div id = "linkCover">
            {props.list.map((data) =>
            <div className = "siteLink">
                <Link className = "siteUrl" to = {"/location/"+data.SiteID}>{data.Site}</Link>
            </div>
            )}
            </div>
        
            </section>
    );
}

export default Home;