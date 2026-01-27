import { useParams, Link, useSearchParams } from "react-router-dom";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import './MapComponent.css';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {Stroke, Style } from 'ol/style'
import { use, useEffect, useLayoutEffect, useState, useRef } from "react";
import { fromLonLat } from "ol/proj";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import VectorTileLayer from "ol/layer/VectorTile";
import { Circle as CircleStyle, Fill } from 'ol/style';

function Location(props){
    const{SiteID} = useParams();
    const site = props.list.find(s => s.SiteID == SiteID);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);



    //console.log(`https://router.project-osrm.org/route/v1/driving/${long},${lat};${site.Longitude},${site.Latitude}?overview=full&geometries=geojson`)

    const [steps, setSteps] = useState([])

    const siteMarker = new VectorSource()

    const siteLayer = new VectorLayer({
        source: siteMarker,
    })

    const routeSourceRef = useRef(new VectorSource())

    const routeLayerRef = useRef(new VectorLayer({
        source: routeSourceRef.current,
    }));

    const [geometry, setGeometry] = useState(null)

    useEffect(() => {

        if(lat + long === 0){return;}
        if(!site){return;}
        async function fetchRoute(start, end){
            const url = `https://router.project-osrm.org/route/v1/driving/${long},${lat};${site.Longitude},${site.Latitude}?overview=full&geometries=geojson&steps=true`
            const response = await fetch(url)
            const route = await response.json()
            console.log(response)
            setGeometry(route.routes[0].geometry)
            setSteps(route.routes[0].legs[0].steps)
    }
    fetchRoute();


    },[lat, long, site])

     useEffect(() => {
        if(!geometry){return;}
        const source = routeSourceRef.current
         source.clear()
            const routeFeature = new GeoJSON().readFeature({
                type: 'Feature',
                geometry: geometry,
            },
        {
            featureProjection: 'EPSG:3857',
        })
        routeFeature.setStyle(
            new Style({
                stroke: new Stroke({
                    width: 5,
                }),
            })
        )
        source.addFeature(routeFeature)
    }, [geometry])
        

    
        

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
                        You are the blue dot. Here is a route to {site.Site}:
                    </p>
                )
            }
        }




        location()


        function remakeMap(){
            const mapDom = document.getElementById('map');
                if(!mapDom)
                {
                    return;}
                mapDom.replaceChildren();
                const map = new Map({
                layers: [
                    new TileLayer({source: new OSM()}),
                    routeLayerRef.current,
                    siteLayer,
                ],
                view: new View({
                    center: fromLonLat([long, lat]),
                    zoom: 14.5,
                }),
                target: 'map',
            })


            }
            function makeMarker(){
            const marker = new Feature({
                geometry: new Point(fromLonLat([long, lat])),
            })

            marker.setStyle(
                new Style({
                    image: new CircleStyle({
                        radius: 5,
                        fill: new Fill({
                            color: "blue"
                        }),
                        stroke: new Stroke({ color: "white", width: 2 }),
                    }),
                })
            )
            siteMarker.addFeature(marker);
            }
         

            function giveInstructions(){

                return(
                    <ol>
                        {
                            steps.map((direction, index) =>(
                                <li key = {index}>
                                    {direction.maneuver.type} {direction.maneuver.modifier} onto {direction.name} for {direction.distance} m
                                </li>
                            
                        ))
                        }
                    </ol>
                )
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
        {makeMarker()}
        {giveInstructions()}
        


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