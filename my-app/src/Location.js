import { useParams } from "react-router-dom";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import './MapComponent.css';

function Location(props){
    const{SiteID} = useParams();
    console.log(props.list)
    const site = props.list.find(s => s.SiteID == SiteID);


 
    function makeMap(){
 
        new Map({
                layers: [
                    new TileLayer({source: new OSM()},)
                ],
                view: new View({
                    center: [0, 0],
                    zoom: 2,
                }),
                target: 'map',
            })
    }



    function waitForDiv(){
        const mapTest = document.getElementById("map")
        if(!mapTest){
            requestAnimationFrame(waitForDiv)
        }
        makeMap();
    }
        waitForDiv();


   

    if(site){
    return(
        <>
        <p>
            {site.Description}
            {site.Longitude}
        </p>
        <div id="map">
            
        </div>

        </>
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