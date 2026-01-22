import { useParams } from "react-router-dom";

function Location(props){
    const{SiteID} = useParams();
    console.log(props.list)
    const site = props.list.find(s => s.SiteID == SiteID);

    if(site){
    return(
        <p>
            {site.Description}
        </p>
    )}
    else{
        return(
            <p>
                Error: Empty or could not find
            </p>
        )
    }
}

export default Location;