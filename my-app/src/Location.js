import { useParams, Link, useSearchParams } from "react-router-dom";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import './MapComponent.css';
import { use, useEffect, useLayoutEffect, useState } from "react";
import { fromLonLat } from "ol/proj";

function Location(props){
    const{SiteID} = useParams();
    console.log(props.list)
    const site = props.list.find(s => s.SiteID == SiteID);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);


        function location(){
            if(!navigator.geolocation){
                return
                   ( <p>Cannot give Directions because Geolocation is not supported on your browser or device</p>);
                
            }
            navigator.geolocation.getCurrentPosition(success, error)
        }

        function success(position){
            
                    setLat(position.coords.latitude)
                    setLong(position.coords.longitude)
                    //console.log(lat)
                    //console.log(long)
        }
        function error(){
            console.log("could not grab coordinates")
            
        }
        //console.log(lat)
        //console.log(long)

        function check(){
            if(lat + long === 0){
                return(
                    <p className = "info">
                        Unable to grab device postion. Try allowing location services for this website.
                    </p>
                )
            }
            else{
                return(
                    <p className = "info">
                        Here is a route to {site.Site}:
                    </p>
                )
            }
        }

        // // useLayoutEffect(() => {

        // //     const map = new Map({
        // //         layers: [
        // //             new TileLayer({source: new OSM()},)
        // //         ],
        // //         view: new View({
        // //             center: fromLonLat([-84.7725, 37.65]),
        // //             zoom: 13,
        // //         }),
        // //         target: 'map',
        // //     })

        //     return () => {
        //     map.setTarget(null);
        //     };

        // },[])



        location()


        function remakeMap(){
            console.log("ranMap")
            const mapDom = document.getElementById('map');
                if(!mapDom)
                {   console.log("returned")
                    return;}
                mapDom.replaceChildren();
                const map = new Map({
                layers: [
                    new TileLayer({source: new OSM()},)
                ],
                view: new View({
                    center: fromLonLat([site.Longitude, site.Latitude]),
                    zoom: 13,
                }),
                target: 'map',
            })

            }
        



   

    if(site){
    return(
        <section id = "siteView">
        <Link className = "back" to = {"/"}>Back</Link>
        <header>{site.Site}</header>
        <img  id = "img" src = {`/${site.Image}`} alt = {site.Site} />
        <p className = "description">
            {site.Description}
        </p>
        {check()}

        <div id = "map">
            
        </div>
        {remakeMap()}


        </section>
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